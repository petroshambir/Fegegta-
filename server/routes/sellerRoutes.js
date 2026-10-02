
// import express from 'express'

// import {
//   getSellerDashboard,
//   getSellerProfile,
//   updateSellerProfile,
//   getSellerOrders,
//   getSellerSales,
//   getMyStore,
//   updateMyStore,
// } from '../controllers/sellerController.js'

// import { protect } from '../middleware/authMiddleware.js'
// import { sellerOnly } from '../middleware/sellerMiddleware.js'
// import upload from '../middleware/uploadMiddleware.js'

// const router = express.Router()

// // All seller routes require authentication and seller access.
// router.use(protect, sellerOnly)

// router.get('/dashboard', getSellerDashboard)

// router.get('/profile', getSellerProfile)
// router.put('/profile', updateSellerProfile)

// // Seller store settings and image upload.
// router.get('/store', getMyStore)
// router.put(
//   '/store',
//   upload.fields([
//     { name: 'logo', maxCount: 1 },
//     { name: 'coverImage', maxCount: 1 },
//   ]),
//   updateMyStore
// )

// router.get('/orders', getSellerOrders)
// router.get('/sales', getSellerSales)

// export default router


// import express from 'express'

// import {
//   getSellerDashboard,
//   getSellerProfile,
//   updateSellerProfile,
//   getSellerOrders,
//   getSellerSales,
//   getMyStore,
//   updateMyStore,
//   getSellerNotifications,
//   markSellerNotificationAsRead,
//   markAllSellerNotificationsAsRead,
// } from '../controllers/sellerController.js'

// import { protect } from '../middleware/authMiddleware.js'
// import { sellerOnly } from '../middleware/sellerMiddleware.js'
// import upload from '../middleware/uploadMiddleware.js'

// const router = express.Router()

// // All seller routes require authentication and seller access.
// router.use(protect, sellerOnly)

// router.get('/dashboard', getSellerDashboard)

// router.get('/profile', getSellerProfile)
// router.put('/profile', updateSellerProfile)

// // Seller store settings and image upload.
// router.get('/store', getMyStore)
// router.put(
//   '/store',
//   upload.fields([
//     { name: 'logo', maxCount: 1 },
//     { name: 'coverImage', maxCount: 1 },
//   ]),
//   updateMyStore
// )

// router.get('/orders', getSellerOrders)
// router.get('/sales', getSellerSales)

// // Seller notifications.
// router.get('/notifications', getSellerNotifications)
// router.put('/notifications/read-all', markAllSellerNotificationsAsRead)
// router.put('/notifications/:id/read', markSellerNotificationAsRead)

// export default router


import express from 'express'

import {
  getSellerDashboard,
  getSellerProfile,
  updateSellerProfile,
  getSellerOrders,
  getSellerProducts,
  getSellerSales,
  getMyStore,
  updateMyStore,
  getSellerNotifications,
  markSellerNotificationAsRead,
  markAllSellerNotificationsAsRead,
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
router.get('/products', getSellerProducts)
router.get('/sales', getSellerSales)

// Seller notifications.
router.get('/notifications', getSellerNotifications)
router.put('/notifications/read-all', markAllSellerNotificationsAsRead)
router.put('/notifications/:id/read', markSellerNotificationAsRead)

export default router
