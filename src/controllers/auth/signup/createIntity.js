const jwt = require("jsonwebtoken")
const userModal = require("#db/models/user");
const { extractUsername } = require("#utils/extract_username");


async function createInity(req, res) {
    try {
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET)
        const user = new userModal({
            username: extractUsername(req.body.email),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otp: req.body.otp,
            password: req.body.otp,
            token: token
        });
        const saved = await user.save()

        if (saved) {
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