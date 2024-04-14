const { Router } = require("express");
const get_all_user = require("./show_user");
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const userRouter = Router()
userRouter.route('/').get(verifyAuthToken, get_all_user)
module.exports = userRouter