const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        default: false,
        type: Boolean,
    }
    
},
{timestamps:true});

const Task = mongoose.model('Task', userschema);
module.exports = Task;