
// import express from 'express'

// import {
//   getSellerDashboard,
//   getSellerProfile,
//   updateSellerProfile,
//   getSellerOrders,
//   getSellerSales,
//   getMyStore,
// } from '../controllers/sellerController.js'

// import { protect } from '../middleware/authMiddleware.js'
// import { sellerOnly } from '../middleware/sellerMiddleware.js'

// const router = express.Router()

// // ============================================================
// // ALL SELLER ROUTES
// // ============================================================

// router.use(protect, sellerOnly)

// // ============================================================
// // DASHBOARD
// // ============================================================

// router.get(
//   '/dashboard',
//   getSellerDashboard
// )

// // ============================================================
// // SELLER PROFILE
// // ============================================================

// router.get(
//   '/profile',
//   getSellerProfile
// )

// router.put(
//   '/profile',
//   updateSellerProfile
// )

// // ============================================================
// // SELLER STORE
// // ============================================================

// router.get(
//   '/store',
//   getMyStore
// )

// // ============================================================
// // SELLER ORDERS
// // ============================================================

// router.get(
//   '/orders',
//   getSellerOrders
// )

// // ============================================================
// // SELLER SALES
// // ============================================================

// router.get(
//   '/sales',
//   getSellerSales
// )

// export default router

import express from 'express'

import {
  getSellerDashboard,
  getSellerProfile,
  updateSellerProfile,
  getSellerOrders,
  getSellerSales,
  getMyStore,
  updateMyStore,
} from '../controllers/sellerController.js'

import { protect } from '../middleware/authMiddleware.js'
import { sellerOnly } from '../middleware/sellerMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// All seller routes require authentication and seller access.
router.use(protect, sellerOnly)

router.get('/dashboard', getSellerDashboard)

router.get('/profile', getSellerProfile)
router.put('/profile', updateSellerProfile)

// Seller store settings and image upload.
router.get('/store', getMyStore)
router.put(
  '/store',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  updateMyStore
)

router.get('/orders', getSellerOrders)
router.get('/sales', getSellerSales)

export default router
