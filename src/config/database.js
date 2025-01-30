import Sequelize from 'sequelize';
import 'dotenv/config';
 
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,    // ou l'IP du serveur
  dialect: 'mssql',     // important pour utiliser SQL Server
  logging: false,       // pour désactiver les logs SQL dans la console
  dialectOptions: {
    options: {
      trustServerCertificate: true,
      enableArithAbort: true
    }
  },
  port: process.env.DB_
});


