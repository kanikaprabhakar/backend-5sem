const express = require('express');
const app = express();
const path = require('path');
const authrouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const connectdb = require('./db/connectdb');
require('dotenv').config();
const userrouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const { verifyUser } = require('./middleware/admin.middleware');
const Product = require('./models/product.model');
// const cors = require('cors');




app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/auth', authrouter);
app.use('/user', userrouter);
app.use(express.static(path.join(__dirname, 'public')));

const products = [
    {
        name: 'Product 1',
        price: 10.99,
        description:"very costly"
    },
    {
        name: 'Product 2',
        price: 12.99,
        description:"less costly"
    },
    {
        name: 'Product 3',
        price: 8.99,
        description:"very cheap"
    }
]

app.get('/', verifyUser, async(req, res) => {
    const products = await Product.find();
    res.render('home', { name: "kanika", products: products });
});

connectdb().then(() => {
  app.listen(3000, () => console.log("http://localhost:3000"));
}).catch(err => console.log(err));