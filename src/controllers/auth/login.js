const userModal = require("#root/src/db/models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function login(req, res) {
    try {
        const isUserExist = await userModal.findOne({ email: req.body.email, isVerified: true }, 'password')
        if (!isUserExist) {
            throw new Error("Login failed! User not found. Try again or sign up!")
        }
        const isMatch = await bcrypt.compare(req.body.password, isUserExist?.password);
        if (!isMatch) {
            throw new Error("Password mismatch! Try again or sign up.")
        } else {
            const token = await jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            const isUpdate = await userModal.updateOne({ _id: isUserExist?._id }, { token })
            res.status(200).json({
                message: "login successful",
                status: true,
                authToken: token
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            status: false
        });
    }
}
module.exports = login