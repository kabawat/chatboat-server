/**
 * @swagger
 * /api/chat/:
 *   post:
 *     summary: Get all messages.
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
 *               chat_id:
 *                 type: string
 *                 description: ID of the message sender.
 *     responses:
 *       '200':
 *         description: Messages fetched successfully.
 *       '500':
 *         description: Error occurred while fetching messages.
 */
