const { Router } = require("express");
const chatRouter = Router()

const mark_read_all_message = require("#root/src/controllers/chat/read_all_message");
const get_all_message = require("#root/src/controllers/chat/get_all_message");
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const get_all_chat = require("#root/src/controllers/chat/get_all_chat");
const delete_chat = require("#root/src/controllers/chat/delete_chat");

chatRouter.route('/').get(verifyAuthToken, get_all_chat)
chatRouter.route('/').post(verifyAuthToken, get_all_message)
chatRouter.route('/').put(verifyAuthToken, mark_read_all_message)
chatRouter.route('/').delete(verifyAuthToken, delete_chat)
module.exports = chatRouter