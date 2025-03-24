import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./configs/db";
import userRoute from "./routes/userRoute";
import purchaseRequestRoutes from "./routes/purchaseRequestRoute";
// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser le JSON et activer CORS
app.use(express.json());
app.use(cors());

dbConnect()


// Définition des routes
app.use("/auth", userRoute);
app.use("/purchase-requests", purchaseRequestRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
