const userModal = require("#root/src/db/models/user");
const sendNotification = require("#root/src/web-hooks/slack");
async function get_profile(req, res) {
    try {
        const exclude = { password: 0, token: 0, otp: 0, isVerified: 0, disabled: 0, socketId: 0 }
        // Querying the database for the current user's profile and contacts
        const userRes = await userModal.findOne({ _id: req.body.user?._id }, exclude)
            .populate({
                path: 'contacts',
                select: 'users',
                populate: {
                    path: 'users',
                    model: 'User',
                    select: 'firstName lastName email about'
                }
            });

        // Checking if the user was found
        if (userRes) {
            // Mapping the contacts to a new array of contact objects
            const contactList = userRes.contacts?.map(it => {
                const contact = it?.users?.filter(user => `${req.body.user?._id}` != `${user?._id}`)[0]
                return {
                    contact_id: it?._id, // contact ref
                    user_id: contact?._id, // user ref
                    email: contact.email,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    about: contact.about,
                }
            })

            // Adding the contact list to the user object
            const data = {
                ...userRes._doc,
                contacts: contactList
            }
            res.status(200).json({
                data: data
            })
        }
    } catch (error) {
        // Sending a notification to Slack in case of an error
        sendNotification(error, 'get_profile', req?.body);
        res.status(409).json({
            error: error.message
        })
    }
}

// Exporting the function as a module
module.exports = get_profile;