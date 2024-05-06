const sendNotification = require('#root/src/web-hooks/slack');
const bcrypt = require('bcrypt')
async function signup(req, res) {
    const { password, username, user } = req.body
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        user['password'] = hashedPwd
        user['username'] = username;
        let result = await user.save()
        res.status(200).json({
            message: "Sign up successful",
            status: true
        });
    } catch (error) {
        sendNotification(error, 'signup', req?.body);
        let message = ""
        if (error?.code == 11000) {
            message = `username ${error?.keyValue['username']} alreday exists`
        }
        res.status(400).json({
            message: message ? message : error?.message,
            status: false
        });
    }
}
module.exports = signup