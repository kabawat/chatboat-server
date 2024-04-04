const login = require("#controllers/auth/login/index");
const signup = require("#root/src/controllers/auth/signup");
const { Router } = require("express");
const authRouter = Router()

authRouter.route('/login').get(login);

authRouter.route('/signup').get(signup);

module.exports = authRouter