const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.dburl);
    console.log("Connected to MongoDB");
}
module.exports = connectDB;
