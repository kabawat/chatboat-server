/**
 * @swagger
 * /api/password/change-password:
 *   put:
 *     tags: [ Reset-Password ]
 *     summary: Change user password
 *     description: Change the password for the authenticated user.
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
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request, missing password or user details
 *       401:
 *         description: Unauthorized, OTP provided is incorrect
 *       500:
 *         description: Internal server error
 */
