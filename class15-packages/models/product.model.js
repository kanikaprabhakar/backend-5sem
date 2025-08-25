const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        min:9,
        default:9
    },
    description:{
        type: String,
        required: true
    }
}
,{
        timestamps: true
    });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;