const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
async function get_profile(req, res) {
    try {
        res.status(200).json({
            data: req.body.user
        })
    } catch (error) {
        // Sending a notification to Slack in case of an error
        sendNotification(error, 'get_profile', req?.body);
        res.status(409).json({
            error: error.message
        })
    }
}

// Exporting the function as a module
module.exports = get_profile;