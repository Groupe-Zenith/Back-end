import { Request, Response, NextFunction } from "express";
import * as purchaseRequestService from "../services/purchaseRequestService";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = await purchaseRequestService.createPurchaseRequest(req.body);
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

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = await purchaseRequestService.getPurchaseRequestById(req.params.id);
    if (!request) {
      res.status(404).json({ message: "Demande non trouvée" });
      return;
    }
    res.json(request);
  } catch (error) {
    next(error);
  }
};

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
