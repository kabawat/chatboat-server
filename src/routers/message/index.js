const { Router } = require("express");
const messageRouter = Router()

const mark_read_all_message = require("#root/src/controllers/message/read_all_message");
const get_all_message = require("#root/src/controllers/message/get_all_message");
const { verifyAuthToken } = require("#root/src/middlewares/verify-token");
const delete_message = require("#root/src/controllers/message/delete_message");

messageRouter.route('/').put(verifyAuthToken, mark_read_all_message)
messageRouter.route('/').post(verifyAuthToken, get_all_message)
messageRouter.route('/').delete(verifyAuthToken,delete_message)
module.exports = messageRouter