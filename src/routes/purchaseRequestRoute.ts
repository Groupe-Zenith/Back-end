import { Router } from "express";
import * as purchaseRequestController from "../controllers/purchaseRequestControler"; // Assure-toi du chemin et de l'orthographe

const router = Router();

// Routes pour les demandes d'achat
router.post("/", purchaseRequestController.create);
router.get("/", purchaseRequestController.getAll);
// router.get("/:id", purchaseRequestController.getById);
// router.put("/:id", purchaseRequestController.update);
// router.delete("/:id", purchaseRequestController.remove);

export default router;
