// Import required modules and models
const userModal = require("#root/src/db/models/user") // User model from the database
const { reset_password_temp } = require("#root/src/helper/email/reset_password_temp") // Function to generate reset password email template
const { generate_otp } = require("#root/src/helper/generate_otp") // Function to generate OTP
const otp_send_on_email = require("#root/src/utils/email/sendEmail") // Function to send email with OTP
const sendNotification = require("#root/src/web-hooks/slack") // Function to send notification to Slack
const SECRET = require("#root/src/config/env.config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
async function forgot_password_send_otp(req, res) {
    try {
        // Find the user in the database with the given email and isVerified status
        const user = await userModal.findOne({ email: req.body?.email, isVerified: true }, 'firstName email username')

        // If the user is not found
        if (!user) {
            return res.status(409).json({
                status: false,
                message: "Email does not exist"
            })
        }

        // Destructure the _id, email, and username from the user object
        const { _id, email, username } = user

        // Set the subject and body for the email
        const subject = "Password Reset Request - OTP Verification"
        const otp = generate_otp()
        const body = reset_password_temp(username, otp)

        // Set the receivers array with the user's email
        const receivers = [email]

        // Send the email with the OTP
        const email_res = await otp_send_on_email(receivers, subject, body);

        // Generate a JSON Web Token with the user's _id, email, and username
        const token = await jwt.sign({ _id, email, username }, SECRET.JWT_ACCESS_SECRET, { expiresIn: '10m' });

        // Update the user's OTP in the database
        const OTP = await bcrypt.hash(otp, 10)
        const updated = await userModal.updateOne({ _id: user._id }, { otp: OTP })

        res.status(200).json({
            access_token: token,
            status: true,
            message: "OTP sent successfully"
        })
    } catch (error) {
        // If an error occurs, send a notification to Slack and return a 500 status code with an error message
        sendNotification(error, 'forgot_password_send_otp', { body: req.body, message: error?.message });
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again later."
        });
    }
}

module.exports = forgot_password_send_otp