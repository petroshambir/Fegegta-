

import Store from '../models/Store.js'
import Product from '../models/Product.js'

// ============================================================
// GET ALL STORES
// GET /api/stores
// PUBLIC
// ============================================================

export const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find({
      status: {
        $in: ['approved', 'active'],
      },
    })
      .populate({
        path: 'seller',
        select: 'businessName email phone logo user',
        populate: {
          path: 'user',
          select: 'firstName lastName name email phone',
        },
      })
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      stores,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET STORE BY ID
// GET /api/stores/:id
// PUBLIC
// ============================================================

export const getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id)
      .populate({
        path: 'seller',
        select: 'businessName email phone logo user',
        populate: {
          path: 'user',
          select: 'firstName lastName name email phone',
        },
      })

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

// ============================================================
// GET STORE BY SLUG
// GET /api/stores/slug/:slug
// PUBLIC
// ============================================================

export const getStoreBySlug = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      slug: req.params.slug.toLowerCase(),
      status: {
        $in: ['approved', 'active'],
      },
    }).populate({
      path: 'seller',
      select: 'businessName email phone logo user',
      populate: {
        path: 'user',
        select: 'firstName lastName name email phone',
      },
    })

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    const products = await Product.find({
      store: store._id,
      approvalStatus: 'approved',
      isActive: true,
    }).sort({
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,
      store,
      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET MY STORE
// GET /api/stores/seller/my-store
// PROTECTED SELLER
// ============================================================

export const getMyStore = async (req, res, next) => {
  try {
    // sellerOnly middleware gives us req.seller
    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const sellerId = req.seller._id

    const store = await Store.findOne({
      seller: sellerId,
    }).populate({
      path: 'seller',
      select: 'businessName email phone logo user',
      populate: {
        path: 'user',
        select: 'firstName lastName name email phone',
      },
    })

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'You do not have a store yet.',
      })
    }

    const products = await Product.find({
      store: store._id,
    }).sort({
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,
      store,
      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CREATE STORE
// POST /api/stores
// PROTECTED SELLER
// ============================================================

export const createStore = async (req, res, next) => {
  try {
    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const {
      name,
      description,
      logo,
      banner,
      slug,
    } = req.body

    // ----------------------------------------------------------
    // Validate store name
    // ----------------------------------------------------------

    const cleanName = String(name || '').trim()

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: 'Store name is required.',
      })
    }

    // ----------------------------------------------------------
    // Validate slug
    // ----------------------------------------------------------

    const cleanSlug = String(slug || '')
      .trim()
      .toLowerCase()

    if (!cleanSlug) {
      return res.status(400).json({
        success: false,
        message: 'Store slug is required.',
      })
    }

    // ----------------------------------------------------------
    // Check if seller already has a store
    // ----------------------------------------------------------

    const existingSellerStore = await Store.findOne({
      seller: req.seller._id,
    })

    if (existingSellerStore) {
      return res.status(409).json({
        success: false,
        message: 'A store already exists for this seller.',
      })
    }

    // ----------------------------------------------------------
    // Check slug
    // ----------------------------------------------------------

    const existingSlug = await Store.findOne({
      slug: cleanSlug,
    })

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: 'This store slug is already in use.',
      })
    }

    // ----------------------------------------------------------
    // Create store
    // ----------------------------------------------------------

    const store = await Store.create({
      name: cleanName,
      description: String(description || '').trim(),
      logo: logo || '',
      banner: banner || '',
      slug: cleanSlug,

      // IMPORTANT:
      // Store.seller references Seller, not User
      seller: req.seller._id,

      status: 'pending',
    })

    // ----------------------------------------------------------
    // Keep Seller.store synchronized
    // ----------------------------------------------------------

    req.seller.store = store._id
    await req.seller.save()

    return res.status(201).json({
      success: true,
      message: 'Store created successfully.',
      store,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE STORE
// PUT /api/stores/:id
// PROTECTED SELLER
// ============================================================

export const updateStore = async (req, res, next) => {
  try {
    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const store = await Store.findById(req.params.id)

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    // ----------------------------------------------------------
    // Only the seller who owns this store can update it
    // ----------------------------------------------------------

    const isOwner =
      String(store.seller) === String(req.seller._id)

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to update this store.',
      })
    }

    // ----------------------------------------------------------
    // Update only allowed fields
    // ----------------------------------------------------------

    if (req.body.name !== undefined) {
      const cleanName = String(req.body.name).trim()

      if (!cleanName) {
        return res.status(400).json({
          success: false,
          message: 'Store name cannot be empty.',
        })
      }

      store.name = cleanName
    }

    if (req.body.description !== undefined) {
      store.description =
        String(req.body.description).trim()
    }

    if (req.body.logo !== undefined) {
      store.logo = req.body.logo
    }

    if (req.body.banner !== undefined) {
      store.banner = req.body.banner
    }

    // ----------------------------------------------------------
    // Slug update
    // ----------------------------------------------------------

    if (req.body.slug !== undefined) {
      const cleanSlug = String(req.body.slug)
        .trim()
        .toLowerCase()

      if (!cleanSlug) {
        return res.status(400).json({
          success: false,
          message: 'Store slug cannot be empty.',
        })
      }

      const existingSlug = await Store.findOne({
        slug: cleanSlug,
        _id: { $ne: store._id },
      })

      if (existingSlug) {
        return res.status(409).json({
          success: false,
          message: 'This store slug is already in use.',
        })
      }

      store.slug = cleanSlug
    }

    // ----------------------------------------------------------
    // Do NOT allow seller to change:
    //
    // seller
    // status
    //
    // These should be controlled by the backend/admin.
    // ----------------------------------------------------------

    await store.save()

    return res.status(200).json({
      success: true,
      message: 'Store updated successfully.',
      store,
    })
  } catch (error) {
    next(error)
  }
}