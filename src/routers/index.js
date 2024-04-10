const router = require('express').Router()
const authRouter = require("./auth");
const profileRouter = require('./profile/index');
router.use('/auth', authRouter)
router.use('/profile', profileRouter)
module.exports = router