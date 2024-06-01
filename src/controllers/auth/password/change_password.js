const sendNotification = require("#root/src/web-hooks/slack"); // Importing the sendNotification function for Slack notifications
const userModal = require("#root/src/db/models/user"); // Importing the user model from the database
const bcrypt = require('bcrypt');
const { security_alert_email } = require("#root/src/helper/email/security_alert_email");

async function change_password(req, res) {
    try {
        if (!req.body?.password) { // Checking if the password is provided in the request body
            return res.status(400).json({
                status: false,
                message: "Oops! Password is required. Please provide a password to proceed."
            });
        }

        const exists = await userModal.findOne({ _id: req?.body?.user?._id, email: req.body?.user?.email, isVerified: true })
        const verifyOTP = await bcrypt.compare(req.body?.user?.otp, exists?.otp);

        if (!verifyOTP) { // If the OTP is invalid
            return res.status(400).json({
                status: false,
                message: "Oops! The Token is incorrect. Please double-check and try again."
            });
        }

        // Updating the user's password and resetting the OTP
        exists['password'] = await bcrypt.hash(req.body?.password, 10);
        exists['otp'] = null
        await exists.save();

        // const name = `${exists?.firstName} ${exists?.lastName}`
        // const subject = "Security Alert: - Password Reset Successful"
        // const email_body = security_alert_email(name)


        res.status(200).json({
            status: true,
            message: "Password changed successfully!"
        });
    } catch (error) {
        sendNotification(error, 'change_password', { body: req.body, message: error?.message });
        return res.status(500).json({
            status: false,
            message: "An error occurred. Please try again later."
        });
    }
}


module.exports = change_password


// API for find IP address 
// const ipResponse = await axios.get('https://api.ipify.org?format=json');
// const ipAddress = ipResponse.data.ip;