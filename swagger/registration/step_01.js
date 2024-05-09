/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     tags: [Registration]
 *     summary: Send OTP on email (registration step 1st)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *     responses:
 *       '200':
 *         description: Success response.
 *       '400':
 *         description: Bad request.
 *       '500':
 *         description: Internal server error.
 */