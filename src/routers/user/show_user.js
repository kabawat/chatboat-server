const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_user(req, res) {
    try {
        // Querying the database for verified users not in the current user's contacts list
        let contactList = []
        req.body?.user?.contacts?.map(contacts => {
            contactList.push(contacts?.users[0])
            contactList.push(contacts?.users[1])
        });

        const users = await userModal.find({ isVerified: true, _id: { $nin: contactList } }, 'firstName lastName username phoneNumber about profilePicture')

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