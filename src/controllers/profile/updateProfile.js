const userModal = require("#root/src/db/models/user")
const jwt = require('jsonwebtoken')
async function update_profile(req, res) {
    try {
        const updateList = {}
        if (req.body?.username) updateList['username'] = req.body?.username
        if (req.body?.firstName) updateList['firstName'] = req.body?.firstName
        if (req.body?.lastName) updateList['lastName'] = req.body?.lastName
        if (req.body?.dateOfBirth) updateList['dateOfBirth'] = req.body?.dateOfBirth
        if (req.body?.phoneNumber) updateList['phoneNumber'] = req.body?.phoneNumber
        if (req.body?.socketId) updateList['socketId'] = req.body?.socketId
        if (req.body?.about) updateList['about'] = req.body?.about

        const updated = await userModal.updateOne({ _id: req.body.user?._id, isVerified: true }, updateList)
        res.status(200).json({
            "message": "Profile Update Successfully",
            "updated item": updateList
        })
    } catch (error) {
        if (error.code === 11000 && error.name === 'MongoServerError') {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            res.status(409).json({
                dev_message: `Duplicate key error: ${duplicateKey}`,
                error: `Oops! Looks like ${duplicateKey} '${Object.values(error.keyValue)[0]}' is already taken. Try another one!`
            });
        }
        else {
            res.status(409).json({
                dev_message: error.message,
                error: error.message
            });
        }
    }
}
module.exports = update_profile