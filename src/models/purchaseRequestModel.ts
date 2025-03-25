import { Schema, model } from "mongoose";
import { IPurchaseRequest } from "../types/purchaseRequestType";
import { IUser } from "../types/userTypes";
const PurchaseRequestSchema = new Schema<IPurchaseRequest>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    item_name: { type: String, required: false },
    quantity: { type: Number, required: false },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected","delivered"],
      default: "pending",
    },
    admin_comment: { type: String ,required:false},
  },
  { timestamps: true }
);

export default model<IPurchaseRequest>("PurchaseRequest", PurchaseRequestSchema);
