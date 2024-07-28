const chatModal = require("#root/src/db/models/chat");
const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

// Async function to get all chats for a user
async function get_all_chat(req, res) {
    try {
        // Find the user and populate their contacts with user details
        const user_mapping = await userModal.findOne({ _id: req.body.user?._id }, 'contacts')
            .populate({
                path: 'contacts',
                select: 'users createdAt blocked_by',
                populate: {
                    path: 'users',
                    model: 'User',
                    select: 'firstName lastName email about profilePicture isOnline lastSeen',
                    match: { _id: { $ne: req.body.user?._id } } // Exclude the user with the specified ID
                }
            });

        // Initialize an empty array to store contact IDs
        let contact_ids_List = []
        // Map over the contacts array and extract the contact IDs
        // For each contact, extract the user details (email, firstName, lastName, about, _id) and the chat ID
        const constact_list = user_mapping?.contacts.map((it_contact) => {
            const blockList = it_contact.blocked_by.map(id => id.toString())
            contact_ids_List.push(`${it_contact?._id}`)
            const { email, firstName, lastName, about, _id, profilePicture, isOnline, lastSeen } = it_contact?.users[0]
            return {
                email, firstName, lastName, about, _id, isOnline, lastSeen,
                chat_id: it_contact?._id,
                createdAt: it_contact?.createdAt,
                picture: profilePicture?.secure_url || null,
                is_block: blockList.length ? true : false, // Check if the contact is blocked
                blocked_by: blockList
            }
        });

        let total = 0
        // Use Promise.all to fetch the latest chat for each contact ID
        const chat_list = await Promise.all(contact_ids_List.map(async chat_id => {
            const latestChat = await chatModal.findOne({
                chat_id,
                delete_from: { $ne: req.body.user?._id } // Exclude messages where delete_from contains the user's ID 
            }).sort({ _id: -1 }).limit(1);

            const totalUnRead = await chatModal.countDocuments({
                chat_id,
                delete_from: { $ne: req.body.user._id }, // Same condition for counting
                mark_as_read: { $ne: req.body.user._id } // Same condition for counting
            });
            total = totalUnRead
            if (latestChat) {
                const { sender, receiver, chat_id, mark_as_read, text, createdAt, _id } = latestChat;
                return { sender, receiver, chat_id, mark_as_read, text, createdAt, _id, totalUnRead };
            } else {
                return {};
            }
        }));



        // Combine the contact list and chat list, adding the last chat for each contact
        const finalContactList = constact_list?.map((current_contact) => {
            let isExistsChat = chat_list.find(item => `${item.chat_id}` == `${current_contact.chat_id}`)
            return {
                ...current_contact,
                last_chat: isExistsChat,
                totalUnRead: total
            }
        });

        // Sort the final contact list by the last chat's createdAt date
        const sort_data = finalContactList?.sort((a, b) => {
            return new Date(getCreatedAt(b)).getTime() - new Date(getCreatedAt(a)).getTime();
        });

        res.status(200).json({
            status: true,
            data: sort_data,
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

// Function to get the createdAt date for an entry
function getCreatedAt(entry) {
    if (entry.last_chat != undefined) {
        return entry.last_chat.createdAt;
    }
    return entry.createdAt;
}