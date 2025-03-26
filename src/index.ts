import express from "express";
import mongoose from "mongoose";
import http from "http"; // Import du module HTTP
import { Server } from "socket.io"; // Import de Socket.io
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./configs/db";
import userRoute from "./routes/userRoute";
import purchaseRequestRoutes from "./routes/purchaseRequestRoute";
import { initSocket } from "./services/socketService";
import bodyParser from "body-parser";


// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app); // Création du serveur HTTP
app.use(bodyParser.json());

// Middleware pour analyser le JSON et activer CORS
app.use(express.json());
app.use(cors());

dbConnect()


// Définition des routes
app.use("/auth", userRoute);
app.use("/purchase-requests", purchaseRequestRoutes);

initSocket(server);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
