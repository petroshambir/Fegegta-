

// import Product from '../models/Product.js'
// import User from '../models/User.js'
// import Notification from '../models/Notification.js'

// // ============================================================
// // HELPER: CREATE IMAGE DATA FROM CLOUDINARY FILES
// // ============================================================

// const getUploadedImages = (files = []) => {
//   return files.map((file) => ({
//     url:
//       file.path ||
//       file.secure_url ||
//       file.url ||
//       '',

//     publicId:
//       file.filename ||
//       file.public_id ||
//       '',
//   }))
// }

// // ============================================================
// // HELPER: CONVERT VALUE TO ARRAY
// // ============================================================

// const toArray = (value) => {
//   if (Array.isArray(value)) {
//     return value
//       .map((item) => String(item).trim())
//       .filter(Boolean)
//   }

//   if (typeof value === 'string') {
//     return value
//       .split(',')
//       .map((item) => item.trim())
//       .filter(Boolean)
//   }

//   return []
// }

// // ============================================================
// // HELPER: GENERATE SLUG
// // ============================================================

// const generateSlug = (value = '') => {
//   return value
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/['"]/g, '')
//     .replace(/&/g, 'and')
//     .replace(/[^a-z0-9\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
// }

// // ============================================================
// // HELPER: CREATE ADMIN PRODUCT NOTIFICATIONS
// // ============================================================

// const createAdminProductNotifications = async ({
//   product,
//   seller,
// }) => {
//   try {
//     // ----------------------------------------------------------
//     // GET ALL ADMIN USERS
//     // ----------------------------------------------------------

//     const admins = await User.find({
//       role: 'admin',
//     }).select('_id')

//     if (!admins.length) {
//       return
//     }

//     const sellerName =
//       seller?.businessName ||
//       'A seller'

//     const productName =
//       product?.name ||
//       'New product'

//     // ----------------------------------------------------------
//     // CREATE NOTIFICATION FOR EVERY ADMIN
//     // ----------------------------------------------------------

//     const notifications =
//       admins.map((admin) => ({
//         recipient: admin._id,

//         type: 'product',

//         title:
//           'New Product Pending Approval',

//         message:
//           `${sellerName} submitted "${productName}" for admin approval.`,

//         product: product._id,

//         store:
//           product.store || null,

//         isRead: false,

//         readAt: null,

//         link:
//           `/admin/products/${product._id}`,
//       }))

//     if (notifications.length > 0) {
//       await Notification.insertMany(
//         notifications
//       )
//     }
//   } catch (error) {
//     // ----------------------------------------------------------
//     // IMPORTANT:
//     // Notification failure must NOT stop
//     // the product creation process.
//     // ----------------------------------------------------------

//     console.error(
//       'Failed to create admin product notification:',
//       error
//     )
//   }
// }

// // ============================================================
// // GET ALL PRODUCTS
// // ============================================================

// export const getProducts = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       search,
//       category,
//       store,
//       seller,
//       page = 1,
//       limit = 20,
//     } = req.query

//     const filter = {
//       approvalStatus: 'approved',
//       isActive: true,
//       stock: { $gt: 0 },
//     }

//     // ----------------------------------------------------------
//     // SEARCH
//     // ----------------------------------------------------------

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
//         {
//           tags: {
//             $regex: search,
//             $options: 'i',
//           },
//         },
//       ]
//     }

//     // ----------------------------------------------------------
//     // FILTERS
//     // ----------------------------------------------------------

//     if (category) {
//       filter.category = category
//     }

//     if (store) {
//       filter.store = store
//     }

//     if (seller) {
//       filter.seller = seller
//     }

//     // ----------------------------------------------------------
//     // PAGINATION
//     // ----------------------------------------------------------

//     const pageNumber = Math.max(
//       Number(page) || 1,
//       1
//     )

//     const limitNumber = Math.min(
//       Math.max(
//         Number(limit) || 20,
//         1
//       ),
//       100
//     )

//     const skip =
//       (pageNumber - 1) * limitNumber

//     // ----------------------------------------------------------
//     // QUERY
//     // ----------------------------------------------------------

//     const [products, total] =
//       await Promise.all([
//         Product.find(filter)
//           .populate(
//             'seller',
//             'businessName email phone logo status'
//           )
//           .populate(
//             'store',
//             'name slug logo banner status'
//           )
//           .sort({
//             createdAt: -1,
//           })
//           .skip(skip)
//           .limit(limitNumber)
//           .lean(),

//         Product.countDocuments(filter),
//       ])

//     return res.status(200).json({
//       success: true,

//       products,

//       pagination: {
//         page: pageNumber,
//         limit: limitNumber,
//         total,
//         pages: Math.ceil(
//           total / limitNumber
//         ),
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // GET SINGLE PRODUCT
// // ============================================================

// export const getProductById = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const product =
//       await Product.findOne({
//         _id: req.params.id,
//         approvalStatus: 'approved',
//         isActive: true,
//       })
//         .populate(
//           'seller',
//           'businessName email phone logo status'
//         )
//         .populate(
//           'store',
//           'name slug description logo banner status'
//         )

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
// // GET MY PRODUCTS
// // ============================================================

// export const getMyProducts = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const products =
//       await Product.find({
//         seller: req.seller._id,
//       })
//         .populate(
//           'store',
//           'name slug description logo banner status'
//         )
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       products,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CREATE PRODUCT
// // ============================================================

// export const createProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       sku,
//       stock,
//       weight,

//       // --------------------------------------------------------
//       // SHIPPING ORIGIN
//       // --------------------------------------------------------

//       originCountry,
//       originCity,

//       sizes,
//       colors,
//       tags,
//       compareAtPrice,
//     } = req.body

//     // ----------------------------------------------------------
//     // REQUIRED FIELDS
//     // ----------------------------------------------------------

//     if (!name || !name.trim()) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product name is required.',
//       })
//     }

//     if (
//       description === undefined ||
//       !String(description).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product description is required.',
//       })
//     }

//     if (!category || !category.trim()) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product category is required.',
//       })
//     }

//     if (
//       price === undefined ||
//       price === '' ||
//       Number.isNaN(Number(price)) ||
//       Number(price) < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A valid product price is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // PRODUCT WEIGHT
//     // ----------------------------------------------------------
//     //
//     // Weight is required and stored in kilograms.
//     //
//     // Examples:
//     // 0.5  = 500 grams
//     // 1    = 1 kilogram
//     // 2.5  = 2.5 kilograms
//     //
//     // ----------------------------------------------------------

//     if (
//       weight === undefined ||
//       weight === '' ||
//       Number.isNaN(Number(weight)) ||
//       Number(weight) <= 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A valid product weight in kilograms is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // SHIPPING ORIGIN
//     // ----------------------------------------------------------

//     const finalOriginCountry =
//       originCountry !== undefined &&
//       originCountry !== null
//         ? String(originCountry).trim()
//         : ''

//     const finalOriginCity =
//       originCity !== undefined &&
//       originCity !== null
//         ? String(originCity).trim()
//         : ''

//     if (!finalOriginCountry) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product origin country is required.',
//       })
//     }

//     if (!finalOriginCity) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product origin city is required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // SELLER STORE
//     // ----------------------------------------------------------

//     if (!req.seller.store) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'You must have a store before creating products.',
//       })
//     }

//     // ----------------------------------------------------------
//     // IMAGES
//     // ----------------------------------------------------------

//     const images =
//       getUploadedImages(req.files)

//     if (images.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'At least one product image is required.',
//       })
//     }

//     if (images.length > 4) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A product can have a maximum of 4 images.',
//       })
//     }

//     // ----------------------------------------------------------
//     // SLUG
//     // ----------------------------------------------------------

//     const baseSlug =
//       generateSlug(name)

//     let slug = baseSlug

//     let slugNumber = 1

//     while (
//       await Product.exists({ slug })
//     ) {
//       slug =
//         `${baseSlug}-${slugNumber}`

//       slugNumber += 1
//     }

//     // ----------------------------------------------------------
//     // CREATE PRODUCT
//     // ----------------------------------------------------------

//     const product =
//       await Product.create({
//         ownerType: 'seller',

//         seller: req.seller._id,

//         store: req.seller.store,

//         name: name.trim(),

//         slug,

//         description:
//           String(description).trim(),

//         category:
//           category.trim(),

//         subcategory:
//           subcategory
//             ? String(subcategory).trim()
//             : '',

//         price: Number(price),

//         compareAtPrice:
//           compareAtPrice !== undefined &&
//           compareAtPrice !== ''
//             ? Number(compareAtPrice)
//             : 0,

//         stock:
//           stock !== undefined &&
//           stock !== ''
//             ? Number(stock)
//             : 0,

//         // ------------------------------------------------------
//         // PRODUCT WEIGHT
//         // ------------------------------------------------------

//         weight: Number(weight),

//         // ------------------------------------------------------
//         // SHIPPING ORIGIN
//         // ------------------------------------------------------

//         originCountry:
//           finalOriginCountry,

//         originCity:
//           finalOriginCity,

//         sku:
//           sku
//             ? String(sku).trim()
//             : '',

//         images,

//         sizes: toArray(sizes),

//         colors: toArray(colors),

//         tags: toArray(tags),

//         // ------------------------------------------------------
//         // IMPORTANT
//         // Seller products must be reviewed by admin.
//         // ------------------------------------------------------

//         approvalStatus: 'pending',

//         isActive: false,
//       })

//     // ----------------------------------------------------------
//     // GET SELLER INFORMATION FOR NOTIFICATION
//     // ----------------------------------------------------------

//     const sellerForNotification =
//       req.seller

//     // ----------------------------------------------------------
//     // CREATE ADMIN NOTIFICATION
//     // ----------------------------------------------------------

//     await createAdminProductNotifications({
//       product,
//       seller: sellerForNotification,
//     })

//     // ----------------------------------------------------------
//     // POPULATE PRODUCT
//     // ----------------------------------------------------------

//     const populatedProduct =
//       await Product.findById(
//         product._id
//       )
//         .populate(
//           'seller',
//           'businessName email phone logo status'
//         )
//         .populate(
//           'store',
//           'name slug description logo banner status'
//         )

//     return res.status(201).json({
//       success: true,

//       message:
//         'Product submitted successfully and is waiting for admin approval.',

//       product:
//         populatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE PRODUCT
// // ============================================================

// export const updateProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const product =
//       await Product.findById(
//         req.params.id
//       )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // OWNER CHECK
//     // ----------------------------------------------------------

//     const isOwner =
//       String(product.seller) ===
//       String(req.seller._id)

//     if (!isOwner) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to update this product.',
//       })
//     }

//     // ----------------------------------------------------------
//     // WEIGHT VALIDATION
//     // ----------------------------------------------------------

//     if (
//       req.body.weight !== undefined
//     ) {
//       if (
//         req.body.weight === '' ||
//         Number.isNaN(
//           Number(req.body.weight)
//         ) ||
//         Number(req.body.weight) <= 0
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'A valid product weight in kilograms is required.',
//         })
//       }
//     }

//     // ----------------------------------------------------------
//     // SHIPPING ORIGIN VALIDATION
//     // ----------------------------------------------------------

//     if (
//       req.body.originCountry !== undefined
//     ) {
//       if (
//         !String(
//           req.body.originCountry
//         ).trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Product origin country is required.',
//         })
//       }
//     }

//     if (
//       req.body.originCity !== undefined
//     ) {
//       if (
//         !String(
//           req.body.originCity
//         ).trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Product origin city is required.',
//         })
//       }
//     }

//     // ----------------------------------------------------------
//     // ALLOWED FIELDS
//     // ----------------------------------------------------------

//     const allowedFields = [
//       'name',
//       'description',
//       'category',
//       'subcategory',
//       'sku',
//       'price',
//       'compareAtPrice',
//       'stock',
//       'weight',

//       // --------------------------------------------------------
//       // SHIPPING ORIGIN
//       // --------------------------------------------------------

//       'originCountry',
//       'originCity',

//       'sizes',
//       'colors',
//       'tags',
//     ]

//     allowedFields.forEach(
//       (field) => {
//         if (
//           req.body[field] !==
//           undefined
//         ) {
//           product[field] =
//             field === 'sizes' ||
//             field === 'colors' ||
//             field === 'tags'
//               ? toArray(
//                   req.body[field]
//                 )
//               : field === 'weight' ||
//                 field === 'price' ||
//                 field === 'compareAtPrice' ||
//                 field === 'stock'
//                 ? Number(
//                     req.body[field]
//                   )
//                 : typeof req.body[field] ===
//                     'string'
//                   ? req.body[field].trim()
//                   : req.body[field]
//         }
//       }
//     )

//     // ----------------------------------------------------------
//     // UPDATE NAME / SLUG
//     // ----------------------------------------------------------

//     if (
//       req.body.name &&
//       req.body.name.trim() &&
//       req.body.name.trim() !==
//         product.name
//     ) {
//       const baseSlug =
//         generateSlug(
//           req.body.name
//         )

//       let slug = baseSlug

//       let slugNumber = 1

//       while (
//         await Product.exists({
//           slug,
//           _id: {
//             $ne: product._id,
//           },
//         })
//       ) {
//         slug =
//           `${baseSlug}-${slugNumber}`

//         slugNumber += 1
//       }

//       product.name =
//         req.body.name.trim()

//       product.slug = slug
//     }

//     // ----------------------------------------------------------
//     // NEW IMAGES
//     // ----------------------------------------------------------

//     if (
//       req.files &&
//       req.files.length > 0
//     ) {
//       const newImages =
//         getUploadedImages(
//           req.files
//         )

//       product.images = [
//         ...product.images,
//         ...newImages,
//       ].slice(0, 4)
//     }

//     // ----------------------------------------------------------
//     // SELLER UPDATE REQUIRES ADMIN REVIEW AGAIN
//     // ----------------------------------------------------------

//     product.approvalStatus =
//       'pending'

//     product.isActive = false

//     product.rejectionReason = ''

//     await product.save()

//     // ----------------------------------------------------------
//     // PRODUCT UPDATE NOTIFICATION
//     // ----------------------------------------------------------

//     await createAdminProductNotifications({
//       product,
//       seller: req.seller,
//     })

//     const updatedProduct =
//       await Product.findById(
//         product._id
//       )
//         .populate(
//           'seller',
//           'businessName email phone logo status'
//         )
//         .populate(
//           'store',
//           'name slug description logo banner status'
//         )

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product updated successfully and submitted for admin review again.',

//       product:
//         updatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // DELETE PRODUCT
// // ============================================================

// export const deleteProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const product =
//       await Product.findById(
//         req.params.id
//       )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // OWNER CHECK
//     // ----------------------------------------------------------

//     const isOwner =
//       String(product.seller) ===
//       String(req.seller._id)

//     if (!isOwner) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'You are not allowed to delete this product.',
//       })
//     }

//     // ----------------------------------------------------------
//     // DELETE PRODUCT
//     // ----------------------------------------------------------

//     await product.deleteOne()

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product deleted successfully.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import React, {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  ArrowLeft,
  ImagePlus,
  Plus,
  X,
  Star,
  Loader2,
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'

// ============================================================
// API
// ============================================================

const API_URL =
  'https://fegegta-server.onrender.com/api'

// ============================================================
// ADD PRODUCT
// ============================================================

function AddProduct() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // ==========================================================
  // STORE
  // ==========================================================

  const [store, setStore] = useState(null)
  const [loadingStore, setLoadingStore] =
    useState(true)

  // ==========================================================
  // FORM
  // ==========================================================

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    compareAtPrice: '',
    stock: '',
    sku: '',

    // Product details
    sizes: '',
    colors: '',
    material: '',
    tags: '',

    // Shipping
    weight: '',
    originCountry: '',
    originCity: '',
  })

  // ==========================================================
  // IMAGES
  // ==========================================================

  const [images, setImages] = useState([])

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // ==========================================================
  // TOKEN
  // ==========================================================

  const getToken = () => {
    return localStorage.getItem('token')
  }

  // ==========================================================
  // LOAD SELLER STORE
  // ==========================================================

  useEffect(() => {
    const loadStore = async () => {
      try {
        setLoadingStore(true)
        setError('')

        const token = getToken()

        if (!token) {
          setError(
            'Please log in to your seller account.'
          )

          return
        }

        const response = await fetch(
          `${API_URL}/seller/store`,
          {
            method: 'GET',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Unable to load your seller store.'
          )
        }

        const loadedStore =
          data?.store ||
          data?.data?.store ||
          data?.data ||
          null

        if (!loadedStore) {
          setStore(null)

          setError(
            'Your seller store could not be found. Please contact the administrator.'
          )

          return
        }

        setStore(loadedStore)
      } catch (storeError) {
        console.error(
          'Load seller store error:',
          storeError
        )

        setStore(null)

        setError(
          storeError?.message ||
            'Unable to load your seller store.'
        )
      } finally {
        setLoadingStore(false)
      }
    }

    loadStore()
  }, [])

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setError('')
  }

  // ==========================================================
  // ADD IMAGES
  // ==========================================================

  const handleImages = (event) => {
    const files = Array.from(
      event.target.files || []
    )

    if (!files.length) {
      return
    }

    const remainingSlots =
      4 - images.length

    if (remainingSlots <= 0) {
      setError(
        'You can upload a maximum of 4 product images.'
      )

      event.target.value = ''

      return
    }

    const selectedFiles =
      files.slice(
        0,
        remainingSlots
      )

    const newImages =
      selectedFiles.map(
        (file, index) => ({
          id:
            `${Date.now()}-${index}-${Math.random()
              .toString(36)
              .slice(2, 8)}`,

          file,

          url:
            URL.createObjectURL(
              file
            ),

          name: file.name,
        })
      )

    setImages((prev) => [
      ...prev,
      ...newImages,
    ])

    setError('')

    event.target.value = ''
  }

  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  const removeImage = (id) => {
    setImages((prev) => {
      const imageToRemove =
        prev.find(
          (image) =>
            image.id === id
        )

      if (
        imageToRemove?.url
      ) {
        URL.revokeObjectURL(
          imageToRemove.url
        )
      }

      return prev.filter(
        (image) =>
          image.id !== id
      )
    })
  }

  // ==========================================================
  // MAKE MAIN IMAGE
  // ==========================================================

  const makeMainImage = (id) => {
    setImages((prev) => {
      const selected =
        prev.find(
          (image) =>
            image.id === id
        )

      if (!selected) {
        return prev
      }

      return [
        selected,
        ...prev.filter(
          (image) =>
            image.id !== id
        ),
      ]
    })
  }

  // ==========================================================
  // SUBMIT PRODUCT
  // ==========================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    setError('')

    // ========================================================
    // BASIC VALIDATION
    // ========================================================

    if (
      !formData.name.trim()
    ) {
      setError(
        'Product name is required.'
      )

      return
    }

    if (
      !formData.description.trim()
    ) {
      setError(
        'Product description is required.'
      )

      return
    }

    if (
      !formData.category.trim()
    ) {
      setError(
        'Product category is required.'
      )

      return
    }

    if (
      formData.price === '' ||
      Number.isNaN(
        Number(formData.price)
      ) ||
      Number(formData.price) < 0
    ) {
      setError(
        'Please enter a valid product price.'
      )

      return
    }

    // ========================================================
    // COMPARE AT PRICE
    // ========================================================

    if (
      formData.compareAtPrice !== ''
    ) {
      if (
        Number.isNaN(
          Number(
            formData.compareAtPrice
          )
        ) ||
        Number(
          formData.compareAtPrice
        ) < 0
      ) {
        setError(
          'Compare-at price cannot be negative.'
        )

        return
      }
    }

    // ========================================================
    // STOCK
    // ========================================================

    if (
      formData.stock !== '' &&
      (
        Number.isNaN(
          Number(formData.stock)
        ) ||
        Number(formData.stock) < 0
      )
    ) {
      setError(
        'Stock cannot be negative.'
      )

      return
    }

    // ========================================================
    // WEIGHT
    // ========================================================

    if (
      formData.weight === '' ||
      Number.isNaN(
        Number(formData.weight)
      ) ||
      Number(formData.weight) <= 0
    ) {
      setError(
        'Please enter a valid product weight in kilograms.'
      )

      return
    }

    // ========================================================
    // ORIGIN COUNTRY
    // ========================================================

    if (
      !formData.originCountry.trim()
    ) {
      setError(
        'Product origin country is required.'
      )

      return
    }

    // ========================================================
    // ORIGIN CITY
    // ========================================================

    if (
      !formData.originCity.trim()
    ) {
      setError(
        'Product origin city is required.'
      )

      return
    }

    // ========================================================
    // IMAGES
    // ========================================================

    if (images.length === 0) {
      setError(
        'Please add at least one product image.'
      )

      return
    }

    if (images.length > 4) {
      setError(
        'A product can have a maximum of 4 images.'
      )

      return
    }

    // ========================================================
    // STORE
    // ========================================================

    if (
      !store?._id &&
      !store?.id
    ) {
      setError(
        'Your seller store could not be found. Please complete your seller store first.'
      )

      return
    }

    // ========================================================
    // TOKEN
    // ========================================================

    const token = getToken()

    if (!token) {
      setError(
        'Your login session has expired. Please log in again.'
      )

      return
    }

    setSaving(true)

    try {
      // ======================================================
      // FORM DATA
      // ======================================================

      const data =
        new FormData()

      // ------------------------------------------------------
      // BASIC INFORMATION
      // ------------------------------------------------------

      data.append(
        'name',
        formData.name.trim()
      )

      data.append(
        'description',
        formData.description.trim()
      )

      data.append(
        'category',
        formData.category.trim()
      )

      data.append(
        'subcategory',
        formData.subcategory.trim()
      )

      // ------------------------------------------------------
      // PRICE
      // ------------------------------------------------------

      data.append(
        'price',
        String(
          Number(formData.price)
        )
      )

      data.append(
        'compareAtPrice',
        String(
          formData.compareAtPrice
            ? Number(
                formData.compareAtPrice
              )
            : 0
        )
      )

      // ------------------------------------------------------
      // STOCK
      // ------------------------------------------------------

      data.append(
        'stock',
        String(
          formData.stock
            ? Number(
                formData.stock
              )
            : 0
        )
      )

      // ------------------------------------------------------
      // SKU
      // ------------------------------------------------------

      data.append(
        'sku',
        formData.sku.trim()
      )

      // ------------------------------------------------------
      // MATERIAL
      // ------------------------------------------------------

      /*
        Product model supports material.
        Current createProduct controller does not
        explicitly read it.

        We still send it here so the backend can
        support it after controller update.
      */

      data.append(
        'material',
        formData.material.trim()
      )

      // ------------------------------------------------------
      // SIZES
      // ------------------------------------------------------

      data.append(
        'sizes',
        JSON.stringify(
          formData.sizes
            .split(',')
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean)
        )
      )

      // ------------------------------------------------------
      // COLORS
      // ------------------------------------------------------

      data.append(
        'colors',
        JSON.stringify(
          formData.colors
            .split(',')
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean)
        )
      )

      // ------------------------------------------------------
      // TAGS
      // ------------------------------------------------------

      data.append(
        'tags',
        JSON.stringify(
          formData.tags
            .split(',')
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean)
        )
      )

      // ======================================================
      // SHIPPING INFORMATION
      // ======================================================

      data.append(
        'weight',
        String(
          Number(
            formData.weight
          )
        )
      )

      data.append(
        'originCountry',
        formData.originCountry.trim()
      )

      data.append(
        'originCity',
        formData.originCity.trim()
      )

      // ======================================================
      // STORE
      // ======================================================

      /*
        Backend does NOT trust a seller-supplied sellerId
        or storeId.

        It correctly uses:

        req.seller._id
        req.seller.store

        So these fields are not required by the controller.

        We can still send storeId for future compatibility.
      */

      data.append(
        'storeId',
        store?._id ||
          store?.id ||
          ''
      )

      data.append(
        'storeSlug',
        store?.slug || ''
      )

      // ======================================================
      // IMAGES
      // ======================================================

      images.forEach(
        (image) => {
          if (image.file) {
            data.append(
              'images',
              image.file
            )
          }
        }
      )

      // ======================================================
      // SEND
      // ======================================================

      const response =
        await fetch(
          `${API_URL}/products/seller`,
          {
            method: 'POST',

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: data,
          }
        )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result?.message ||
            'Product could not be submitted.'
        )
      }

      // ======================================================
      // SUCCESS
      // ======================================================

      navigate(
        '/seller/products',
        {
          replace: true,

          state: {
            successMessage:
              'Product submitted successfully and is waiting for admin approval.',
          },
        }
      )
    } catch (submitError) {
      console.error(
        'Add product error:',
        submitError
      )

      setError(
        submitError?.message ||
          'Product could not be submitted.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ==========================================================
  // LOADING STORE
  // ==========================================================

  if (loadingStore) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-gray-700" />

          <span className="text-sm font-medium text-gray-700">
            Loading your store...
          </span>
        </div>
      </div>
    )
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ====================================================
            BACK
        ==================================================== */}

        <Link
          to="/seller/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* ====================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add your product information and up to 4 product images.
            </p>
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ==================================================
              BASIC INFORMATION
          ================================================== */}

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <Input
              label="Product Name"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              placeholder="Example: Traditional Dress"
              required
            />

            <Input
              label="Category"
              name="category"
              value={
                formData.category
              }
              onChange={
                handleChange
              }
              placeholder="Example: Clothing"
              required
            />

            <Input
              label="Subcategory"
              name="subcategory"
              value={
                formData.subcategory
              }
              onChange={
                handleChange
              }
              placeholder="Example: Women's Dresses"
            />

            <Input
              label="SKU"
              name="sku"
              value={
                formData.sku
              }
              onChange={
                handleChange
              }
              placeholder="Example: HAB-001"
            />

            <Input
              label="Price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={
                formData.price
              }
              onChange={
                handleChange
              }
              required
            />

            <Input
              label="Compare-at Price"
              name="compareAtPrice"
              type="number"
              min="0"
              step="0.01"
              value={
                formData.compareAtPrice
              }
              onChange={
                handleChange
              }
              placeholder="Optional"
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              min="0"
              value={
                formData.stock
              }
              onChange={
                handleChange
              }
              placeholder="0"
            />

            <Input
              label="Material / Quality"
              name="material"
              value={
                formData.material
              }
              onChange={
                handleChange
              }
              placeholder="Example: Cotton, handmade embroidery"
            />

            <Input
              label="Sizes"
              name="sizes"
              value={
                formData.sizes
              }
              onChange={
                handleChange
              }
              placeholder="S, M, L, XL"
            />

            <Input
              label="Colors"
              name="colors"
              value={
                formData.colors
              }
              onChange={
                handleChange
              }
              placeholder="Black, White, Red"
            />

            <Input
              label="Tags"
              name="tags"
              value={
                formData.tags
              }
              onChange={
                handleChange
              }
              placeholder="traditional, handmade, dress"
            />

          </div>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <Textarea
            label="Description"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Describe the product..."
            required
          />

          {/* ==================================================
              SHIPPING INFORMATION
          ================================================== */}

          <div className="mt-8">

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Shipping Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                This information is used to calculate shipping rates.
              </p>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-3">

              <Input
                label="Weight (kg)"
                name="weight"
                type="number"
                min="0.01"
                step="0.01"
                value={
                  formData.weight
                }
                onChange={
                  handleChange
                }
                placeholder="Example: 0.5"
                required
              />

              <Input
                label="Origin Country"
                name="originCountry"
                value={
                  formData.originCountry
                }
                onChange={
                  handleChange
                }
                placeholder="Example: Ethiopia"
                required
              />

              <Input
                label="Origin City"
                name="originCity"
                value={
                  formData.originCity
                }
                onChange={
                  handleChange
                }
                placeholder="Example: Addis Ababa"
                required
              />

            </div>
          </div>

          {/* ==================================================
              FEATURES
          ================================================== */}

          <div className="mt-6">

            <Textarea
              label="Features"
              name="features"
              value={
                formData.features
              }
              onChange={
                handleChange
              }
              placeholder="Handmade, Comfortable, High quality, Traditional design"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate features with commas.
            </p>

          </div>

          {/* ==================================================
              IMAGES
          ================================================== */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Product Images
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Upload up to 4 images showing different sides or angles.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {images.length}/4
              </span>

            </div>

            {images.length < 4 && (
              <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 transition hover:border-black hover:bg-white">

                <ImagePlus className="h-9 w-9 text-gray-400" />

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Add Product Images
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {4 - images.length} image slot
                  {4 - images.length !== 1
                    ? 's'
                    : ''}{' '}
                  remaining
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={
                    handleImages
                  }
                />

              </label>
            )}

            {/* ==================================================
                IMAGE PREVIEW
            ================================================== */}

            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {images.map(
                  (
                    image,
                    index
                  ) => (
                    <div
                      key={
                        image.id
                      }
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                    >

                      <div className="aspect-square">

                        <img
                          src={
                            image.url
                          }
                          alt={
                            image.name ||
                            `Product image ${
                              index + 1
                            }`
                          }
                          className="h-full w-full object-cover"
                        />

                      </div>

                      {index === 0 && (
                        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black px-2 py-1 text-xs font-semibold text-white">

                          <Star className="h-3 w-3 fill-current" />

                          Main

                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-2 pt-8">

                        {index !== 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              makeMainImage(
                                image.id
                              )
                            }
                            className="text-xs font-semibold text-white hover:underline"
                          >
                            Make main
                          </button>
                        ) : (
                          <span className="text-xs text-white">
                            Main image
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              image.id
                            )
                          }
                          className="rounded-lg bg-white/90 p-1.5 text-red-600 transition hover:bg-white"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* ==================================================
              STORE
          ================================================== */}

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Product will be added to
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {store?.name ||
                store?.storeName ||
                'Your Store'}
            </p>

            {store?.slug && (
              <p className="mt-1 text-xs text-gray-500">
                /store/
                {store.slug}
              </p>
            )}

          </div>

          {/* ==================================================
              SUBMIT
          ================================================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/seller/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                !store
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Submit Product
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

// ============================================================
// INPUT
// ============================================================

function Input({
  label,
  ...props
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />

    </div>
  )
}

// ============================================================
// TEXTAREA
// ============================================================

function Textarea({
  label,
  ...props
}) {
  return (
    <div className="mt-6">

      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
      />

    </div>
  )
}

export default AddProduct