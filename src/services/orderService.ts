// orderService.ts
import { OrderModel } from '../models/orderModel';
import { Order } from '../types/orderType';

const createOrder = async (orderData: Partial<Order>) => {
    try {
      const newOrder = new OrderModel(orderData);
      await newOrder.save();
      return newOrder;
    } catch (error: unknown) {  // Type explicite 'unknown'
      if (error instanceof Error) {
        throw new Error('Erreur lors de la création de la commande : ' + error.message);
      }
      throw new Error('Erreur inconnue lors de la création de la commande');
    }
  };
  
  const updateOrder = async (orderId: string, updatedData: Partial<Order>) => {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
      if (!updatedOrder) {
        throw new Error('Commande introuvable pour mise à jour');
      }
      return updatedOrder;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Erreur lors de la mise à jour de la commande : ' + error.message);
      }
      throw new Error('Erreur inconnue lors de la mise à jour de la commande');
    }
  };
  // Récupérer toutes les commandes
const getAllOrders = async () => {
    try {
      const orders = await OrderModel.find();
      return orders;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Erreur lors de la récupération des commandes : ' + error.message);
      }
      throw new Error('Erreur inconnue lors de la récupération des commandes');
    }
  };
  
export { createOrder, updateOrder,getAllOrders };
