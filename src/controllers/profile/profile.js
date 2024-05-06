const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
async function get_profile(req, res) {
    try {
        const userRes = await userModal.findOne({ _id: req.body.user?._id }).populate({
            path: 'contacts',
            model: 'User',
            select: 'username email firstName lastName about'
        })
        // Check if password property exists before deleting
        if (userRes?.hasOwnProperty('password')) {
            delete userRes?._doc.password
            delete userRes?._doc.token
        }
        res.status(200).json({
            data: userRes
        })
    } catch (error) {
        sendNotification(error, 'get_profile', req?.body);
        res.status(409).json({
            error: error.message
        })
    }
}

module.exports = get_profile
