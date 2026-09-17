
// import Product from '../models/Product.js'

// // ============================================================
// // GET ALL PRODUCTS
// // ============================================================

// export const getProducts = async (req, res, next) => {
//   try {
//     const {
//       search,
//       category,
//       store,
//       seller,
//       page = 1,
//       limit = 20,
//     } = req.query

//     const filter = {}

//     if (search) {
//       filter.$or = [
//         {
//           name: {
//             $regex: search,
//             $options: 'i',
//           },
//         },
//         {
//           description: {
//             $regex: search,
//             $options: 'i',
//           },
//         },
//       ]
//     }

//     if (category) {
//       filter.category = category
//     }

//     if (store) {
//       filter.store = store
//     }

//     if (seller) {
//       filter.seller = seller
//     }

//     const pageNumber = Math.max(Number(page), 1)
//     const limitNumber = Math.min(
//       Math.max(Number(limit), 1),
//       100
//     )

//     const skip = (pageNumber - 1) * limitNumber

//     const [products, total] = await Promise.all([
//       Product.find(filter)
//         .populate('seller', 'name email')
//         .populate('store', 'name slug')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limitNumber),

//       Product.countDocuments(filter),
//     ])

//     return res.status(200).json({
//       success: true,
//       products,
//       pagination: {
//         page: pageNumber,
//         limit: limitNumber,
//         total,
//         pages: Math.ceil(total / limitNumber),
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET SINGLE PRODUCT
// // ============================================================

// export const getProductById = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate('seller', 'name email')
//       .populate('store', 'name slug')

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CREATE PRODUCT
// // ============================================================

// export const createProduct = async (req, res, next) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       images,
//       stock,
//       sizes,
//       store,
//     } = req.body

//     if (!name || price === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product name and price are required.',
//       })
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       images,
//       stock,
//       sizes,
//       store,
//       seller: req.user.id,
//     })

//     return res.status(201).json({
//       success: true,
//       message: 'Product created successfully.',
//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE PRODUCT
// // ============================================================

// export const updateProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found.',
//       })
//     }

//     const isOwner =
//       String(product.seller) === String(req.user.id)

//     const isAdmin = req.user.role === 'admin'

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: 'You are not allowed to update this product.',
//       })
//     }

//     Object.assign(product, req.body)

//     await product.save()

//     return res.status(200).json({
//       success: true,
//       message: 'Product updated successfully.',
//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // DELETE PRODUCT
// // ============================================================

// export const deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found.',
//       })
//     }

//     const isOwner =
//       String(product.seller) === String(req.user.id)

//     const isAdmin = req.user.role === 'admin'

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({
//         success: false,
//         message: 'You are not allowed to delete this product.',
//       })
//     }

//     await product.deleteOne()

//     return res.status(200).json({
//       success: true,
//       message: 'Product deleted successfully.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }
import Product from '../models/Product.js'

// ============================================================
// GET ALL PRODUCTS
// ============================================================

export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      store,
      seller,
      page = 1,
      limit = 20,
    } = req.query

    const filter = {}

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: search,
            $options: 'i',
          },
        },
      ]
    }

    if (category) {
      filter.category = category
    }

    if (store) {
      filter.store = store
    }

    if (seller) {
      filter.seller = seller
    }

    const pageNumber = Math.max(Number(page), 1)

    const limitNumber = Math.min(
      Math.max(Number(limit), 1),
      100
    )

    const skip = (pageNumber - 1) * limitNumber

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('seller', 'name email')
        .populate('store', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      Product.countDocuments(filter),
    ])

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(total / limitNumber),
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET SINGLE PRODUCT
// ============================================================

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email')
      .populate('store', 'name slug')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET MY PRODUCTS
// ============================================================

export const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
    })
      .populate('store', 'name slug')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CREATE PRODUCT
// ============================================================

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      images,
      stock,
      sizes,
      store,
    } = req.body

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product name and price are required.',
      })
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      stock,
      sizes,
      store,
      seller: req.user.id,
    })

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE PRODUCT
// ============================================================

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    const isOwner =
      String(product.seller) === String(req.user.id)

    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to update this product.',
      })
    }

    Object.assign(product, req.body)

    await product.save()

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// DELETE PRODUCT
// ============================================================

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    const isOwner =
      String(product.seller) === String(req.user.id)

    const isAdmin = req.user.role === 'admin'

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to delete this product.',
      })
    }

    await product.deleteOne()

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}