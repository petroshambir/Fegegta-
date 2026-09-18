

import Product from '../models/Product.js'

// ============================================================
// HELPER: CREATE IMAGE DATA FROM CLOUDINARY FILES
// ============================================================

const getUploadedImages = (files = []) => {
  return files.map((file) => ({
    url: file.path || file.secure_url || file.url || '',
    publicId: file.filename || file.public_id || '',
  }))
}

// ============================================================
// HELPER: CONVERT VALUE TO ARRAY
// ============================================================

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

// ============================================================
// HELPER: GENERATE SLUG
// ============================================================

const generateSlug = (value = '') => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

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

    const filter = {
      approvalStatus: 'approved',
      isActive: true,
      stock: { $gt: 0 },
    }

    // ----------------------------------------------------------
    // SEARCH
    // ----------------------------------------------------------

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
        {
          tags: {
            $regex: search,
            $options: 'i',
          },
        },
      ]
    }

    // ----------------------------------------------------------
    // FILTERS
    // ----------------------------------------------------------

    if (category) {
      filter.category = category
    }

    if (store) {
      filter.store = store
    }

    if (seller) {
      filter.seller = seller
    }

    // ----------------------------------------------------------
    // PAGINATION
    // ----------------------------------------------------------

    const pageNumber = Math.max(
      Number(page) || 1,
      1
    )

    const limitNumber = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    )

    const skip =
      (pageNumber - 1) * limitNumber

    // ----------------------------------------------------------
    // QUERY
    // ----------------------------------------------------------

    const [products, total] =
      await Promise.all([
        Product.find(filter)
          .populate(
            'seller',
            'businessName email phone logo status'
          )
          .populate(
            'store',
            'name slug logo banner status'
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limitNumber)
          .lean(),

        Product.countDocuments(filter),
      ])

    return res.status(200).json({
      success: true,

      products,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// GET SINGLE PRODUCT
// ============================================================

export const getProductById = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findOne({
        _id: req.params.id,
        approvalStatus: 'approved',
        isActive: true,
      })
        .populate(
          'seller',
          'businessName email phone logo status'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

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

export const getMyProducts = async (
  req,
  res,
  next
) => {
  try {
    const products =
      await Product.find({
        seller: req.seller._id,
      })
        .populate(
          'store',
          'name slug description logo banner status'
        )
        .sort({
          createdAt: -1,
        })

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

export const createProduct = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sku,
      stock,
      sizes,
      colors,
      tags,
      compareAtPrice,
    } = req.body

    // ----------------------------------------------------------
    // REQUIRED FIELDS
    // ----------------------------------------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Product name is required.',
      })
    }

    if (
      description === undefined ||
      !String(description).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Product description is required.',
      })
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Product category is required.',
      })
    }

    if (
      price === undefined ||
      price === '' ||
      Number.isNaN(Number(price)) ||
      Number(price) < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'A valid product price is required.',
      })
    }

    // ----------------------------------------------------------
    // SELLER STORE
    // ----------------------------------------------------------

    if (!req.seller.store) {
      return res.status(400).json({
        success: false,
        message:
          'You must have a store before creating products.',
      })
    }

    // ----------------------------------------------------------
    // IMAGES
    // ----------------------------------------------------------

    const images =
      getUploadedImages(req.files)

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          'At least one product image is required.',
      })
    }

    if (images.length > 4) {
      return res.status(400).json({
        success: false,
        message:
          'A product can have a maximum of 4 images.',
      })
    }

    // ----------------------------------------------------------
    // SLUG
    // ----------------------------------------------------------

    const baseSlug =
      generateSlug(name)

    let slug = baseSlug

    let slugNumber = 1

    while (
      await Product.exists({ slug })
    ) {
      slug = `${baseSlug}-${slugNumber}`
      slugNumber += 1
    }

    // ----------------------------------------------------------
    // CREATE PRODUCT
    // ----------------------------------------------------------

    const product =
      await Product.create({
        seller: req.seller._id,

        store: req.seller.store,

        name: name.trim(),

        slug,

        description:
          String(description).trim(),

        category:
          category.trim(),

        subcategory:
          subcategory
            ? String(subcategory).trim()
            : '',

        price: Number(price),

        compareAtPrice:
          compareAtPrice !== undefined &&
          compareAtPrice !== ''
            ? Number(compareAtPrice)
            : 0,

        stock:
          stock !== undefined &&
          stock !== ''
            ? Number(stock)
            : 0,

        sku:
          sku
            ? String(sku).trim()
            : '',

        images,

        sizes: toArray(sizes),

        colors: toArray(colors),

        tags: toArray(tags),

        // ------------------------------------------------------
        // IMPORTANT
        // Seller products must be reviewed by admin.
        // ------------------------------------------------------

        approvalStatus: 'pending',

        isActive: false,
      })

    const populatedProduct =
      await Product.findById(
        product._id
      )
        .populate(
          'seller',
          'businessName email phone logo status'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

    return res.status(201).json({
      success: true,

      message:
        'Product submitted successfully and is waiting for admin approval.',

      product:
        populatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE PRODUCT
// ============================================================

export const updateProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      )

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      })
    }

    // ----------------------------------------------------------
    // OWNER CHECK
    // ----------------------------------------------------------

    const isOwner =
      String(product.seller) ===
      String(req.seller._id)

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to update this product.',
      })
    }

    // ----------------------------------------------------------
    // ALLOWED FIELDS
    // ----------------------------------------------------------

    const allowedFields = [
      'name',
      'description',
      'category',
      'subcategory',
      'sku',
      'price',
      'compareAtPrice',
      'stock',
      'sizes',
      'colors',
      'tags',
    ]

    allowedFields.forEach(
      (field) => {
        if (
          req.body[field] !==
          undefined
        ) {
          product[field] =
            field === 'sizes' ||
            field === 'colors' ||
            field === 'tags'
              ? toArray(
                  req.body[field]
                )
              : req.body[field]
        }
      }
    )

    // ----------------------------------------------------------
    // UPDATE NAME / SLUG
    // ----------------------------------------------------------

    if (
      req.body.name &&
      req.body.name.trim() &&
      req.body.name.trim() !==
        product.name
    ) {
      const baseSlug =
        generateSlug(
          req.body.name
        )

      let slug = baseSlug

      let slugNumber = 1

      while (
        await Product.exists({
          slug,
          _id: {
            $ne: product._id,
          },
        })
      ) {
        slug = `${baseSlug}-${slugNumber}`
        slugNumber += 1
      }

      product.name =
        req.body.name.trim()

      product.slug = slug
    }

    // ----------------------------------------------------------
    // NEW IMAGES
    // ----------------------------------------------------------

    if (
      req.files &&
      req.files.length > 0
    ) {
      const newImages =
        getUploadedImages(
          req.files
        )

      product.images = [
        ...product.images,
        ...newImages,
      ].slice(0, 4)
    }

    // ----------------------------------------------------------
    // SELLER UPDATE REQUIRES ADMIN REVIEW AGAIN
    // ----------------------------------------------------------

    product.approvalStatus =
      'pending'

    product.isActive = false

    product.rejectionReason = ''

    await product.save()

    const updatedProduct =
      await Product.findById(
        product._id
      )
        .populate(
          'seller',
          'businessName email phone logo status'
        )
        .populate(
          'store',
          'name slug description logo banner status'
        )

    return res.status(200).json({
      success: true,

      message:
        'Product updated successfully and submitted for admin review again.',

      product:
        updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// DELETE PRODUCT
// ============================================================

export const deleteProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      )

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      })
    }

    // ----------------------------------------------------------
    // OWNER CHECK
    // ----------------------------------------------------------

    const isOwner =
      String(product.seller) ===
      String(req.seller._id)

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to delete this product.',
      })
    }

    // ----------------------------------------------------------
    // DELETE PRODUCT
    // ----------------------------------------------------------

    await product.deleteOne()

    return res.status(200).json({
      success: true,

      message:
        'Product deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}