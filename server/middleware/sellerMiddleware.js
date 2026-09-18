
import Seller from '../models/Seller.js'

// ============================================================
// SELLER ONLY MIDDLEWARE
// ============================================================

export const sellerOnly = async (req, res, next) => {
  try {
    // User must already be authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    // Find seller profile connected to this user
    const seller = await Seller.findOne({
      user: req.user.id,
    })

    if (!seller) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    // Check seller account status
    if (
      seller.status &&
      ['blocked', 'suspended', 'inactive', 'rejected'].includes(
        seller.status
      )
    ) {
      return res.status(403).json({
        success: false,
        message: 'Your seller account is not active.',
      })
    }

    // Attach seller to request
    req.seller = seller

    next()
  } catch (error) {
    next(error)
  }
}

export default sellerOnly