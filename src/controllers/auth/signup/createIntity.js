const jwt = require("jsonwebtoken")
const User = require("#db/models/user");
const { extractUsername } = require("#utils/extract_username");


async function createInity(req, res) {
    try {
        const user = new User({
            username: extractUsername(req.body.email),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otp: req.body.otp,
            password: req.body.otp
        });
        const saved = await user.save()

        if (saved) {
            const token = jwt.sign({ email: saved?.email }, process.env.JWT_SECRET)
            res.status(200).json({
                message: "Sign up successful",
                varifyToken: token
            });
        } else {
            throw new Error("Failed to save the user in database.")
        }

    } catch (error) {
        res.status(500).json({
            message: "Sign up failed",
            error: error?.message
        });
    }
}
module.exports = createInity