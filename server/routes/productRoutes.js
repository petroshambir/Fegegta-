
// import express from 'express'

// import {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getMyProducts,
// } from '../controllers/productController.js'

// import { protect } from '../middleware/authMiddleware.js'

// import { sellerOnly } from '../middleware/sellerMiddleware.js'

// import upload from '../middleware/uploadMiddleware.js'

// const router = express.Router()

// // ============================================================
// // PUBLIC PRODUCT ROUTES
// // ============================================================

// // Get all approved and active products
// router.get(
//   '/',
//   getProducts
// )

// // ============================================================
// // SELLER PRODUCT ROUTES
// // ============================================================

// // Get products belonging to the logged-in seller
// router.get(
//   '/seller/my-products',
//   protect,
//   sellerOnly,
//   getMyProducts
// )

// // ============================================================
// // SINGLE PRODUCT
// // ============================================================

// // Get one product by ID
// router.get(
//   '/:id',
//   getProductById
// )

// // ============================================================
// // CREATE PRODUCT
// // ============================================================

// // Seller creates a product
// //
// // images:
// // - Maximum 4 images
// // - Uploaded directly to Cloudinary
// //
// router.post(
//   '/',
//   protect,
//   sellerOnly,
//   upload.array('images', 4),
//   createProduct
// )

// // ============================================================
// // UPDATE PRODUCT
// // ============================================================

// // Seller updates their product
// //
// // New images can also be uploaded.
// // Maximum total images remains 4 inside controller.
// //
// router.put(
//   '/:id',
//   protect,
//   sellerOnly,
//   upload.array('images', 4),
//   updateProduct
// )

// // ============================================================
// // DELETE PRODUCT
// // ============================================================

// // Seller deletes their product
// router.delete(
//   '/:id',
//   protect,
//   sellerOnly,
//   deleteProduct
// )

// export default router

import express from 'express'

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from '../controllers/productController.js'

import { protect } from '../middleware/authMiddleware.js'
import { sellerOnly } from '../middleware/sellerMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// ============================================================
// PUBLIC PRODUCT ROUTES
// ============================================================

// Get all approved and active products
router.get(
  '/',
  getProducts
)

// ============================================================
// SELLER PRODUCT ROUTES
// ============================================================

// Get products belonging to the logged-in seller
router.get(
  '/seller/my-products',
  protect,
  sellerOnly,
  getMyProducts
)

// ============================================================
// CREATE SELLER PRODUCT
// ============================================================
//
// IMPORTANT:
// Frontend calls:
//
// POST /api/products/seller
//
// Therefore this route MUST be:
//
// router.post('/seller', ...)
//

router.post(
  '/seller',
  protect,
  sellerOnly,
  upload.array('images', 4),
  createProduct
)

// ============================================================
// SINGLE PRODUCT
// ============================================================

// Get one approved product by ID
//
// IMPORTANT:
// This must come AFTER the seller routes.
// Otherwise "/seller" could be treated as an ID.

router.get(
  '/:id',
  getProductById
)

// ============================================================
// UPDATE SELLER PRODUCT
// ============================================================

// Seller updates their own product
//
// Frontend:
//
// PUT /api/products/seller/:id

router.put(
  '/seller/:id',
  protect,
  sellerOnly,
  upload.array('images', 4),
  updateProduct
)

// ============================================================
// DELETE SELLER PRODUCT
// ============================================================

// Seller deletes their own product
//
// Frontend:
//
// DELETE /api/products/seller/:id

router.delete(
  '/seller/:id',
  protect,
  sellerOnly,
  deleteProduct
)

// ============================================================
// EXPORT ROUTER
// ============================================================

export default router