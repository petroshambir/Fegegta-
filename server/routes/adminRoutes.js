

import express from 'express'

// ============================================================
// ADMIN CONTROLLERS
// ============================================================

import {
  // INITIAL ADMIN SETUP
  createInitialAdmin,

  // DASHBOARD
  getDashboard,

  // USERS
  getUsers,
  updateUserRole,

  // SELLERS
  getSellers,
  approveSeller,
  rejectSeller,

  // PRODUCTS
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,

  // STORES
  approveStore,

  // ORDERS
  getOrders,

  // NOTIFICATIONS
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,

  // ADMIN SETTINGS
  getAdminSettings,
  updateAdminSettings,
} from '../controllers/adminController.js'

// ============================================================
// MIDDLEWARE
// ============================================================

import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

// ============================================================
// ROUTER
// ============================================================

const router = express.Router()

// ============================================================
// INITIAL ADMIN SETUP
// ============================================================
//
// IMPORTANT:
// This route MUST be BEFORE:
//
// router.use(protect, adminOnly)
//
// because the first admin does not have a JWT token yet.
//
// Use this endpoint ONLY ONCE.
// After creating the admin:
// 1. Remove this route
// 2. Remove ADMIN_SETUP_SECRET from Render
// 3. Redeploy backend
//
// ============================================================

router.post(
  '/setup-initial-admin',
  createInitialAdmin
)

// ============================================================
// ALL OTHER ADMIN ROUTES
// ============================================================
//
// These routes require:
// 1. Valid JWT
// 2. role === "admin"
//
// ============================================================

router.use(
  protect,
  adminOnly
)

// ============================================================
// DASHBOARD
// ============================================================

router.get(
  '/dashboard',
  getDashboard
)

// ============================================================
// USERS
// ============================================================

router.get(
  '/users',
  getUsers
)

router.put(
  '/users/:id/role',
  updateUserRole
)

// ============================================================
// SELLERS
// ============================================================

router.get(
  '/sellers',
  getSellers
)

router.put(
  '/sellers/:id/approve',
  approveSeller
)

router.put(
  '/sellers/:id/reject',
  rejectSeller
)

// ============================================================
// STORES
// ============================================================

router.put(
  '/stores/:id/approve',
  approveStore
)

// ============================================================
// PRODUCTS
// ============================================================

// GET ALL PRODUCTS
router.get(
  '/products',
  getProducts
)

// CREATE PRODUCT
router.post(
  '/products',
  upload.array('images', 4),
  createProduct
)

// UPDATE PRODUCT
router.put(
  '/products/:id',
  upload.array('images', 4),
  updateProduct
)

// DELETE PRODUCT
router.delete(
  '/products/:id',
  deleteProduct
)

// APPROVE PRODUCT
router.put(
  '/products/:id/approve',
  approveProduct
)

// REJECT PRODUCT
router.put(
  '/products/:id/reject',
  rejectProduct
)

// ============================================================
// ORDERS
// ============================================================

router.get(
  '/orders',
  getOrders
)

// ============================================================
// NOTIFICATIONS
// ============================================================

router.get(
  '/notifications',
  getNotifications
)

router.put(
  '/notifications/:id/read',
  markNotificationAsRead
)

router.put(
  '/notifications/read-all',
  markAllNotificationsAsRead
)

// ============================================================
// ADMIN SETTINGS
// ============================================================

router.get(
  '/settings',
  getAdminSettings
)

router.put(
  '/settings',
  updateAdminSettings
)

// ============================================================
// EXPORT
// ============================================================

export default router