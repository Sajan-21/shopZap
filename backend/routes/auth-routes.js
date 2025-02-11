const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const otpVerification = require('../utils/otp-verification').otpVerification;

router.post('/sign-up',authController.signUp);
router.post('/login',authController.login);
router.patch('/forgot-password',authController.forgotPassword);
router.patch('/reset-password',otpVerification,authController.forgotPassword);

module.exports = router;