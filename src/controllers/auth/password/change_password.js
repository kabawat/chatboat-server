const { security_alert_email_temp } = require("#root/src/helper/email/security_alert_email");
const get_request_infomation = require("#root/src/helper/browser/get_request_infomation");
const sendNotification = require("#root/src/web-hooks/slack"); // Importing the sendNotification function for Slack notifications
const send_Email = require("#root/src/utils/email/sendEmail");
const userModal = require("#root/src/db/models/user"); // Importing the user model from the database
const bcrypt = require('bcrypt');

async function change_password(req, res) {
    try {
        // Check if the password is provided in the request body
        if (!req.body?.password) {
            return res.status(400).json({
                status: false,
                message: "Oops! Password is required. Please provide a password to proceed."
            });
        }
        //  Find a user in the database
        const exists = await userModal.findOne({ _id: req?.body?.user?._id, email: req.body?.user?.email, isVerified: true })
        // Compare the provided OTP with the one stored in the database
        const verifyOTP = await bcrypt.compare(req.body?.user?.otp, exists?.otp);

        if (!verifyOTP) {
            return res.status(400).json({
                status: false,
                message: "Oops! The Token is incorrect. Please double-check and try again."
            });
        }

        // Update the user's password and reset the OTP
        exists['password'] = await bcrypt.hash(req.body?.password, 10);
        exists['otp'] = null
        await exists.save();
        //Get the user's name and device information
        const name = `${exists?.firstName} ${exists?.lastName}`
        const deviceInfo = await get_request_infomation(req)

        //Generate the email body for the security alert email
        const email_body = security_alert_email_temp(name, deviceInfo)

        // Define the recipients and subject for the email
        const receivers = [exists?.email]
        const subject = "Security Alert: - Password Reset Successful"

        // Send the security alert email
        await send_Email(receivers, subject, email_body)
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