const { log } = require("console");
const User = require("../models/user.model");


async function verifyAdmin(req,res,next){
    try {
        const currUserId = req.user.userId;
        const user = await User.findById(currUserId).select('+role');
        console.log("User:", user);
        if (!user || user.role != "admin") {
            throw new Error("Access denied");
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization; // Get token from "Bearer TOKEN"
        
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.jwtsecret);
        req.user = decoded; // Add user info to request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};


module.exports = { verifyAdmin, verifyUser };