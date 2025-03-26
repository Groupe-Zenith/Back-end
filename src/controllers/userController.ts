import { Request, Response } from "express";
import * as authService from "../services/userServices";
import { generateToken } from "../utils/jwt";
import { log } from "console";
import User from "../models/userModel"; 

// Inscription
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name , role } = req.body;
    const user = await authService.registerUser(email, password, first_name, last_name , role);
    res.status(200).json({ message: "Utilisateur créé. Vérifiez votre e-mail.", user });
  } catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};



export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: unknown) { 
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
    const { otp } = req.body;
    const message = await authService.verifyEmail(otp as string);
    
    res.status(200).json({ message });
  } catch (error: unknown) { // Type explicite de l'erreur
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};

export const getUserByRole  = async (req: Request, res: Response) => {
  try {
    const users = await authService.getUsersByRole(req.params.role);
    res.status(200).json(users);
    console.log(users);
    
  } catch (error: unknown) { 
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};


export const registerMultipleUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Pass the User model to saveAll for inserting multiple users

    
    await authService.saveAll(req.body); // User is passed here

    // No need for further response handling since saveAll already handles it
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue." });
    }
  }
};