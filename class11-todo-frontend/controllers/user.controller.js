const Task = require('../models/user.model');

const updateTask = async (req, res) => {
    try {
        // const { status } = req.params;
        const Task = require('../models/user.model');
        const { id } = req.params;
        const todo = await Task.findById(id);
        todo.status = !todo.status;
        await todo.save();
        res.status(200).json("message done");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const { name, status } = req.body;
        const task = await Task.create({
            name: name,
            status: status
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchTasks = async (req, res) => {
    try {
        const { name } = req.query;
        const tasks = await Task.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json({ todos: tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTaskname = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const task = await Task.findByIdAndUpdate(id, { name });
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const filterTasks = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status) {
            throw new Error("Filter is required");
        }
        if (status == "all") {
            const tasks = await Task.find();
            return res.status(200).json({ tasks });
        }

        let tasks = await Task.find({ status: status === "completed" ? true : false });
        return res.status(200).json({ tasks }); // Changed from {todos} to {tasks}

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const clearCompleted = async (req, res) => {
    try {
        const result = await Task.deleteMany({ status: true });
        res.status(200).json({ 
            message: `${result.deletedCount} completed tasks deleted`,
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    updateTask,
    createTask,
    deleteTask,
    getAllTasks,
    updateTaskname,
    searchTasks,
    filterTasks,
    clearCompleted  // Add this to exports
}