

const { Router } = require("express");
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const defaultMessageHandle = require("#root/src/controllers/static/defaultmsg");
const staticRouter = Router()
staticRouter.route('/').get(verifyAuthToken, defaultMessageHandle)
module.exports = staticRouter