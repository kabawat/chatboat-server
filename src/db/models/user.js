const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    phoneNumber: String,
    otp: String, // one time password for verification of the account
    isVerified: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        asset_id: String,
        public_id: String,
        secure_url: String
    },
    token: String,
    socketId: String

}, { timestamps: true })

const userModal = mongoose.model("User", userSchema)
module.exports = userModal;