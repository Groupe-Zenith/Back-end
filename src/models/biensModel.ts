import { Schema, model } from "mongoose";
import { IBiens } from "../types/biensType";

const BienSchema = new Schema<IBiens>(
  {
    labelBien: {type :String, required: true},
    number: {type:Number, required: false},
    state: {type:String,enum: ["damager", "New","lost"], required: false},
    description: {type:String, required: true},
    numberdamaged: {type:Number, required: false},
    numberlost: {type:Number, required: false},
  },
  { timestamps: true }
);

export default model<IBiens>("Bien", BienSchema);
