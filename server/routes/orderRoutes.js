

import express from 'express'

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} from '../controllers/orderController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// ============================================================
// CUSTOMER ROUTES
// ============================================================

router.post(
  '/',
  protect,
  createOrder
)

router.get(
  '/my-orders',
  protect,
  getMyOrders
)

router.get(
  '/:id',
  protect,
  getOrderById
)

router.put(
  '/:id/cancel',
  protect,
  cancelOrder
)

// ============================================================
// ADMIN / SELLER ORDER STATUS
// ============================================================

router.put(
  '/:id/status',
  protect,
  updateOrderStatus
)

export default router