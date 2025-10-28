const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

// @route   POST /biddings
// @desc    Place a bid on a product
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, bidPrice } = req.body;

    // Validation
    if (!productId || !bidPrice) {
      return res.status(400).json({ 
        error: 'Product ID and bid price are required' 
      });
    }

    if (parseFloat(bidPrice) <= 0) {
      return res.status(400).json({ 
        error: 'Bid price must be greater than 0' 
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        biddings: {
          orderBy: { bidPrice: 'desc' },
          take: 1
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user is trying to bid on their own product
    if (product.createdBy === req.user.id) {
      return res.status(400).json({ 
        error: 'Cannot bid on your own product' 
      });
    }

    const bidAmount = parseFloat(bidPrice);

    // Check if bid is higher than starting price
    if (bidAmount <= product.bidStartPrice) {
      return res.status(400).json({ 
        error: `Bid must be higher than starting price of $${product.bidStartPrice}` 
      });
    }

    // Check if bid is higher than current highest bid
    if (product.biddings.length > 0 && bidAmount <= product.biddings[0].bidPrice) {
      return res.status(400).json({ 
        error: `Bid must be higher than current highest bid of $${product.biddings[0].bidPrice}` 
      });
    }

    // Create or update bidding
    const bidding = await prisma.bidding.upsert({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: productId
        }
      },
      update: {
        bidPrice: bidAmount
      },
      create: {
        userId: req.user.id,
        productId: productId,
        bidPrice: bidAmount
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        product: {
          select: { id: true, name: true, bidStartPrice: true }
        }
      }
    });

    res.status(201).json({
      message: 'Bid placed successfully',
      bidding
    });
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

// @route   GET /biddings/my
// @desc    Get current user's bids
// @access  Private
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const biddings = await prisma.bidding.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            },
            biddings: {
              orderBy: { bidPrice: 'desc' },
              take: 1,
              select: { bidPrice: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Add status info (winning/losing)
    const biddingsWithStatus = biddings.map(bidding => ({
      ...bidding,
      isWinning: bidding.product.biddings[0]?.bidPrice === bidding.bidPrice
    }));

    res.json({ biddings: biddingsWithStatus });
  } catch (error) {
    console.error('Get my biddings error:', error);
    res.status(500).json({ error: 'Failed to fetch your bids' });
  }
});

// @route   GET /biddings/product/:productId
// @desc    Get all bids for a specific product
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const biddings = await prisma.bidding.findMany({
      where: { productId },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { bidPrice: 'desc' }
    });

    res.json({ biddings });
  } catch (error) {
    console.error('Get product biddings error:', error);
    res.status(500).json({ error: 'Failed to fetch product bids' });
  }
});

// @route   DELETE /biddings/:id
// @desc    Delete a bid (only your own)
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if bidding exists and user owns it
    const bidding = await prisma.bidding.findUnique({
      where: { id }
    });

    if (!bidding) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    if (bidding.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this bid' });
    }

    await prisma.bidding.delete({
      where: { id }
    });

    res.json({ message: 'Bid deleted successfully' });
  } catch (error) {
    console.error('Delete bidding error:', error);
    res.status(500).json({ error: 'Failed to delete bid' });
  }
});

module.exports = router;