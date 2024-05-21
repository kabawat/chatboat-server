const { Router } = require("express");
const messageRouter = Router()

const mark_read_all_message = require("#root/src/controllers/chat/read_all_message");
const get_all_message = require("#root/src/controllers/chat/get_all_message");
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");

messageRouter.route('/').put(verifyAuthToken, mark_read_all_message)
messageRouter.route('/').post(verifyAuthToken, get_all_message)
module.exports = messageRouter