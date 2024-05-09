/**
 * @swagger
 * /api/profile/delete:
 *   post:
 *     summary: Delete user profile. (step one)
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
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: User profile deleted successfully.
 *       '500':
 *         description: Error occurred while deleting user profile.
 */
