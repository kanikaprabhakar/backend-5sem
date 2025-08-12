const Task = require('../models/task.model');

const initialTasks = [
    { title: "Task 1", description: "Description for Task 1", status: "pending" },
    { title: "Task 2", description: "Description for Task 2", status: "in-progress" },
    { title: "Task 3", description: "Description for Task 3", status: "completed" }
];

async function seedTasks() {
    try {
        await Task.insertMany(initialTasks);
        console.log("Tasks seeded successfully");
    } catch (error) {
        console.error("Error seeding tasks:", error);
    }
}

module.exports = seedTasks;