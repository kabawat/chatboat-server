const bcrypt = require('bcrypt')
async function signup(req, res) {
    const { password, username, user } = req.body
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        user['password'] = hashedPwd
        user['username'] = username;
        user['isVerified'] = true
        let result = await user.save()
        res.status(200).json({
            message: "Sign up successful",
            status: true
        });
    } catch (error) {
        res.status(400).json({
            message: error?.message,
            status: false
        });
    }
}
module.exports = signup