import { Document } from "mongoose";

// Définition des rôles utilisateur
export type UserRole = "user" | "admin" | "manager";

// Définition de l'interface utilisateur
export interface IUser extends Document {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
  otp: string, // Code OTP temporaire
  otpVerification: boolean;// Vérification OTP
  created_at: Date;
  updated_at: Date;
}
