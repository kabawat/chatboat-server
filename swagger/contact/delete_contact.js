/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *     summary: Delete a contact by ID.
 *     tags:
 *       - Contacts
 *     security:
 *       - BearerAuth: []
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
 *         description: ID of the contact to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Contact deleted successfully.
 *       '400':
 *         description: Bad request. Contact ID not provided.
 *       '500':
 *         description: Error occurred while deleting contact.
 */
