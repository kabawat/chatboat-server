/**
 * @swagger
 * /api/message/:
 *   delete:
 *     summary: Delete chat messages
 *     tags:
 *       - Chat Message
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     description: Endpoint to delete chat messages by chat_id or message ids
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               chat_id:
 *                 type: string
 *                 description: ID of the chat
 *               msg_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs of the messages to delete
 *               receiver_id:
 *                 type: string
 *                 description: ID of the receiver user
 *     responses:
 *       200:
 *         description: Chat messages deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */