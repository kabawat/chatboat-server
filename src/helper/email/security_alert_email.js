function security_alert_email(user, ip_address, timestamp) {
    return (`
            <!DOCTYPE html>
            <html>
                <head>
                <meta charset="UTF-8">
                <title>Security Alert</title>
            </head>
            <body>
                <p>Dear ${user},</p>
                <p>We have detected a security event associated with your account on <strong>Kabawat</strong>.</p>
                <p>The following details were recorded:</p>
                <ul>
                    <li>IP Address: ${ip_address}</li>
                    <li>Timestamp: ${timestamp}</li>
                </ul>
                <p>If you did not initiate this action, we recommend taking the following steps:</p>
                <ol>
                    <li>Change your password immediately.</li>
                    <li>Review your account activity for any unauthorized access.</li>
                    <li>Contact our support team at <a href="mailto:kshatriyakabawat@gmail.com">kshatriyakabawat@gmail.com</a> for further assistance.</li>
                </ol>
                <p>Thank you for your attention to this matter.</p>
                <br>
                <p>Regards,<br>
                <strong>Kabawat Security Team</strong></p>
            </body>
            </html>
    `);
}

module.exports = { security_alert_email };
