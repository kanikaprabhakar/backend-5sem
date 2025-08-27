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
    // console.log(req.cookies);
    // console.log(req.cookies.token);
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token; //bearer token

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.jwtsecret);
        // console.log(token);
        req.user = decoded; 
        next();
    } catch (error) {
        // console.log(error);
        res.redirect("/auth/login");
    }
};


module.exports = { verifyAdmin, verifyUser };