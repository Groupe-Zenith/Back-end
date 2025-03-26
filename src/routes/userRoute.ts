import express from "express";
import { registerUser, loginUser, verifyEmail ,getUserByRole,registerMultipleUsers} from "../controllers/userController";
 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.get("/users/:role", getUserByRole);
router.post("/all",registerMultipleUsers)

export default router;
