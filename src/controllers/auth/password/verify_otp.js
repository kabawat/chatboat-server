const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
async function verify_otp(req, res) {
    try {
        if (!req?.body?.otp) {
            return res.status(400).json({
                status: false,
                message: "Hey there! We need your OTP to proceed. Don't worry, it won't bite!"
            });
        }
        if (req.body?.email != req?.body?.user?.email) {
            return res.status(401).json({
                status: false,
                message: "Hmm, it looks like the email you provided doesn't match our records. Please check and try again."
            });
        }
        const exists = await userModal.findOne({ email: req.body?.email, isVerified: true }, 'email otp');
        const verifyOTP = await bcrypt.compare(req.body.otp, exists?.otp);
        if (!verifyOTP) {
            return res.status(400).json({
                status: false,
                message: "Oops! The OTP you entered is incorrect. Please double-check and try again."
            });
        }
        const { _id, email } = exists
        const token = await jwt.sign({ _id, email, otp: req.body.otp }, process.env.JWT_ACCESS_PASSWORD, { expiresIn: '10m' });
        res.status(200).json({
            status: true,
            access_token: token,
            message: "OTP verify successfull"
        });

    } catch (error) {
        // If an error occurs, send a notification to Slack and return a 500 status code with an error message
        sendNotification(error, 'verify_otp', { body: req.body, message: error?.message });
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again later."
        });
    }
}
module.exports = verify_otp