import express from 'express';

import {
  getSellerDashboard,
  getSellerProfile,
  updateSellerProfile,
  getSellerOrders,
  getSellerSales,
} from '../controllers/sellerController.js';

import { protect } from '../middleware/authMiddleware.js';
import { sellerOnly } from '../middleware/sellerMiddleware.js';

const router = express.Router();

// All seller routes require authentication + seller role
router.use(protect, sellerOnly);

// Dashboard
router.get('/dashboard', getSellerDashboard);

// Seller profile
router.get('/profile', getSellerProfile);
router.put('/profile', updateSellerProfile);

// Orders
router.get('/orders', getSellerOrders);

// Sales
router.get('/sales', getSellerSales);

export default router;