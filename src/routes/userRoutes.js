import express from 'express';
import { createUser, getUsersByRole, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import authenticateJWT from '../middlewares/authMiddleware.js'; 

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un utilisateur
 *     description: Crée un nouvel utilisateur dans la base de données.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               adresse:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               role:
 *                 type: string
 *               telephone:
 *                 type: string
 *               id_commerciale:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: L'utilisateur existe déjà ou les données sont invalides.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/', createUser);

/**
 * @swagger
 * /users/role/{role}:
 *   get:
 *     summary: Récupérer les utilisateurs par rôle
 *     description: Récupère tous les utilisateurs ayant un rôle spécifique.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Le rôle des utilisateurs à récupérer.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs avec le rôle spécifié.
 *       404:
 *         description: Aucun utilisateur trouvé avec ce rôle.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/role/:role', authenticateJWT, getUsersByRole);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Récupère un utilisateur spécifique à partir de son ID.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'utilisateur à récupérer.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur retournés.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/:id', authenticateJWT, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Met à jour les informations d'un utilisateur existant.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'utilisateur à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               adresse:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               role:
 *                 type: string
 *               telephone:
 *                 type: string
 *               id_commerciale:
 *                 type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Données de l'utilisateur invalides.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/:id', authenticateJWT, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur spécifique à partir de son ID.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'utilisateur à supprimer.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
