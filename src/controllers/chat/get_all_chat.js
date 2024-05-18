const chatModal = require("#root/src/db/models/chat");
const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_chat(req, res) {
    try {
        const user_mapping = await userModal.findOne({ _id: req.body.user?._id }, 'contacts')
            .populate({
                path: 'contacts',
                select: 'users',
                populate: {
                    path: 'users',
                    model: 'User',
                    select: 'firstName lastName email about',
                    match: { _id: { $ne: req.body.user?._id } } // Exclude the user with the specified ID
                }
            });

        let contact_ids_List = []
        /**
         * Map over the contacts array and extract the contact IDs.
         * For each contact, extract the user details (email, firstName, lastName, about, _id) and the chat ID.
         */
        const constact_list = user_mapping?.contacts.map((it_contact) => {
            contact_ids_List.push(`${it_contact?._id}`)
            const { email, firstName, lastName, about, _id, } = it_contact?.users[0]
            return { email, firstName, lastName, about, _id, chat_id: it_contact?._id }
        });

        /**
         * For each contact ID, find the latest chat document in the database.
         * Sort the chat documents by _id in descending order and limit to the latest one.
         */
        const chat_list = await Promise.all(contact_ids_List.map(async chat_id => {
            const latestChat = await chatModal.findOne({ chat_id }).sort({ _id: -1 }).limit(1);
            if (latestChat) {
                const { sender, receiver, chat_id, mark_as_read, text, createdAt } = latestChat
                return { sender, receiver, chat_id, mark_as_read, text, createdAt }
            } else {
                return {}
            }
        }));

        /**
         * Map over the contact list and add the latest chat details for each contact.
         * Check if a chat exists for each contact and add it to the contact object.
         */
        const finalContactList = constact_list?.map((current_contact) => {
            let isExistsChat = chat_list.find(item => `${item.chat_id}` == `${current_contact.chat_id}`)
            return {
                ...current_contact,
                last_chat: isExistsChat
            }
        });

        // Separate the entries with and without 'last_chat'
        const withLastChat = finalContactList.filter(item => item.last_chat && item.last_chat.createdAt);
        const withoutLastChat = finalContactList.filter(item => !(item.last_chat && item.last_chat.createdAt));

        // Sort the entries with 'last_chat' by 'createdAt'
        withLastChat.sort((a, b) => new Date(b.last_chat.createdAt) - new Date(a.last_chat.createdAt));

        // Combine the sorted entries with 'last_chat' and those without 'last_chat'
        const sortedData = [...withLastChat, ...withoutLastChat];
        res.status(200).json({
            status: true,
            data: sortedData,
        })
    } catch (error) {
        sendNotification(error, 'get_all_chat', req?.body);
        res.status(500).json({
            status: false,
            data: error?.message
        })
    }
}
module.exports = get_all_chat