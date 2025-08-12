const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const hashPassword = bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: error.message });
    }
});



router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatched = bcrypt.compare(password, user.password);
        if (!isMatched) {
            throw new Error("Invalid password");
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;