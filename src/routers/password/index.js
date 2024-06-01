const { Router } = require("express");
const { verifyAuthToken, verifyAccessToken, verifyAccessPasswordToken } = require("#root/src/middlewares/verify-token");
const forgot_password_send_otp = require("#root/src/controllers/auth/password/request_forgot_pwds");
const check_password_headers = require("#root/src/middlewares/password/change_password");
const change_password = require("#root/src/controllers/auth/password/change_password");
const verify_otp = require("#root/src/controllers/auth/password/verify_otp");

const passwordRouter = Router()

passwordRouter.route('/send-otp').post(forgot_password_send_otp)
passwordRouter.route('/verify-otp').post(verifyAccessToken, verify_otp)
passwordRouter.route('/change-password').put(check_password_headers, verifyAccessPasswordToken, change_password)

module.exports = passwordRouter