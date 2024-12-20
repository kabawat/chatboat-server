const sendNotification = require('#root/src/web-hooks/slack');
const nodemailer = require('nodemailer');
const SECRET = require('../config/env.config');
require('dotenv').config(); // Load environment variables from .env file

async function otpOnEmail(req, res, next) {
    // Validate email format
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const receivers = req.body?.email;
        if (!emailRegex.test(receivers)) {
            return res.status(400).json({ error: "Hmm... That doesn't seem like a valid email address!" });
        }

        const otpLength = 5;
        let otp = '';
        for (let i = 0; i < otpLength; i++) {
            otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
        }

        // Create a nodemailer transporter using your SMTP settings
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., 'Gmail'
            auth: {
                user: SECRET.GMAIL_USER,
                pass: SECRET.GMAIL_PASS
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Query Boat" <' + SECRET.GMAIL_USER + '>', // sender name and address
            to: [receivers], // list of receivers
            subject: 'OTP Verification', // Subject line
            html: `Your OTP is: ${otp}` // html body, uncomment if you want to send HTML content
        });

        req.body.otp = otp;
        next();
    } catch (error) {
        sendNotification(error, 'otpOnEmail', req.body);
        console.error('Error occurred while sending email:', error);
        res.status(504).json({
            error: 'Failed to send OTP.',
            dev_message: error?.message
        });
    }
}

module.exports = otpOnEmail;
