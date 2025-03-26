import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer";
import crypto from "crypto";
import { generateToken } from "../utils/jwt";
import * as purchaseRequestService from "../services/purchaseRequestService";
import { getSocketInstance } from "../services/socketService";
import { Request, Response } from 'express';
import { log } from "console";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";

// Inscription
export const registerUser = async (email: string, password: string, first_name: string, last_name: string , role : string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Cet email est déjà utilisé.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const emailToken = crypto.randomInt(100000, 999999).toString();

  const user = await User.create({
    email,
    password_hash: hashedPassword,
    first_name,
    last_name,
    role: role,
    is_active: false,
    otp: emailToken
  });

  await sendEmail(email, `Vérification de votre compte  : ${emailToken}`, 
    `Cliquez ici pour vérifier votre compte : ${FRONTEND_URL}`
  );

  return user;
};

// Connexion
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur introuvable.");

  if (!user.otpVerification && !user.is_active) throw new Error("Veuillez vérifier votre email avant de vous connecter.");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Mot de passe incorrect.");
  const token = generateToken(user.id);

  return { token, user };
};

// Vérification d'email
export const verifyEmail = async (token: string) => {
  const user = await User.findOne({ otp: token });
  
  if (!user) throw new Error("Token invalide.");
  if (user.otp !== token) {
    throw new Error('OTP incorrect');
  }

  // Création de la demande d'achat
  const request = await purchaseRequestService.createPurchaseRequest({
    user_id: user._id as any,
    reason: 'Demande validation compte',
  });
  console.log("✅ Demande d'achat créée :", request);
  const PurchaseRequest = await purchaseRequestService.getPurchaseRequestByStatus("pending");
          

  // Émission de l'événement via Socket.IO
  try {
    const io = getSocketInstance();
    io.emit("PurchaseRequest", PurchaseRequest); // Envoi à tous les clients connectés
    console.log("📤 Événement 'PurchaseRequestData' envoyé avec succès !");
  } catch (error) {
    console.error("❗ Erreur lors de l'émission de l'événement Socket.IO :", error);
  }

  // Mise à jour de l'utilisateur
  user.is_active = false;
  user.otpVerification = true;
  user.otp = "";
  await user.save();

  return "Votre compte a été activé avec succès !";
};

//  get user 
// export const getUsers = async () => {
//   try {
//     // La projection { password_hash: 0 } permet d'exclure ce champ dans le résultat
//     const users = await User.find();
//     return users;
//   } catch (error) {
//     throw new Error("Erreur lors de la récupération des utilisateurs");
//   }
// };
export const getUsersByRole = async (role : string) => {
  try {
    // La projection { password_ash: 0 } permet d'exclure ce champ dans le résultat
    const users = await User.find({role });
    return users;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
};

// Fonction générique pour sauvegarder plusieurs utilisateurs avec hash du mot de passe
export const saveAll = async (users: any): Promise<void> => {
  try {
    // Vérification que 'users' est un tableau
    if (!Array.isArray(users)) {
      throw new Error("L'argument 'users' doit être un tableau.");
    }
    
    // Vérification des données dans le tableau avant de les traiter
    console.log('Données reçues :', users);
    
    // Hachage des mots de passe avant insertion
    const usersToSave = await Promise.all(
      users.map(async (user) => {
        if (!user.password_hash) {
          throw new Error('Chaque utilisateur doit avoir un mot de passe.');
        }

        const hashedPassword = await bcrypt.hash(user.password_hash, 10);
        return {
          ...user,
          password_hash: hashedPassword, // 🔒 Remplace le mot de passe en clair
          otp: "", // 🛑 Assure que OTP est vide
          created_at: new Date().toISOString().split("T").join(" "),
          updated_at: new Date().toISOString().split("T").join(" "),
        };
      })
    );

    console.log('Utilisateurs à enregistrer :', usersToSave);
    
    // Insertion en masse
    const savedUsers = await User.insertMany(usersToSave);
    

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erreur:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Erreur inconnue');
      throw new Error('Une erreur inconnue est survenue.');
    }
  }
};