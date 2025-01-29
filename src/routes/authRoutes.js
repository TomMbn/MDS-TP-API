import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     description: Connecte un utilisateur avec son email et mot de passe, puis renvoie un token JWT.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur.
 *               mot_de_passe:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie, un token JWT est renvoyé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Le token JWT de l'utilisateur.
 *       400:
 *         description: Email ou mot de passe incorrect.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/login', login);

export default router;
