import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import cors from "cors";
import "dotenv/config";
import express from "express";
import { sequelize } from "./config/database.js";
 
const app = express();
 
const connectDb = async () => {
    await sequelize.authenticate();
    console.log("Connected to the database");
};
 
connectDb();
 
// Moteur de template
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Configuration du moteur de vue
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
 
app.use(express.static(path.join(__dirname, "public")));
 
 
/*
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
*/
// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import orderRoutes from "./routes/order.routes.js";
 
 
// app.use(
//     cors({
//         origin: [process.env.CLIENT_URL],
//         credentials: true,
//         allowedHeaders: ["Content-Type", "sessionId"],
//         exposedHeaders: ["sessionId"],
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         preflightContinue: false,
//     })
// );
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
 
// Routes
 
// app.use("/user", userRoutes);
// app.use("/auth", authRoutes);
// app.use("/product", productRoutes);
// app.use("/order", orderRoutes);
 
app.get("/home", (req, res) => {
    res.render("index", {
        title: "Ma page",
        user: req.user,
    });
});
 
 
// Serveur
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
 
 