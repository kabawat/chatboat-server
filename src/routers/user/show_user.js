const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_user(req, res) {
    try {
        // Querying the database for verified users not in the current user's contacts list
        const user_mapping = await userModal.findOne({ isVerified: true, _id: req.body?.user?._id }, 'contacts').populate('contacts')
        let contactList = [req.body?.user?._id]
        user_mapping?.contacts?.map(contacts => {
            contactList.push(contacts?.users[0])
            contactList.push(contacts?.users[1])
        });

        let users = []
        if (req.query.search) {
            // Build the search criteria
            let criteria = [];

            if (req.query.search) {
                const regex = new RegExp(req.query.search, 'i'); // 'i' makes it case-insensitive
                criteria.push({ firstName: regex });
                criteria.push({ lastName: regex });
                criteria.push({ email: regex });
                criteria.push({ username: regex });
            }
            users = await userModal.find({ isVerified: true, _id: { $nin: contactList }, $or: criteria }, 'firstName lastName username phoneNumber about profilePicture')
        } else {
            users = await userModal.find({ isVerified: true, _id: { $nin: contactList } }, 'firstName lastName username phoneNumber about profilePicture')
        }

        if (users) {
            res.status(200).json({
                data: users,
                message: "User fetched successfully"
            })
        }
    } catch (error) {
        sendNotification(error, 'get_all_user', req?.headers);
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}
module.exports = get_all_user