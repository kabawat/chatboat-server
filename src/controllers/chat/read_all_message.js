const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function mark_read_all_message(req, res) {
    try {
        // Extract chatID and userID from the request body
        const { chatID, userID } = req.body

        // Update documents where userID is not in the mark_as_read array
        const result = await chatModal.updateMany(
            { chat_id: chatID, mark_as_read: { $nin: [userID] } },
            { $push: { mark_as_read: userID } }
        );

        res.status(200).json({
            status: true,
            data: result // Response containing the updated documents
        });
    } catch (error) {
        // Handle error and send notification
        sendNotification(error, 'mark_read_all_message', req?.body);
        res.status(500).json({
            status: false,
            message: error?.message
        });
    }
}

module.exports = mark_read_all_message;
