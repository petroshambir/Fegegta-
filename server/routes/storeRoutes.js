import express from 'express';

import {
  getStores,
  getStoreById,
  getMyStore,
  createStore,
  updateStore,
} from '../controllers/storeController.js';

import { protect } from '../middleware/authMiddleware.js';
import { sellerOnly } from '../middleware/sellerMiddleware.js';

const router = express.Router();

// Public store routes
router.get('/', getStores);
router.get('/:id', getStoreById);

// Seller store routes
router.get('/seller/my-store', protect, sellerOnly, getMyStore);
router.post('/', protect, sellerOnly, createStore);
router.put('/:id', protect, sellerOnly, updateStore);

export default router;