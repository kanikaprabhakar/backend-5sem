const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getAllTasks, searchTasks, updateTaskname } = require('../controllers/user.controller');
const Task = require('../models/user.model');

router.post('/create', createTask);

router.delete('/delete/:id', deleteTask);

router.put('/update/:id', updateTask);

router.get('/all', getAllTasks);

router.get('/search', searchTasks);

router.put('/updatename/:id', updateTaskname);

module.exports = router;