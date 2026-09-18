

import express from 'express'

// ============================================================
// ADMIN CONTROLLERS
// ============================================================

import {
  getDashboard,

  getUsers,
  updateUserRole,

  getSellers,
  approveSeller,
  rejectSeller,

  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,

  approveStore,

  getOrders,

  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,

  // ==========================================================
  // ADMIN SETTINGS
  // ==========================================================

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
// ALL ADMIN ROUTES
//
// Authentication + Admin Role Required
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

// ------------------------------------------------------------
// GET ALL PRODUCTS
// ------------------------------------------------------------

router.get(
  '/products',
  getProducts
)

// ------------------------------------------------------------
// CREATE PRODUCT FROM ADMIN
// ------------------------------------------------------------

router.post(
  '/products',
  upload.array('images', 4),
  createProduct
)

// ------------------------------------------------------------
// UPDATE PRODUCT FROM ADMIN
// ------------------------------------------------------------

router.put(
  '/products/:id',
  upload.array('images', 4),
  updateProduct
)

// ------------------------------------------------------------
// DELETE PRODUCT FROM ADMIN
// ------------------------------------------------------------

router.delete(
  '/products/:id',
  deleteProduct
)

// ------------------------------------------------------------
// APPROVE SELLER PRODUCT
// ------------------------------------------------------------

router.put(
  '/products/:id/approve',
  approveProduct
)

// ------------------------------------------------------------
// REJECT SELLER PRODUCT
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// GET ADMIN SETTINGS
// ------------------------------------------------------------

router.get(
  '/settings',
  getAdminSettings
)

// ------------------------------------------------------------
// UPDATE ADMIN SETTINGS
// ------------------------------------------------------------

router.put(
  '/settings',
  updateAdminSettings
)

// ============================================================
// EXPORT
// ============================================================

export default router