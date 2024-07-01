const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function block_contact(req, res) {
    try {
        const contact_user = await userModal.findOne({ _id: req.body.contact }, 'email')
        if (!contact_user) {
            console.log('User not found');
            return;
        }
        req.body.user.blocked_contact.push(contact_user?._id)
        await req.body.user.save()
        res.status(200).json({
            status: true,
            message: 'Contact user successfully blocked',
        });
    } catch (error) {
        sendNotification(error, 'block_contact', { Headers: req?.headers, payload: req.body });
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}
module.exports = block_contact