const fetch = require("node-fetch");

// Color codes for different types of logs
const colors = {
    error: "#FF0000", // Red
    info: "#0000FF", // Blue
    success: "#008000", // Green
    warning: "#FFA500" // Orange
};

function sendNotification(error, functionName, payload, type = 'error') {
    const color = colors[type] || colors.error; // Default to error color if type is not recognized
    var message = "";
    if (error != null && error != undefined) {
        if (typeof (error) === 'string') {
            message += "```\n" + error + "\n```";
        } else {
            message += "```\n" + error.message + "\n```";
            message += "\n*Traceback* : \n";
            message += "```\n" + error.stack + "\n```";
        }
    }
    const formattedMessage = {
        attachments: [
            {
                title: message,
                color: color,
                fields: [
                    {
                        title: "Message/Error",
                        value: message,
                        short: false
                    },
                    {
                        title: "Function Name",
                        value: "```\n" + functionName + "\n```",
                        short: false
                    },
                    {
                        title: "Payload",
                        value: "```\n" + JSON.stringify(payload, null, 2) + "\n```",
                        short: false
                    }
                ]
            }
        ]
    };

    const headers = { "Content-Type": "application/json" };

    fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formattedMessage),
    }).then((response) => {
        if (!response.ok) {
            console.error(`Failed to send ${type} notification. Status code: ${response.status}`);
        } else {
            console.log(`${type} notification sent successfully.`);
        }
    }).catch((error) => {
        console.error(`Error sending ${type} notification:`, error);
    });
}

module.exports = sendNotification;