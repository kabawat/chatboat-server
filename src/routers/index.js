const router = require('express').Router()
const authRouter = require("./auth");
const chatRouter = require('./chat');
const contactRouter = require('./contact');
const messageRouter = require('./message');
const profileRouter = require('./profile/index');
const userRouter = require('./user/user');
router.use('/profile', profileRouter)
router.use('/contact', contactRouter)
router.use('/message', messageRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/chat', chatRouter)

module.exports = router