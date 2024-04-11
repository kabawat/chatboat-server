const userModal = require("#db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
const jwt = require('jsonwebtoken');

async function finishSignup(req, res) {
    const { user } = req.body;
    try {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_AUTH_SECRET);
        const dataSet = {
            token: token,
            isVerified: true
        };

        // If user uploads a profile picture, process it appropriately
        if (req.body?.is_file == 1) {
            // Extract information from the uploaded file
            dataSet['profilePicture'] = {
                asset_id: req.body.file.asset_id,
                public_id: req.body.file.public_id,
                secure_url: req.body.file.secure_url
            }
        }

        // Update user information in the database
        const updated = await userModal.updateOne({ _id: user?._id, isVerified: false }, { ...dataSet });

        // Send response to client
        res.json({
            message: "Welcome aboard! You're now part of our verified crew!",
            status: true,
            authToken: token
        });
    } catch (error) {
        console.error("Error in finishSignup:", error);
        sendNotification(error, 'finishSignup', req?.body);
         //Send error response to client
        res.status(400).json({
            message: "An error occurred during signup process.",
            status: false
        });
    }
}

module.exports = finishSignup;
