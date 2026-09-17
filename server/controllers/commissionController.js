
// import Commission from '../models/Commission.js'

// // ============================================================
// // GET SELLER COMMISSIONS
// // ============================================================

// export const getSellerCommissions = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const commissions = await Commission.find({
//       seller: req.user.id,
//     })
//       .populate(
//         'order',
//         'orderNumber total createdAt status'
//       )
//       .populate(
//         'store',
//         'name slug'
//       )
//       .sort({
//         createdAt: -1,
//       })

//     const summary = commissions.reduce(
//       (result, commission) => {
//         result.totalSales +=
//           Number(commission.saleAmount || 0)

//         result.totalCommission +=
//           Number(commission.commissionAmount || 0)

//         result.totalEarnings +=
//           Number(commission.sellerAmount || 0)

//         return result
//       },
//       {
//         totalSales: 0,
//         totalCommission: 0,
//         totalEarnings: 0,
//       }
//     )

//     return res.status(200).json({
//       success: true,
//       commissions,
//       summary,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET ALL COMMISSIONS — ADMIN
// // ============================================================

// export const getAllCommissions = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const commissions = await Commission.find()
//       .populate(
//         'seller',
//         'name email'
//       )
//       .populate(
//         'store',
//         'name slug'
//       )
//       .populate(
//         'order',
//         'orderNumber total createdAt status'
//       )
//       .sort({
//         createdAt: -1,
//       })

//     return res.status(200).json({
//       success: true,
//       commissions,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE COMMISSION STATUS — ADMIN
// // ============================================================

// export const updateCommissionStatus = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { status } = req.body

//     const allowedStatuses = [
//       'pending',
//       'paid',
//       'cancelled',
//     ]

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid commission status.',
//       })
//     }

//     const commission =
//       await Commission.findByIdAndUpdate(
//         req.params.id,
//         {
//           status,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )

//     if (!commission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Commission not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'Commission status updated successfully.',
//       commission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import Commission from '../models/Commission.js'
import Seller from '../models/Seller.js'

// ============================================================
// GET COMMISSION SETTINGS — ADMIN
// ============================================================

export const getCommissionSettings = async (
  req,
  res,
  next
) => {
  try {
    const commissionRate =
      Number(
        process.env.DEFAULT_COMMISSION_RATE
      ) || 10

    return res.status(200).json({
      success: true,
      settings: {
        commissionRate,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE COMMISSION SETTINGS — ADMIN
// ============================================================

export const updateCommissionSettings = async (
  req,
  res,
  next
) => {
  try {
    const { commissionRate } = req.body

    const rate = Number(commissionRate)

    if (
      !Number.isFinite(rate) ||
      rate < 0 ||
      rate > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Commission rate must be between 0 and 100.',
      })
    }

    /*
      IMPORTANT:
      Environment variables cannot safely be changed
      permanently while the Node.js server is running.

      For now we return the validated rate.

      Later we should store the commission setting
      inside MongoDB so Admin changes persist.
    */

    return res.status(200).json({
      success: true,
      message:
        'Commission settings validated successfully.',
      settings: {
        commissionRate: rate,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET SELLER COMMISSIONS
// ============================================================

export const getSellerCommissions = async (
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

    const commissions =
      await Commission.find({
        seller: sellerId,
      })
        .populate(
          'order',
          'orderNumber total createdAt status'
        )
        .populate(
          'store',
          'name slug'
        )
        .sort({
          createdAt: -1,
        })

    const summary =
      commissions.reduce(
        (result, commission) => {
          result.totalSales +=
            Number(
              commission.saleAmount || 0
            )

          result.totalCommission +=
            Number(
              commission.commissionAmount || 0
            )

          result.totalEarnings +=
            Number(
              commission.sellerAmount || 0
            )

          return result
        },
        {
          totalSales: 0,
          totalCommission: 0,
          totalEarnings: 0,
        }
      )

    return res.status(200).json({
      success: true,
      commissions,
      summary,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET ALL COMMISSIONS — ADMIN
// ============================================================

export const getAllCommissions = async (
  req,
  res,
  next
) => {
  try {
    const commissions =
      await Commission.find()
        .populate(
          'seller',
          'businessName email phone status'
        )
        .populate(
          'store',
          'name slug status'
        )
        .populate(
          'order',
          'orderNumber total createdAt status'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      commissions,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// MARK COMMISSION AS PAID — ADMIN
// ============================================================

export const markCommissionAsPaid = async (
  req,
  res,
  next
) => {
  try {
    const commission =
      await Commission.findById(
        req.params.id
      )

    if (!commission) {
      return res.status(404).json({
        success: false,
        message: 'Commission not found.',
      })
    }

    if (commission.status === 'paid') {
      return res.status(400).json({
        success: false,
        message:
          'This commission has already been paid.',
      })
    }

    if (commission.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message:
          'A cancelled commission cannot be paid.',
      })
    }

    commission.status = 'paid'

    commission.paidAt = new Date()

    await commission.save()

    /*
      Update seller balance when the commission
      is marked as paid.
    */

    if (commission.seller) {
      const seller =
        await Seller.findById(
          commission.seller
        )

      if (seller) {
        seller.availableBalance =
          Number(
            seller.availableBalance || 0
          ) +
          Number(
            commission.sellerAmount || 0
          )

        seller.totalEarnings =
          Number(
            seller.totalEarnings || 0
          ) +
          Number(
            commission.sellerAmount || 0
          )

        seller.totalCommission =
          Number(
            seller.totalCommission || 0
          ) +
          Number(
            commission.commissionAmount || 0
          )

        await seller.save()
      }
    }

    return res.status(200).json({
      success: true,
      message:
        'Commission marked as paid successfully.',
      commission,
    })
  } catch (error) {
    next(error)
  }
}
