import express from 'express';

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import { sellerOnly } from '../middleware/sellerMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Customer routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

// Seller/Admin order status
router.put(
  '/:id/status',
  protect,
  updateOrderStatus
);

export default router;