import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { getPurchaseRequestByStatus } from "./purchaseRequestService";
let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Autorise toutes les origines (tu peux restreindre cela)
      methods: ["GET", "POST"]
    },
  });
  console.log("🚀 Socket.io est bien initialisé !");
  io.on("connection", (socket) => {
    console.log(`🔵 Client connecté : ${socket.id}`);

    socket.on("getAllPurchaseRequest", async () => {
        const PurchaseRequest = await getPurchaseRequestByStatus("pending");
        
        socket.emit("PurchaseRequest", PurchaseRequest);
      });

    // socket.on("disconnect", () => {
    //   console.log(`❌ Client déconnecté : ${socket.id}`);
    // });
  });

  return io;
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.io n'a pas été initialisé !");
  }
  return io;
};
