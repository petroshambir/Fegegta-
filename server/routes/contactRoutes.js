
import express from 'express'

import {
  sendContactMessage,
} from '../controllers/contactController.js'

const router = express.Router()

// ============================================================
// SEND CONTACT MESSAGE
// POST /api/contact
// ============================================================

router.post(
  '/',
  sendContactMessage
)

export default router

