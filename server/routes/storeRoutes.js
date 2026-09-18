

import express from 'express'

import {
  getStores,
  getStoreById,
  getMyStore,
  createStore,
  updateStore,
} from '../controllers/storeController.js'

import { protect } from '../middleware/authMiddleware.js'
import { sellerOnly } from '../middleware/sellerMiddleware.js'

const router = express.Router()

// ============================================================
// PUBLIC STORE ROUTES
// ============================================================

// Get all approved/active stores
router.get('/', getStores)

// ============================================================
// SELLER STORE ROUTES
// ============================================================

// Get current seller's store
router.get(
  '/seller/my-store',
  protect,
  sellerOnly,
  getMyStore
)

// Create store
router.post(
  '/',
  protect,
  sellerOnly,
  createStore
)

// Update store
router.put(
  '/:id',
  protect,
  sellerOnly,
  updateStore
)

// ============================================================
// PUBLIC STORE BY ID
// ============================================================

// Keep this AFTER /seller/my-store
router.get(
  '/:id',
  getStoreById
)

export default router