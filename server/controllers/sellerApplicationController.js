
import Seller from '../models/Seller.js'

// ============================================================
// APPLY TO BECOME A SELLER
// ============================================================

export const createSellerApplication = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?._id ||
      req.user?.id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const {
      businessName,
      phone,
      email,
      address,
      description,
      documents,
    } = req.body

    // ========================================================
    // REQUIRED INFORMATION
    // ========================================================

    if (
      !businessName ||
      !String(businessName).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Business name is required.',
      })
    }

    if (
      !phone ||
      !String(phone).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Phone number is required.',
      })
    }

    if (
      !email ||
      !String(email).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Email address is required.',
      })
    }

    // ========================================================
    // CHECK EXISTING SELLER
    // ========================================================

    const existingSeller =
      await Seller.findOne({
        user: userId,
      })

    if (existingSeller) {
      return res.status(409).json({
        success: false,
        message:
          'You already have a seller application.',
        seller: existingSeller,
      })
    }

    // ========================================================
    // CREATE SELLER APPLICATION
    // ========================================================

    const seller =
      await Seller.create({
        user: userId,

        store: null,

        businessName:
          String(
            businessName
          ).trim(),

        phone:
          String(
            phone
          ).trim(),

        email:
          String(
            email
          )
            .trim()
            .toLowerCase(),

        address:
          address
            ? String(address).trim()
            : '',

        description:
          description
            ? String(description).trim()
            : '',

        documents:
          documents &&
          typeof documents === 'object'
            ? documents
            : {},

        commissionRate: 0,

        availableBalance: 0,

        totalEarnings: 0,

        totalCommission: 0,

        status: 'pending',
      })

    return res.status(201).json({
      success: true,

      message:
        'Seller application submitted successfully. It is waiting for admin approval.',

      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET MY SELLER APPLICATION
// ============================================================

export const getMySellerApplication = async (
  req,
  res,
  next
) => {
  try {
    const userId =
      req.user?._id ||
      req.user?.id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          'Authentication required.',
      })
    }

    const seller =
      await Seller.findOne({
        user: userId,
      })
        .populate(
          'user',
          'name firstName lastName email phone'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message:
          'You have not submitted a seller application yet.',
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
// ADMIN — GET ALL SELLER APPLICATIONS
// ============================================================

export const getSellerApplications = async (
  req,
  res,
  next
) => {
  try {
    const {
      status,
    } = req.query

    const filter = {}

    if (
      status &&
      [
        'pending',
        'approved',
        'rejected',
        'suspended',
        'inactive',
      ].includes(status)
    ) {
      filter.status = status
    }

    const sellers =
      await Seller.find(filter)
        .populate(
          'user',
          'name firstName lastName email phone'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      sellers,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// ADMIN — GET SINGLE SELLER APPLICATION
// ============================================================

export const getSellerApplicationById = async (
  req,
  res,
  next
) => {
  try {
    const seller =
      await Seller.findById(
        req.params.id
      )
        .populate(
          'user',
          'name firstName lastName email phone'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message:
          'Seller application not found.',
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
// ADMIN — UPDATE SELLER APPLICATION STATUS
// ============================================================

export const updateSellerApplicationStatus =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        status,
      } = req.body

      const allowedStatuses = [
        'pending',
        'approved',
        'rejected',
        'suspended',
        'inactive',
      ]

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid seller status.',
        })
      }

      const seller =
        await Seller.findById(
          req.params.id
        )

      if (!seller) {
        return res.status(404).json({
          success: false,
          message:
            'Seller application not found.',
        })
      }

      seller.status =
        status

      await seller.save()

      const updatedSeller =
        await Seller.findById(
          seller._id
        )
          .populate(
            'user',
            'name firstName lastName email phone'
          )
          .populate(
            'store',
            'name slug description logo banner status'
          )

      return res.status(200).json({
        success: true,

        message:
          `Seller status changed to "${status}".`,

        seller:
          updatedSeller,
      })
    } catch (error) {
      next(error)
    }
  }

// ============================================================
// ADMIN — DELETE SELLER APPLICATION
// ============================================================

export const deleteSellerApplication =
  async (
    req,
    res,
    next
  ) => {
    try {
      const seller =
        await Seller.findById(
          req.params.id
        )

      if (!seller) {
        return res.status(404).json({
          success: false,
          message:
            'Seller application not found.',
        })
      }

      await seller.deleteOne()

      return res.status(200).json({
        success: true,

        message:
          'Seller application deleted successfully.',
      })
    } catch (error) {
      next(error)
    }
  }