import {
  getUserNotificationsService,
  getUnreadNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
} from '../services/notificationService.js'

// ============================================================
// GET MY NOTIFICATIONS
// ============================================================

export const getMyNotifications = async (req, res) => {
  try {
    const notifications =
      await getUserNotificationsService(
        req.user._id
      )

    return res.status(200).json({
      success: true,
      notifications,
    })
  } catch (error) {
    console.error(
      'Get notifications error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to load notifications.',
    })
  }
}

// ============================================================
// GET MY UNREAD NOTIFICATIONS
// ============================================================

export const getMyUnreadNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await getUnreadNotificationsService(
        req.user._id
      )

    return res.status(200).json({
      success: true,
      notifications,
      count: notifications.length,
    })
  } catch (error) {
    console.error(
      'Get unread notifications error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to load unread notifications.',
    })
  }
}

// ============================================================
// MARK ONE NOTIFICATION AS READ
// ============================================================

export const markNotificationAsRead = async (
  req,
  res
) => {
  try {
    const { id } = req.params

    const notification =
      await markNotificationAsReadService(
        id,
        req.user._id
      )

    return res.status(200).json({
      success: true,
      message:
        'Notification marked as read.',
      notification,
    })
  } catch (error) {
    console.error(
      'Mark notification as read error:',
      error
    )

    const statusCode =
      error.message ===
      'Notification not found'
        ? 404
        : error.message.includes(
            'not authorized'
          )
        ? 403
        : 500

    return res.status(statusCode).json({
      success: false,
      message:
        error.message ||
        'Failed to mark notification as read.',
    })
  }
}

// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// ============================================================

export const markAllNotificationsAsRead =
  async (req, res) => {
    try {
      const result =
        await markAllNotificationsAsReadService(
          req.user._id
        )

      return res.status(200).json({
        success: true,
        message:
          result.message ||
          'All notifications marked as read.',
      })
    } catch (error) {
      console.error(
        'Mark all notifications as read error:',
        error
      )

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          'Failed to mark all notifications as read.',
      })
    }
  }