import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer";
import crypto from "crypto";
import { generateToken } from "../utils/jwt";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Inscription
export const registerUser = async (email: string, password: string, first_name: string, last_name: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Cet email est déjà utilisé.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const emailToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    email,
    password_hash: hashedPassword,
    first_name,
    last_name,
    role: "user",
    is_active: false,
    otp: emailToken
  });

  // Envoi de l'e-mail de validation
  await sendEmail(email, "Vérification de votre compte", 
    `Cliquez ici pour vérifier votre compte : ${FRONTEND_URL}/verify-email?token=${emailToken}`
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
  const user = await User.findOne({otp: token });
  if (!user) throw new Error("Token invalide.");

  user.is_active = true;
  user.otpVerification = true;
  user.otp = "";
  await user.save();

  return "Votre compte a été activé avec succès !";
};
