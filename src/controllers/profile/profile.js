const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
async function get_profile(req, res) {
    try {
        const userRes = await userModal.findOne({ _id: req.body.user?._id }, 'profilePicture username email firstName lastName createdAt about phoneNumber contacts').populate({
            path: 'contacts',
            model: 'User',
            select: 'username email firstName lastName about'
        })
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
