const { Router } = require("express");
const get_profile = require("#root/src/controllers/profile/profile")
const { verifyAuthToken, verifyAccessToken } = require("#root/src/middlewares/verify-token");
const update_profile = require("#root/src/controllers/profile/updateProfile");
const delete_profile = require("#root/src/controllers/profile/delete_profile");
const delete_profile_verify = require("#root/src/controllers/profile/delete_profile_verify");
const profileRouter = Router()
profileRouter.route('/').get(verifyAuthToken, get_profile)
profileRouter.route('/').put(verifyAuthToken, update_profile)
profileRouter.route('/delete').post(verifyAuthToken, delete_profile)
profileRouter.route('/delete').put(verifyAccessToken, delete_profile_verify)
module.exports = profileRouter