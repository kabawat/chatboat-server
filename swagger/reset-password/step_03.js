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
 *       - in: header
 *         name: x-forwarded-for
 *         required: true
 *         schema:
 *           type: string
 *           default: 127.0.0.1
 *         description: The IP address of the client
 *       - in: header
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *           default: 26.9647358
 *         description: The latitude coordinate
 *       - in: header
 *         name: lon
 *         required: true
 *         schema:
 *           type: string
 *           default: 75.7551959
 *         description: The longitude coordinate
 *       - in: header
 *         name: timestamp
 *         schema:
 *           type: string
 *           format: date-time
 *           default: '2024-06-01T00:00:00Z'
 *         description: The current date and time
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
