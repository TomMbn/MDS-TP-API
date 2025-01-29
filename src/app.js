import express from "express";
import { createServer } from 'node:http';
import { sequelize } from "./config/database.js";
import 'dotenv/config';
import path from "node:path";
import homeRouter from './routes/homeRoutes.js'
import aboutRouter from './routes/aboutRoutes.js';
import tchatRouter from './routes/tchatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();
const port = 8080;

const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion réussie")
  } catch (err) {
    console.error(err)
  }
}

connectDB()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(homeRouter);
app.use(aboutRouter);
app.use(tchatRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);


function DAB(amount) {
    let remaining = Math.round(amount * 100);
  
    const denominations = [
      20000, 10000, 5000, 2000, 1000, 500,
      200, 100, 50, 20, 10, 5, 2, 1
    ];
  
    const distribution = [];
  
    for (let denom of denominations) {
      const count = Math.floor(remaining / denom);
      if (count > 0) {
        distribution.push({
          value: denom / 100,
          count: count
        });
        remaining %= denom;
      }
    }
  
    return distribution;
  }
  

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      const amount = parseFloat(msg);

      if (isNaN(amount) || amount <= 0) {
        io.emit('chat message', `Veuillez entrer un montant valide (ex: 150 ou 13.37)`);
      } else {
        const distribution = DAB(amount);
  
        const distribMessage = distribution
          .map(item => `${item.count} x ${item.value}€`)
          .join(' + ');
  
        if (distribution.length === 0) {
          io.emit('chat message', `Montant: ${amount}€, aucune coupure/pièce trouvée`);
        } else {
          io.emit('chat message', `Pour ${amount}€, vous avez : ${distribMessage}`);
        }
      }
    });
  });
  

server.listen(port, () => {
  console.log(`app listening on port ${port}`)
});

export default app;
