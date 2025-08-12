const {generateOTP, otpVerify} = require("@kanikaprabhakar/otpgenerator")
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const otpRoutes = require('./routes/otp.routes');
app.use('/otp', otpRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});