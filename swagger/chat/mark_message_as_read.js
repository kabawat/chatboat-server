/**
 * @swagger
 * /mark-read-all-message:
 *   post:
 *     summary: Mark all messages as read
 *     description: Marks all messages in a chat as read for a specific user.
 *     tags:
 *       - Chat Message
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
 *               chatID:
 *                 type: string
 *                 description: The ID of the chat.
 *               userID:
 *                 type: string
 *                 description: The ID of the user.
 *     responses:
 *       '200':
 *         description: Success response
 *       '500':
 *         description: Internal server error
 */  