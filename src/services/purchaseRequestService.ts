import PurchaseRequest from "../models/purchaseRequestModel";
import { IPurchaseRequest } from "../types/purchaseRequestType";

export const createPurchaseRequest = async (data: Partial<IPurchaseRequest>) => {
  
  return await PurchaseRequest.create(data);
};

export const getAllPurchaseRequests = async () => {
  return await PurchaseRequest.find().populate("user_id", "name email");
};

export const getPurchaseRequestByIdUser = async (user_id: string) => {
  return await PurchaseRequest.find({user_id}).populate("user_id");
};
export const getPurchaseRequestByStatus = async (status: string) => {
  return await PurchaseRequest.find({ status }).populate("user_id");
};


// export const updatePurchaseRequest = async (id: string, data: Partial<IPurchaseRequest>) => {
//   return await PurchaseRequest.findByIdAndUpdate(id, data, { new: true });
// };

// export const deletePurchaseRequest = async (id: string) => {
//   return await PurchaseRequest.findByIdAndDelete(id);
// };
