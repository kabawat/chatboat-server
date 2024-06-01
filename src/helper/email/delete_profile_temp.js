function delete_profile_temp(user, otp) {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Account Deletion Request</title>
            </head>
            <body>
                <p>Dear ${user},</p>
                <p>We received a request to delete your account with <strong>Kabawat</strong>. To confirm this action, please use the following One-Time Password (OTP):</p>
                <p style="font-size: 18px; font-weight: bold;">Your OTP: <span style="color: #ff0000;">${otp}</span></p>
                <p>This OTP is valid for 15 minutes. Please enter this OTP on the account deletion page to proceed with deleting your account.</p>
                <p>If you did not request to delete your account, please ignore this email and your account will remain active.</p>
                <p>For any further assistance, feel free to contact our support team at <a href="mailto:kshatriyakabawat@gmail.com">kshatriyakabawat@gmail.com</a>.</p>
                <br>
                <p>Thank you,<br>
                <strong>Kabawat Support Team</strong></p>
            </body>
        </html>
    `)
}

module.exports = { delete_profile_temp }
