const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const { verifyUser } = require("../middleware/admin.middleware");
const { goldUser, platinumUser } = require("../middleware/premium.middleware");
const User = require("../models/user.model");



router.get("/create/product", async (req,res) => {
    try {
        const dummyProducts = [
            {
                name: "name1",
                price: 120000,
                description: "description1",
                image: "https://fastly.picsum.photos/id/428/300/200.jpg?hmac=ikKOcamKDMicSZKD7eMbhzgMNNbyCucuLohsjaMt740"
            },
            {
                name: "name2",
                price: 450200,
                description: "description2",
                image: "https://picsum.photos/seed/p2/300/200"
            }
        ]
        const products =  await Product.insertMany(dummyProducts);
        res.status(200).json({ message: "Products created successfully", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



router.get("/product/:id", verifyUser, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render("singleProduct", { product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/package/buy/", verifyUser, async (req, res) => {
    try {
        const userId = req.user.userId;
        const {package} = req.query;
        const user = await User.findById(userId);
        user.package = package;
        if(package=="gold"){
            user.credits += 500;
        } else if(package=="platinum"){
            user.credits += 1000;
        }
        await user.save();
        res.status(200).json({ message: "Package purchased successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/all/products",verifyUser, async (req, res) => {
    try {
        const products = await Product.find();
        res.json({products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/discount/gold/:id",verifyUser,goldUser, async (req, res)=>{
    try {
        const {id} = req.params;
        const userId = req.user.userId;
        const product = await Product.findById(id);
        const user = await User.findById(userId);
        const discount = product.price -(product.price * 0.1);
        if(user.credits-(product.price * 0.1) < 0){
            throw new Error("Insufficient credits");
        }
        user.credits -= discount;
        res.status(200).json({ discountedprice: discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/discount/platinum/:id",verifyUser,platinumUser, async (req, res)=>{
      try {
        const {id} = req.params;
        const userId = req.user.userId;
        const product = await Product.findById(id);
        const user = await User.findById(userId);
        const discount = product.price -(product.price * 0.1);
        if(user.credits-discount < 0){
            throw new Error("Insufficient credits");
        }
        user.credits -= discount;
        res.status(200).json({ discountedprice: discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;