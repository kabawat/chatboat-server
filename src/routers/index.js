const router = require('express').Router()
const authRouter = require("./auth");
const chatRouter = require('./chat');
const contactRouter = require('./contact');
const messageRouter = require('./message');
const profileRouter = require('./profile/index');
const staticRouter = require('./static/rendomMsg');
const defaultMessageHandle = require('./static/rendomMsg');
const userRouter = require('./user/user');
router.use('/profile', profileRouter)
router.use('/contact', contactRouter)
router.use('/message', messageRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/static', staticRouter)

module.exports = router