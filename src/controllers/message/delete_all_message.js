const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function delete_all_message(req, res) {
    try {
        // Updating the chatModal to add the current user to the delete_from set for the chat with the provided chat_id
        await chatModal.updateMany(
            { chat_id: req.body.chat_id }, // Filter to update only the chat with the provided chat_id
            { $addToSet: { delete_from: req.body.user._id } } // Update operation to add the current user to the delete_from set
        );
        res.status(200).json({
            message: "clear chat successfully",
            status: true
        });
    } catch (error) {
        sendNotification(error, "delete_all_message", req.body);
        res.status(500).json({
            message: error?.message,
        });
    }
}

module.exports = delete_all_message;