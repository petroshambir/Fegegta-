// import express from 'express'

// import {
//   registerUser,
//   loginUser,
//   getCurrentUser,
//   updateProfile,
//   updateSettings,
//   forgotPassword,
//   resetPassword,
// } from '../controllers/authController.js'

// import { protect } from '../middleware/authMiddleware.js'

// const router = express.Router()

// // ============================================================
// // PUBLIC ROUTES
// // ============================================================

// // Register
// router.post(
//   '/register',
//   registerUser
// )

// // Login
// router.post(
//   '/login',
//   loginUser
// )

// // Forgot password
// router.post(
//   '/forgot-password',
//   forgotPassword
// )

// // Reset password
// router.post(
//   '/reset-password/:token',
//   resetPassword
// )

// // ============================================================
// // PROTECTED ROUTES
// // ============================================================

// // Get currently logged-in user
// router.get(
//   '/me',
//   protect,
//   getCurrentUser
// )

// // Update currently logged-in user's profile
// router.put(
//   '/profile',
//   protect,
//   updateProfile
// )

// // Update currently logged-in user's settings
// router.put(
//   '/settings',
//   protect,
//   updateSettings
// )

// export default router


// import express from 'express'

// import {
//   registerUser,
//   loginUser,
//   getCurrentUser,
//   updateProfile,
//   updateSettings,
//   forgotPassword,
//   resetPassword,
// } from '../controllers/authController.js'

// import { protect } from '../middleware/authMiddleware.js'

// const router = express.Router()

// // ============================================================
// // PUBLIC ROUTES
// // ============================================================

// router.post(
//   '/register',
//   registerUser
// )

// router.post(
//   '/login',
//   loginUser
// )

// router.post(
//   '/forgot-password',
//   forgotPassword
// )

// router.post(
//   '/reset-password/:token',
//   resetPassword
// )

// // ============================================================
// // PROTECTED ROUTES
// // ============================================================

// router.get(
//   '/me',
//   protect,
//   getCurrentUser
// )

// router.put(
//   '/profile',
//   protect,
//   updateProfile
// )

// router.put(
//   '/settings',
//   protect,
//   updateSettings
// )

// export default router



import express from 'express'

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updateSettings,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// ============================================================
// PUBLIC ROUTES
// ============================================================

// Register
router.post(
  '/register',
  registerUser
)

// Login
router.post(
  '/login',
  loginUser
)

// Forgot password
router.post(
  '/forgot-password',
  forgotPassword
)

// Reset password
router.post(
  '/reset-password/:token',
  resetPassword
)

// ============================================================
// PROTECTED ROUTES
// ============================================================

// Current user
router.get(
  '/me',
  protect,
  getCurrentUser
)

// Update profile
router.put(
  '/profile',
  protect,
  updateProfile
)

// Update settings
router.put(
  '/settings',
  protect,
  updateSettings
)

export default router