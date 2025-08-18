const express = require('express');
const app = express();
const path = require('path');
const authrouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const connectdb = require('./db/connectdb');
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authrouter);
app.use(express.static(path.join(__dirname, 'public')));

connectdb().then(() => {
  app.listen(3000, () => console.log("http://localhost:3000"));
}).catch(err => console.log(err));