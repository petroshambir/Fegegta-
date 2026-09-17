
// import Store from '../models/Store.js'
// import Product from '../models/Product.js'

// // ============================================================
// // GET ALL STORES
// // ============================================================

// export const getStores = async (req, res, next) => {
//   try {
//     const stores = await Store.find({
//       status: {
//         $in: ['approved', 'active'],
//       },
//     })
//       .populate('seller', 'name email')
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
// // ============================================================

// export const getStoreById = async (req, res, next) => {
//   try {
//     const store = await Store.findById(req.params.id)
//       .populate('seller', 'name email')

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
// // ============================================================

// export const getStoreBySlug = async (req, res, next) => {
//   try {
//     const store = await Store.findOne({
//       slug: req.params.slug,
//     }).populate('seller', 'name email')

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
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
// // ============================================================

// export const createStore = async (req, res, next) => {
//   try {
//     const {
//       name,
//       description,
//       logo,
//       banner,
//       slug,
//     } = req.body

//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store name is required.',
//       })
//     }

//     const existingStore = await Store.findOne({
//       $or: [
//         { seller: req.user.id },
//         ...(slug ? [{ slug }] : []),
//       ],
//     })

//     if (existingStore) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'A store already exists for this seller or slug.',
//       })
//     }

//     const store = await Store.create({
//       name,
//       description,
//       logo,
//       banner,
//       slug,
//       seller: req.user.id,
//       status: 'pending',
//     })

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
// // ============================================================

// export const updateStore = async (req, res, next) => {
//   try {
//     const store = await Store.findById(req.params.id)

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message: 'Store not found.',
//       })
//     }

//     const isOwner =
//       String(store.seller) === String(req.user.id)

//     const isAdmin = req.user.role === 'admin'

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: 'You are not allowed to update this store.',
//       })
//     }

//     Object.assign(store, req.body)

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


import Store from '../models/Store.js'
import Product from '../models/Product.js'

// ============================================================
// GET ALL STORES
// ============================================================

export const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find({
      status: {
        $in: ['approved', 'active'],
      },
    })
      .populate('seller', 'name email')
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
// ============================================================

export const getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id)
      .populate('seller', 'name email')

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
// ============================================================

export const getStoreBySlug = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      slug: req.params.slug,
    }).populate('seller', 'name email')

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    const products = await Product.find({
      store: store._id,
      approvalStatus: 'approved',
      active: true,
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
// ============================================================

export const getMyStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      seller: req.user.id,
    }).populate('seller', 'name email')

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
// ============================================================

export const createStore = async (req, res, next) => {
  try {
    const {
      name,
      description,
      logo,
      banner,
      slug,
    } = req.body

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Store name is required.',
      })
    }

    const existingStore = await Store.findOne({
      $or: [
        { seller: req.user.id },
        ...(slug ? [{ slug }] : []),
      ],
    })

    if (existingStore) {
      return res.status(409).json({
        success: false,
        message:
          'A store already exists for this seller or slug.',
      })
    }

    const store = await Store.create({
      name,
      description,
      logo,
      banner,
      slug,
      seller: req.user.id,
      status: 'pending',
    })

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
// ============================================================

export const updateStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id)

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found.',
      })
    }

    const isOwner =
      String(store.seller) === String(req.user.id)

    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to update this store.',
      })
    }

    Object.assign(store, req.body)

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