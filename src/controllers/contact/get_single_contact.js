const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
async function get_single_contact(req, res) {

    try {
        const userRes = await userModal.findOne({ _id: req?.params?.contact }, 'username email firstName lastName phoneNumber about profilePicture')
        res.status(200).json({
            data: userRes
        })
    } catch (error) {
        sendNotification(error, 'get_single_contact', req?.body);
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = get_single_contact
