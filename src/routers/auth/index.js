
const login = require("#root/src/controllers/auth/login");
const createInity = require("#root/src/controllers/auth/signup/createIntity");
const signup = require("#root/src/controllers/auth/signup/signup");
const { verifyVerificationToken } = require("#middlewares/verify-token");
const otpOnEmail = require("#utils/otpOnEmail");
const { Router } = require("express");
const verifyEmail = require("#controllers/auth/signup/verifyEmail");
const authRouter = Router()

authRouter.route('/send-otp').post(otpOnEmail, createInity)
authRouter.route('/verify-email').post(verifyVerificationToken, verifyEmail)
authRouter.route('/registration').post(verifyVerificationToken, signup);

authRouter.route('/login').get(login);

module.exports = authRouter