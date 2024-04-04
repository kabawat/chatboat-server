const userModal = require("#db/models/user")

async function verifyEmail(req, res) {
    try {
        const { otp, user } = req.body
        if (otp == user.otp) {
            const verifed = await userModal.updateOne({ _id: user._id }, { $set: { otp: '' } })
            res.status(200).json({
                status: true,
                message: "Verification Successful",
            })
        } else {
            throw new Error('Invalid OTP')
        }
    } catch (error) {
        res.status(400).json({
            dev_msg: error?.message,
            message: 'Invalid OTP',
            status: false
        })
    }
}
module.exports = verifyEmail