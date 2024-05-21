const { Router } = require("express");
const chatRouter = Router()

const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const get_all_chat = require("#root/src/controllers/chat/get_all_chat");
const delete_chat = require("#root/src/controllers/chat/delete_chat");

chatRouter.route('/').get(verifyAuthToken, get_all_chat)
chatRouter.route('/').delete(verifyAuthToken, delete_chat)
module.exports = chatRouter