/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "rajputana6688@gmail.com"
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '400':
 *         description: Error occurred during login.
 */
