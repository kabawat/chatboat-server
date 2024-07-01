const { Router } = require("express");
const { verifyAuthToken, verifyToken } = require("#root/src/middlewares/verify-token");
const add_new_contact = require("#root/src/controllers/contact/add_new_contect");
const delete_contact = require("#root/src/controllers/contact/delete_contact");
const get_single_contact = require("#root/src/controllers/contact/get_single_contact");
const get_all_contact = require("#root/src/controllers/contact/get_all_contact");
const block_contact = require("#root/src/controllers/contact/block_contact");
const contactRouter = Router()

contactRouter.route('/').post(verifyAuthToken, add_new_contact)
contactRouter.route('/').get(verifyAuthToken, get_all_contact)
contactRouter.route('/:contact').get(verifyAuthToken, get_single_contact)
contactRouter.route('/:contact').delete(verifyAuthToken, delete_contact)
contactRouter.route('/block').post(verifyToken, block_contact)
module.exports = contactRouter