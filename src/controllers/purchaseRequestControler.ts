import { Request, Response, NextFunction } from "express";
import * as purchaseRequestService from "../services/purchaseRequestService";
import { getSocketInstance } from "../services/socketService";
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log( req.body);
    const request = await purchaseRequestService.createPurchaseRequest(req.body);
    const PurchaseRequest = await purchaseRequestService.getPurchaseRequestByStatus("pending");
    // Émission de l'événement via Socket.IO
         try {
           const io = getSocketInstance();
           io.emit("PurchaseRequest", PurchaseRequest); // Envoi à tous les clients connectés
           console.log("📤 Événement 'PurchaseRequestData' envoyé avec succès !");
         } catch (error) {
           console.error("❗ Erreur lors de l'émission de l'événement Socket.IO :", error);
         }
    res.status(201).json(request);
  } catch (error) {
    next(error); // Passe l'erreur à Express
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requests = await purchaseRequestService.getAllPurchaseRequests();
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// export const getById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const request = await purchaseRequestService.getPurchaseRequestById(req.params.id);
//     if (!request) {
//       res.status(404).json({ message: "Demande non trouvée" });
//       return;
//     }
//     res.json(request);
//   } catch (error) {
//     next(error);
//   }
// };

// export const update = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const request = await purchaseRequestService.updatePurchaseRequest(req.params.id, req.body);
//     if (!request)  res.status(404).json({ message: "Demande non trouvée" }).end();
//     res.json(request);
//   } catch (error) {
//     next(error);
//   }
// };

// export const remove = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const deleted = await purchaseRequestService.deletePurchaseRequest(req.params.id);
//     if (!deleted) res.status(404).json({ message: "Demande non trouvée" });
//     res.json({ message: "Demande supprimée avec succès" });
//   } catch (error) {
//     next(error);
//   }
// };
