/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify user's email using OTP (registration step 2nd)
 *     tags: [ Registration ]
 *     description: Verify the user's email by comparing the OTP provided with the OTP stored in the database.
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: The OTP entered by the user
 *     responses:
 *       '200':
 *         description: Successfully verified email
 *       '400':
 *         description: Invalid OTP
 */