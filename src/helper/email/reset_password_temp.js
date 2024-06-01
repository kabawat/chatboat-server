function reset_password_temp(user, otp) {
    return (`
            <!DOCTYPE html>
            <html>
                <head>
                <meta charset="UTF-8">
                <title>Reset Password Request</title>
            </head>
            <body>
                <p>Dear ${user},</p>
                <p>We received a request to reset your password for your account with <strong>Kabawat</strong>. To reset your password, please use the following One-Time Password (OTP):</p>
                <p style="font-size: 18px; font-weight: bold;">Your OTP: <span style="color: #ff0000;">${otp}</span></p>
                <p>This OTP is valid for 15 minutes. Please enter this OTP on the password reset page to proceed with resetting your password.</p>
                <p>If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
                <p>For any further assistance, feel free to contact our support team at <a href="mailto:kshatriyakabawat@gmail.com">kshatriyakabawat@gmail.com</a>.</p>
                <br>
                <p>Thank you,<br>
                <strong>Kabawat Support Team</strong></p>
            </body>
            </html>
    `);
}

module.exports = { reset_password_temp }
