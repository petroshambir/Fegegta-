import express from 'express';

import {
  getCommissionSettings,
  updateCommissionSettings,
  getSellerCommissions,
  getAllCommissions,
  markCommissionAsPaid,
} from '../controllers/commissionController.js';

import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { sellerOnly } from '../middleware/sellerMiddleware.js';

const router = express.Router();

// Admin commission settings
router.get(
  '/settings',
  protect,
  adminOnly,
  getCommissionSettings
);

router.put(
  '/settings',
  protect,
  adminOnly,
  updateCommissionSettings
);

// Seller commissions
router.get(
  '/seller',
  protect,
  sellerOnly,
  getSellerCommissions
);

// Admin commission management
router.get(
  '/',
  protect,
  adminOnly,
  getAllCommissions
);

router.put(
  '/:id/paid',
  protect,
  adminOnly,
  markCommissionAsPaid
);

export default router;