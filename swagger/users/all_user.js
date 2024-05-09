/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users.
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     responses:
 *       '200':
 *         description: Users fetched successfully.
 *       '500':
 *         description: Error occurred while fetching users.
 */
