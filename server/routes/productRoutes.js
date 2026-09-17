// import express from 'express';

// import {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getMyProducts,
// } from '../controllers/productController.js';

// import { protect } from '../middleware/authMiddleware.js';
// import { sellerOnly } from '../middleware/sellerMiddleware.js';

// const router = express.Router();

// // Public product routes
// router.get('/', getProducts);
// router.get('/:id', getProductById);

// // Seller product routes
// router.get('/seller/my-products', protect, sellerOnly, getMyProducts);
// router.post('/', protect, sellerOnly, createProduct);
// router.put('/:id', protect, sellerOnly, updateProduct);
// router.delete('/:id', protect, sellerOnly, deleteProduct);

// export default router;

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

const router = express.Router()

// ============================================================
// PUBLIC PRODUCT ROUTES
// ============================================================

// Get all products
router.get('/', getProducts)

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
router.get('/:id', getProductById)

// ============================================================
// CREATE PRODUCT
// ============================================================

// Seller creates a product
router.post(
  '/',
  protect,
  sellerOnly,
  createProduct
)

// ============================================================
// UPDATE PRODUCT
// ============================================================

// Seller updates their product
router.put(
  '/:id',
  protect,
  sellerOnly,
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