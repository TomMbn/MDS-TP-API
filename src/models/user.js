import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Product from './products.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(100)
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  id_commerciale: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: 'Utilisateurs',
  schema: 'Utilisateur',
  timestamps: false
});

User.hasMany(Product, { foreignKey: 'id_fournisseur', as: 'produits' });

export default User;
