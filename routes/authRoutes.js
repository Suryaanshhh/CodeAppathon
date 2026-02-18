const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup', authController.completeSignup);
router.post('/signup-otp', authController.verifySignupOTP);
router.post('/request-signup-otp', authController.requestSignupOTP);




router.post('/login-password', authController.loginWithPassword);
router.post('/request-otp', authController.requestOTP);
router.post('/login-otp', authController.loginWithOTP);

module.exports = router;