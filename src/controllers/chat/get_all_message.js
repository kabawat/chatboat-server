const chatModal = require("#root/src/db/models/chat");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_message(req, res) {
    try {
        const { sender, chat_id, page, limit = 10 } = req.body;
        const limitNum = parseInt(limit, 10);
        const pageNum = parseInt(page, 10);

        // Calculate the starting index of the documents to fetch
        const skip = (pageNum - 1) * limitNum;

        // Fetch the messages with pagination
        const mapping = await chatModal.find({ chat_id }).skip(skip).limit(limitNum).sort({ createdAt: -1 });

        // Get the total count of documents
        const totalMessages = await chatModal.countDocuments({ chat_id });
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
