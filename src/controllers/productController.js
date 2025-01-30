import Product from "../models/products.js";

export const createProduct = async (req, res) => {
  const {
    marque,
    nom_modele,
    description,
    type,
    prix,
    stock,
    id_fournisseur
  } = req.body;

  try {
    const existingProduct = await Product.findOne({ where: { nom_modele } });
    if (existingProduct) {
      return res.status(400).send("Le produit existe déjà");
    }

    const newProduct = await Product.create({
      marque,
      nom_modele,
      description,
      type,
      prix,
      stock,
      id_fournisseur,
    });

    return res.status(201).json({
      id_produit: newProduct.id_produit,
      marque: newProduct.marque,
      nom_modele: newProduct.nom_modele,
      type: newProduct.type,
    });
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { marque, nom_modele, description, type, prix, stock, id_fournisseur } =
    req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }

    await product.update({
      marque,
      nom_modele,
      description,
      type,
      prix,
      stock,
      id_fournisseur,
    });

    res
      .status(200)
      .json({ message: "Produit mis à jour avec succès", product });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
