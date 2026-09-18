

import express from 'express'

import {
  createSellerApplication,
  getMySellerApplication,
  getSellerApplications,
  getSellerApplicationById,
  updateSellerApplicationStatus,
  deleteSellerApplication,
} from '../controllers/sellerApplicationController.js'

import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router()

// ============================================================
// CUSTOMER / USER
// ============================================================

// Submit seller application
router.post(
  '/',
  protect,
  createSellerApplication
)

// Get my seller application
router.get(
  '/my-application',
  protect,
  getMySellerApplication
)

// ============================================================
// ADMIN
// ============================================================

// Get all seller applications
router.get(
  '/',
  protect,
  adminOnly,
  getSellerApplications
)

// Get one seller application
router.get(
  '/:id',
  protect,
  adminOnly,
  getSellerApplicationById
)

// Approve / reject / suspend / deactivate seller
router.put(
  '/:id/status',
  protect,
  adminOnly,
  updateSellerApplicationStatus
)

// Delete seller application
router.delete(
  '/:id',
  protect,
  adminOnly,
  deleteSellerApplication
)

export default router