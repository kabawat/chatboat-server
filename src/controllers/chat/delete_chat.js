const chatModal = require("#root/src/db/models/chat")
const contactModal = require("#root/src/db/models/contact")
const userModal = require("#root/src/db/models/user")
const sendNotification = require("#root/src/web-hooks/slack")

async function delete_chat(req, res) {
    try {
        await userModal.updateOne(
            { _id: req.body?.user?._id },
            { $pull: { contacts: req.body.chat_id } }
        );

        // Delete the chat entries from chatModal
        await chatModal.updateMany(
            { chat_id: req.body.chat_id },
            { $addToSet: { delete_from: req.body.user._id } }
        )

        res.status(200).json({
            message: "Chat deleted from user contacts and chat entries successfully",
            status: true
        })
    } catch (error) {
        sendNotification(error, "delete_chat", req.body)
        res.status(500).json({
            message: error?.message,
        })
    }
}

module.exports = delete_chat
