const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function get_all_user(req, res) {
    console.log("req : ", req.body?.user?.contacts)
    try {
        const users = await userModal.find({ isVerified: true, _id: { $nin: req.body?.user?.contacts } }, 'firstName lastName username phoneNumber about profilePicture')
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