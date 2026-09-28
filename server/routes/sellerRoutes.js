// import express from 'express';

// import {
//   getSellerDashboard,
//   getSellerProfile,
//   updateSellerProfile,
//   getSellerOrders,
//   getSellerSales,
// } from '../controllers/sellerController.js';

// import { protect } from '../middleware/authMiddleware.js';
// import { sellerOnly } from '../middleware/sellerMiddleware.js';

// const router = express.Router();

// // All seller routes require authentication + seller role
// router.use(protect, sellerOnly);

// // Dashboard
// router.get('/dashboard', getSellerDashboard);

// // Seller profile
// router.get('/profile', getSellerProfile);
// router.put('/profile', updateSellerProfile);

// // Orders
// router.get('/orders', getSellerOrders);

// // Sales
// router.get('/sales', getSellerSales);

// export default router;

import express from 'express'

import {
  getSellerDashboard,
  getSellerProfile,
  updateSellerProfile,
  getSellerOrders,
  getSellerSales,
  getMyStore,
} from '../controllers/sellerController.js'

import { protect } from '../middleware/authMiddleware.js'
import { sellerOnly } from '../middleware/sellerMiddleware.js'

const router = express.Router()

// ============================================================
// ALL SELLER ROUTES
// ============================================================

router.use(protect, sellerOnly)

// ============================================================
// DASHBOARD
// ============================================================

router.get(
  '/dashboard',
  getSellerDashboard
)

// ============================================================
// SELLER PROFILE
// ============================================================

router.get(
  '/profile',
  getSellerProfile
)

router.put(
  '/profile',
  updateSellerProfile
)

// ============================================================
// SELLER STORE
// ============================================================

router.get(
  '/store',
  getMyStore
)

// ============================================================
// SELLER ORDERS
// ============================================================

router.get(
  '/orders',
  getSellerOrders
)

// ============================================================
// SELLER SALES
// ============================================================

router.get(
  '/sales',
  getSellerSales
)

export default router