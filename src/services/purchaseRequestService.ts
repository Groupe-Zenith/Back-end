import PurchaseRequest from "../models/purchaseRequestModel";
import { IPurchaseRequest } from "../types/purchaseRequestType";

export const createPurchaseRequest = async (data: Partial<IPurchaseRequest>) => {
  return await PurchaseRequest.create(data);
};

export const getAllPurchaseRequests = async () => {
  return await PurchaseRequest.find().populate("user_id", "name email");
};

export const getPurchaseRequestById = async (id: string) => {
  return await PurchaseRequest.findById(id).populate("user_id", "name email");
};

// export const updatePurchaseRequest = async (id: string, data: Partial<IPurchaseRequest>) => {
//   return await PurchaseRequest.findByIdAndUpdate(id, data, { new: true });
// };

// export const deletePurchaseRequest = async (id: string) => {
//   return await PurchaseRequest.findByIdAndDelete(id);
// };
