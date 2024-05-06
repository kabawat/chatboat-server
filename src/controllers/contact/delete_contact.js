const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function delete_contact(req, res) {
    try {
        if (!req?.params?.contact) {
            return res.status(400).json({
                status: false,
                error: "Please provide contact"
            });
        }
        const mapping = await userModal.findOne({ isVerified: true, _id: req?.body?.user?._id })
        mapping.contacts = mapping.contacts?.filter(item => `${item}` != `${req?.params?.contact}`)
        await mapping.save()
        if (mapping) {
            res.status(200).json({
                message: "Contact Delete Successfully"
            })
        }
    } catch (error) {
        sendNotification(error, 'delete_contact', { Headers: req?.headers, payload: req.body });
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}
module.exports = delete_contact