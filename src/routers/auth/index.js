
const login = require("#controllers/auth/login");
const createInity = require("#controllers/auth/signup/createIntity");
const signup = require("#controllers/auth/signup/signup");
const { verifyVerificationToken } = require("#middlewares/verify-token");
const uploadImage = require("#middlewares/cloudinary-image");
const otpOnEmail = require("#utils/otpOnEmail");
const { Router } = require("express");
const verifyEmail = require("#controllers/auth/signup/verifyEmail");
const finishSignup = require("#controllers/auth/signup/finishSignup");
const authRouter = Router()

authRouter.route('/send-otp').post(otpOnEmail, createInity)
authRouter.route('/verify-email').post(verifyVerificationToken, verifyEmail)
authRouter.route('/registration').post(verifyVerificationToken, signup);
authRouter.route('/finish-signup').post(verifyVerificationToken, uploadImage, finishSignup);
authRouter.route('/upload-image').post(uploadImage)
authRouter.route('/login').get(login);

module.exports = authRouter