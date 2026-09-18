
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
// SINGLE PRODUCT
// ============================================================

// Get one product by ID
router.get(
  '/:id',
  getProductById
)

// ============================================================
// CREATE PRODUCT
// ============================================================

// Seller creates a product
//
// images:
// - Maximum 4 images
// - Uploaded directly to Cloudinary
//
router.post(
  '/',
  protect,
  sellerOnly,
  upload.array('images', 4),
  createProduct
)

// ============================================================
// UPDATE PRODUCT
// ============================================================

// Seller updates their product
//
// New images can also be uploaded.
// Maximum total images remains 4 inside controller.
//
router.put(
  '/:id',
  protect,
  sellerOnly,
  upload.array('images', 4),
  updateProduct
)

// ============================================================
// DELETE PRODUCT
// ============================================================

// Seller deletes their product
router.delete(
  '/:id',
  protect,
  sellerOnly,
  deleteProduct
)

export default router