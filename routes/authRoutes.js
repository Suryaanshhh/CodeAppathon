const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup', authController.signup);


router.post('/login-password', authController.loginWithPassword);
router.post('/request-otp', authController.requestOTP);
router.post('/login-otp', authController.loginWithOTP);

module.exports = router;