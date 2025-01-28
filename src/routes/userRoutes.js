import express from 'express';
import { createUser, getUsersByRole, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import authenticateJWT from '../middlewares/authMiddleware.js'; // Pour protéger les routes

const router = express.Router();

// 1. Créer un utilisateur (POST /users)
router.post('/', createUser);

// 2. Récupérer tous les utilisateurs par rôle (GET /users/role/{role})
router.get('/role/:role', authenticateJWT, getUsersByRole);

// 3. Récupérer un utilisateur par ID (GET /users/{id})
router.get('/:id', authenticateJWT, getUserById);

// 4. Mettre à jour un utilisateur par ID (PUT /users/{id})
router.put('/:id', authenticateJWT, updateUser);

// 5. Supprimer un utilisateur par ID (DELETE /users/{id})
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
