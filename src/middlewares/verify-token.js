const jwt = require('jsonwebtoken');
const userModal = require('#db/models/user');
const sendNotification = require('#root/src/web-hooks/slack');

// verify Verification token 
async function verifyVerificationToken(req, res, next) {
    try {
        const VerificationTokens = req.headers['x-verification-tokens'];
        if (VerificationTokens) {
            const verify = await jwt.verify(VerificationTokens, process.env.JWT_AUTH_SECRET);
            const user = await userModal.findOne({ email: verify.email, isVerified: false })
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
            const verify = await jwt.verify(auth_tokens, process.env.JWT_AUTH_SECRET);

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
    try {
        const access_tokens = req.headers['x-access-tokens']
        if (!access_tokens) {
            throw new Error('No Token Provided');
        }
        const verify = await jwt.verify(access_tokens, process.env.JWT_ACCESS_SECRET);

        const { _id, username, email } = verify
        const user = await userModal.findOne({ _id, username, email, isVerified: true, disabled: false })
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
module.exports = { verifyVerificationToken, verifyAuthToken, verifyAccessToken }