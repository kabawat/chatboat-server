/**
 * @swagger
 * /api/chat/:
 *   get:
 *     summary: Retrieve all chat data
 *     tags:
 *       - Chat Message
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     description: Retrieve all chat data along with contact details
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */