
// import User from '../models/User.js'
// import Product from '../models/Product.js'
// import Store from '../models/Store.js'
// import Order from '../models/Order.js'
// import Notification from '../models/Notification.js'

// // ============================================================
// // DASHBOARD SUMMARY
// // ============================================================

// export const getAdminDashboard = async (req, res, next) => {
//   try {
//     const [
//       users,
//       sellers,
//       products,
//       stores,
//       orders,
//       unreadNotifications,
//     ] = await Promise.all([
//       User.countDocuments(),
//       User.countDocuments({ role: 'seller' }),
//       Product.countDocuments(),
//       Store.countDocuments(),
//       Order.countDocuments(),
//       Notification.countDocuments({ read: false }),
//     ])

//     const salesResult = await Order.aggregate([
//       {
//         $match: {
//           status: {
//             $nin: ['cancelled'],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalSales: {
//             $sum: '$total',
//           },
//         },
//       },
//     ])

//     const totalSales =
//       salesResult[0]?.totalSales || 0

//     return res.status(200).json({
//       success: true,
//       dashboard: {
//         users,
//         sellers,
//         products,
//         stores,
//         orders,
//         unreadNotifications,
//         totalSales,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // USERS
// // ============================================================

// export const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find()
//       .select('-password')
//       .sort({ createdAt: -1 })

//     return res.status(200).json({
//       success: true,
//       users,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE USER ROLE
// // ============================================================

// export const updateUserRole = async (req, res, next) => {
//   try {
//     const { role } = req.body

//     const allowedRoles = [
//       'customer',
//       'seller',
//       'admin',
//     ]

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid user role.',
//       })
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).select('-password')

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'User role updated successfully.',
//       user,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // APPROVE STORE
// // ============================================================

// export const approveStore = async (req, res, next) => {
//   try {
//     const store = await Store.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: 'approved',
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Store approved successfully.',
//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // ADMIN NOTIFICATIONS
// // ============================================================

// export const getNotifications = async (req, res, next) => {
//   try {
//     const notifications = await Notification.find()
//       .sort({ createdAt: -1 })

//     return res.status(200).json({
//       success: true,
//       notifications,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const markNotificationAsRead = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const notification =
//       await Notification.findByIdAndUpdate(
//         req.params.id,
//         {
//           read: true,
//         },
//         {
//           new: true,
//         }
//       )

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: 'Notification not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       notification,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const markAllNotificationsAsRead = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     await Notification.updateMany(
//       {
//         read: false,
//       },
//       {
//         read: true,
//       }
//     )

//     return res.status(200).json({
//       success: true,
//       message: 'All notifications marked as read.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }


import User from '../models/User.js'
import Seller from '../models/Seller.js'
import Product from '../models/Product.js'
import Store from '../models/Store.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'

// ============================================================
// DASHBOARD
// ============================================================

export const getDashboard = async (req, res, next) => {
  try {
    const [
      users,
      sellers,
      products,
      stores,
      orders,
      unreadNotifications,
    ] = await Promise.all([
      User.countDocuments(),

      Seller.countDocuments(),

      Product.countDocuments(),

      Store.countDocuments(),

      Order.countDocuments(),

      Notification.countDocuments({
        read: false,
      }),
    ])

    const salesResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: 'cancelled',
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: '$total',
          },
        },
      },
    ])

    const totalSales =
      salesResult[0]?.totalSales || 0

    return res.status(200).json({
      success: true,

      dashboard: {
        users,
        sellers,
        products,
        stores,
        orders,
        unreadNotifications,
        totalSales,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// COMPATIBILITY ALIAS
// ============================================================

export const getAdminDashboard = getDashboard

// ============================================================
// USERS
// ============================================================

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE USER ROLE
// ============================================================

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body

    const allowedRoles = [
      'customer',
      'seller',
      'admin',
    ]

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user role.',
      })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User role updated successfully.',
      user,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLERS
// ============================================================

export const getSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find()
      .populate('user', 'name email phone role')
      .populate('store', 'name slug status')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      sellers,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// APPROVE SELLER
// ============================================================

export const approveSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email phone role')
      .populate('store', 'name slug status')

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Seller approved successfully.',
      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// REJECT SELLER
// ============================================================

export const rejectSeller = async (req, res, next) => {
  try {
    const { reason = '' } = req.body

    const seller = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email phone role')
      .populate('store', 'name slug status')

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: reason
        ? `Seller rejected: ${reason}`
        : 'Seller rejected successfully.',
      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// PRODUCTS
// ============================================================

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate(
        'seller',
        'businessName email phone status'
      )
      .populate(
        'store',
        'name slug status'
      )
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// APPROVE PRODUCT
// ============================================================

export const approveProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: 'approved',
        rejectionReason: '',
        isActive: true,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        'seller',
        'businessName email phone status'
      )
      .populate(
        'store',
        'name slug status'
      )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product approved successfully.',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// REJECT PRODUCT
// ============================================================

export const rejectProduct = async (req, res, next) => {
  try {
    const { reason = '' } = req.body

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: 'rejected',
        rejectionReason: reason,
        isActive: false,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        'seller',
        'businessName email phone status'
      )
      .populate(
        'store',
        'name slug status'
      )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: reason
        ? `Product rejected: ${reason}`
        : 'Product rejected successfully.',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// STORES
// ============================================================

export const approveStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('seller', 'name email')
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Store approved successfully.',
      store,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// ORDERS
// ============================================================

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone')
      .populate('items.product')
      .populate(
        'items.seller',
        'businessName email phone status'
      )
      .populate(
        'items.store',
        'name slug status'
      )

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export const getNotifications = async (
  req,
  res,
  next
) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      notifications,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// MARK ONE NOTIFICATION AS READ
// ============================================================

export const markNotificationAsRead = async (
  req,
  res,
  next
) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          read: true,
        },
        {
          new: true,
        }
      )

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.',
      })
    }

    return res.status(200).json({
      success: true,
      notification,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// ============================================================

export const markAllNotificationsAsRead = async (
  req,
  res,
  next
) => {
  try {
    await Notification.updateMany(
      {
        read: false,
      },
      {
        read: true,
      }
    )

    return res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    })
  } catch (error) {
    next(error)
  }
}