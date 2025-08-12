const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const User = require('../models/user.model');
        const user = await User.findByIdAndUpdate(id,{name:"Updated Name"});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = await User.create({ 
            name:name,
            email:email,
            age:age
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    updateUser,
    createUser
}