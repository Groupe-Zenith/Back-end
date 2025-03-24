import { Request, Response } from "express";
import * as authService from "../services/userServices";
import { generateToken } from "../utils/jwt";
// Inscription
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const user = await authService.registerUser(email, password, first_name, last_name);
    res.status(201).json({ message: "Utilisateur créé. Vérifiez votre e-mail.", user });
  } catch (error: unknown) { // Type explicite de l'erreur
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};

// Connexion
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: unknown) { // Type explicite de l'erreur
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};

// Vérification d'e-mail
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const message = await authService.verifyEmail(token as string);
    res.status(200).json({ message });
  } catch (error: unknown) { // Type explicite de l'erreur
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};
