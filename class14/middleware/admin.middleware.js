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

function verifyUser(req,res,next){
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1] || req.cookies.token;
    
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    // payload = payload which we passed when creating token
    req.user = payload;
    next()
  } catch (error) {
    console.log(error);
    // res.redirect("/auth/login");
    return res.status(400).json({message:error.message});
  }
}

module.exports = { verifyAdmin, verifyUser };