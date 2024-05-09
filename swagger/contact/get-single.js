/**
 * @swagger
 * /api/contact/{contactId}:
 *   get:
 *     summary: Get a single contact by ID.
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: header
 *         name: x-auth-tokens
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token for authenticating the request
 *       - in: path
 *         name: contactId
 *         required: true
 *         description: ID of the contact to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Contact added successfully.
 *       '400':
 *         description: Bad request. Contact ID not provided.
 *       '500':
 *         description: Error occurred while adding contact.
 */
