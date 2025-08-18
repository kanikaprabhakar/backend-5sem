const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from "Bearer TOKEN"
        
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

module.exports = verifyUser;