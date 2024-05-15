const router = require('express').Router()
const authRouter = require("./auth");
const chatRouter = require('./chat');
const contactRouter = require('./contact');
const profileRouter = require('./profile/index');
const userRouter = require('./user/user');
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/user', userRouter)
router.use('/contact', contactRouter)
router.use('/chat', chatRouter)

module.exports = router