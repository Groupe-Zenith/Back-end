import express from 'express';
import { createOrderController, updateOrderController,  } from '../controllers/orderCondroller';

const router = express.Router();


// Route pour créer une commande avec une photo
router.post('/orders', createOrderController);

// Route pour mettre à jour une commande avec une photo
router.put('/orders/:orderId', updateOrderController);

export { router };
