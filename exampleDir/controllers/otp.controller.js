const express = require('express');
const { generateOTP, otpVerify } = require("@kanikaprabhakar/otpgenerator");

const generate = async (req, res) => {
    try {
        const otp = generateOTP(4);
        console.log(otp);
        res.status(200).json({ otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });       
    }
}

const verify = async (req, res) => {
    try {
        const { otp } = req.body;
        const matched = otpVerify(otp);
        console.log(matched);
        res.status(200).json({ matched });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    generate,
    verify
}