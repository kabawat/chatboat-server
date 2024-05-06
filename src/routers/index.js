const router = require('express').Router()
const authRouter = require("./auth");
const contactRouter = require('./contact');
const profileRouter = require('./profile/index');
const userRouter = require('./user/user');
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/user', userRouter)
router.use('/contact', contactRouter)
module.exports = router