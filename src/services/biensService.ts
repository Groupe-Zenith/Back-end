import Biens from "../models/biensModel";
import { IBiens } from "../types/biensType";

export const createBiens = async (data: Partial<IBiens>) => {
  return await Biens.create(data);
};

export const getAllBienss = async () => {
  return await Biens.find().populate("user_id");
};

export const getBiensById = async (id: string) => {
  return await Biens.findById(id).populate("user_id");
};

// export const updateBiens = async (id: string, data: Partial<IBiens>) => {
//   return await Biens.findByIdAndUpdate(id, data, { new: true });
// };

// export const deleteBiens = async (id: string) => {
//   return await Biens.findByIdAndDelete(id);
// };
