import express from 'express';
import { createUser, getUsersByRole, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import authenticateJWT from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/', createUser);

router.get('/role/:role', authenticateJWT, getUsersByRole);

router.get('/:id', authenticateJWT, getUserById);

router.put('/:id', authenticateJWT, updateUser);

router.delete('/:id', authenticateJWT, deleteUser);

export default router;
