const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_contact(req, res) {
    try {
        const mapping = await userModal.find({ isVerified: true }, 'about username, firstName, lastName profilePicture email')
        if (mapping) {
            res.status(200).json({
                data: mapping,
                message: "Successfully"
            })
        }
    } catch (error) {
        sendNotification(error, 'get_all_contact', { Headers: req?.headers, payload: req.body });
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}
module.exports = get_all_contact