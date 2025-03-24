import { Types } from "mongoose";

export interface IPurchaseRequest {
  user_id: Types.ObjectId; // ✅ Correction ici
  item_name: string;
  quantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  admin_comment?: string;
  created_at?: Date;
  updated_at?: Date;
}
