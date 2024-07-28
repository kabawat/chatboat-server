const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function mark_read_all_message(req, res) {
    try {
        const chatID = req.body?.chat_id;
        const userID = req.body?.user?._id;
        if (req.body.only_read) {
            await chatModal.updateMany(
                { chat_id: chatID, mark_as_read: { $nin: [userID] } },
                { $push: { mark_as_read: userID } }
            );

            res.status(200).json({
                status: true,
            });
        } else {
            const mapping = await chatModal.find({
                chat_id: chatID,
                delete_from: { $ne: userID }, // Exclude messages where delete_from contains the user's ID
                mark_as_read: { $ne: userID } // Exclude messages where mark_as_read contains the user's ID
            }).sort({ createdAt: -1 });
            // Update documents where userID is not in the mark_as_read array
            await chatModal.updateMany(
                { chat_id: chatID, mark_as_read: { $nin: [userID] } },
                { $push: { mark_as_read: userID } }
            );
            res.status(200).json({
                status: true,
                data: mapping.reverse(),
            });
        }

    } catch (error) {
        sendNotification(error, 'mark_read_all_message', req?.body);
        res.status(500).json({
            status: false,
            message: error?.message
        });
    }
}

module.exports = mark_read_all_message;
