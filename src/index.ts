import express from "express";
import dotenv from "dotenv";
import os from "os";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Fonction pour récupérer l'adresse IP locale
const getLocalIP = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
};

app.get("/", (req, res) => {
  res.send("🚀 Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  const localIP = getLocalIP();
  console.log(`\n 🖥️   Server is running on:`);
  console.log(`     ➜  Local:   http://localhost:${PORT}`);
  console.log(`     ➜  Network: http://${localIP}:${PORT}\n`);
});
