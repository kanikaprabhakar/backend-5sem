const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        select: false
    },
    package:{
        type: String,
        enum: ['free', 'gold', 'platinum'],
        default: 'free'
    },
    credits:{
        type: Number,
        enum:[0,500,1000],
        default: 0
    }
});



const User = mongoose.model('User', userSchema);
module.exports = User;