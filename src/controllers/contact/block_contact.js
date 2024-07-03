const contactModal = require("#root/src/db/models/contact");
const sendNotification = require("#root/src/web-hooks/slack");

async function block_contact(req, res) {
    try {
        const res_contact = await contactModal.findOne({ _id: req.body.chat_id })
        if (!res_contact) {
            console.log('User not found');
            return;
        }
        if (req.body.block) {
            res_contact.blocked_by.push(req.body.user?._id)
        } else {
            res_contact.blocked_by = res_contact.blocked_by.filter(id => `${id}` != `${req.body.user?._id}`)
        }
        await res_contact.save()
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