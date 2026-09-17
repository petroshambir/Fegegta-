
// import Order from '../models/Order.js'
// import Product from '../models/Product.js'
// import Store from '../models/Store.js'

// // ============================================================
// // SELLER DASHBOARD
// // ============================================================

// export const getSellerDashboard = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const sellerId = req.user.id

//     const [
//       products,
//       stores,
//       orders,
//     ] = await Promise.all([
//       Product.countDocuments({
//         seller: sellerId,
//       }),

//       Store.countDocuments({
//         seller: sellerId,
//       }),

//       Order.countDocuments({
//         'items.seller': sellerId,
//       }),
//     ])

//     const salesResult = await Order.aggregate([
//       {
//         $match: {
//           'items.seller': sellerId,
//           status: {
//             $nin: ['cancelled'],
//           },
//         },
//       },
//       {
//         $unwind: '$items',
//       },
//       {
//         $match: {
//           'items.seller': sellerId,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           sales: {
//             $sum: {
//               $multiply: [
//                 '$items.price',
//                 '$items.quantity',
//               ],
//             },
//           },
//         },
//       },
//     ])

//     return res.status(200).json({
//       success: true,
//       dashboard: {
//         products,
//         stores,
//         orders,
//         sales: salesResult[0]?.sales || 0,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // SELLER PRODUCTS
// // ============================================================

// export const getSellerProducts = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const products = await Product.find({
//       seller: req.user.id,
//     })
//       .populate('store', 'name slug')
//       .sort({ createdAt: -1 })

//     return res.status(200).json({
//       success: true,
//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // SELLER ORDERS
// // ============================================================

// export const getSellerOrders = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const orders = await Order.find({
//       'items.seller': req.user.id,
//     })
//       .sort({ createdAt: -1 })
//       .populate('user', 'name email')
//       .populate('items.product')
//       .populate('items.seller', 'name email')
//       .populate('items.store', 'name slug')

//     return res.status(200).json({
//       success: true,
//       orders,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE SELLER ORDER STATUS
// // ============================================================

// export const updateSellerOrderStatus = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const order = await Order.findById(
//       req.params.id
//     )

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found.',
//       })
//     }

//     const sellerHasItem = order.items.some(
//       (item) =>
//         String(item.seller) ===
//         String(req.user.id)
//     )

//     if (!sellerHasItem) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'This order does not contain your products.',
//       })
//     }

//     const { status } = req.body

//     const allowedStatuses = [
//       'processing',
//       'shipped',
//       'delivered',
//     ]

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid seller order status.',
//       })
//     }

//     order.status = status

//     await order.save()

//     return res.status(200).json({
//       success: true,
//       message: 'Order status updated successfully.',
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // SELLER STORE
// // ============================================================

// export const getMyStore = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const store = await Store.findOne({
//       seller: req.user.id,
//     }).populate(
//       'seller',
//       'name email'
//     )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Store from '../models/Store.js'
import Seller from '../models/Seller.js'

// ============================================================
// SELLER PROFILE
// ============================================================

export const getSellerProfile = async (
  req,
  res,
  next
) => {
  try {
    const seller = await Seller.findOne({
      user: req.user.id,
    })
      .populate(
        'user',
        'name email phone role'
      )
      .populate(
        'store',
        'name slug description logo banner status'
      )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller profile not found.',
      })
    }

    return res.status(200).json({
      success: true,
      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE SELLER PROFILE
// ============================================================

export const updateSellerProfile = async (
  req,
  res,
  next
) => {
  try {
    const seller = await Seller.findOne({
      user: req.user.id,
    })

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller profile not found.',
      })
    }

    const {
      businessName,
      phone,
      email,
      address,
      description,
      logo,
      documents,
    } = req.body

    if (businessName !== undefined) {
      seller.businessName = businessName
    }

    if (phone !== undefined) {
      seller.phone = phone
    }

    if (email !== undefined) {
      seller.email = email
    }

    if (address !== undefined) {
      seller.address = address
    }

    if (description !== undefined) {
      seller.description = description
    }

    if (logo !== undefined) {
      seller.logo = logo
    }

    if (documents !== undefined) {
      seller.documents = documents
    }

    await seller.save()

    const updatedSeller =
      await Seller.findById(seller._id)
        .populate(
          'user',
          'name email phone role'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

    return res.status(200).json({
      success: true,
      message:
        'Seller profile updated successfully.',
      seller: updatedSeller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLER DASHBOARD
// ============================================================

export const getSellerDashboard = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const [
      products,
      stores,
      orders,
    ] = await Promise.all([
      Product.countDocuments({
        seller: sellerId,
      }),

      Store.countDocuments({
        seller: sellerId,
      }),

      Order.countDocuments({
        'items.seller': sellerId,
      }),
    ])

    const salesResult = await Order.aggregate([
      {
        $match: {
          'items.seller': sellerId,
          status: {
            $nin: ['cancelled'],
          },
        },
      },

      {
        $unwind: '$items',
      },

      {
        $match: {
          'items.seller': sellerId,
        },
      },

      {
        $group: {
          _id: null,

          sales: {
            $sum: {
              $multiply: [
                '$items.price',
                '$items.quantity',
              ],
            },
          },
        },
      },
    ])

    return res.status(200).json({
      success: true,

      dashboard: {
        products,
        stores,
        orders,
        sales:
          salesResult[0]?.sales || 0,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLER PRODUCTS
// ============================================================

export const getSellerProducts = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const products = await Product.find({
      seller: sellerId,
    })
      .populate(
        'store',
        'name slug status'
      )
      .sort({
        createdAt: -1,
      })

    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLER ORDERS
// ============================================================

export const getSellerOrders = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const orders = await Order.find({
      'items.seller': sellerId,
    })
      .sort({
        createdAt: -1,
      })
      .populate(
        'user',
        'name email phone'
      )
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
// SELLER SALES
// ============================================================

export const getSellerSales = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const sales = await Order.aggregate([
      {
        $match: {
          'items.seller': sellerId,
          status: {
            $nin: ['cancelled'],
          },
        },
      },

      {
        $unwind: '$items',
      },

      {
        $match: {
          'items.seller': sellerId,
        },
      },

      {
        $group: {
          _id: null,

          totalSales: {
            $sum: {
              $multiply: [
                '$items.price',
                '$items.quantity',
              ],
            },
          },

          totalItems: {
            $sum: '$items.quantity',
          },

          totalOrders: {
            $addToSet: '$_id',
          },
        },
      },
    ])

    const result = sales[0]

    return res.status(200).json({
      success: true,

      sales: {
        totalSales:
          result?.totalSales || 0,

        totalItems:
          result?.totalItems || 0,

        totalOrders:
          result?.totalOrders?.length || 0,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE SELLER ORDER STATUS
// ============================================================

export const updateSellerOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const order = await Order.findById(
      req.params.id
    )

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      })
    }

    const sellerHasItem = order.items.some(
      (item) =>
        String(item.seller) ===
        String(sellerId)
    )

    if (!sellerHasItem) {
      return res.status(403).json({
        success: false,
        message:
          'This order does not contain your products.',
      })
    }

    const { status } = req.body

    const allowedStatuses = [
      'processing',
      'shipped',
      'delivered',
    ]

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid seller order status.',
      })
    }

    order.status = status

    await order.save()

    return res.status(200).json({
      success: true,
      message:
        'Order status updated successfully.',
      order,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLER STORE
// ============================================================

export const getMyStore = async (
  req,
  res,
  next
) => {
  try {
    const sellerId = req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const store = await Store.findOne({
      seller: sellerId,
    }).populate(
      'seller',
      'businessName email phone status'
    )

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    return res.status(200).json({
      success: true,
      store,
    })
  } catch (error) {
    next(error)
  }
}