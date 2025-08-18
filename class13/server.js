const express = require('express');
const app = express();
const path = require('path');
const authrouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const connectdb = require('./db/connectdb');
require('dotenv').config();
const session = require('express-session');
const sessionConfig = {
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true ,maxAge:7*24*60*60*1000}
}

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authrouter);
app.use(express.static(path.join(__dirname, 'public')));


connectdb().then(() => {
  app.listen(3000, () => console.log("http://localhost:3000"));
}).catch(err => console.log(err));