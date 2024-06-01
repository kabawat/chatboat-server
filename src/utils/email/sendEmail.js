const sendNotification = require('#root/src/web-hooks/slack');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

async function otp_send_on_email(receivers, subject, body) {
    try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(receivers)) {
            return res.status(400).json({ error: "Hmm... That doesn't seem like a valid email address!" });
        }
        // Create a nodemailer transporter using your SMTP settings
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., 'Gmail'
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Query Boat" <' + process.env.GMAIL_USER + '>', // sender name and address
            to: receivers, // list of receivers
            subject: subject, // Subject line
            html: body // html body, uncomment if you want to send HTML content
        });
        return {
            status: true,
            message: "OTP sent successfully"
        };
    } catch (error) {
        sendNotification(error, 'otp_send_on_email', receivers);
        return {
            status: false,
            message: "Error sending OTP",
            error: error
        }
    }
}

module.exports = otp_send_on_email;
