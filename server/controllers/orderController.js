// import Order from '../models/Order.js'
// import Product from '../models/Product.js'
// import Commission from '../models/Commission.js'
// import CommissionSetting from '../models/CommissionSetting.js'

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
//       paymentMethod,
//       shipping,
//       shippingCost,
//       discount,
//       notes,
//     } = req.body

//     // ========================================================
//     // AUTHENTICATED CUSTOMER
//     // ========================================================

//     const customerId =
//       req.user?._id ||
//       req.user?.id

//     if (!customerId) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'You must be logged in to place an order.',
//       })
//     }

//     // ========================================================
//     // CUSTOMER INFORMATION
//     // ========================================================

//     if (!customer) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Customer information is required.',
//       })
//     }

//     const requiredCustomerFields = [
//       'firstName',
//       'lastName',
//       'email',
//       'phone',
//       'address',
//       'city',
//       'country',
//     ]

//     for (const field of requiredCustomerFields) {
//       if (!String(customer[field] || '').trim()) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `Customer field "${field}" is required.`,
//         })
//       }
//     }

//     // ========================================================
//     // ITEMS VALIDATION
//     // ========================================================

//     if (
//       !Array.isArray(items) ||
//       items.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Order must contain at least one product.',
//       })
//     }

//     // ========================================================
//     // BUILD ORDER ITEMS
//     // ========================================================

//     const orderItems = []

//     for (const item of items) {
//       const productId =
//         item.product ||
//         item.productId ||
//         item._id ||
//         item.id

//       if (!productId) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'A product ID is missing from the order.',
//         })
//       }

//       const product =
//         await Product.findById(productId)

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message:
//             `Product not found: ${productId}`,
//         })
//       }

//       // ======================================================
//       // PRODUCT STATUS
//       // ======================================================

//       if (!product.isActive) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `${product.name} is currently unavailable.`,
//         })
//       }

//       if (
//         product.approvalStatus &&
//         product.approvalStatus !== 'approved'
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `${product.name} is not available for purchase.`,
//         })
//       }

//       // ======================================================
//       // SELLER / STORE
//       // ======================================================

//       if (!product.seller) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `${product.name} does not have a seller assigned.`,
//         })
//       }

//       if (!product.store) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `${product.name} does not have a store assigned.`,
//         })
//       }

//       // ======================================================
//       // QUANTITY
//       // ======================================================

//       const quantity =
//         Number(item.quantity)

//       if (
//         !Number.isInteger(quantity) ||
//         quantity < 1
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `Invalid quantity for ${product.name}.`,
//         })
//       }

//       // ======================================================
//       // STOCK
//       // ======================================================

//       if (
//         Number(product.stock) < quantity
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `Not enough stock for ${product.name}. Available stock: ${product.stock}.`,
//         })
//       }

//       // ======================================================
//       // SERVER-TRUSTED PRICE
//       // ======================================================

//       const price =
//         Number(product.price)

//       if (
//         !Number.isFinite(price) ||
//         price < 0
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             `Invalid price for ${product.name}.`,
//         })
//       }

//       const itemSubtotal =
//         Number(
//           (price * quantity).toFixed(2)
//         )

//       // ======================================================
//       // SIZE / COLOR
//       // ======================================================

//       const size =
//         item.size ||
//         item.sizeData?.size ||
//         ''

//       const color =
//         item.color ||
//         item.sizeData?.color ||
//         ''

//       // ======================================================
//       // SIZE DATA / MEASUREMENTS
//       // ======================================================

//       const sizeData =
//         item.sizeData &&
//         typeof item.sizeData === 'object'
//           ? item.sizeData
//           : {}

//       // ======================================================
//       // PRODUCT IMAGE
//       // ======================================================

//       const firstImage =
//         product.images?.[0]

//       const image =
//         typeof firstImage === 'object'
//           ? firstImage?.url || ''
//           : firstImage || ''

//       // ======================================================
//       // PUSH ORDER ITEM
//       // ======================================================

//       orderItems.push({
//         product: product._id,

//         seller: product.seller,

//         store: product.store,

//         name: product.name,

//         image,

//         price,

//         quantity,

//         size,

//         color,

//         sizeData,

//         subtotal: itemSubtotal,
//       })
//     }

//     // ========================================================
//     // CALCULATE SUBTOTAL FROM DATABASE PRODUCTS
//     // ========================================================

//     const calculatedSubtotal =
//       Number(
//         orderItems
//           .reduce(
//             (sum, item) =>
//               sum +
//               Number(item.subtotal || 0),
//             0
//           )
//           .toFixed(2)
//       )

//     // ========================================================
//     // SHIPPING COST
//     // ========================================================

//     const calculatedShipping =
//       Number(
//         shippingCost ??
//         shipping ??
//         0
//       )

//     if (
//       !Number.isFinite(calculatedShipping) ||
//       calculatedShipping < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid shipping cost.',
//       })
//     }

//     // ========================================================
//     // DISCOUNT
//     // ========================================================

//     const calculatedDiscount =
//       Number(discount || 0)

//     if (
//       !Number.isFinite(calculatedDiscount) ||
//       calculatedDiscount < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid discount.',
//       })
//     }

//     if (
//       calculatedDiscount >
//       calculatedSubtotal +
//         calculatedShipping
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Discount cannot be greater than the order amount.',
//       })
//     }

//     // ========================================================
//     // CALCULATE FINAL TOTAL
//     // ========================================================

//     const calculatedTotal =
//       Number(
//         (
//           calculatedSubtotal +
//           calculatedShipping -
//           calculatedDiscount
//         ).toFixed(2)
//       )

//     // ========================================================
//     // PAYMENT METHOD
//     // ========================================================

//     let normalizedPaymentMethod =
//       paymentMethod ||
//       'cash_on_delivery'

//     // Checkout.jsx sends "card"
//     // Order.js expects "stripe"

//     if (
//       normalizedPaymentMethod === 'card'
//     ) {
//       normalizedPaymentMethod =
//         'stripe'
//     }

//     // Checkout.jsx sends "bank"
//     // Order.js expects "bank_transfer"

//     if (
//       normalizedPaymentMethod === 'bank'
//     ) {
//       normalizedPaymentMethod =
//         'bank_transfer'
//     }

//     const allowedPaymentMethods = [
//       'cash_on_delivery',
//       'stripe',
//       'paypal',
//       'bank_transfer',
//     ]

//     if (
//       !allowedPaymentMethods.includes(
//         normalizedPaymentMethod
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid payment method.',
//       })
//     }

//     // ========================================================
//     // SHIPPING ADDRESS
//     // ========================================================

//     const shippingAddress = {
//       fullName:
//         `${customer.firstName || ''} ${
//           customer.lastName || ''
//         }`.trim(),

//       phone:
//         String(
//           customer.phone || ''
//         ).trim(),

//       address: [
//         customer.address,
//         customer.apartment,
//       ]
//         .filter(
//           (value) =>
//             String(
//               value || ''
//             ).trim()
//         )
//         .join(', '),

//       city:
//         String(
//           customer.city || ''
//         ).trim(),

//       state:
//         String(
//           customer.state || ''
//         ).trim(),

//       postalCode:
//         String(
//           customer.postalCode || ''
//         ).trim(),

//       country:
//         String(
//           customer.country || ''
//         ).trim(),
//     }

//     if (
//       !shippingAddress.address
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Shipping address is required.',
//       })
//     }

//     // ========================================================
//     // CREATE ORDER
//     // ========================================================

//     const order =
//       await Order.create({
//         orderNumber:
//           generateOrderNumber(),

//         customer:
//           customerId,

//         items:
//           orderItems,

//         shippingAddress,

//         subtotal:
//           calculatedSubtotal,

//         shippingCost:
//           calculatedShipping,

//         discount:
//           calculatedDiscount,

//         total:
//           calculatedTotal,

//         paymentMethod:
//           normalizedPaymentMethod,

//         paymentStatus:
//           'pending',

//         orderStatus:
//           'pending',

//         paymentReference:
//           '',

//         notes:
//           String(
//             notes || ''
//           ).trim(),
//       })

//     // ========================================================
//     // GET CURRENT COMMISSION SETTING
//     // ========================================================

//     let commissionSetting =
//       await CommissionSetting.findOne()

//     if (!commissionSetting) {
//       commissionSetting =
//         await CommissionSetting.create({
//           commissionRate:
//             Number(
//               process.env
//                 .DEFAULT_COMMISSION_RATE
//             ) || 10,
//         })
//     }

//     const commissionRate =
//       Number(
//         commissionSetting.commissionRate
//       )

//     // ========================================================
//     // VALIDATE COMMISSION RATE
//     // ========================================================

//     if (
//       !Number.isFinite(
//         commissionRate
//       ) ||
//       commissionRate < 0 ||
//       commissionRate > 100
//     ) {
//       return res.status(500).json({
//         success: false,
//         message:
//           'Invalid commission rate configuration.',
//       })
//     }

//     // ========================================================
//     // GROUP ITEMS BY SELLER
//     // ========================================================

//     const sellerGroups =
//       new Map()

//     for (const item of orderItems) {
//       const sellerId =
//         String(item.seller)

//       if (
//         !sellerGroups.has(
//           sellerId
//         )
//       ) {
//         sellerGroups.set(
//           sellerId,
//           {
//             seller:
//               item.seller,

//             store:
//               item.store,

//             amount:
//               0,
//           }
//         )
//       }

//       const sellerGroup =
//         sellerGroups.get(
//           sellerId
//         )

//       sellerGroup.amount +=
//         Number(
//           item.subtotal || 0
//         )
//     }

//     // ========================================================
//     // CREATE COMMISSIONS
//     // ========================================================

//     const commissions = []

//     for (
//       const sellerGroup
//       of sellerGroups.values()
//     ) {
//       const orderAmount =
//         Number(
//           sellerGroup.amount.toFixed(2)
//         )

//       const commissionAmount =
//         Number(
//           (
//             orderAmount *
//             (commissionRate / 100)
//           ).toFixed(2)
//         )

//       const sellerAmount =
//         Number(
//           (
//             orderAmount -
//             commissionAmount
//           ).toFixed(2)
//         )

//       const commission =
//         await Commission.create({
//           seller:
//             sellerGroup.seller,

//           store:
//             sellerGroup.store,

//           order:
//             order._id,

//           orderNumber:
//             order.orderNumber,

//           orderAmount,

//           commissionRate,

//           commissionAmount,

//           sellerAmount,

//           status:
//             'pending',

//           paidAt:
//             null,

//           notes:
//             '',
//         })

//       commissions.push(
//         commission
//       )
//     }

//     // ========================================================
//     // UPDATE PRODUCT STOCK
//     // ========================================================

//     for (const item of orderItems) {
//       await Product.findByIdAndUpdate(
//         item.product,
//         {
//           $inc: {
//             stock:
//               -item.quantity,
//           },
//         }
//       )
//     }

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(201).json({
//       success: true,

//       message:
//         'Order created successfully.',

//       order,

//       commissions,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET CUSTOMER ORDERS
// // ============================================================

// export const getMyOrders = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const customerId =
//       req.user?._id ||
//       req.user?.id

//     if (!customerId) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'User not authenticated.',
//       })
//     }

//     const orders =
//       await Order.find({
//         customer:
//           customerId,
//       })
//         .sort({
//           createdAt: -1,
//         })
//         .populate(
//           'items.product'
//         )
//         .populate(
//           'items.seller',
//           'businessName email phone'
//         )
//         .populate(
//           'items.store',
//           'name slug status'
//         )

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

// export const getOrderById = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const order =
//       await Order.findById(
//         req.params.id
//       )
//         .populate(
//           'customer',
//           'firstName lastName name email phone'
//         )
//         .populate(
//           'items.product'
//         )
//         .populate(
//           'items.seller',
//           'businessName email phone'
//         )
//         .populate(
//           'items.store',
//           'name slug status'
//         )

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Order not found.',
//       })
//     }

//     const isAdmin =
//       req.user?.role === 'admin'

//     const isOwner =
//       order.customer &&
//       String(
//         order.customer._id
//       ) ===
//         String(
//           req.user?._id ||
//           req.user?.id
//         )

//     if (
//       !isAdmin &&
//       !isOwner
//     ) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to view this order.',
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

// export const getAllOrders = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const orders =
//       await Order.find()
//         .sort({
//           createdAt: -1,
//         })
//         .populate(
//           'customer',
//           'firstName lastName name email phone'
//         )
//         .populate(
//           'items.product'
//         )
//         .populate(
//           'items.seller',
//           'businessName email phone'
//         )
//         .populate(
//           'items.store',
//           'name slug status'
//         )

//     return res.status(200).json({
//       success: true,
//       orders,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CANCEL ORDER
// // ============================================================

// export const cancelOrder = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const order =
//       await Order.findById(
//         req.params.id
//       )

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Order not found.',
//       })
//     }

//     const isAdmin =
//       req.user?.role === 'admin'

//     const isOwner =
//       order.customer &&
//       String(order.customer) ===
//         String(
//           req.user?._id ||
//           req.user?.id
//         )

//     if (
//       !isAdmin &&
//       !isOwner
//     ) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to cancel this order.',
//       })
//     }

//     if (
//       [
//         'shipped',
//         'delivered',
//         'cancelled',
//       ].includes(
//         order.orderStatus
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'This order cannot be cancelled at this stage.',
//       })
//     }

//     order.orderStatus =
//       'cancelled'

//     order.cancelledAt =
//       new Date()

//     await order.save()

//     return res.status(200).json({
//       success: true,
//       message:
//         'Order cancelled successfully.',
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE ORDER STATUS
// // ============================================================

// export const updateOrderStatus = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { status } =
//       req.body

//     const allowedStatuses = [
//       'pending',
//       'confirmed',
//       'processing',
//       'shipped',
//       'delivered',
//       'cancelled',
//     ]

//     if (
//       !allowedStatuses.includes(
//         status
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid order status.',
//       })
//     }

//     const order =
//       await Order.findById(
//         req.params.id
//       )

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Order not found.',
//       })
//     }

//     order.orderStatus =
//       status

//     if (
//       status === 'delivered'
//     ) {
//       order.deliveredAt =
//         new Date()
//     }

//     if (
//       status === 'cancelled'
//     ) {
//       order.cancelledAt =
//         new Date()
//     }

//     await order.save()

//     return res.status(200).json({
//       success: true,
//       message:
//         'Order status updated successfully.',
//       order,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Commission from '../models/Commission.js'
import CommissionSetting from '../models/CommissionSetting.js'
import User from '../models/User.js'

import {
  createNotificationService,
} from '../services/notificationService.js'

import {
  generateOrderNumber,
} from '../utils/generateOrderNumber.js'

// ============================================================
// CREATE ORDER
// ============================================================

export const createOrder = async (
  req,
  res,
  next
) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
      shipping,
      shippingCost,
      discount,
      notes,
    } = req.body

    // ========================================================
    // AUTHENTICATED CUSTOMER
    // ========================================================

    const customerId =
      req.user?._id ||
      req.user?.id

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message:
          'You must be logged in to place an order.',
      })
    }

    // ========================================================
    // CUSTOMER INFORMATION
    // ========================================================

    if (!customer) {
      return res.status(400).json({
        success: false,
        message:
          'Customer information is required.',
      })
    }

    const requiredCustomerFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'country',
    ]

    for (
      const field of requiredCustomerFields
    ) {
      if (
        !String(
          customer[field] || ''
        ).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Customer field "${field}" is required.`,
        })
      }
    }

    // ========================================================
    // ITEMS VALIDATION
    // ========================================================

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Order must contain at least one product.',
      })
    }

    // ========================================================
    // BUILD ORDER ITEMS
    // ========================================================

    const orderItems = []

    for (const item of items) {
      const productId =
        item.product ||
        item.productId ||
        item._id ||
        item.id

      if (!productId) {
        return res.status(400).json({
          success: false,
          message:
            'A product ID is missing from the order.',
        })
      }

      const product =
        await Product.findById(
          productId
        )

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            `Product not found: ${productId}`,
        })
      }

      // ======================================================
      // PRODUCT STATUS
      // ======================================================

      if (!product.isActive) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} is currently unavailable.`,
        })
      }

      if (
        product.approvalStatus &&
        product.approvalStatus !== 'approved'
      ) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} is not available for purchase.`,
        })
      }

      // ======================================================
      // SELLER / STORE
      // ======================================================

      if (!product.seller) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} does not have a seller assigned.`,
        })
      }

      if (!product.store) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} does not have a store assigned.`,
        })
      }

      // ======================================================
      // QUANTITY
      // ======================================================

      const quantity =
        Number(item.quantity)

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Invalid quantity for ${product.name}.`,
        })
      }

      // ======================================================
      // STOCK
      // ======================================================

      if (
        Number(product.stock) < quantity
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Not enough stock for ${product.name}. Available stock: ${product.stock}.`,
        })
      }

      // ======================================================
      // SERVER-TRUSTED PRICE
      // ======================================================

      const price =
        Number(product.price)

      if (
        !Number.isFinite(price) ||
        price < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Invalid price for ${product.name}.`,
        })
      }

      const itemSubtotal =
        Number(
          (
            price * quantity
          ).toFixed(2)
        )

      // ======================================================
      // SIZE / COLOR
      // ======================================================

      const size =
        item.size ||
        item.sizeData?.size ||
        ''

      const color =
        item.color ||
        item.sizeData?.color ||
        ''

      // ======================================================
      // SIZE DATA / MEASUREMENTS
      // ======================================================

      const sizeData =
        item.sizeData &&
        typeof item.sizeData === 'object'
          ? item.sizeData
          : {}

      // ======================================================
      // PRODUCT IMAGE
      // ======================================================

      const firstImage =
        product.images?.[0]

      const image =
        typeof firstImage === 'object'
          ? firstImage?.url || ''
          : firstImage || ''

      // ======================================================
      // PUSH ORDER ITEM
      // ======================================================

      orderItems.push({
        product: product._id,

        seller:
          product.seller,

        store:
          product.store,

        name:
          product.name,

        image,

        price,

        quantity,

        size,

        color,

        sizeData,

        subtotal:
          itemSubtotal,
      })
    }

    // ========================================================
    // CALCULATE SUBTOTAL FROM DATABASE PRODUCTS
    // ========================================================

    const calculatedSubtotal =
      Number(
        orderItems
          .reduce(
            (sum, item) =>
              sum +
              Number(
                item.subtotal || 0
              ),
            0
          )
          .toFixed(2)
      )

    // ========================================================
    // SHIPPING COST
    // ========================================================

    const calculatedShipping =
      Number(
        shippingCost ??
        shipping ??
        0
      )

    if (
      !Number.isFinite(
        calculatedShipping
      ) ||
      calculatedShipping < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid shipping cost.',
      })
    }

    // ========================================================
    // DISCOUNT
    // ========================================================

    const calculatedDiscount =
      Number(
        discount || 0
      )

    if (
      !Number.isFinite(
        calculatedDiscount
      ) ||
      calculatedDiscount < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid discount.',
      })
    }

    if (
      calculatedDiscount >
      calculatedSubtotal +
        calculatedShipping
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Discount cannot be greater than the order amount.',
      })
    }

    // ========================================================
    // CALCULATE FINAL TOTAL
    // ========================================================

    const calculatedTotal =
      Number(
        (
          calculatedSubtotal +
          calculatedShipping -
          calculatedDiscount
        ).toFixed(2)
      )

    // ========================================================
    // PAYMENT METHOD
    // ========================================================

    let normalizedPaymentMethod =
      paymentMethod ||
      'cash_on_delivery'

    // Checkout.jsx sends "card"
    // Order.js expects "stripe"

    if (
      normalizedPaymentMethod === 'card'
    ) {
      normalizedPaymentMethod =
        'stripe'
    }

    // Checkout.jsx sends "bank"
    // Order.js expects "bank_transfer"

    if (
      normalizedPaymentMethod === 'bank'
    ) {
      normalizedPaymentMethod =
        'bank_transfer'
    }

    const allowedPaymentMethods = [
      'cash_on_delivery',
      'stripe',
      'paypal',
      'bank_transfer',
    ]

    if (
      !allowedPaymentMethods.includes(
        normalizedPaymentMethod
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid payment method.',
      })
    }

    // ========================================================
    // SHIPPING ADDRESS
    // ========================================================

    const shippingAddress = {
      fullName:
        `${customer.firstName || ''} ${
          customer.lastName || ''
        }`.trim(),

      phone:
        String(
          customer.phone || ''
        ).trim(),

      address: [
        customer.address,
        customer.apartment,
      ]
        .filter(
          (value) =>
            String(
              value || ''
            ).trim()
        )
        .join(', '),

      city:
        String(
          customer.city || ''
        ).trim(),

      state:
        String(
          customer.state || ''
        ).trim(),

      postalCode:
        String(
          customer.postalCode || ''
        ).trim(),

      country:
        String(
          customer.country || ''
        ).trim(),
    }

    if (
      !shippingAddress.address
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Shipping address is required.',
      })
    }

    // ========================================================
    // CREATE ORDER
    // ========================================================

    const order =
      await Order.create({
        orderNumber:
          generateOrderNumber(),

        customer:
          customerId,

        items:
          orderItems,

        shippingAddress,

        subtotal:
          calculatedSubtotal,

        shippingCost:
          calculatedShipping,

        discount:
          calculatedDiscount,

        total:
          calculatedTotal,

        paymentMethod:
          normalizedPaymentMethod,

        paymentStatus:
          'pending',

        orderStatus:
          'pending',

        paymentReference:
          '',

        notes:
          String(
            notes || ''
          ).trim(),
      })

    // ========================================================
    // ADMIN ORDER NOTIFICATION
    // ========================================================
    //
    // When a customer creates an order:
    // 1. Find all admin users.
    // 2. Create an unread notification for each admin.
    //
    // Notification failure must NOT cancel the order.
    // The order has already been successfully created.
    // ========================================================

    try {
      const admins =
        await User.find({
          role: 'admin',
        }).select('_id')

      if (admins.length > 0) {
        const productNames =
          orderItems
            .map(
              (item) =>
                item.name
            )
            .filter(Boolean)

        const productSummary =
          productNames.length === 1
            ? productNames[0]
            : `${productNames[0]} + ${
                productNames.length - 1
              } more`

        const notificationMessage =
          `New order ${order.orderNumber} was placed by ${customer.firstName} ${customer.lastName} for ${productSummary}. Total: ${calculatedTotal.toFixed(2)}.`

        await Promise.all(
          admins.map(
            (admin) =>
              createNotificationService({
                recipient:
                  admin._id,

                type:
                  'order',

                title:
                  'New Order Received',

                message:
                  notificationMessage,

                order:
                  order._id,

                link:
                  '/admin/orders',
              })
          )
        )
      }
    } catch (
      notificationError
    ) {
      console.error(
        'Failed to create admin order notification:',
        notificationError
      )
    }

    // ========================================================
    // GET CURRENT COMMISSION SETTING
    // ========================================================

    let commissionSetting =
      await CommissionSetting.findOne()

    if (!commissionSetting) {
      commissionSetting =
        await CommissionSetting.create({
          commissionRate:
            Number(
              process.env
                .DEFAULT_COMMISSION_RATE
            ) || 10,
        })
    }

    const commissionRate =
      Number(
        commissionSetting.commissionRate
      )

    // ========================================================
    // VALIDATE COMMISSION RATE
    // ========================================================

    if (
      !Number.isFinite(
        commissionRate
      ) ||
      commissionRate < 0 ||
      commissionRate > 100
    ) {
      return res.status(500).json({
        success: false,
        message:
          'Invalid commission rate configuration.',
      })
    }

    // ========================================================
    // GROUP ITEMS BY SELLER
    // ========================================================

    const sellerGroups =
      new Map()

    for (
      const item of orderItems
    ) {
      const sellerId =
        String(item.seller)

      if (
        !sellerGroups.has(
          sellerId
        )
      ) {
        sellerGroups.set(
          sellerId,
          {
            seller:
              item.seller,

            store:
              item.store,

            amount:
              0,
          }
        )
      }

      const sellerGroup =
        sellerGroups.get(
          sellerId
        )

      sellerGroup.amount +=
        Number(
          item.subtotal || 0
        )
    }

    // ========================================================
    // CREATE COMMISSIONS
    // ========================================================

    const commissions = []

    for (
      const sellerGroup
      of sellerGroups.values()
    ) {
      const orderAmount =
        Number(
          sellerGroup.amount.toFixed(2)
        )

      const commissionAmount =
        Number(
          (
            orderAmount *
            (commissionRate / 100)
          ).toFixed(2)
        )

      const sellerAmount =
        Number(
          (
            orderAmount -
            commissionAmount
          ).toFixed(2)
        )

      const commission =
        await Commission.create({
          seller:
            sellerGroup.seller,

          store:
            sellerGroup.store,

          order:
            order._id,

          orderNumber:
            order.orderNumber,

          orderAmount,

          commissionRate,

          commissionAmount,

          sellerAmount,

          status:
            'pending',

          paidAt:
            null,

          notes:
            '',
        })

      commissions.push(
        commission
      )
    }

    // ========================================================
    // UPDATE PRODUCT STOCK
    // ========================================================

    for (
      const item of orderItems
    ) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock:
              -item.quantity,
          },
        }
      )
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        'Order created successfully.',

      order,

      commissions,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET CUSTOMER ORDERS
// ============================================================

export const getMyOrders = async (
  req,
  res,
  next
) => {
  try {
    const customerId =
      req.user?._id ||
      req.user?.id

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message:
          'User not authenticated.',
      })
    }

    const orders =
      await Order.find({
        customer:
          customerId,
      })
        .sort({
          createdAt: -1,
        })
        .populate(
          'items.product'
        )
        .populate(
          'items.seller',
          'businessName email phone'
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
// GET SINGLE ORDER
// ============================================================

export const getOrderById = async (
  req,
  res,
  next
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          'customer',
          'firstName lastName name email phone'
        )
        .populate(
          'items.product'
        )
        .populate(
          'items.seller',
          'businessName email phone'
        )
        .populate(
          'items.store',
          'name slug status'
        )

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          'Order not found.',
      })
    }

    const isAdmin =
      req.user?.role === 'admin'

    const isOwner =
      order.customer &&
      String(
        order.customer._id
      ) ===
        String(
          req.user?._id ||
          req.user?.id
        )

    if (
      !isAdmin &&
      !isOwner
    ) {
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

export const getAllOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders =
      await Order.find()
        .sort({
          createdAt: -1,
        })
        .populate(
          'customer',
          'firstName lastName name email phone'
        )
        .populate(
          'items.product'
        )
        .populate(
          'items.seller',
          'businessName email phone'
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
// CANCEL ORDER
// ============================================================

export const cancelOrder = async (
  req,
  res,
  next
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          'Order not found.',
      })
    }

    const isAdmin =
      req.user?.role === 'admin'

    const isOwner =
      order.customer &&
      String(order.customer) ===
        String(
          req.user?._id ||
          req.user?.id
        )

    if (
      !isAdmin &&
      !isOwner
    ) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to cancel this order.',
      })
    }

    if (
      [
        'shipped',
        'delivered',
        'cancelled',
      ].includes(
        order.orderStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'This order cannot be cancelled at this stage.',
      })
    }

    order.orderStatus =
      'cancelled'

    order.cancelledAt =
      new Date()

    await order.save()

    return res.status(200).json({
      success: true,
      message:
        'Order cancelled successfully.',
      order,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE ORDER STATUS
// ============================================================

export const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } =
      req.body

    const allowedStatuses = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ]

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid order status.',
      })
    }

    const order =
      await Order.findById(
        req.params.id
      )

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          'Order not found.',
      })
    }

    order.orderStatus =
      status

    if (
      status === 'delivered'
    ) {
      order.deliveredAt =
        new Date()
    }

    if (
      status === 'cancelled'
    ) {
      order.cancelledAt =
        new Date()
    }

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