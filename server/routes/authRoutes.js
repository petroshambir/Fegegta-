// import express from 'express';

// import {
//   registerUser,
//   loginUser,
//   getMe,
//   updateProfile,
// } from '../controllers/authController.js';

// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Public routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Protected routes
// router.get('/me', protect, getMe);
// router.put('/profile', protect, updateProfile);

// export default router;


import express from 'express'

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from '../controllers/authController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// ============================================================
// PUBLIC ROUTES
// ============================================================

router.post('/register', registerUser)

router.post('/login', loginUser)

// ============================================================
// PROTECTED ROUTES
// ============================================================

router.get('/me', protect, getCurrentUser)

export default router