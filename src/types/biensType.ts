import { Types ,Document} from "mongoose";

export interface IBiens extends Document {
  labelBien: string;
  number: number;
  state: string;
  description: string;
  numberdamaged: number;
  numberlost: number;
  created_at?: Date;
  updated_at?: Date;
}