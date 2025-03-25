import { Router } from "express";
import * as bienController from "../controllers/bienController"; // Assure-toi du chemin et de l'orthographe

const router = Router();

// Routes pour les demandes d'achat
router.post("/", bienController.create);
router.get("/", bienController.getAll);
router.get("/:id", bienController.getById);
// router.put("/:id", bienController.update);
// router.delete("/:id", bienController.remove);

export default router;