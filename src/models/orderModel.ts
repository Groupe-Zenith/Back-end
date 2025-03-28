// ordersModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Order } from '../types/orderType';  // Importer le type Order

// Définir le schéma de la commande
const orderSchema: Schema = new Schema(
  {
    manager_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User', // Assurez-vous que le modèle 'User' existe si vous utilisez cette référence
      required: true,
    },
    purchase_request_id: {type: mongoose.Schema.Types.ObjectId,ref: 'PurchaseRequest',  // Assurez-vous que le modèle 'PurchaseRequest' existe
      required: true,
    },
    status: {type: String,enum: ['ordered', 'delivered', 'partial', 'cancelled'],
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: Boolean,
      required: true,
    },
    photo_url: {  // Champ pour stocker l'URL de la photo
        type: String,
        required: false,  // Rendre ce champ optionnel si tu veux que la photo soit facultative
      },
  },
  {
    timestamps: true,  // Cela permet de générer automatiquement createdAt et updatedAt
  }
);

// Créer le modèle à partir du schéma
const OrderModel = mongoose.model<Order & Document>('Order', orderSchema);

export { OrderModel };
