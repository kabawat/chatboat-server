const userModal = require("#db/models/user")
const jwt = require("jsonwebtoken");
async function verifyEmail(req, res) {
    try {
        const { otp, user } = req.body
        // Check if the provided OTP matches the OTP stored in the database
        if (otp == user.otp) {
            const verifed = await userModal.updateOne({ _id: user._id }, { $set: { otp: null } })
            res.status(200).json({
                status: true,
                message: "Congratulations! You've unlocked the mystery door of verification!",
            })
        } else {
            // Throw an error if the OTP is invalid
            throw new Error("Oops! Wrong secret code entered!")
        }
    } catch (error) {
        res.status(400).json({
            dev_msg: error?.message,
            error: "Oops! Wrong secret code entered!",
            status: false
        })
    }
}
module.exports = verifyEmail