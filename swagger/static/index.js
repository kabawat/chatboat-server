
/**
 * @swagger
 * /api/static/:
 *    get:
 *     summary: Random message
 *     tags:
 *       - Static
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     responses:
 *       200:
 *         description: A list of two random messages
 *       500:
 *         description: Internal server error
 */