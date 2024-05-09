/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Add a new contact.
 *     tags:
 *       - Contacts
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
 *               contact:
 *                 type: string
 *                 description: ID of the contact to be added.
 *     responses:
 *       '200':
 *         description: Contact added successfully.
 *       '400':
 *         description: Bad request. Contact ID not provided.
 *       '500':
 *         description: Error occurred while adding contact.
 */
