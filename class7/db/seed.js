const User = require('../models/user.model');
// const mongoose = require('mongoose');
const dummyUsers = [
    { name: "John Doe", email: "john@example.com", age: 30 },
    { name: "Jane Smith", email: "jane@example.com", age: 25 },
    { name: "Bob Johnson", email: "bob@example.com", age: 40 },
    { name: "Alice Brown", email: "alice@example.com", age: 35 }
];

async function bulkInsertUsers() {
    try {
        await User.insertMany(dummyUsers);
        console.log("Users inserted successfully");
    } catch (error) {
        console.error("Error inserting users:", error);
    }
}

// bulkInsertUsers();
module.exports = bulkInsertUsers;
