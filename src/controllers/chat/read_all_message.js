const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function mark_read_all_message(req, res) {
    try {
        const chatID = req.body?.chat_id;
        const userID = req.body?.userID;

        const result = await chatModal.updateMany(
            { chat_id: chatID, mark_as_read: { $nin: [userID] } },
            { $push: { mark_as_read: userID } }
        );

        res.status(200).json({
            status: true,
        });
    } catch (error) {
        sendNotification(error, 'mark_read_all_message', req?.body);
        res.status(500).json({
            status: false,
            message: error?.message
        });
    }
}

module.exports = mark_read_all_message;
