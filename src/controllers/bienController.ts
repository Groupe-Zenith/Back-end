import { Request, Response, NextFunction } from "express";
import * as biensService from "../services/biensService";
import { getSocketInstance } from "../services/socketService";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = await biensService.createBiens(req.body);

    // Envoyer une notification à tous les clients
    
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
    const requests = await biensService.getAllBienss();
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
    const request = await biensService.getBiensById(req.params.id);
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
//     const request = await biensService.updateBiens(req.params.id, req.body);
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
//     const deleted = await biensService.deleteBiens(req.params.id);
//     if (!deleted) res.status(404).json({ message: "Demande non trouvée" });
//     res.json({ message: "Demande supprimée avec succès" });
//   } catch (error) {
//     next(error);
//   }
// };
