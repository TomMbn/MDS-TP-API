import express from "express";
import { createServer } from 'node:http';
import { sequelize } from "./config/database.js";
import 'dotenv/config';
import path from "node:path";
import homeRouter from './routes/homeRoutes.js';
import aboutRouter from './routes/aboutRoutes.js';
import tchatRouter from './routes/tchatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import initSocket from "./sockets/tchatSocket.js";

// Swagger
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 8080;

const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion réussie");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

// Swagger JSDoc configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // Version de l'OpenAPI
    info: {
      title: 'API Utilisateurs',
      version: '1.0.0',
      description: 'API pour gérer les utilisateurs et l\'authentification',
    },
    servers: [
      {
        url: 'http://localhost:8080',  // URL de votre serveur
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Indique que le token sera en JWT
        },
      },
    },
    security: [
      {
        BearerAuth: [],  // Applique cette sécurité à toutes les routes qui la nécessitent
      },
    ],
  },
  apis: ['./routes/*.js'],  // Spécifiez les fichiers contenant les annotations Swagger
};


// Générer la documentation Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serveur la documentation Swagger à l'endpoint /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(homeRouter);
app.use(aboutRouter);
app.use(tchatRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Initialiser le socket pour le tchat
initSocket(io);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`Swagger UI est accessible sur http://localhost:${port}/api-docs`);
});

export default app;
