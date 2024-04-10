const { Router } = require("express");
const get_profile = require("#root/src/controllers/profile/profile")
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const update_profile = require("#root/src/controllers/profile/updateProfile");
const profileRouter = Router()
profileRouter.route('/').get(verifyAuthToken, get_profile)
profileRouter.route('/').put(verifyAuthToken, update_profile)
module.exports = profileRouter