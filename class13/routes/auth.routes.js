const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// const verifyUser = require("../middleware/auth.middleware");
const session = require("express-session");
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


// router.get("/user",verifyUser, async (req, res) => {
//     try {
//         res.status(200).json({ message: "you have access" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


router.get("/session", async(req,res) => {
    try {
        const user = req.session.cookie.user;
        console.log(req.session.cookie);
        
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        }
        req.session.cookie.user = JSON.stringify({
            id: user._id,
            email: user.email
        });

        res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;