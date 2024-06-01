/**
 * @swagger
 * /api/password/verify-otp:
 *   post:
 *     tags: [ Reset-Password ]
 *     summary: Verify OTP for password reset
 *     description: Verify the OTP provided by the user for password reset.
 *     parameters:
 *       - in: header
 *         name: x-access-tokens
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
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               otp:
 *                 type: string
 *                 description: The OTP provided by the user.
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Bad request, missing OTP or email
 *       401:
 *         description: Unauthorized, email provided does not match records
 *       500:
 *         description: Internal server error
 */
