import { Schema, model } from "mongoose";
import { IBiens } from "../types/biensType";

const PurchaseRequestSchema = new Schema<IBiens>(
  {
    labelBien: {String, required: true},
    number: {Number, required: false},
    state: {type:String,enum: ["damager", "New","lost"], required: false},
    description: {String, required: true},
    numberdamaged: {Number, required: false},
    numberlost: {Number, required: false},
  },
  { timestamps: true }
);

export default model<IBiens>("PurchaseRequest", PurchaseRequestSchema);
