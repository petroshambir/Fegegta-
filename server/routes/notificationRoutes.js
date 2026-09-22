import express from 'express'

import {
  getMyNotifications,
  getMyUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../controllers/notificationController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// ============================================================
// USER NOTIFICATIONS
// ============================================================

// Get all notifications
router.get(
  '/',
  protect,
  getMyNotifications
)

// Get unread notifications + count
router.get(
  '/unread',
  protect,
  getMyUnreadNotifications
)

// Mark all notifications as read
router.put(
  '/read-all',
  protect,
  markAllNotificationsAsRead
)

// Mark one notification as read
router.put(
  '/:id/read',
  protect,
  markNotificationAsRead
)

export default router