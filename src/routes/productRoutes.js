import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import authenticateJWT from '../middlewares/authMiddleware.js'; 
import checkRoles from '../middlewares/checkRolesMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un produit
 *     description: Crée un nouveau produit dans la base de données.
 *     tags:
 *       - Produits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du produit.
 *               description:
 *                 type: string
 *                 description: La description du produit.
 *               price:
 *                 type: number
 *                 description: Le prix du produit.
 *               stock:
 *                 type: integer
 *                 description: Le stock disponible du produit.
 *     responses:
 *       201:
 *         description: Produit créé avec succès.
 *       400:
 *         description: Données de produit invalides.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/', authenticateJWT, checkRoles(['admin', 'commercial', 'fournisseur']), createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer tous les produits
 *     description: Récupère la liste de tous les produits.
 *     tags:
 *       - Produits
 *     responses:
 *       200:
 *         description: Liste des produits.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/', authenticateJWT, checkRoles(['admin', 'commercial', 'fournisseur']), getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     description: Récupère un produit spécifique en utilisant son ID.
 *     tags:
 *       - Produits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du produit à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du produit retournés.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/:id', authenticateJWT, checkRoles(['admin', 'commercial', 'fournisseur']), getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mettre à jour un produit
 *     description: Met à jour un produit existant dans la base de données.
 *     tags:
 *       - Produits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du produit à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du produit.
 *               description:
 *                 type: string
 *                 description: La description du produit.
 *               price:
 *                 type: number
 *                 description: Le prix du produit.
 *               stock:
 *                 type: integer
 *                 description: Le stock disponible du produit.
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès.
 *       400:
 *         description: Données de produit invalides.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put('/:id', authenticateJWT, checkRoles(['admin', 'commercial', 'fournisseur']), updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprime un produit spécifique à partir de son ID.
 *     tags:
 *       - Produits
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du produit à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès.
 *       404:
 *         description: Produit non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete('/:id', authenticateJWT, checkRoles(['admin', 'commercial', 'fournisseur']), deleteProduct);

export default router;
