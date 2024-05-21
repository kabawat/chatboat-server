const contactModal = require("#root/src/db/models/contact");
const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");

async function add_new_contact(req, res) {
    try {
        const userId = req?.body?.user?._id;
        const contactId = req?.body?.contact;

        if (!contactId) {
            return res.status(400).json({
                status: false,
                error: "Please provide contact"
            });
        }

        // Check if the contact already exists
        const existingContact = await contactModal.findOne({
            users: { $all: [userId, contactId] }
        });

        let contact_id = null
        if (existingContact) {
            contact_id = existingContact?._id
        } else {
            const contactData = new contactModal({
                users: [contactId, userId]
            });
            const contactSaved = await contactData.save();
            contact_id = contactSaved._id
        }
        // Update user's contact list if the user is verified
        const user = await userModal.findOne({ isVerified: true, _id: userId });
        if (user && !user.contacts.includes(contact_id)) {
            user.contacts.push(contact_id);
            await user.save();
        }

        res.status(200).json({
            message: "Contact added successfully",
            contact: existingContact
        });

    } catch (error) {
        sendNotification(error, 'add_new_contact', { Headers: req?.headers, payload: req.body });
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

module.exports = add_new_contact;
