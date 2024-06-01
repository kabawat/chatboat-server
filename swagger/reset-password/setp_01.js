/**
 * @swagger
 * /api/password/send-otp:
 *   post:
 *     tags: [ Reset-Password ]
 *     summary: Send OTP for password reset
 *     description: Send OTP to the provided email address for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user requesting password reset.
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request, missing email address
 *       409:
 *         description: Email does not exist or is not verified
 *       500:
 *         description: Internal server error
 */
