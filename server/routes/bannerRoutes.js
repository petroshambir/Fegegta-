import express from 'express'

import {
  getActiveBanners,
} from '../controllers/bannerController.js'

const router = express.Router()

// ============================================================
// PUBLIC
// ============================================================

router.get(
  '/',
  getActiveBanners
)

export default router