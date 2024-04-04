const jwt = require('jsonwebtoken');
const User = require('#db/models/user');

// verify Verification token 
async function verifyVerificationToken(req, res, next) {
    try {
        const VerificationTokens = req.headers['x-verification-tokens'];
        if (VerificationTokens) {
            const verify = await jwt.verify(VerificationTokens, process.env.JWT_SECRET);
            const user = await User.findOne({ email: verify.email, isVerified: false })
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
        return res.status(401).json({
            error: error?.message
        });
    }
}

// veirfy auth token 
async function verifyAuthToken(req, res, next) {
    try {
        const auth_tokens = req.headers['x-auth-tokens']
        if (auth_tokens) {
            const verify = await jwt.verify(auth_tokens, process.env.JWT_SECRET);
        }
        else {
            throw new Error('No Token Provided');
        }
        next();
    } catch (error) {
        return res.status(401).json({
            error: error?.message
        });
    }
}

// verify access token 
async function verifyAccessToken(req, res, next) {
    try {
        const access_tokens = req.headers['x-access-tokens']
        if (VerificationTokens) {
            const verify = await jwt.verify(VerificationTokens, process.env.JWT_SECRET);
        }
        else {
            throw new Error('No Token Provided');
        }
        next();
    } catch (error) {
        return res.status(401).json({
            error: error?.message
        });
    }
}
module.exports = { verifyVerificationToken, verifyAuthToken, verifyAccessToken }