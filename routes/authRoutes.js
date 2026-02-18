const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/signup', authController.completeSignup);
// router.post('/signup-otp', authController.verifySignupOTP);
// router.post('/request-signup-otp', authController.requestSignupOTP);

router.post('/request-otp', authController.requestOTP);

router.post('/verify-otp', authController.verifyOTP);




// router.post('/forgotPasswordRequest', authController.forgotPasswordRequest);
// router.post('/forgot-pass-otp', authController.verifyForgotPasswordOTP);
router.post('/resetPasswords', authController.resetPassword);


router.post('/login-password', authController.loginWithPassword);
// router.post('/request-otp', authController.requestOTP);
// router.post('/login-otp', authController.loginWithOTP);

module.exports = router;