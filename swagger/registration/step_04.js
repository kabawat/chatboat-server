/**
 * @swagger
 * components:
 *   schemas:
 *     UploadImageRequest:
 *       type: object
 *       properties:
 *         is_file:
 *           type: integer
 *           description: Indicator whether a file is being uploaded or not. 0 for no file, 1 for file upload.
 *         file:
 *           type: string
 *           format: binary
 *           description: The file to be uploaded.
 *     UploadImageResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Indicates whether the upload was successful or not.
 *         error:
 *           type: string
 *           description: Error message in case of failure.
 *         file:
 *           type: object
 *           properties:
 *             asset_id:
 *               type: string
 *               description: Asset ID of the uploaded file.
 *             public_id:
 *               type: string
 *               description: Public ID of the uploaded file.
 *             secure_url:
 *               type: string
 *               description: Secure URL of the uploaded file.
 */

/**
 * @swagger
 * /api/auth/finish-signup:
 *   post:
 *     summary: finish Registration (registration step 4th).
 *     tags: [ Registration ]
 *     parameters:
 *       - in: header
 *         name: x-verification-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               is_file:
 *                 type: integer
 *                 description: Indicator whether a file is being uploaded or not. 0 for no file, 1 for file upload.
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded.
 *     responses:
 *       '200':
 *         description: Image uploaded successfully.
 *       '500':
 *         description: Failed to upload image.
 */
