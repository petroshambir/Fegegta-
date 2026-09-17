
// import Order from '../models/Order.js'
// import Product from '../models/Product.js'

// import {
//   generateOrderNumber,
// } from '../utils/generateOrderNumber.js'

// // ============================================================
// // CREATE ORDER
// // ============================================================

// export const createOrder = async (req, res, next) => {
//   try {
//     const {
//       customer,
//       items,
//       shippingMethod,
//       paymentMethod,
//       subtotal,
//       shipping,
//       total,
//     } = req.body

//     if (!customer?.email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Customer email is required.',
//       })
//     }

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Order must contain at least one product.',
//       })
//     }

//     const orderItems = []

//     for (const item of items) {
//       const product = await Product.findById(item.product || item._id)

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: `Product not found: ${item.name || item._id}`,
//         })
//       }

//       orderItems.push({
//         product: product._id,
//         seller: product.seller,
//         store: product.store,
//         name: product.name,
//         image:
//           item.image ||
//           product.images?.[0] ||
//           '',
//         price: Number(item.price ?? product.price ?? 0),
//         quantity: Number(item.quantity) || 1,
//         sizeData: item.sizeData || {},
//       })
//     }

//     const order = await Order.create({
//       orderNumber: generateOrderNumber(),
//       user: req.user?.id || null,

//       customer,

//       items: orderItems,

//       shippingMethod,
//       paymentMethod,

//       subtotal: Number(subtotal || 0),
//       shipping: Number(shipping || 0),
//       total: Number(total || 0),

//       status: 'pending',
//     })

//     return res.status(201).json({
//       success: true,
//       message: 'Order created successfully.',
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET CUSTOMER ORDERS
// // ============================================================

// export const getMyOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.find({
//       $or: [
//         { user: req.user.id },
//         { 'customer.email': req.user.email },
//       ],
//     })
//       .sort({ createdAt: -1 })
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
// // GET SINGLE ORDER
// // ============================================================

// export const getOrderById = async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate('items.product')
//       .populate('items.seller', 'name email')
//       .populate('items.store', 'name slug')

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found.',
//       })
//     }

//     const isAdmin = req.user.role === 'admin'

//     const isOwner =
//       order.user &&
//       String(order.user) === String(req.user.id)

//     if (!isAdmin && !isOwner) {
//       return res.status(403).json({
//         success: false,
//         message: 'You are not allowed to view this order.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET ALL ORDERS — ADMIN
// // ============================================================

// export const getAllOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.find()
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
// // UPDATE ORDER STATUS — ADMIN
// // ============================================================

// export const updateOrderStatus = async (req, res, next) => {
//   try {
//     const { status } = req.body

//     const allowedStatuses = [
//       'pending',
//       'confirmed',
//       'processing',
//       'shipped',
//       'delivered',
//       'cancelled',
//     ]

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid order status.',
//       })
//     }

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       {
//         new: true,
//         runValidators: true,
//       }
//     )

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Order status updated successfully.',
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import Order from '../models/Order.js'
import Product from '../models/Product.js'

import {
  generateOrderNumber,
} from '../utils/generateOrderNumber.js'

// ============================================================
// CREATE ORDER
// ============================================================

export const createOrder = async (req, res, next) => {
  try {
    const {
      customer,
      items,
      shippingMethod,
      paymentMethod,
      subtotal,
      shipping,
      total,
    } = req.body

    if (!customer?.email) {
      return res.status(400).json({
        success: false,
        message: 'Customer email is required.',
      })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one product.',
      })
    }

    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(
        item.product || item._id
      )

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${
            item.name || item._id
          }`,
        })
      }

      // Make sure requested quantity is valid
      const quantity = Number(item.quantity) || 1

      if (quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Product quantity must be at least 1.',
        })
      }

      // Check stock when stock is available
      if (
        product.stock !== undefined &&
        product.stock < quantity
      ) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}.`,
        })
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        store: product.store,
        name: product.name,
        image:
          item.image ||
          product.images?.[0] ||
          '',
        price: Number(
          item.price ?? product.price ?? 0
        ),
        quantity,
        sizeData: item.sizeData || {},
      })
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: req.user?.id || null,

      customer,

      items: orderItems,

      shippingMethod,
      paymentMethod,

      subtotal: Number(subtotal || 0),
      shipping: Number(shipping || 0),
      total: Number(total || 0),

      status: 'pending',
    })

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET CUSTOMER ORDERS
// ============================================================

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      $or: [
        { user: req.user.id },
        { 'customer.email': req.user.email },
      ],
    })
      .sort({ createdAt: -1 })
      .populate('items.product')
      .populate('items.seller', 'name email')
      .populate('items.store', 'name slug')

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET SINGLE ORDER
// ============================================================

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('items.seller', 'name email')
      .populate('items.store', 'name slug')

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      })
    }

    const isAdmin = req.user.role === 'admin'

    const isOwner =
      order.user &&
      String(order.user) === String(req.user.id)

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to view this order.',
      })
    }

    return res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET ALL ORDERS — ADMIN
// ============================================================

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items.product')
      .populate('items.seller', 'name email')
      .populate('items.store', 'name slug')

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CANCEL ORDER
// ============================================================

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      })
    }

    const isAdmin = req.user.role === 'admin'

    const isOwner =
      order.user &&
      String(order.user) === String(req.user.id)

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to cancel this order.',
      })
    }

    if (
      ['shipped', 'delivered', 'cancelled'].includes(
        order.status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'This order cannot be cancelled at this stage.',
      })
    }

    order.status = 'cancelled'

    await order.save()

    return res.status(200).json({
      success: true,
      message: 'Order cancelled successfully.',
      order,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE ORDER STATUS — ADMIN
// ============================================================

export const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body

    const allowedStatuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status.',
      })
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      })
    }

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