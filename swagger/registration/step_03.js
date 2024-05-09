/**
 * @swagger
 * /api/auth/registration:
 *   post:
 *     summary: Sign up a new user (registration step 3rd)
 *     tags: [ Registration ]
 *     description: Sign up a new user with a unique username and a password. Password will be hashed before saving.
 *     parameters:
 *       - in: header
 *         name: x-verification-tokens
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
 *               username:
 *                 type: string
 *                 description: The unique username of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *     responses:
 *       '200':
 *         description: Sign up successful
 *       '400':
 *         description: Error during sign up
 */