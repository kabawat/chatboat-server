const sendNotification = require('#root/src/web-hooks/slack');
const cloudinary = require('cloudinary').v2;
const SECRET = require('../config/env.config');
const path = require('path');
const os = require('os');
const fs = require('fs');

cloudinary.config({
    cloud_name: SECRET.CLOUD_NAME,
    api_key: SECRET.API_KEY,
    api_secret: SECRET.API_SECRET,
});

async function uploadImage(req, res, next) {
    try {
        if (req.body?.is_file == 0) {
            next()
        }
        else {
            if (!req.files?.file) {
                throw new Error('plz select your profile picture')
            }
            // Create a temporary file to store the Buffer data
            const file = req.files?.file;
            const tempFilePath = path.join(os.tmpdir(), `${new Date().getTime()}-profile.jpg`);
            fs.writeFileSync(tempFilePath, file.data);

            // Upload the temporary file to Cloudinary
            const templateResult = await cloudinary.uploader.upload(tempFilePath);
            // Remove the temporary file
            fs.unlinkSync(tempFilePath);
            req.body.file = {
                asset_id: templateResult?.asset_id,
                public_id: templateResult?.public_id,
                secure_url: templateResult?.secure_url
            }
            next()
        }

    } catch (error) {
        sendNotification(error, 'uploadImage', req?.body);
        res.status(500).json({
            status: false,
            error: error?.message,
        });
    }
}

module.exports = uploadImage;