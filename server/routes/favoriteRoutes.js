import express from 'express'

import {
  getFavorites,
  checkFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from '../controllers/favoriteController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All favorite routes require login
router.use(protect)

// Get current user's favorites
router.get('/', getFavorites)

// Check one product
router.get(
  '/check/:productId',
  checkFavorite
)

// Add
router.post(
  '/:productId',
  addFavorite
)

// Remove
router.delete(
  '/:productId',
  removeFavorite
)

// Toggle
router.patch(
  '/toggle/:productId',
  toggleFavorite
)

// Remove all
router.delete(
  '/clear/all',
  clearFavorites
)

export default router