/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contacts.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *     responses:
 *       '200':
 *         description: Contacts fetched successfully.
 *       '500':
 *         description: Error occurred while fetching contacts.
 */
