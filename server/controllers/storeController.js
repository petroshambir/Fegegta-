

// import Store from '../models/Store.js'
// import Product from '../models/Product.js'

// // ============================================================
// // GET ALL STORES
// // GET /api/stores
// // PUBLIC
// // ============================================================

// export const getStores = async (req, res, next) => {
//   try {
//     const stores = await Store.find({
//       status: {
//         $in: ['approved', 'active'],
//       },
//     })
//       .populate({
//         path: 'seller',
//         select: 'businessName email phone logo user',
//         populate: {
//           path: 'user',
//           select: 'firstName lastName name email phone',
//         },
//       })
//       .sort({ createdAt: -1 })

//     return res.status(200).json({
//       success: true,
//       stores,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET STORE BY ID
// // GET /api/stores/:id
// // PUBLIC
// // ============================================================

// export const getStoreById = async (req, res, next) => {
//   try {
//     const store = await Store.findById(req.params.id)
//       .populate({
//         path: 'seller',
//         select: 'businessName email phone logo user',
//         populate: {
//           path: 'user',
//           select: 'firstName lastName name email phone',
//         },
//       })

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

// // ============================================================
// // GET STORE BY SLUG
// // GET /api/stores/slug/:slug
// // PUBLIC
// // ============================================================

// export const getStoreBySlug = async (req, res, next) => {
//   try {
//     const store = await Store.findOne({
//       slug: req.params.slug.toLowerCase(),
//       status: {
//         $in: ['approved', 'active'],
//       },
//     }).populate({
//       path: 'seller',
//       select: 'businessName email phone logo user',
//       populate: {
//         path: 'user',
//         select: 'firstName lastName name email phone',
//       },
//     })

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     const products = await Product.find({
//       store: store._id,
//       approvalStatus: 'approved',
//       isActive: true,
//     }).sort({
//       createdAt: -1,
//     })

//     return res.status(200).json({
//       success: true,
//       store,
//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET MY STORE
// // GET /api/stores/seller/my-store
// // PROTECTED SELLER
// // ============================================================

// export const getMyStore = async (req, res, next) => {
//   try {
//     // sellerOnly middleware gives us req.seller
//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const sellerId = req.seller._id

//     const store = await Store.findOne({
//       seller: sellerId,
//     }).populate({
//       path: 'seller',
//       select: 'businessName email phone logo user',
//       populate: {
//         path: 'user',
//         select: 'firstName lastName name email phone',
//       },
//     })

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'You do not have a store yet.',
//       })
//     }

//     const products = await Product.find({
//       store: store._id,
//     }).sort({
//       createdAt: -1,
//     })

//     return res.status(200).json({
//       success: true,
//       store,
//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CREATE STORE
// // POST /api/stores
// // PROTECTED SELLER
// // ============================================================

// export const createStore = async (req, res, next) => {
//   try {
//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const {
//       name,
//       description,
//       logo,
//       banner,
//       slug,
//     } = req.body

//     // ----------------------------------------------------------
//     // Validate store name
//     // ----------------------------------------------------------

//     const cleanName = String(name || '').trim()

//     if (!cleanName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store name is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Validate slug
//     // ----------------------------------------------------------

//     const cleanSlug = String(slug || '')
//       .trim()
//       .toLowerCase()

//     if (!cleanSlug) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store slug is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Check if seller already has a store
//     // ----------------------------------------------------------

//     const existingSellerStore = await Store.findOne({
//       seller: req.seller._id,
//     })

//     if (existingSellerStore) {
//       return res.status(409).json({
//         success: false,
//         message: 'A store already exists for this seller.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Check slug
//     // ----------------------------------------------------------

//     const existingSlug = await Store.findOne({
//       slug: cleanSlug,
//     })

//     if (existingSlug) {
//       return res.status(409).json({
//         success: false,
//         message: 'This store slug is already in use.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Create store
//     // ----------------------------------------------------------

//     const store = await Store.create({
//       name: cleanName,
//       description: String(description || '').trim(),
//       logo: logo || '',
//       banner: banner || '',
//       slug: cleanSlug,

//       // IMPORTANT:
//       // Store.seller references Seller, not User
//       seller: req.seller._id,

//       status: 'pending',
//     })

//     // ----------------------------------------------------------
//     // Keep Seller.store synchronized
//     // ----------------------------------------------------------

//     req.seller.store = store._id
//     await req.seller.save()

//     return res.status(201).json({
//       success: true,
//       message: 'Store created successfully.',
//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE STORE
// // PUT /api/stores/:id
// // PROTECTED SELLER
// // ============================================================

// export const updateStore = async (req, res, next) => {
//   try {
//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const store = await Store.findById(req.params.id)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Only the seller who owns this store can update it
//     // ----------------------------------------------------------

//     const isOwner =
//       String(store.seller) === String(req.seller._id)

//     if (!isOwner) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to update this store.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Update only allowed fields
//     // ----------------------------------------------------------

//     if (req.body.name !== undefined) {
//       const cleanName = String(req.body.name).trim()

//       if (!cleanName) {
//         return res.status(400).json({
//           success: false,
//           message: 'Store name cannot be empty.',
//         })
//       }

//       store.name = cleanName
//     }

//     if (req.body.description !== undefined) {
//       store.description =
//         String(req.body.description).trim()
//     }

//     if (req.body.logo !== undefined) {
//       store.logo = req.body.logo
//     }

//     if (req.body.banner !== undefined) {
//       store.banner = req.body.banner
//     }

//     // ----------------------------------------------------------
//     // Slug update
//     // ----------------------------------------------------------

//     if (req.body.slug !== undefined) {
//       const cleanSlug = String(req.body.slug)
//         .trim()
//         .toLowerCase()

//       if (!cleanSlug) {
//         return res.status(400).json({
//           success: false,
//           message: 'Store slug cannot be empty.',
//         })
//       }

//       const existingSlug = await Store.findOne({
//         slug: cleanSlug,
//         _id: { $ne: store._id },
//       })

//       if (existingSlug) {
//         return res.status(409).json({
//           success: false,
//           message: 'This store slug is already in use.',
//         })
//       }

//       store.slug = cleanSlug
//     }

//     // ----------------------------------------------------------
//     // Do NOT allow seller to change:
//     //
//     // seller
//     // status
//     //
//     // These should be controlled by the backend/admin.
//     // ----------------------------------------------------------

//     await store.save()

//     return res.status(200).json({
//       success: true,
//       message: 'Store updated successfully.',
//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// import mongoose from 'mongoose'

// import Store from '../models/Store.js'
// import Product from '../models/Product.js'

// // ============================================================
// // SELLER POPULATE
// // ============================================================

// const sellerPopulate = {
//   path: 'seller',
//   select: 'businessName email phone logo user',
//   populate: {
//     path: 'user',
//     select: 'firstName lastName name email phone',
//   },
// }

// // ============================================================
// // GET ALL STORES
// // GET /api/stores
// // PUBLIC
// // ============================================================

// export const getStores = async (req, res, next) => {
//   try {
//     const stores = await Store.find({
//       status: {
//         $in: ['approved', 'active'],
//       },
//     })
//       .populate(sellerPopulate)
//       .sort({ createdAt: -1 })

//     return res.status(200).json({
//       success: true,
//       stores,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET STORE BY ID
// // GET /api/stores/:id
// // PUBLIC
// // ============================================================

// export const getStoreById = async (req, res, next) => {
//   try {
//     const { id } = req.params

//     // ----------------------------------------------------------
//     // Validate MongoDB ObjectId
//     // ----------------------------------------------------------

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid store ID.',
//       })
//     }

//     const store = await Store.findById(id)
//       .populate(sellerPopulate)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       // Main store object
//       store,

//       // Easy-to-use IDs for frontend
//       storeId: store._id,
//       storeName: store.name,

//       // Seller information
//       sellerId: store.seller?._id || null,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET STORE BY SLUG
// // GET /api/stores/slug/:slug
// // PUBLIC
// // ============================================================

// export const getStoreBySlug = async (req, res, next) => {
//   try {
//     const slug = String(req.params.slug || '')
//       .trim()
//       .toLowerCase()

//     if (!slug) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store slug is required.',
//       })
//     }

//     const store = await Store.findOne({
//       slug,
//       status: {
//         $in: ['approved', 'active'],
//       },
//     }).populate(sellerPopulate)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     const products = await Product.find({
//       store: store._id,
//       approvalStatus: 'approved',
//       isActive: true,
//     }).sort({
//       createdAt: -1,
//     })

//     return res.status(200).json({
//       success: true,

//       store,

//       // Easy-to-use store information
//       storeId: store._id,
//       storeName: store.name,
//       storeSlug: store.slug,

//       // Seller ID
//       sellerId: store.seller?._id || null,

//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET MY STORE
// // GET /api/stores/my-store
// // GET /api/stores/seller/my-store
// // PROTECTED SELLER
// // ============================================================

// export const getMyStore = async (req, res, next) => {
//   try {
//     // ----------------------------------------------------------
//     // sellerOnly middleware gives us req.seller
//     // ----------------------------------------------------------

//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const sellerId = req.seller._id

//     // ----------------------------------------------------------
//     // Find store owned by current seller
//     // ----------------------------------------------------------

//     const store = await Store.findOne({
//       seller: sellerId,
//     }).populate(sellerPopulate)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'You do not have a store yet.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Get seller products
//     // ----------------------------------------------------------

//     const products = await Product.find({
//       store: store._id,
//     }).sort({
//       createdAt: -1,
//     })

//     // ----------------------------------------------------------
//     // Return complete seller + store information
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,

//       // Seller ID
//       sellerId: sellerId,

//       // Store information
//       storeId: store._id,
//       storeName: store.name,
//       storeSlug: store.slug,

//       // Full objects
//       seller: store.seller,
//       store,

//       // Products
//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CREATE STORE
// // POST /api/stores
// // PROTECTED SELLER
// // ============================================================

// export const createStore = async (req, res, next) => {
//   try {
//     // ----------------------------------------------------------
//     // Validate seller
//     // ----------------------------------------------------------

//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const {
//       name,
//       description,
//       logo,
//       banner,
//       slug,
//     } = req.body

//     // ----------------------------------------------------------
//     // Validate store name
//     // ----------------------------------------------------------

//     const cleanName = String(name || '').trim()

//     if (!cleanName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store name is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Validate slug
//     // ----------------------------------------------------------

//     const cleanSlug = String(slug || '')
//       .trim()
//       .toLowerCase()

//     if (!cleanSlug) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store slug is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Check if seller already has a store
//     // ----------------------------------------------------------

//     const existingSellerStore = await Store.findOne({
//       seller: req.seller._id,
//     })

//     if (existingSellerStore) {
//       return res.status(409).json({
//         success: false,
//         message: 'A store already exists for this seller.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Check slug uniqueness
//     // ----------------------------------------------------------

//     const existingSlug = await Store.findOne({
//       slug: cleanSlug,
//     })

//     if (existingSlug) {
//       return res.status(409).json({
//         success: false,
//         message: 'This store slug is already in use.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Create store
//     // ----------------------------------------------------------

//     const store = await Store.create({
//       name: cleanName,
//       description: String(description || '').trim(),
//       logo: logo || '',
//       banner: banner || '',
//       slug: cleanSlug,

//       // Store.seller references Seller
//       seller: req.seller._id,

//       status: 'pending',
//     })

//     // ----------------------------------------------------------
//     // Keep Seller.store synchronized
//     // ----------------------------------------------------------

//     req.seller.store = store._id

//     await req.seller.save()

//     // ----------------------------------------------------------
//     // Return store information
//     // ----------------------------------------------------------

//     return res.status(201).json({
//       success: true,

//       message: 'Store created successfully.',

//       store,

//       // Easy frontend values
//       storeId: store._id,
//       storeName: store.name,
//       storeSlug: store.slug,
//       sellerId: req.seller._id,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE STORE
// // PUT /api/stores/:id
// // PROTECTED SELLER
// // ============================================================

// export const updateStore = async (req, res, next) => {
//   try {
//     // ----------------------------------------------------------
//     // Validate seller
//     // ----------------------------------------------------------

//     if (!req.seller?._id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Seller account not found.',
//       })
//     }

//     const { id } = req.params

//     // ----------------------------------------------------------
//     // Validate store ID
//     // ----------------------------------------------------------

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid store ID.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Find store
//     // ----------------------------------------------------------

//     const store = await Store.findById(id)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Only store owner can update
//     // ----------------------------------------------------------

//     const isOwner =
//       String(store.seller) === String(req.seller._id)

//     if (!isOwner) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to update this store.',
//       })
//     }

//     // ----------------------------------------------------------
//     // Update name
//     // ----------------------------------------------------------

//     if (req.body.name !== undefined) {
//       const cleanName = String(req.body.name).trim()

//       if (!cleanName) {
//         return res.status(400).json({
//           success: false,
//           message: 'Store name cannot be empty.',
//         })
//       }

//       store.name = cleanName
//     }

//     // ----------------------------------------------------------
//     // Update description
//     // ----------------------------------------------------------

//     if (req.body.description !== undefined) {
//       store.description =
//         String(req.body.description).trim()
//     }

//     // ----------------------------------------------------------
//     // Update logo
//     // ----------------------------------------------------------

//     if (req.body.logo !== undefined) {
//       store.logo = req.body.logo
//     }

//     // ----------------------------------------------------------
//     // Update banner
//     // ----------------------------------------------------------

//     if (req.body.banner !== undefined) {
//       store.banner = req.body.banner
//     }

//     // ----------------------------------------------------------
//     // Update slug
//     // ----------------------------------------------------------

//     if (req.body.slug !== undefined) {
//       const cleanSlug = String(req.body.slug)
//         .trim()
//         .toLowerCase()

//       if (!cleanSlug) {
//         return res.status(400).json({
//           success: false,
//           message: 'Store slug cannot be empty.',
//         })
//       }

//       const existingSlug = await Store.findOne({
//         slug: cleanSlug,
//         _id: {
//           $ne: store._id,
//         },
//       })

//       if (existingSlug) {
//         return res.status(409).json({
//           success: false,
//           message: 'This store slug is already in use.',
//         })
//       }

//       store.slug = cleanSlug
//     }

//     // ----------------------------------------------------------
//     // DO NOT allow seller to change:
//     //
//     // seller
//     // status
//     //
//     // These are controlled by backend/admin.
//     // ----------------------------------------------------------

//     await store.save()

//     // ----------------------------------------------------------
//     // Populate seller before returning
//     // ----------------------------------------------------------

//     await store.populate(sellerPopulate)

//     return res.status(200).json({
//       success: true,

//       message: 'Store updated successfully.',

//       store,

//       // Easy frontend values
//       storeId: store._id,
//       storeName: store.name,
//       storeSlug: store.slug,
//       sellerId: store.seller?._id || req.seller._id,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import mongoose from 'mongoose'

import Store from '../models/Store.js'
import Product from '../models/Product.js'

// ============================================================
// HELPER
// CREATE HUMAN-READABLE SELLER ID
//
// Example:
// FEG-SELLER-7A91C2
// ============================================================

const generateSellerId = (sellerMongoId) => {
  return `FEG-SELLER-${String(sellerMongoId)
    .slice(-6)
    .toUpperCase()}`
}

// ============================================================
// HELPER
// CREATE HUMAN-READABLE STORE ID
//
// Example:
// FEG-STORE-8B72D1
// ============================================================

const generateStoreId = (storeMongoId) => {
  return `FEG-STORE-${String(storeMongoId)
    .slice(-6)
    .toUpperCase()}`
}

// ============================================================
// SELLER POPULATE
// ============================================================

const sellerPopulate = {
  path: 'seller',

  select:
    'sellerId businessName email phone logo user',

  populate: {
    path: 'user',
    select:
      'firstName lastName name email phone',
  },
}

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
      .populate(sellerPopulate)
      .sort({
        createdAt: -1,
      })

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

export const getStoreById = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params

    // ----------------------------------------------------------
    // Validate MongoDB ObjectId
    // ----------------------------------------------------------

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid store ID.',
      })
    }

    // ----------------------------------------------------------
    // Find store
    // ----------------------------------------------------------

    const store = await Store.findById(id)
      .populate(sellerPopulate)

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    // ----------------------------------------------------------
    // Make sure old stores have a human-readable storeId
    // ----------------------------------------------------------

    if (!store.storeId) {
      store.storeId = generateStoreId(
        store._id
      )

      await store.save()
    }

    // ----------------------------------------------------------
    // Make sure seller has sellerId
    // ----------------------------------------------------------

    if (
      store.seller &&
      !store.seller.sellerId
    ) {
      store.seller.sellerId =
        generateSellerId(
          store.seller._id
        )

      await store.seller.save()
    }

    return res.status(200).json({
      success: true,

      // --------------------------------------------------------
      // Full store
      // --------------------------------------------------------

      store,

      // --------------------------------------------------------
      // Easy frontend values
      // --------------------------------------------------------

      storeId: store.storeId,

      storeMongoId: store._id,

      storeName: store.name,

      storeSlug: store.slug,

      // --------------------------------------------------------
      // Seller
      // --------------------------------------------------------

      sellerId:
        store.seller?.sellerId || null,

      sellerMongoId:
        store.seller?._id || null,

      seller:
        store.seller || null,
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

export const getStoreBySlug = async (
  req,
  res,
  next
) => {
  try {
    const slug = String(
      req.params.slug || ''
    )
      .trim()
      .toLowerCase()

    // ----------------------------------------------------------
    // Validate slug
    // ----------------------------------------------------------

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Store slug is required.',
      })
    }

    // ----------------------------------------------------------
    // Find store
    // ----------------------------------------------------------

    const store = await Store.findOne({
      slug,
      status: {
        $in: ['approved', 'active'],
      },
    }).populate(sellerPopulate)

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    // ----------------------------------------------------------
    // Add missing Store ID for old stores
    // ----------------------------------------------------------

    if (!store.storeId) {
      store.storeId = generateStoreId(
        store._id
      )

      await store.save()
    }

    // ----------------------------------------------------------
    // Add missing Seller ID for old sellers
    // ----------------------------------------------------------

    if (
      store.seller &&
      !store.seller.sellerId
    ) {
      store.seller.sellerId =
        generateSellerId(
          store.seller._id
        )

      await store.seller.save()
    }

    // ----------------------------------------------------------
    // Get approved active products
    // ----------------------------------------------------------

    const products = await Product.find({
      store: store._id,

      approvalStatus: 'approved',

      isActive: true,
    }).sort({
      createdAt: -1,
    })

    return res.status(200).json({
      success: true,

      // --------------------------------------------------------
      // Store
      // --------------------------------------------------------

      store,

      storeId: store.storeId,

      storeMongoId: store._id,

      storeName: store.name,

      storeSlug: store.slug,

      // --------------------------------------------------------
      // Seller
      // --------------------------------------------------------

      sellerId:
        store.seller?.sellerId || null,

      sellerMongoId:
        store.seller?._id || null,

      seller:
        store.seller || null,

      // --------------------------------------------------------
      // Products
      // --------------------------------------------------------

      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET MY STORE
//
// GET /api/stores/my-store
// GET /api/stores/seller/my-store
//
// PROTECTED SELLER
// ============================================================

export const getMyStore = async (
  req,
  res,
  next
) => {
  try {
    // ----------------------------------------------------------
    // sellerOnly middleware gives us req.seller
    // ----------------------------------------------------------

    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const sellerMongoId =
      req.seller._id

    // ----------------------------------------------------------
    // Make sure current seller has sellerId
    // ----------------------------------------------------------

    if (!req.seller.sellerId) {
      req.seller.sellerId =
        generateSellerId(
          sellerMongoId
        )

      await req.seller.save()
    }

    // ----------------------------------------------------------
    // Find seller's store
    // ----------------------------------------------------------

    const store = await Store.findOne({
      seller: sellerMongoId,
    }).populate(sellerPopulate)

    // ----------------------------------------------------------
    // No store
    // ----------------------------------------------------------

    if (!store) {
      return res.status(404).json({
        success: false,
        message:
          'You do not have a store yet.',
        sellerId:
          req.seller.sellerId,
        sellerMongoId,
      })
    }

    // ----------------------------------------------------------
    // Make sure store has storeId
    // ----------------------------------------------------------

    if (!store.storeId) {
      store.storeId =
        generateStoreId(
          store._id
        )

      await store.save()
    }

    // ----------------------------------------------------------
    // Get seller products
    // ----------------------------------------------------------

    const products = await Product.find({
      store: store._id,
    }).sort({
      createdAt: -1,
    })

    // ----------------------------------------------------------
    // Return complete information
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,

      // ========================================================
      // SELLER IDs
      // ========================================================

      sellerId:
        req.seller.sellerId,

      sellerMongoId:
        req.seller._id,

      // ========================================================
      // STORE IDs
      // ========================================================

      storeId:
        store.storeId,

      storeMongoId:
        store._id,

      storeName:
        store.name,

      storeSlug:
        store.slug,

      // ========================================================
      // FULL OBJECTS
      // ========================================================

      seller:
        store.seller || req.seller,

      store,

      // ========================================================
      // PRODUCTS
      // ========================================================

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

export const createStore = async (
  req,
  res,
  next
) => {
  try {
    // ----------------------------------------------------------
    // Validate seller
    // ----------------------------------------------------------

    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message: 'Seller account not found.',
      })
    }

    const sellerMongoId =
      req.seller._id

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

    const cleanName = String(
      name || ''
    ).trim()

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message:
          'Store name is required.',
      })
    }

    // ----------------------------------------------------------
    // Validate slug
    // ----------------------------------------------------------

    const cleanSlug = String(
      slug || ''
    )
      .trim()
      .toLowerCase()

    if (!cleanSlug) {
      return res.status(400).json({
        success: false,
        message:
          'Store slug is required.',
      })
    }

    // ----------------------------------------------------------
    // Check existing seller store
    // ----------------------------------------------------------

    const existingSellerStore =
      await Store.findOne({
        seller: sellerMongoId,
      })

    if (existingSellerStore) {
      return res.status(409).json({
        success: false,
        message:
          'A store already exists for this seller.',

        storeId:
          existingSellerStore.storeId ||
          null,

        storeName:
          existingSellerStore.name,

        sellerId:
          req.seller.sellerId ||
          generateSellerId(
            sellerMongoId
          ),
      })
    }

    // ----------------------------------------------------------
    // Check slug
    // ----------------------------------------------------------

    const existingSlug =
      await Store.findOne({
        slug: cleanSlug,
      })

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message:
          'This store slug is already in use.',
      })
    }

    // ----------------------------------------------------------
    // Make sure seller has sellerId
    // ----------------------------------------------------------

    if (!req.seller.sellerId) {
      req.seller.sellerId =
        generateSellerId(
          sellerMongoId
        )

      await req.seller.save()
    }

    // ----------------------------------------------------------
    // Create store
    //
    // storeId is generated AFTER MongoDB creates _id
    // ----------------------------------------------------------

    const store = await Store.create({
      name: cleanName,

      description: String(
        description || ''
      ).trim(),

      logo: logo || '',

      banner: banner || '',

      slug: cleanSlug,

      seller: sellerMongoId,

      status: 'pending',
    })

    // ----------------------------------------------------------
    // Create human-readable Store ID
    // ----------------------------------------------------------

    store.storeId =
      generateStoreId(
        store._id
      )

    await store.save()

    // ----------------------------------------------------------
    // Keep Seller.store synchronized
    // ----------------------------------------------------------

    req.seller.store =
      store._id

    await req.seller.save()

    // ----------------------------------------------------------
    // Populate seller
    // ----------------------------------------------------------

    await store.populate(
      sellerPopulate
    )

    // ----------------------------------------------------------
    // Return
    // ----------------------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        'Store created successfully.',

      // --------------------------------------------------------
      // Seller
      // --------------------------------------------------------

      sellerId:
        req.seller.sellerId,

      sellerMongoId:
        req.seller._id,

      // --------------------------------------------------------
      // Store
      // --------------------------------------------------------

      storeId:
        store.storeId,

      storeMongoId:
        store._id,

      storeName:
        store.name,

      storeSlug:
        store.slug,

      // --------------------------------------------------------
      // Full store
      // --------------------------------------------------------

      store,

      seller:
        store.seller ||
        req.seller,
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

export const updateStore = async (
  req,
  res,
  next
) => {
  try {
    // ----------------------------------------------------------
    // Validate seller
    // ----------------------------------------------------------

    if (!req.seller?._id) {
      return res.status(403).json({
        success: false,
        message:
          'Seller account not found.',
      })
    }

    const { id } = req.params

    // ----------------------------------------------------------
    // Validate MongoDB ObjectId
    // ----------------------------------------------------------

    if (
      !mongoose.isValidObjectId(id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid store ID.',
      })
    }

    // ----------------------------------------------------------
    // Find store
    // ----------------------------------------------------------

    const store =
      await Store.findById(id)

    if (!store) {
      return res.status(404).json({
        success: false,
        message:
          'Store not found.',
      })
    }

    // ----------------------------------------------------------
    // Check owner
    // ----------------------------------------------------------

    const isOwner =
      String(store.seller) ===
      String(req.seller._id)

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to update this store.',
      })
    }

    // ----------------------------------------------------------
    // Make sure seller has sellerId
    // ----------------------------------------------------------

    if (!req.seller.sellerId) {
      req.seller.sellerId =
        generateSellerId(
          req.seller._id
        )

      await req.seller.save()
    }

    // ----------------------------------------------------------
    // Make sure store has storeId
    // ----------------------------------------------------------

    if (!store.storeId) {
      store.storeId =
        generateStoreId(
          store._id
        )
    }

    // ----------------------------------------------------------
    // Update name
    // ----------------------------------------------------------

    if (
      req.body.name !== undefined
    ) {
      const cleanName =
        String(
          req.body.name
        ).trim()

      if (!cleanName) {
        return res.status(400).json({
          success: false,
          message:
            'Store name cannot be empty.',
        })
      }

      store.name =
        cleanName
    }

    // ----------------------------------------------------------
    // Update description
    // ----------------------------------------------------------

    if (
      req.body.description !==
      undefined
    ) {
      store.description =
        String(
          req.body.description
        ).trim()
    }

    // ----------------------------------------------------------
    // Update logo
    // ----------------------------------------------------------

    if (
      req.body.logo !== undefined
    ) {
      store.logo =
        req.body.logo
    }

    // ----------------------------------------------------------
    // Update banner
    // ----------------------------------------------------------

    if (
      req.body.banner !== undefined
    ) {
      store.banner =
        req.body.banner
    }

    // ----------------------------------------------------------
    // Update slug
    // ----------------------------------------------------------

    if (
      req.body.slug !== undefined
    ) {
      const cleanSlug =
        String(
          req.body.slug
        )
          .trim()
          .toLowerCase()

      if (!cleanSlug) {
        return res.status(400).json({
          success: false,
          message:
            'Store slug cannot be empty.',
        })
      }

      const existingSlug =
        await Store.findOne({
          slug: cleanSlug,

          _id: {
            $ne: store._id,
          },
        })

      if (existingSlug) {
        return res.status(409).json({
          success: false,
          message:
            'This store slug is already in use.',
        })
      }

      store.slug =
        cleanSlug
    }

    // ----------------------------------------------------------
    // DO NOT allow seller to change:
    //
    // seller
    // storeId
    // status
    //
    // These are controlled by backend/admin.
    // ----------------------------------------------------------

    await store.save()

    // ----------------------------------------------------------
    // Populate seller
    // ----------------------------------------------------------

    await store.populate(
      sellerPopulate
    )

    // ----------------------------------------------------------
    // Return updated store
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        'Store updated successfully.',

      // --------------------------------------------------------
      // Seller
      // --------------------------------------------------------

      sellerId:
        req.seller.sellerId,

      sellerMongoId:
        req.seller._id,

      // --------------------------------------------------------
      // Store
      // --------------------------------------------------------

      storeId:
        store.storeId,

      storeMongoId:
        store._id,

      storeName:
        store.name,

      storeSlug:
        store.slug,

      // --------------------------------------------------------
      // Full objects
      // --------------------------------------------------------

      seller:
        store.seller ||
        req.seller,

      store,
    })
  } catch (error) {
    next(error)
  }
}