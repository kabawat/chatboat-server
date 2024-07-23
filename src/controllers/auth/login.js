const SECRET = require("#root/src/config/env.config");
const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
const { default: axios } = require("axios");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function login(req, res) {
    try {
        const isUserExist = await userModal.findOne({ email: req.body.email, isVerified: true }, 'password username')
        if (!isUserExist) {
            throw new Error("Login failed! User not found. Try again or sign up!")
        }
        const isMatch = await bcrypt.compare(req.body.password, isUserExist?.password);
        if (!isMatch) {
            throw new Error("Password mismatch! Try again or sign up.")
        } else {
            const token = await jwt.sign({ id: isUserExist._id }, SECRET.JWT_AUTH_SECRET, { expiresIn: '30d' })


            const socket_res = await axios.post(`${SECRET.SOCKET_SERVER}/socket/token`, { username: isUserExist.username, password: req.body.password })
            const socket_token = socket_res.data.token

            const isUpdate = await userModal.updateOne({ _id: isUserExist?._id }, { disabled: false })
            res.status(200).json({
                message: "login successful",
                status: true,
                authToken: token,
                socket_token,
                username: isUserExist?.username,
                _id: isUserExist?._id
            });
        }
    } catch (error) {
        sendNotification(error, 'login', req?.body);
        res.status(400).json({
            error: error.message,
            status: false
        });
    }
}
module.exports = login