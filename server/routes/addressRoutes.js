import express from 'express'

import {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// ============================================================
// ALL ADDRESS ROUTES ARE PROTECTED
// ============================================================

router.use(protect)

// ============================================================
// ADDRESS ROUTES
// ============================================================

router.get('/', getAddresses)

router.get('/:id', getAddressById)

router.post('/', createAddress)

router.put('/:id', updateAddress)

router.delete('/:id', deleteAddress)

export default router