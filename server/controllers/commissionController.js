import Commission from '../models/Commission.js'
import CommissionSetting from '../models/CommissionSetting.js'
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
    let setting =
      await CommissionSetting.findOne()

    if (!setting) {
      const defaultRate =
        Number(
          process.env.DEFAULT_COMMISSION_RATE
        )

      setting =
        await CommissionSetting.create({
          commissionRate:
            Number.isFinite(defaultRate) &&
            defaultRate >= 0 &&
            defaultRate <= 100
              ? defaultRate
              : 10,
        })
    }

    return res.status(200).json({
      success: true,

      settings: {
        commissionRate:
          Number(setting.commissionRate),
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
    const { commissionRate } =
      req.body

    const rate =
      Number(commissionRate)

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

    let setting =
      await CommissionSetting.findOne()

    if (!setting) {
      setting =
        await CommissionSetting.create({
          commissionRate: rate,
        })
    } else {
      setting.commissionRate = rate

      await setting.save()
    }

    return res.status(200).json({
      success: true,

      message:
        'Commission rate updated successfully.',

      settings: {
        commissionRate:
          Number(setting.commissionRate),
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
    const sellerId =
      req.seller?._id

    if (!sellerId) {
      return res.status(403).json({
        success: false,
        message:
          'Seller account not found.',
      })
    }

    const commissions =
      await Commission.find({
        seller: sellerId,
      })
        .populate(
          'order',
          'orderNumber total createdAt orderStatus'
        )
        .populate(
          'store',
          'name slug status'
        )
        .sort({
          createdAt: -1,
        })

    const summary =
      commissions.reduce(
        (result, commission) => {
          result.totalSales +=
            Number(
              commission.orderAmount || 0
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
          'orderNumber total createdAt orderStatus'
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
        message:
          'Commission not found.',
      })
    }

    if (
      commission.status === 'paid'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'This commission has already been paid.',
      })
    }

    if (
      commission.status === 'cancelled'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'A cancelled commission cannot be paid.',
      })
    }

    // ========================================================
    // UPDATE COMMISSION
    // ========================================================

    commission.status =
      'paid'

    commission.paidAt =
      new Date()

    await commission.save()

    // ========================================================
    // UPDATE SELLER BALANCE
    // ========================================================

    if (commission.seller) {
      const seller =
        await Seller.findById(
          commission.seller
        )

      if (seller) {
        const sellerAmount =
          Number(
            commission.sellerAmount || 0
          )

        const commissionAmount =
          Number(
            commission.commissionAmount || 0
          )

        seller.availableBalance =
          Number(
            seller.availableBalance || 0
          ) +
          sellerAmount

        seller.totalEarnings =
          Number(
            seller.totalEarnings || 0
          ) +
          sellerAmount

        seller.totalCommission =
          Number(
            seller.totalCommission || 0
          ) +
          commissionAmount

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