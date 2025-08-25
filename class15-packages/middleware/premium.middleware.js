const User = require("../models/user.model");


async function goldUser(req, res, next) {
    try {
        const currUserId = req.user.userId;
        const user = await User.findById(currUserId);
        if (user.package !== 'gold' && user.package !== 'platinum') {
            throw new Error("Access denied");
        }

        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}



async function platinumUser(req, res, next) {
    try {
        const currUserId = req.user.userId;
        const user = await User.findById(currUserId);
        if (user.package !== 'platinum') {
            throw new Error("Access denied");
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { goldUser, platinumUser };
