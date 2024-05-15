const contactModal = require("#root/src/db/models/contact");
const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function add_new_contact(req, res) {
    try {
        if (!req?.body?.contact) {
            return res.status(400).json({
                status: false,
                error: "Please provide contact"
            });
        }
        const contactData = contactModal({
            users: [req?.body?.contact, req?.body?.user?._id]
        })
        const contactSaved = await contactData.save()

        const mapping = await userModal.findOne({ isVerified: true, _id: req?.body?.user?._id })

        if (!mapping.contacts.includes(contactSaved?._id)) {
            // If it doesn't exist, push it into the array
            mapping.contacts.push(contactSaved?._id);
        }

        // Save the updated mapping document
        const userUpdated = await mapping.save()

        if (mapping) {
            res.status(200).json({
                message: "Contact add successfully"
            })
        }
    } catch (error) {
        sendNotification(error, 'add_new_contact', { Headers: req?.headers, payload: req.body });
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}
module.exports = add_new_contact