const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

// @route   GET /products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        biddings: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { bidPrice: 'desc' }
        },
        _count: {
          select: { biddings: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Add highest bid info to each product
    const productsWithBidInfo = products.map(product => ({
      ...product,
      currentHighestBid: product.biddings.length > 0 ? product.biddings[0].bidPrice : null,
      totalBids: product._count.biddings
    }));

    res.json({ products: productsWithBidInfo });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// @route   GET /products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        biddings: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { bidPrice: 'desc' }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// @route   POST /products
// @desc    Create a new product
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, image, bidStartPrice } = req.body;

    // Validation
    if (!name || !description || !bidStartPrice) {
      return res.status(400).json({ 
        error: 'Name, description, and bidStartPrice are required' 
      });
    }

    if (parseFloat(bidStartPrice) <= 0) {
      return res.status(400).json({ 
        error: 'Starting bid price must be greater than 0' 
      });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        image: image || null,
        bidStartPrice: parseFloat(bidStartPrice),
        createdBy: req.user.id
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({ 
      message: 'Product created successfully',
      product 
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// @route   GET /products/my/products
// @desc    Get current user's products
// @access  Private
router.get('/my/products', authenticateToken, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { createdBy: req.user.id },
      include: {
        biddings: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            }
          },
          orderBy: { bidPrice: 'desc' }
        },
        _count: {
          select: { biddings: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products });
  } catch (error) {
    console.error('Get my products error:', error);
    res.status(500).json({ error: 'Failed to fetch your products' });
  }
});

// @route   PUT /products/:id
// @desc    Update product
// @access  Private (only product owner)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    // Check if product exists and user owns it
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(description && { description: description.trim() }),
        ...(image !== undefined && { image })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// @route   DELETE /products/:id
// @desc    Delete product
// @access  Private (only product owner)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists and user owns it
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    await prisma.product.delete({
      where: { id }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;