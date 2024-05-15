const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_message(req, res) {
    try {
        const { sender } = req.body
        const mapping = await chatModal.find({ chat_id: req.body?.chat_id })
        res.status(200).json({
            status: true,
            data: mapping
        })
    } catch (error) {
        sendNotification(error, 'get_all_message', req?.body);
        res.status(500).json({
            status: false,
            message: error?.message
        })
    }
}
module.exports = get_all_message