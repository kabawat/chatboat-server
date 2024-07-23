const sendNotification = require('#root/src/web-hooks/slack');
const userModal = require('#db/models/user');
const SECRET = require('../config/env.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exclude = {
    // password: 0,
    token: 0,
    disabled: 0,
    socketId: 0,
    contacts: 0
}
// verify Verification token 
async function verifyVerificationToken(req, res, next) {
    const VerificationTokens = req.headers['x-verification-tokens'];
    try {
        if (VerificationTokens) {
            const verify = await jwt.verify(VerificationTokens, SECRET.JWT_AUTH_SECRET);
            const user = await userModal.findOne({ email: verify.email, isVerified: false }, exclude)
            if (user) {
                req.body.user = user
            } else {
                throw new Error("Invalid token! Please try again.");
            }
        }
        else {
            throw new Error('No Token Provided');
        }
        next();
    } catch (error) {
        sendNotification(error, 'verifyVerificationToken', { ...req?.body, VerificationTokens });
        return res.status(401).json({
            error: error?.message
        });
    }
}

// veirfy auth token 
async function verifyAuthToken(req, res, next) {
    const auth_tokens = req.headers['x-auth-tokens']
    try {
        if (auth_tokens) {
            const verify = await jwt.verify(auth_tokens, SECRET.JWT_AUTH_SECRET);

            if (verify?.id) {
                const user = await userModal.findOne({ _id: verify?.id, isVerified: true }, exclude)
                req.body.user = user
            } else {
                throw new Error("Invalid token! Please login first");
            }
        }
        else {
            throw new Error('No Token Provided');
        }
        next();
    } catch (error) {
        sendNotification(error, 'verifyAuthToken', { ...req?.body, auth_tokens });
        return res.status(401).json({
            error: error?.message
        });
    }
}

// veirfy  token 
async function verifyToken(req, res, next) {
    const auth_tokens = req.headers['x-auth-tokens']
    try {
        if (auth_tokens) {
            const verify = await jwt.verify(auth_tokens, SECRET.JWT_AUTH_SECRET);

            if (verify?.id) {
                const user = await userModal.findOne({ _id: verify?.id, isVerified: true })
                req.body.user = user
            } else {
                throw new Error("Invalid token! Please login first");
            }
        }
        else {
            throw new Error('No Token Provided');
        }
        next();
    } catch (error) {
        sendNotification(error, 'verifyAuthToken', { ...req?.body, auth_tokens });
        return res.status(401).json({
            error: error?.message
        });
    }
}

// verify access token 
async function verifyAccessToken(req, res, next) {
    const access_tokens = req.headers['x-access-tokens']
    try {
        if (!access_tokens) {
            throw new Error('No Token Provided');
        }
        const verify = await jwt.verify(access_tokens, SECRET.JWT_ACCESS_SECRET);

        const { _id, username, email } = verify
        const user = await userModal.findOne({ _id, username, email, isVerified: true, disabled: false }, { ...exclude, otp: 0 })
        if (!user) {
            throw new Error("Invalid token! Please login first");
        }
        req.body.user = user
        next();
    } catch (error) {
        sendNotification(error, 'verifyAccessToken', { ...req?.body, access_tokens });
        return res.status(401).json({
            error: error?.message
        });
    }
}

// verify access token for password 
async function verifyAccessPasswordToken(req, res, next) {
    const access_tokens = req.headers['x-access-token']
    try {
        if (!access_tokens) {
            throw new Error('No Token Provided');
        }
        const verify = await jwt.verify(access_tokens, SECRET.JWT_ACCESS_PASSWORD);
        const { _id, email, otp } = verify
        const exists = await userModal.findOne({ _id, email, isVerified: true, disabled: false })
        if (!exists) {
            throw new Error("Invalid token!");
        }

        const verifyOTP = await bcrypt.compare(otp, exists?.otp);
        if (!verifyOTP) {
            return res.status(400).json({
                status: false,
                message: "Oops! The OTP you entered is incorrect. Please double-check and try again."
            });
        }

        req.body.user = {
            _id, email, otp
        }
        next();
    } catch (error) {
        sendNotification(error, 'verifyAccessPasswordToken', { ...req?.body, ...req.headers, access_tokens });
        return res.status(401).json({
            error: error?.message
        });
    }
}
module.exports = { verifyVerificationToken, verifyAuthToken, verifyAccessToken, verifyAccessPasswordToken, verifyToken }