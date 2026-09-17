// import express from 'express';

// import {
//   getDashboard,
//   getUsers,
//   getSellers,
//   approveSeller,
//   rejectSeller,
//   getProducts,
//   approveProduct,
//   rejectProduct,
//   getOrders,
// } from '../controllers/adminController.js';

// import { protect } from '../middleware/authMiddleware.js';
// import { adminOnly } from '../middleware/adminMiddleware.js';

// const router = express.Router();

// // All admin routes require authentication + admin role
// router.use(protect, adminOnly);

// // Dashboard
// router.get('/dashboard', getDashboard);

// // Users
// router.get('/users', getUsers);

// // Sellers
// router.get('/sellers', getSellers);
// router.put('/sellers/:id/approve', approveSeller);
// router.put('/sellers/:id/reject', rejectSeller);

// // Products
// router.get('/products', getProducts);
// router.put('/products/:id/approve', approveProduct);
// router.put('/products/:id/reject', rejectProduct);

// // Orders
// router.get('/orders', getOrders);

// export default router;

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
  approveProduct,
  rejectProduct,

  approveStore,

  getOrders,

  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../controllers/adminController.js'

// ============================================================
// MIDDLEWARE
// ============================================================

import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'

// ============================================================
// ROUTER
// ============================================================

const router = express.Router()

// ============================================================
// ALL ADMIN ROUTES
// Authentication + Admin Role Required
// ============================================================

router.use(protect, adminOnly)

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

router.get(
  '/products',
  getProducts
)

router.put(
  '/products/:id/approve',
  approveProduct
)

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
// EXPORT
// ============================================================

export default router