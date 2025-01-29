import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

const Product = sequelize.define('Product', {
    id_produit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marque: {
        type:  DataTypes.STRING(50),
        allowNull: false
    },
    nom_modele: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type : DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    prix: {
        type: DataTypes.DECIMAL(10,2)
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_fournisseur: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},  {
    tableName: 'Produits',
    schema: 'Produits',
    timestamps: false
})

Product.belongsTo(User, { foreignKey: 'id_fournisseur', as: 'fournisseur' });

export default Product;