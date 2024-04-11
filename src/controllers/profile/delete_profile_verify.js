const userModal = require('#root/src/db/models/user');
const sendNotification = require('#root/src/web-hooks/slack');
const bcrypt = require('bcrypt');
async function delete_profile_verify(req, res) {
    try {
        const { otp, email, username, _id } = req.body?.user
        if (req.body.email !== email) {
            throw new Error("You do not have the authority to delete this account.");
        }
        const verifyOTP = await bcrypt.compare(req.body.otp, otp);
        if (!verifyOTP) {
            throw new Error("The OTP you entered is invalid. Please try again.");
        }

        const deleted = await userModal.updateOne({ email, username, _id }, { disabled: true })
        // const 
        res.status(200).json({
            status: true,
            message: "Your account has been successfully disabled for one month. You can re-enable access within this period. After one month, your account will be permanently deleted."
        })
    } catch (error) {
        sendNotification(error, 'delete_profile_verify', req?.body);
        res.status(400).json({
            error: error?.message,
            status: true
        })
    }
}
module.exports = delete_profile_verify