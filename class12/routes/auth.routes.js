const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/auth.middleware");

router.post("/signup", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const hashPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });
        await newUser.save(); 
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message }); 
    }
});


router.get("/user",verifyUser, async (req, res) => {
    try {
        res.status(200).json({ message: "you have access" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.jwtsecret, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;