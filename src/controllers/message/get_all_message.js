const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_message(req, res) {
    try {
        const { chat_id, page, limit = 10, user } = req.body; // Extract user from the request body
        const limitNum = parseInt(limit, 10);
        const pageNum = parseInt(page, 10);

        // Calculate the starting index of the documents to fetch
        const skip = (pageNum - 1) * limitNum;

        // Fetch the messages with pagination and exclude messages with the user in delete_from
        const mapping = await chatModal.find({
            chat_id,
            delete_from: { $ne: user._id }, // Exclude messages where delete_from contains the user's ID
            mark_as_read: { $in: user._id } // Include messages where mark_as_read contains the user's ID
        }).skip(skip).limit(limitNum).sort({ createdAt: -1 });

        // Get the total count of documents
        const totalMessages = await chatModal.countDocuments({
            chat_id,
            delete_from: { $ne: user._id } // Same condition for counting
        });

        res.status(200).json({
            status: true,
            data: mapping.reverse(),
            page: pageNum + 1,
            limit: limitNum,
            totalPages: Math.ceil(totalMessages / limitNum),
            totalMessages
        });
    } catch (error) {
        sendNotification(error, 'get_all_message', req?.body);
        res.status(500).json({
            status: false,
            message: error?.message
        });
    }
}

module.exports = get_all_message;
