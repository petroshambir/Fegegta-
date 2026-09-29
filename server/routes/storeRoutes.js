

// import express from 'express'

// import {
//   getStores,
//   getStoreById,
//   getMyStore,
//   createStore,
//   updateStore,
// } from '../controllers/storeController.js'

// import { protect } from '../middleware/authMiddleware.js'
// import { sellerOnly } from '../middleware/sellerMiddleware.js'

// const router = express.Router()

// // ============================================================
// // PUBLIC STORE ROUTES
// // ============================================================

// // Get all approved/active stores
// router.get('/', getStores)

// // ============================================================
// // SELLER STORE ROUTES
// // ============================================================

// // Get current seller's store
// router.get(
//   '/seller/my-store',
//   protect,
//   sellerOnly,
//   getMyStore
// )

// // Create store
// router.post(
//   '/',
//   protect,
//   sellerOnly,
//   createStore
// )

// // Update store
// router.put(
//   '/:id',
//   protect,
//   sellerOnly,
//   updateStore
// )

// // ============================================================
// // PUBLIC STORE BY ID
// // ============================================================

// // Keep this AFTER /seller/my-store
// router.get(
//   '/:id',
//   getStoreById
// )

// export default router

// import express from 'express'

// import {
//   getStores,
//   getStoreById,
//   getMyStore,
//   createStore,
//   updateStore,
// } from '../controllers/storeController.js'

// import { protect } from '../middleware/authMiddleware.js'
// import { sellerOnly } from '../middleware/sellerMiddleware.js'

// const router = express.Router()

// // ============================================================
// // PUBLIC STORE ROUTES
// // ============================================================

// // Get all approved / active stores
// // GET /api/stores
// router.get(
//   '/',
//   getStores
// )

// // ============================================================
// // SELLER STORE ROUTES
// // ============================================================

// // Get current logged-in seller's store
// // GET /api/stores/my-store
// //
// // IMPORTANT:
// // This route MUST come before /:id
// // Otherwise "my-store" will be treated as a MongoDB ObjectId.
// router.get(
//   '/my-store',
//   protect,
//   sellerOnly,
//   getMyStore
// )

// // Backward-compatible seller store route
// // GET /api/stores/seller/my-store
// //
// // We keep this route so existing frontend code
// // using the old endpoint will continue to work.
// router.get(
//   '/seller/my-store',
//   protect,
//   sellerOnly,
//   getMyStore
// )

// // ============================================================
// // CREATE STORE
// // ============================================================

// // POST /api/stores
// router.post(
//   '/',
//   protect,
//   sellerOnly,
//   createStore
// )

// // ============================================================
// // UPDATE STORE
// // ============================================================

// // PUT /api/stores/:id
// //
// // This must remain protected because only the
// // owner seller is allowed to update a store.
// router.put(
//   '/:id',
//   protect,
//   sellerOnly,
//   updateStore
// )

// // ============================================================
// // PUBLIC STORE BY ID
// // ============================================================

// // GET /api/stores/:id
// //
// // IMPORTANT:
// // Keep this AFTER all fixed routes such as:
// // /my-store
// // /seller/my-store
// //
// // Otherwise Express will treat "my-store" as :id.
// router.get(
//   '/:id',
//   getStoreById
// )

// export default router


import express from 'express'

import {
  getStores,
  getStoreById,
  getStoreBySlug,
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

// GET /api/stores
// Get all approved / active stores
router.get(
  '/',
  getStores
)

// ============================================================
// SELLER STORE ROUTES
// ============================================================

// GET /api/stores/my-store
//
// Get the store belonging to the currently
// logged-in seller.
//
// IMPORTANT:
// This route MUST come before /:id
// Otherwise "my-store" will be treated as a MongoDB ObjectId.
router.get(
  '/my-store',
  protect,
  sellerOnly,
  getMyStore
)

// ============================================================
// BACKWARD-COMPATIBLE SELLER STORE ROUTE
// ============================================================

// GET /api/stores/seller/my-store
//
// Kept for compatibility with older frontend code.
router.get(
  '/seller/my-store',
  protect,
  sellerOnly,
  getMyStore
)

// ============================================================
// PUBLIC STORE BY SLUG
// ============================================================

// GET /api/stores/slug/:slug
//
// Example:
// /api/stores/slug/my-fashion-store
//
// IMPORTANT:
// This route MUST come before /:id
// so "slug/..." is handled correctly.
router.get(
  '/slug/:slug',
  getStoreBySlug
)

// ============================================================
// CREATE STORE
// ============================================================

// POST /api/stores
//
// Only an authenticated seller can create a store.
router.post(
  '/',
  protect,
  sellerOnly,
  createStore
)

// ============================================================
// UPDATE STORE
// ============================================================

// PUT /api/stores/:id
//
// Only the seller who owns the store can update it.
//
// IMPORTANT:
// This route is before the public GET /:id route,
// but HTTP methods are different, so there is no conflict.
router.put(
  '/:id',
  protect,
  sellerOnly,
  updateStore
)

// ============================================================
// PUBLIC STORE BY MONGODB ID
// ============================================================

// GET /api/stores/:id
//
// Example:
// /api/stores/68d123456789abcdef123456
//
// IMPORTANT:
// Keep this route LAST.
//
// Otherwise routes such as:
// /my-store
// /seller/my-store
// /slug/my-store
//
// could be incorrectly interpreted as :id.
router.get(
  '/:id',
  getStoreById
)

export default router
