const express = require('express');
const router = express.Router();
const { verify, generate } = require('../controllers/otp.controller');

router.get('/generate', generate);

router.post('/verify', verify);

module.exports = router;