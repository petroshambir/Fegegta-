import express from 'express'

import {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBanner,
} from '../controllers/bannerController.js'

import {
  protect,
  adminOnly,
} from '../middleware/authMiddleware.js'

import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// ============================================================
// ADMIN AUTHENTICATION
// ============================================================

router.use(
  protect,
  adminOnly
)

// ============================================================
// GET ALL BANNERS
// ============================================================

router.get(
  '/',
  getAllBanners
)

// ============================================================
// CREATE BANNER
// ============================================================

router.post(
  '/',
  upload.single('image'),
  createBanner
)

// ============================================================
// UPDATE BANNER
// ============================================================

router.put(
  '/:id',
  upload.single('image'),
  updateBanner
)

// ============================================================
// DELETE BANNER
// ============================================================

router.delete(
  '/:id',
  deleteBanner
)

// ============================================================
// TOGGLE ACTIVE / INACTIVE
// ============================================================

router.patch(
  '/:id/toggle',
  toggleBanner
)

export default router