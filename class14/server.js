const express = require('express');
const app = express();
const path = require('path');
const authrouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const connectdb = require('./db/connectdb');
require('dotenv').config();
const cors = require('cors');

var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authrouter);
app.use(express.static(path.join(__dirname, 'public')));

connectdb().then(() => {
  app.listen(4000, () => console.log("http://localhost:4000"));
}).catch(err => console.log(err));