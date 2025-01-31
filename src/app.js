import express from "express";
import { createServer } from 'node:http';
import { sequelize } from "./config/database.js";
import 'dotenv/config';
import path from "node:path";
import tchatRoutes from './routes/tchatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import swaggerOptions from "./documentation/SwaggerOptions.js";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import initSocket from "./sockets/tchatSocket.js";

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

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use('/v1/tchat', tchatRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/products', productRoutes);

app.use((req, res, next) => {
  res.status(404).render('404');
})

initSocket(io);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`Swagger UI est accessible sur http://localhost:${port}/api-docs`);
});

export default app;
