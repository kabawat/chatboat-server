const jwt = require("jsonwebtoken");
const userModal = require("#db/models/user");
const { extractUsername } = require("#utils/extract_username");
const bcrypt = require('bcrypt')

// This function creates a new user account with the provided information.
// It first checks if the user already exists, and if so, updates their information if they haven't verified their email yet.
// If the user doesn't exist, it creates a new user with the provided information.
async function createInity(req, res) {
    try {
        // Generate a JWT token for the user's email
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

        // Check if the user already exists in the database
        const userExists = await userModal.findOne({ email: req.body.email });

        // If the user exists and hasn't verified their email yet
        if (userExists && !userExists?.isVerified) {
            // Update the user's information with the provided data
            userExists['firstName'] = req.body.firstName;
            userExists['lastName'] = req.body.lastName;
            userExists['otp'] = req.body.otp;
            userExists['password'] = await bcrypt.hash(req.body.otp, 10);
            userExists['token'] = token;

            // Save the updated user information
            const newUser = await userExists.save();
            if (!newUser) {
                throw new Error("Oops! Save error. Retry with a smile, please!");
            }
        } else if (userExists) {
            // If the user already exists and has verified their email, throw an error
            throw new Error('Oops! Looks like this email is already taken. Try another one!');
        } else {
            // If the user doesn't exist, create a new user with the provided information
            const user = new userModal({
                username: extractUsername(req.body.email),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                otp: req.body.otp,
                password: await bcrypt.hash(req.body.otp, 10),
                token: token
            });

            // Save the new user information
            const saved = await user.save();
            if (!saved) {
                throw new Error("Oops! Save error. Retry with a smile, please!");
            }
        }

        // Send a response to the user with the JWT token and a success message
        res.status(200).json({
            message: "Signed up! Check email for the secret code. Enjoy!",
            varifyToken: token
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

module.exports = createInity;