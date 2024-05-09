/**
 * @swagger
 * /api/profile/delete:
 *   put:
 *     summary: Verify and delete user profile.  (step two)
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: x-access-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: To authenticate the request, please use the verification token. Follow the instructions in step one to obtain the access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *               otp:
 *                 type: string
 *                 description: One-time password (OTP) received by the user.
 *     responses:
 *       '200':
 *         description: User profile successfully disabled.
 *       '400':
 *         description: Error occurred while verifying and deleting user profile.
 */
