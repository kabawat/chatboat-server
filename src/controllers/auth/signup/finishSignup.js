const userModal = require("#db/models/user");
const jwt = require('jsonwebtoken')
async function finishSignup(req, res) {
    const { user } = req.body
    user['isVerified'] = true
    try {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const dataSet = {
            token: token
        }
        if (req.body.profile_pic) {
            dataSet['profilePicture'] = req.body.profile_pic;
        } else {
            dataSet['profilePicture'] = 'https://res.cloudinary.com/dkajmiasf/image/upload/v1712255876/zhc3ijrxyrmlbczalf5h.png'
        }
        const updated = await userModal.updateOne({ _id: user?._id, isVerified: true }, { dataSet })
        res.status(200).json({
            message: "Welcome aboard! You're now part of our verified crew!",
            status: true,
            authToken: token
        });
    } catch (error) {
        res.status(400).json({
            message: error?.message,
            status: false
        });
    }
}
module.exports = finishSignup