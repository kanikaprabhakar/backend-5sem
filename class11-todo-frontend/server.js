const express = require('express');
const app = express();
require('dotenv').config();
const connectdb = require('./db/connectdb');
const mongoose = require('mongoose');
const User = require('./models/user.model');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
//routers
const userRoutes = require('./routes/user.routes');

app.use('/users', userRoutes);

connectdb().then(() => {
  app.listen(3000, () => console.log("http://localhost:3000"));
}).catch(err => console.log(err));
