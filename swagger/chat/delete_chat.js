/**
 * @swagger
 * /api/chat/:
 *   delete:
 *     summary: Delete chat for a user
 *     description: Deletes a chat from user contacts and updates chat entries.
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60b8a4d44f1a2c001cb3e1c8"
 *               chat_id:
 *                 type: string
 *                 example: "60b8a4d44f1a2c001cb3e1c9"
 *     responses:
 *       200:
 *         description: Chat deleted from user contacts and chat entries successfully
 *       500:
 *         description: Internal server error
 */