// orderController.ts
import { Request, Response } from 'express';
import { createOrder, updateOrder,getAllOrders } from '../services/orderService';
import { upload } from '../configs/multer';  // Importer la configuration Multer

// Créer une commande avec photo (si présente)
const createOrderController = async (req: Request, res: Response) => {
  try {
    // Utiliser Multer pour traiter l'upload de la photo
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }

      // Récupérer les données de la commande à partir du corps de la requête
      const { manager_id, purchase_request_id, status, total_amount, payment_status } = req.body;

      // Si une photo a été téléchargée, ajouter l'URL du fichier à la commande
      const orderData = {
        manager_id,
        purchase_request_id,
        status,
        total_amount,
        payment_status,
        photo_url: req.file ? `/uploads/${req.file.filename}` : undefined,
      };

      // Créer la commande
      const newOrder = await createOrder(orderData);
      res.status(201).json(newOrder);
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
  }
};

// Mettre à jour une commande avec photo (si présente)
const updateOrderController = async (req: Request, res: Response) => {
  try {
    // Utiliser Multer pour traiter l'upload de la photo
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      }

      // Récupérer les données de la commande à partir du corps de la requête
      const { orderId } = req.params;
      const updatedData = req.body;

      // Si une photo a été téléchargée, ajouter l'URL du fichier à la commande
      if (req.file) {
        updatedData.photo_url = `/uploads/${req.file.filename}`;
      }

      // Mettre à jour la commande
      const updatedOrder = await updateOrder(orderId, updatedData);
      res.status(200).json(updatedOrder);
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error });
  }
};
// Récupérer toutes les commandes
export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
      const orders = await getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
  };

export { createOrderController, updateOrderController };
