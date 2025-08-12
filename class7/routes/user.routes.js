const express = require('express');
const router = express.Router();
const { updateUser, createUser } = require('../controllers/user.controller');


router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/bulk', async (req, res) => {
    try {
        const bulkInsertUsers = require('./db/seed');
        await bulkInsertUsers();
        res.status(200).json({ message: "Bulk users inserted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', createUser);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:id', updateUser);

module.exports = router;