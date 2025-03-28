import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { getPurchaseRequestByStatus,createPurchaseRequest,getPurchaseRequestByIdUser,updatePurchaseRequestStatus } from "./purchaseRequestService";
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

    socket.on("getAllPurchaseRequest", async (status:string) => {
        const PurchaseRequest = await getPurchaseRequestByStatus(status);
        
        socket.emit("PurchaseRequest", PurchaseRequest);
    });
    socket.on("getPurchaseRequestByIdUser", async (user_id:string) => {
      const PurchaseRequestUser = await getPurchaseRequestByIdUser(user_id);
      socket.emit("PurchaseRequestUser", PurchaseRequestUser);
  });

  socket.on("updateStatus", async ({ requestId, newStatus }) => {
    try {
      const updatedRequest = await updatePurchaseRequestStatus(requestId, newStatus);
      const PurchaseRequest = await getPurchaseRequestByStatus('pending');
      socket.emit("PurchaseRequest", PurchaseRequest);
    } catch (error) {
      socket.emit("error", { message: "Erreur lors de la mise à jour du statut" });
    }
  });
  
    socket.on("createPurchaseRequest", async (data) => {
        try {
          console.log("📥 Données reçues :", data);
          const newPurchaseRequest = await createPurchaseRequest(data);
  
        } catch (error) {
          console.error("Erreur lors de la création :", error);
          socket.emit("error", { message: "Une erreur est survenue" });
        }
      });
    
    socket.on("disconnect", () => {
      console.log(`❌ Client déconnecté : ${socket.id}`);
    });
  });

  return io;
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.io n'a pas été initialisé !");
  }
  return io;
};
