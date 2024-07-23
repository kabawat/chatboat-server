// Import required modules
const { delete_profile_temp } = require('#root/src/helper/email/delete_profile_temp');
const otp_send_on_email = require('#root/src/utils/email/sendEmail');
const { generate_otp } = require('#root/src/helper/generate_otp');
const userModal = require('#root/src/db/models/user');
const SECRET = require('#root/src/config/env.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define an asynchronous function to delete a user profile
async function delete_profile(req, res) {
    try {
        // Destructure the request body to extract user data
        const { _id, email, username, password } = req.body?.user;

        // Check if the email provided in the request body matches the user's email
        if (email !== req?.body?.email) {
            // If not, throw an error indicating that the user does not have the authority to delete the account
            throw new Error("You do not have the authority to delete this account.");
        }

        // Compare the provided password with the user's stored password
        const verifyPwd = await bcrypt.compare(req?.body?.password, password);

        // If the passwords do not match, throw an error indicating invalid credentials
        if (!verifyPwd) {
            throw new Error("Invalid credentials. Please check your password and try again.");
        }

        // Send an OTP to the user's email address
        const subject = "Account Deletion Request - OTP Verification"
        const otp = generate_otp()
        const body = delete_profile_temp(req.body?.user?.firstName, otp)
        const receivers = [req?.body?.email]
        const email_res = await otp_send_on_email(receivers, subject, body);

        const hash_otp = await bcrypt.hash(otp, 10);

        // Update the user's OTP in the database
        const updated = await userModal.updateOne({ _id, email, username, isVerified: true }, { otp: hash_otp })
        // If the email was not sent successfully, throw an error with the message returned by the email function
        if (!email_res?.status) {
            throw new Error(email_res?.message);
        }

        // Generate a new JWT token for the user
        const token = await jwt.sign({ _id, email, username }, SECRET.JWT_ACCESS_SECRET, { expiresIn: '5m' });

        // Return a success response with the message and the new token
        res.status(200).json({
            message: email_res?.message,
            access_token: token,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

// Export the delete_profile function as a module
module.exports = delete_profile;