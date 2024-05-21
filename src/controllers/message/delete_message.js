const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");
const { ObjectId } = require('mongoose').Types;

async function delete_message(req, res) {
    try {
        if (req.body.chat_id) {
            await chatModal.updateMany(
                { chat_id: req.body.chat_id },
                { $addToSet: { delete_from: req.body.user._id } }
            );
            return res.status(200).json({
                message: "clear chat successfully",
                status: true
            });
        } else {
            // msg_ids : message's _id
            // receiver_id : receiver user's _id
            const { msg_ids, receiver_id } = req.body;
            if (!msg_ids || !req.body.user._id) {
                return res.status(400).json({
                    message: "User information is missing in the request.",
                    status: false
                });
            }

            // Convert user._id and receiver_id to ObjectId
            const userId = new ObjectId(req.body.user._id);
            const receiverId = receiver_id ? new ObjectId(receiver_id) : null;

            // Filter out any invalid ObjectId values from msg_ids
            const validMsgIds = msg_ids.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));

            if (receiverId == null) {
                await chatModal.updateMany(
                    { _id: { $in: validMsgIds } },
                    { $addToSet: { delete_from: userId } }
                );
            } else {
                await chatModal.updateMany(
                    { _id: { $in: validMsgIds }, sender: userId },
                    { $addToSet: { delete_from: { $each: [userId, receiverId] } } }
                );
            }

            res.status(200).json({
                message: "message deleted successfully",
                status: true
            });
        }

    } catch (error) {
        sendNotification(error, "delete_message", req.body);
        res.status(500).json({
            message: error?.message,
        });
    }
}

module.exports = delete_message;
