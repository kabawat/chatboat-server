/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile information.
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
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
 *               username:
 *                 type: string
 *                 description: New username for the user.
 *               firstName:
 *                 type: string
 *                 description: New first name for the user.
 *               lastName:
 *                 type: string
 *                 description: New last name for the user.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: New date of birth for the user.
 *               phoneNumber:
 *                 type: string
 *                 description: New phone number for the user.
 *               socketId:
 *                 type: string
 *                 description: New socket ID for the user.
 *               about:
 *                 type: string
 *                 description: New description about the user.
 *     responses:
 *       '200':
 *         description: Profile updated successfully.
 *       '409':
 *         description: Error occurred while updating user profile information.
 *       '500':
 *         description: Server Error occurred.
 */
