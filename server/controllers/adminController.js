

// import User from '../models/User.js'
// import Seller from '../models/Seller.js'
// import Product from '../models/Product.js'
// import Store from '../models/Store.js'
// import Order from '../models/Order.js'
// import Notification from '../models/Notification.js'
// import AdminSettings from '../models/AdminSettings.js'
// import bcrypt from 'bcryptjs'

// // ============================================================
// // HELPERS
// // ============================================================

// // ------------------------------------------------------------
// // CONVERT VALUE TO ARRAY
// // ------------------------------------------------------------

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

// // ------------------------------------------------------------
// // GENERATE SLUG
// // ------------------------------------------------------------

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
// // DASHBOARD
// // ============================================================

// export const getDashboard = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const [
//       users,
//       sellers,
//       products,
//       stores,
//       orders,
//       unreadNotifications,
//     ] = await Promise.all([
//       User.countDocuments(),

//       Seller.countDocuments(),

//       Product.countDocuments(),

//       Store.countDocuments(),

//       Order.countDocuments(),

//       Notification.countDocuments({
//         read: false,
//       }),
//     ])

//     const salesResult =
//       await Order.aggregate([
//         {
//           $match: {
//             status: {
//               $ne: 'cancelled',
//             },
//           },
//         },

//         {
//           $group: {
//             _id: null,

//             totalSales: {
//               $sum: '$total',
//             },
//           },
//         },
//       ])

//     const totalSales =
//       salesResult[0]?.totalSales || 0

//     return res.status(200).json({
//       success: true,

//       dashboard: {
//         users,
//         sellers,
//         products,
//         stores,
//         orders,
//         unreadNotifications,
//         totalSales,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // COMPATIBILITY ALIAS
// // ============================================================

// export const getAdminDashboard =
//   getDashboard

// // ============================================================
// // USERS
// // ============================================================

// export const getUsers = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const users =
//       await User.find()
//         .select('-password')
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       users,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE USER ROLE
// // ============================================================

// export const updateUserRole = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { role } = req.body

//     const allowedRoles = [
//       'customer',
//       'seller',
//       'admin',
//     ]

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid user role.',
//       })
//     }

//     const user =
//       await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           role,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       ).select('-password')

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'User not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'User role updated successfully.',
//       user,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // SELLERS
// // ============================================================

// export const getSellers = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const sellers =
//       await Seller.find()
//         .populate(
//           'user',
//           'name firstName lastName email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       sellers,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // APPROVE SELLER
// // ============================================================

// export const approveSeller = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const seller =
//       await Seller.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: 'approved',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'user',
//           'name email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Seller not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'Seller approved successfully.',
//       seller,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // REJECT SELLER
// // ============================================================

// export const rejectSeller = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       reason = '',
//     } = req.body

//     const seller =
//       await Seller.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: 'rejected',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'user',
//           'name email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Seller not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: reason
//         ? `Seller rejected: ${reason}`
//         : 'Seller rejected successfully.',
//       seller,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // PRODUCTS - GET ALL ADMIN PRODUCTS
// // ============================================================

// export const getProducts = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const products =
//       await Product.find()
//         .populate(
//           'seller',
//           'businessName email phone status logo'
//         )
//         .populate(
//           'store',
//           'name slug status logo banner'
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
// // CREATE PRODUCT FROM ADMIN
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
//       category,
//       subcategory,
//       sku,
//       price,
//       oldPrice,
//       compareAtPrice,
//       stock,
//       material,
//       sizes,
//       colors,
//       features,
//       tags,
//       sellerId,
//       storeId,
//     } = req.body

//     // ========================================================
//     // REQUIRED PRODUCT INFORMATION
//     // ========================================================

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

//     if (
//       !category ||
//       !category.trim()
//     ) {
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

//     // ========================================================
//     // SELLER + STORE
//     // ========================================================

//     if (!sellerId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A seller must be selected for this product.',
//       })
//     }

//     if (!storeId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A store must be selected for this product.',
//       })
//     }

//     // ========================================================
//     // FIND SELLER
//     // ========================================================

//     const seller =
//       await Seller.findById(
//         sellerId
//       )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Selected seller was not found.',
//       })
//     }

//     if (
//       seller.status !==
//       'approved'
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected seller is not approved.',
//       })
//     }

//     // ========================================================
//     // FIND STORE
//     // ========================================================

//     const store =
//       await Store.findById(
//         storeId
//       )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Selected store was not found.',
//       })
//     }

//     if (
//       ![
//         'approved',
//         'active',
//       ].includes(store.status)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected store is not active.',
//       })
//     }

//     // ========================================================
//     // VERIFY SELLER OWNS STORE
//     // ========================================================

//     if (
//       !seller.store ||
//       String(seller.store) !==
//         String(store._id)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected store does not belong to the selected seller.',
//       })
//     }

//     // ========================================================
//     // PRODUCT IMAGES
//     // ========================================================

//     const images =
//       (req.files || []).map(
//         (file) => ({
//           url:
//             file.path ||
//             file.secure_url ||
//             file.url ||
//             '',

//           publicId:
//             file.filename ||
//             file.public_id ||
//             '',
//         })
//       )

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

//     // ========================================================
//     // GENERATE UNIQUE SLUG
//     // ========================================================

//     const baseSlug =
//       generateSlug(name)

//     if (!baseSlug) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product name cannot be converted into a valid URL slug.',
//       })
//     }

//     let slug = baseSlug

//     let slugNumber = 1

//     while (
//       await Product.exists({
//         slug,
//       })
//     ) {
//       slug =
//         `${baseSlug}-${slugNumber}`

//       slugNumber += 1
//     }

//     // ========================================================
//     // COMPARE AT PRICE
//     // ========================================================

//     const finalCompareAtPrice =
//       compareAtPrice !== undefined &&
//       compareAtPrice !== ''
//         ? Number(compareAtPrice)
//         : oldPrice !== undefined &&
//             oldPrice !== ''
//           ? Number(oldPrice)
//           : 0

//     if (
//       Number.isNaN(
//         finalCompareAtPrice
//       ) ||
//       finalCompareAtPrice < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid old/compare price.',
//       })
//     }

//     // ========================================================
//     // STOCK
//     // ========================================================

//     const finalStock =
//       stock !== undefined &&
//       stock !== ''
//         ? Number(stock)
//         : 0

//     if (
//       Number.isNaN(finalStock) ||
//       finalStock < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid stock quantity.',
//       })
//     }

//     // ========================================================
//     // MATERIAL
//     // ========================================================

//     const finalMaterial =
//       material !== undefined &&
//       material !== null
//         ? String(material).trim()
//         : ''

//     // ========================================================
//     // FEATURES
//     // ========================================================

//     const finalFeatures =
//       toArray(features)

//     // ========================================================
//     // TAGS
//     // ========================================================

//     const finalTags =
//       toArray(tags)

//     // ========================================================
//     // CREATE PRODUCT
//     //
//     // ADMIN PRODUCTS ARE APPROVED DIRECTLY.
//     // ========================================================

//     const product =
//       await Product.create({
//         seller:
//           seller._id,

//         store:
//           store._id,

//         name:
//           name.trim(),

//         slug,

//         description:
//           String(
//             description
//           ).trim(),

//         category:
//           category.trim(),

//         subcategory:
//           subcategory
//             ? String(
//                 subcategory
//               ).trim()
//             : '',

//         material:
//           finalMaterial,

//         price:
//           Number(price),

//         compareAtPrice:
//           finalCompareAtPrice,

//         stock:
//           finalStock,

//         sku:
//           sku
//             ? String(sku).trim()
//             : '',

//         images,

//         sizes:
//           toArray(sizes),

//         colors:
//           toArray(colors),

//         features:
//           finalFeatures,

//         tags:
//           finalTags,

//         approvalStatus:
//           'approved',

//         isActive:
//           true,

//         rejectionReason:
//           '',
//       })

//     // ========================================================
//     // POPULATE CREATED PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(201).json({
//       success: true,

//       message:
//         'Product created successfully and published.',

//       product:
//         populatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE PRODUCT FROM ADMIN
// // ============================================================

// export const updateProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       name,
//       description,
//       category,
//       subcategory,
//       sku,
//       price,
//       oldPrice,
//       compareAtPrice,
//       stock,
//       material,
//       sizes,
//       colors,
//       features,
//       tags,
//       existingImages,
//     } = req.body

//     // ========================================================
//     // FIND PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // REQUIRED PRODUCT INFORMATION
//     // ========================================================

//     if (
//       name === undefined ||
//       !String(name).trim()
//     ) {
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

//     if (
//       category === undefined ||
//       !String(category).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product category is required.',
//       })
//     }

//     // ========================================================
//     // PRICE
//     // ========================================================

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

//     // ========================================================
//     // COMPARE AT PRICE
//     // ========================================================

//     const finalCompareAtPrice =
//       compareAtPrice !== undefined &&
//       compareAtPrice !== ''
//         ? Number(compareAtPrice)
//         : oldPrice !== undefined &&
//             oldPrice !== ''
//           ? Number(oldPrice)
//           : 0

//     if (
//       Number.isNaN(
//         finalCompareAtPrice
//       ) ||
//       finalCompareAtPrice < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid old/compare price.',
//       })
//     }

//     // ========================================================
//     // STOCK
//     // ========================================================

//     const finalStock =
//       stock !== undefined &&
//       stock !== ''
//         ? Number(stock)
//         : 0

//     if (
//       Number.isNaN(finalStock) ||
//       finalStock < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid stock quantity.',
//       })
//     }

//     // ========================================================
//     // PARSE ARRAYS
//     // ========================================================

//     const parseArrayField = (
//       value,
//       fallback = []
//     ) => {
//       if (
//         value === undefined ||
//         value === null ||
//         value === ''
//       ) {
//         return fallback
//       }

//       if (Array.isArray(value)) {
//         return value
//           .map((item) =>
//             String(item).trim()
//           )
//           .filter(Boolean)
//       }

//       if (
//         typeof value === 'string'
//       ) {
//         try {
//           const parsed =
//             JSON.parse(value)

//           if (
//             Array.isArray(parsed)
//           ) {
//             return parsed
//               .map((item) =>
//                 String(item).trim()
//               )
//               .filter(Boolean)
//           }
//         } catch {
//           return toArray(value)
//         }
//       }

//       return fallback
//     }

//     const finalSizes =
//       parseArrayField(
//         sizes,
//         product.sizes || []
//       )

//     const finalColors =
//       parseArrayField(
//         colors,
//         product.colors || []
//       )

//     const finalFeatures =
//       parseArrayField(
//         features,
//         product.features || []
//       )

//     const finalTags =
//       parseArrayField(
//         tags,
//         product.tags || []
//       )

//     // ========================================================
//     // EXISTING IMAGES
//     // ========================================================

//     let requestedExistingImages = []

//     if (
//       existingImages !==
//         undefined &&
//       existingImages !== null &&
//       existingImages !== ''
//     ) {
//       try {
//         const parsed =
//           JSON.parse(
//             existingImages
//           )

//         if (
//           Array.isArray(parsed)
//         ) {
//           requestedExistingImages =
//             parsed
//               .map((image) =>
//                 String(image).trim()
//               )
//               .filter(Boolean)
//         }
//       } catch {
//         requestedExistingImages =
//           toArray(
//             existingImages
//           )
//       }
//     }

//     const currentImages =
//       Array.isArray(product.images)
//         ? product.images
//         : []

//     const keptImages =
//       currentImages.filter(
//         (image) =>
//           image &&
//           requestedExistingImages.includes(
//             String(image.url)
//           )
//       )

//     // ========================================================
//     // NEW CLOUDINARY IMAGES
//     // ========================================================

//     const newImages =
//       (req.files || []).map(
//         (file) => ({
//           url:
//             file.path ||
//             file.secure_url ||
//             file.url ||
//             '',

//           publicId:
//             file.filename ||
//             file.public_id ||
//             '',
//         })
//       )

//     // ========================================================
//     // FINAL IMAGE LIST
//     // ========================================================

//     const finalImages = [
//       ...keptImages,
//       ...newImages,
//     ]

//     if (
//       finalImages.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'At least one product image is required.',
//       })
//     }

//     if (
//       finalImages.length > 4
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A product can have a maximum of 4 images.',
//       })
//     }

//     // ========================================================
//     // UPDATE SLUG ONLY IF NAME CHANGED
//     // ========================================================

//     let slug =
//       product.slug

//     if (
//       String(product.name)
//         .trim()
//         .toLowerCase() !==
//       String(name)
//         .trim()
//         .toLowerCase()
//     ) {
//       const baseSlug =
//         generateSlug(name)

//       if (!baseSlug) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Product name cannot be converted into a valid URL slug.',
//         })
//       }

//       slug =
//         baseSlug

//       let slugNumber = 1

//       while (
//         await Product.exists({
//           slug,
//           _id: {
//             $ne:
//               product._id,
//           },
//         })
//       ) {
//         slug =
//           `${baseSlug}-${slugNumber}`

//         slugNumber += 1
//       }
//     }

//     // ========================================================
//     // MATERIAL
//     // ========================================================

//     const finalMaterial =
//       material !== undefined &&
//       material !== null
//         ? String(material).trim()
//         : ''

//     // ========================================================
//     // UPDATE PRODUCT
//     //
//     // Seller and store remain unchanged.
//     // Approval status remains unchanged.
//     // ========================================================

//     product.name =
//       String(name).trim()

//     product.slug =
//       slug

//     product.description =
//       String(description).trim()

//     product.category =
//       String(category).trim()

//     product.subcategory =
//       subcategory !== undefined &&
//       subcategory !== null
//         ? String(
//             subcategory
//           ).trim()
//         : ''

//     product.sku =
//       sku !== undefined &&
//       sku !== null
//         ? String(sku).trim()
//         : ''

//     product.price =
//       Number(price)

//     product.compareAtPrice =
//       finalCompareAtPrice

//     product.stock =
//       finalStock

//     product.material =
//       finalMaterial

//     product.sizes =
//       finalSizes

//     product.colors =
//       finalColors

//     product.features =
//       finalFeatures

//     product.tags =
//       finalTags

//     product.images =
//       finalImages

//     await product.save()

//     // ========================================================
//     // POPULATE UPDATED PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product updated successfully.',

//       product:
//         populatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // DELETE PRODUCT FROM ADMIN
// // ============================================================

// export const deleteProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     // ========================================================
//     // FIND PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // DELETE PRODUCT
//     // ========================================================

//     await Product.findByIdAndDelete(
//       req.params.id
//     )

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(200).json({
//       success: true,
//       message:
//         'Product deleted successfully.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // APPROVE PRODUCT
// // ============================================================

// export const approveProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const product =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           approvalStatus:
//             'approved',

//           rejectionReason:
//             '',

//           isActive:
//             true,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'businessName email phone status logo'
//         )
//         .populate(
//           'store',
//           'name slug status logo banner'
//         )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product approved successfully.',

//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // REJECT PRODUCT
// // ============================================================

// export const rejectProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       reason = '',
//     } = req.body

//     const product =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           approvalStatus:
//             'rejected',

//           rejectionReason:
//             String(reason).trim(),

//           isActive:
//             false,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'businessName email phone status'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message: reason
//         ? `Product rejected: ${reason}`
//         : 'Product rejected successfully.',

//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // STORES
// // ============================================================

// export const approveStore = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const store =
//       await Store.findByIdAndUpdate(
//         req.params.id,
//         {
//           status:
//             'approved',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'name email'
//         )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Store not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message:
//         'Store approved successfully.',

//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // ORDERS
// // ============================================================

// export const getOrders = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const orders =
//       await Order.find()
//         .sort({
//           createdAt: -1,
//         })
//         .populate(
//           'user',
//           'name email phone'
//         )
//         .populate(
//           'items.product'
//         )
//         .populate(
//           'items.seller',
//           'businessName email phone status'
//         )
//         .populate(
//           'items.store',
//           'name slug status'
//         )

//     return res.status(200).json({
//       success: true,
//       orders,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // NOTIFICATIONS
// // ============================================================

// export const getNotifications =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const notifications =
//         await Notification.find()
//           .sort({
//             createdAt: -1,
//           })

//       return res.status(200).json({
//         success: true,
//         notifications,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // MARK ONE NOTIFICATION AS READ
// // ============================================================

// export const markNotificationAsRead =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const notification =
//         await Notification.findByIdAndUpdate(
//           req.params.id,
//           {
//             read: true,
//           },
//           {
//             new: true,
//           }
//         )

//       if (!notification) {
//         return res.status(404).json({
//           success: false,
//           message:
//             'Notification not found.',
//         })
//       }

//       return res.status(200).json({
//         success: true,
//         notification,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // MARK ALL NOTIFICATIONS AS READ
// // ============================================================

// export const markAllNotificationsAsRead =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       await Notification.updateMany(
//         {
//           read: false,
//         },
//         {
//           read: true,
//         }
//       )

//       return res.status(200).json({
//         success: true,
//         message:
//           'All notifications marked as read.',
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // ADMIN SETTINGS
// // ============================================================

// // ------------------------------------------------------------
// // GET ADMIN SETTINGS
// // ------------------------------------------------------------

// export const getAdminSettings =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       let settings =
//         await AdminSettings.findOne({
//           key: 'default',
//         })

//       // ------------------------------------------------------
//       // CREATE DEFAULT SETTINGS IF NOT FOUND
//       // ------------------------------------------------------

//       if (!settings) {
//         settings =
//           await AdminSettings.create({
//             key: 'default',

//             platformName:
//               'Fegegta',

//             currency:
//               'EUR',

//             commissionRate:
//               10,

//             allowSellerRegistration:
//               true,

//             requireProductApproval:
//               true,

//             requireSellerVerification:
//               true,
//           })
//       }

//       return res.status(200).json({
//         success: true,
//         settings,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ------------------------------------------------------------
// // UPDATE ADMIN SETTINGS
// // ------------------------------------------------------------

// export const updateAdminSettings =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const {
//         platformName,
//         currency,
//         commissionRate,
//         allowSellerRegistration,
//         requireProductApproval,
//         requireSellerVerification,
//       } = req.body

//       // ------------------------------------------------------
//       // PLATFORM NAME
//       // ------------------------------------------------------

//       if (
//         platformName === undefined ||
//         !String(platformName).trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Platform name is required.',
//         })
//       }

//       // ------------------------------------------------------
//       // CURRENCY
//       // ------------------------------------------------------

//       if (
//         !['EUR', 'USD'].includes(
//           currency
//         )
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Currency must be EUR or USD.',
//         })
//       }

//       // ------------------------------------------------------
//       // COMMISSION RATE
//       // ------------------------------------------------------

//       const finalCommissionRate =
//         Number(commissionRate)

//       if (
//         Number.isNaN(
//           finalCommissionRate
//         ) ||
//         finalCommissionRate < 0 ||
//         finalCommissionRate > 100
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Commission rate must be between 0 and 100.',
//         })
//       }

//       // ------------------------------------------------------
//       // BOOLEAN VALIDATION
//       // ------------------------------------------------------

//       const normalizeBoolean = (
//         value,
//         fieldName
//       ) => {
//         if (
//           typeof value === 'boolean'
//         ) {
//           return value
//         }

//         if (
//           value === 'true'
//         ) {
//           return true
//         }

//         if (
//           value === 'false'
//         ) {
//           return false
//         }

//         throw new Error(
//           `${fieldName} must be true or false.`
//         )
//       }

//       let finalAllowSellerRegistration

//       let finalRequireProductApproval

//       let finalRequireSellerVerification

//       try {
//         finalAllowSellerRegistration =
//           normalizeBoolean(
//             allowSellerRegistration,
//             'allowSellerRegistration'
//           )

//         finalRequireProductApproval =
//           normalizeBoolean(
//             requireProductApproval,
//             'requireProductApproval'
//           )

//         finalRequireSellerVerification =
//           normalizeBoolean(
//             requireSellerVerification,
//             'requireSellerVerification'
//           )
//       } catch (booleanError) {
//         return res.status(400).json({
//           success: false,
//           message:
//             booleanError.message,
//         })
//       }
// // ============================================================
// // CREATE INITIAL ADMIN
// // ONE-TIME SETUP ONLY
// // ============================================================

// export const createInitialAdmin = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       setupSecret,
//       email,
//       password,
//     } = req.body

//     // --------------------------------------------------------
//     // SECURITY CHECK
//     // --------------------------------------------------------

//     if (
//       !process.env.ADMIN_SETUP_SECRET ||
//       setupSecret !==
//         process.env.ADMIN_SETUP_SECRET
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid setup secret.',
//       })
//     }

//     // --------------------------------------------------------
//     // VALIDATION
//     // --------------------------------------------------------

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Email and password are required.',
//       })
//     }

//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Password must be at least 8 characters.',
//       })
//     }

//     // --------------------------------------------------------
//     // CHECK EXISTING USER
//     // --------------------------------------------------------

//     const existingUser =
//       await User.findOne({
//         email: email
//           .trim()
//           .toLowerCase(),
//       })

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'A user with this email already exists.',
//       })
//     }

//     // --------------------------------------------------------
//     // HASH PASSWORD
//     // --------------------------------------------------------

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         12
//       )

//     // --------------------------------------------------------
//     // CREATE ADMIN
//     // --------------------------------------------------------

//     const admin =
//       await User.create({
//         firstName: 'Fegegta',
//         lastName: 'Admin',
//         name: 'Fegegta Admin',

//         email:
//           email
//             .trim()
//             .toLowerCase(),

//         password:
//           hashedPassword,

//         role: 'admin',

//         status: 'active',

//         notificationsEnabled:
//           true,
//       })

//     // --------------------------------------------------------
//     // RESPONSE
//     // --------------------------------------------------------

//     return res.status(201).json({
//       success: true,

//       message:
//         'Admin account created successfully.',

//       user: {
//         id: admin._id,
//         firstName:
//           admin.firstName,
//         lastName:
//           admin.lastName,
//         email:
//           admin.email,
//         role:
//           admin.role,
//         status:
//           admin.status,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }
//       // ------------------------------------------------------
//       // UPDATE SETTINGS
//       // ------------------------------------------------------

//       const settings =
//         await AdminSettings.findOneAndUpdate(
//           {
//             key: 'default',
//           },
//           {
//             platformName:
//               String(
//                 platformName
//               ).trim(),

//             currency,

//             commissionRate:
//               finalCommissionRate,

//             allowSellerRegistration:
//               finalAllowSellerRegistration,

//             requireProductApproval:
//               finalRequireProductApproval,

//             requireSellerVerification:
//               finalRequireSellerVerification,
//           },
//           {
//             new: true,

//             upsert: true,

//             setDefaultsOnInsert:
//               true,

//             runValidators:
//               true,
//           }
//         )

//       return res.status(200).json({
//         success: true,

//         message:
//           'Admin settings saved successfully.',

//         settings,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// import User from '../models/User.js'
// import Seller from '../models/Seller.js'
// import Product from '../models/Product.js'
// import Store from '../models/Store.js'
// import Order from '../models/Order.js'
// import Notification from '../models/Notification.js'
// import AdminSettings from '../models/AdminSettings.js'
// import bcrypt from 'bcryptjs'

// // ============================================================
// // HELPERS
// // ============================================================

// // ------------------------------------------------------------
// // CONVERT VALUE TO ARRAY
// // ------------------------------------------------------------

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

// // ------------------------------------------------------------
// // GENERATE SLUG
// // ------------------------------------------------------------

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
// // CREATE INITIAL ADMIN
// // ONE-TIME SETUP ONLY
// // ============================================================

// export const createInitialAdmin = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       setupSecret,
//       email,
//       password,
//     } = req.body

//     // --------------------------------------------------------
//     // SECURITY CHECK
//     // --------------------------------------------------------

//     if (
//       !process.env.ADMIN_SETUP_SECRET ||
//       setupSecret !==
//         process.env.ADMIN_SETUP_SECRET
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid setup secret.',
//       })
//     }

//     // --------------------------------------------------------
//     // CHECK EMAIL + PASSWORD
//     // --------------------------------------------------------

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Email and password are required.',
//       })
//     }

//     const normalizedEmail =
//       String(email)
//         .trim()
//         .toLowerCase()

//     // --------------------------------------------------------
//     // PASSWORD LENGTH
//     // --------------------------------------------------------

//     if (String(password).length < 8) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Password must be at least 8 characters.',
//       })
//     }

//     // --------------------------------------------------------
//     // VALIDATE EMAIL FORMAT
//     // --------------------------------------------------------

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailRegex.test(normalizedEmail)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Please provide a valid email address.',
//       })
//     }

//     // --------------------------------------------------------
//     // PREVENT MULTIPLE INITIAL ADMINS
//     // --------------------------------------------------------

//     const existingAdmin =
//       await User.findOne({
//         role: 'admin',
//       })

//     if (existingAdmin) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'An admin account already exists. Use the existing admin account.',
//       })
//     }

//     // --------------------------------------------------------
//     // CHECK EMAIL
//     // --------------------------------------------------------

//     const existingUser =
//       await User.findOne({
//         email: normalizedEmail,
//       })

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'A user with this email already exists.',
//       })
//     }

//     // --------------------------------------------------------
//     // HASH PASSWORD
//     // --------------------------------------------------------

//     const hashedPassword =
//       await bcrypt.hash(
//         String(password),
//         12
//       )

//     // --------------------------------------------------------
//     // CREATE ADMIN
//     // --------------------------------------------------------

//     const admin =
//       await User.create({
//         firstName: 'Fegegta',
//         lastName: 'Admin',
//         name: 'Fegegta Admin',

//         email:
//           normalizedEmail,

//         password:
//           hashedPassword,

//         role: 'admin',

//         status: 'active',

//         notificationsEnabled:
//           true,
//       })

//     // --------------------------------------------------------
//     // RESPONSE
//     // --------------------------------------------------------

//     return res.status(201).json({
//       success: true,

//       message:
//         'Admin account created successfully.',

//       user: {
//         id: admin._id,
//         firstName:
//           admin.firstName,
//         lastName:
//           admin.lastName,
//         email:
//           admin.email,
//         role:
//           admin.role,
//         status:
//           admin.status,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // DASHBOARD
// // ============================================================

// export const getDashboard = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const [
//       users,
//       sellers,
//       products,
//       stores,
//       orders,
//       unreadNotifications,
//     ] = await Promise.all([
//       User.countDocuments(),

//       Seller.countDocuments(),

//       Product.countDocuments(),

//       Store.countDocuments(),

//       Order.countDocuments(),

//       Notification.countDocuments({
//         read: false,
//       }),
//     ])

//     const salesResult =
//       await Order.aggregate([
//         {
//           $match: {
//             status: {
//               $ne: 'cancelled',
//             },
//           },
//         },

//         {
//           $group: {
//             _id: null,

//             totalSales: {
//               $sum: '$total',
//             },
//           },
//         },
//       ])

//     const totalSales =
//       salesResult[0]?.totalSales || 0

//     return res.status(200).json({
//       success: true,

//       dashboard: {
//         users,
//         sellers,
//         products,
//         stores,
//         orders,
//         unreadNotifications,
//         totalSales,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // COMPATIBILITY ALIAS
// // ============================================================

// export const getAdminDashboard =
//   getDashboard

// // ============================================================
// // USERS
// // ============================================================

// export const getUsers = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const users =
//       await User.find()
//         .select('-password')
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       users,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE USER ROLE
// // ============================================================

// export const updateUserRole = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { role } = req.body

//     const allowedRoles = [
//       'customer',
//       'seller',
//       'admin',
//     ]

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid user role.',
//       })
//     }

//     const user =
//       await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           role,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       ).select('-password')

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'User not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'User role updated successfully.',
//       user,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // SELLERS
// // ============================================================

// export const getSellers = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const sellers =
//       await Seller.find()
//         .populate(
//           'user',
//           'name firstName lastName email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       sellers,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // APPROVE SELLER
// // ============================================================

// export const approveSeller = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const seller =
//       await Seller.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: 'approved',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'user',
//           'name email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Seller not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         'Seller approved successfully.',
//       seller,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // REJECT SELLER
// // ============================================================

// export const rejectSeller = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       reason = '',
//     } = req.body

//     const seller =
//       await Seller.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: 'rejected',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'user',
//           'name email phone role'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Seller not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       message: reason
//         ? `Seller rejected: ${reason}`
//         : 'Seller rejected successfully.',
//       seller,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // PRODUCTS - GET ALL ADMIN PRODUCTS
// // ============================================================

// export const getProducts = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const products =
//       await Product.find()
//         .populate(
//           'seller',
//           'businessName email phone status logo'
//         )
//         .populate(
//           'store',
//           'name slug status logo banner'
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
// // CREATE PRODUCT FROM ADMIN
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
//       category,
//       subcategory,
//       sku,
//       price,
//       oldPrice,
//       compareAtPrice,
//       stock,
//       material,
//       sizes,
//       colors,
//       features,
//       tags,
//       sellerId,
//       storeId,
//     } = req.body

//     // ========================================================
//     // REQUIRED PRODUCT INFORMATION
//     // ========================================================

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

//     if (
//       !category ||
//       !category.trim()
//     ) {
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

//     // ========================================================
//     // SELLER + STORE
//     // ========================================================

//     if (!sellerId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A seller must be selected for this product.',
//       })
//     }

//     if (!storeId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A store must be selected for this product.',
//       })
//     }

//     // ========================================================
//     // FIND SELLER
//     // ========================================================

//     const seller =
//       await Seller.findById(
//         sellerId
//       )

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Selected seller was not found.',
//       })
//     }

//     if (
//       seller.status !==
//       'approved'
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected seller is not approved.',
//       })
//     }

//     // ========================================================
//     // FIND STORE
//     // ========================================================

//     const store =
//       await Store.findById(
//         storeId
//       )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Selected store was not found.',
//       })
//     }

//     if (
//       ![
//         'approved',
//         'active',
//       ].includes(store.status)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected store is not active.',
//       })
//     }

//     // ========================================================
//     // VERIFY SELLER OWNS STORE
//     // ========================================================

//     if (
//       !seller.store ||
//       String(seller.store) !==
//         String(store._id)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'The selected store does not belong to the selected seller.',
//       })
//     }

//     // ========================================================
//     // PRODUCT IMAGES
//     // ========================================================

//     const images =
//       (req.files || []).map(
//         (file) => ({
//           url:
//             file.path ||
//             file.secure_url ||
//             file.url ||
//             '',

//           publicId:
//             file.filename ||
//             file.public_id ||
//             '',
//         })
//       )

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

//     // ========================================================
//     // GENERATE UNIQUE SLUG
//     // ========================================================

//     const baseSlug =
//       generateSlug(name)

//     if (!baseSlug) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product name cannot be converted into a valid URL slug.',
//       })
//     }

//     let slug = baseSlug
//     let slugNumber = 1

//     while (
//       await Product.exists({
//         slug,
//       })
//     ) {
//       slug =
//         `${baseSlug}-${slugNumber}`

//       slugNumber += 1
//     }

//     // ========================================================
//     // COMPARE AT PRICE
//     // ========================================================

//     const finalCompareAtPrice =
//       compareAtPrice !== undefined &&
//       compareAtPrice !== ''
//         ? Number(compareAtPrice)
//         : oldPrice !== undefined &&
//             oldPrice !== ''
//           ? Number(oldPrice)
//           : 0

//     if (
//       Number.isNaN(
//         finalCompareAtPrice
//       ) ||
//       finalCompareAtPrice < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid old/compare price.',
//       })
//     }

//     // ========================================================
//     // STOCK
//     // ========================================================

//     const finalStock =
//       stock !== undefined &&
//       stock !== ''
//         ? Number(stock)
//         : 0

//     if (
//       Number.isNaN(finalStock) ||
//       finalStock < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid stock quantity.',
//       })
//     }

//     // ========================================================
//     // MATERIAL
//     // ========================================================

//     const finalMaterial =
//       material !== undefined &&
//       material !== null
//         ? String(material).trim()
//         : ''

//     // ========================================================
//     // FEATURES
//     // ========================================================

//     const finalFeatures =
//       toArray(features)

//     // ========================================================
//     // TAGS
//     // ========================================================

//     const finalTags =
//       toArray(tags)

//     // ========================================================
//     // CREATE PRODUCT
//     // ADMIN PRODUCTS ARE APPROVED DIRECTLY.
//     // ========================================================

//     const product =
//       await Product.create({
//         seller:
//           seller._id,

//         store:
//           store._id,

//         name:
//           name.trim(),

//         slug,

//         description:
//           String(
//             description
//           ).trim(),

//         category:
//           category.trim(),

//         subcategory:
//           subcategory
//             ? String(
//                 subcategory
//               ).trim()
//             : '',

//         material:
//           finalMaterial,

//         price:
//           Number(price),

//         compareAtPrice:
//           finalCompareAtPrice,

//         stock:
//           finalStock,

//         sku:
//           sku
//             ? String(sku).trim()
//             : '',

//         images,

//         sizes:
//           toArray(sizes),

//         colors:
//           toArray(colors),

//         features:
//           finalFeatures,

//         tags:
//           finalTags,

//         approvalStatus:
//           'approved',

//         isActive:
//           true,

//         rejectionReason:
//           '',
//       })

//     // ========================================================
//     // POPULATE CREATED PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(201).json({
//       success: true,

//       message:
//         'Product created successfully and published.',

//       product:
//         populatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE PRODUCT FROM ADMIN
// // ============================================================

// export const updateProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       name,
//       description,
//       category,
//       subcategory,
//       sku,
//       price,
//       oldPrice,
//       compareAtPrice,
//       stock,
//       material,
//       sizes,
//       colors,
//       features,
//       tags,
//       existingImages,
//     } = req.body

//     // ========================================================
//     // FIND PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // REQUIRED PRODUCT INFORMATION
//     // ========================================================

//     if (
//       name === undefined ||
//       !String(name).trim()
//     ) {
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

//     if (
//       category === undefined ||
//       !String(category).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Product category is required.',
//       })
//     }

//     // ========================================================
//     // PRICE
//     // ========================================================

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

//     // ========================================================
//     // COMPARE AT PRICE
//     // ========================================================

//     const finalCompareAtPrice =
//       compareAtPrice !== undefined &&
//       compareAtPrice !== ''
//         ? Number(compareAtPrice)
//         : oldPrice !== undefined &&
//             oldPrice !== ''
//           ? Number(oldPrice)
//           : 0

//     if (
//       Number.isNaN(
//         finalCompareAtPrice
//       ) ||
//       finalCompareAtPrice < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid old/compare price.',
//       })
//     }

//     // ========================================================
//     // STOCK
//     // ========================================================

//     const finalStock =
//       stock !== undefined &&
//       stock !== ''
//         ? Number(stock)
//         : 0

//     if (
//       Number.isNaN(finalStock) ||
//       finalStock < 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Invalid stock quantity.',
//       })
//     }

//     // ========================================================
//     // PARSE ARRAYS
//     // ========================================================

//     const parseArrayField = (
//       value,
//       fallback = []
//     ) => {
//       if (
//         value === undefined ||
//         value === null ||
//         value === ''
//       ) {
//         return fallback
//       }

//       if (Array.isArray(value)) {
//         return value
//           .map((item) =>
//             String(item).trim()
//           )
//           .filter(Boolean)
//       }

//       if (
//         typeof value === 'string'
//       ) {
//         try {
//           const parsed =
//             JSON.parse(value)

//           if (
//             Array.isArray(parsed)
//           ) {
//             return parsed
//               .map((item) =>
//                 String(item).trim()
//               )
//               .filter(Boolean)
//           }
//         } catch {
//           return toArray(value)
//         }
//       }

//       return fallback
//     }

//     const finalSizes =
//       parseArrayField(
//         sizes,
//         product.sizes || []
//       )

//     const finalColors =
//       parseArrayField(
//         colors,
//         product.colors || []
//       )

//     const finalFeatures =
//       parseArrayField(
//         features,
//         product.features || []
//       )

//     const finalTags =
//       parseArrayField(
//         tags,
//         product.tags || []
//       )

//     // ========================================================
//     // EXISTING IMAGES
//     // ========================================================

//     let requestedExistingImages = []

//     if (
//       existingImages !==
//         undefined &&
//       existingImages !== null &&
//       existingImages !== ''
//     ) {
//       try {
//         const parsed =
//           JSON.parse(
//             existingImages
//           )

//         if (
//           Array.isArray(parsed)
//         ) {
//           requestedExistingImages =
//             parsed
//               .map((image) =>
//                 String(image).trim()
//               )
//               .filter(Boolean)
//         }
//       } catch {
//         requestedExistingImages =
//           toArray(
//             existingImages
//           )
//       }
//     }

//     const currentImages =
//       Array.isArray(product.images)
//         ? product.images
//         : []

//     const keptImages =
//       currentImages.filter(
//         (image) =>
//           image &&
//           requestedExistingImages.includes(
//             String(image.url)
//           )
//       )

//     // ========================================================
//     // NEW CLOUDINARY IMAGES
//     // ========================================================

//     const newImages =
//       (req.files || []).map(
//         (file) => ({
//           url:
//             file.path ||
//             file.secure_url ||
//             file.url ||
//             '',

//           publicId:
//             file.filename ||
//             file.public_id ||
//             '',
//         })
//       )

//     // ========================================================
//     // FINAL IMAGE LIST
//     // ========================================================

//     const finalImages = [
//       ...keptImages,
//       ...newImages,
//     ]

//     if (
//       finalImages.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'At least one product image is required.',
//       })
//     }

//     if (
//       finalImages.length > 4
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'A product can have a maximum of 4 images.',
//       })
//     }

//     // ========================================================
//     // UPDATE SLUG ONLY IF NAME CHANGED
//     // ========================================================

//     let slug =
//       product.slug

//     if (
//       String(product.name)
//         .trim()
//         .toLowerCase() !==
//       String(name)
//         .trim()
//         .toLowerCase()
//     ) {
//       const baseSlug =
//         generateSlug(name)

//       if (!baseSlug) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Product name cannot be converted into a valid URL slug.',
//         })
//       }

//       slug =
//         baseSlug

//       let slugNumber = 1

//       while (
//         await Product.exists({
//           slug,
//           _id: {
//             $ne:
//               product._id,
//           },
//         })
//       ) {
//         slug =
//           `${baseSlug}-${slugNumber}`

//         slugNumber += 1
//       }
//     }

//     // ========================================================
//     // MATERIAL
//     // ========================================================

//     const finalMaterial =
//       material !== undefined &&
//       material !== null
//         ? String(material).trim()
//         : ''

//     // ========================================================
//     // UPDATE PRODUCT
//     //
//     // Seller and store remain unchanged.
//     // Approval status remains unchanged.
//     // ========================================================

//     product.name =
//       String(name).trim()

//     product.slug =
//       slug

//     product.description =
//       String(description).trim()

//     product.category =
//       String(category).trim()

//     product.subcategory =
//       subcategory !== undefined &&
//       subcategory !== null
//         ? String(
//             subcategory
//           ).trim()
//         : ''

//     product.sku =
//       sku !== undefined &&
//       sku !== null
//         ? String(sku).trim()
//         : ''

//     product.price =
//       Number(price)

//     product.compareAtPrice =
//       finalCompareAtPrice

//     product.stock =
//       finalStock

//     product.material =
//       finalMaterial

//     product.sizes =
//       finalSizes

//     product.colors =
//       finalColors

//     product.features =
//       finalFeatures

//     product.tags =
//       finalTags

//     product.images =
//       finalImages

//     await product.save()

//     // ========================================================
//     // POPULATE UPDATED PRODUCT
//     // ========================================================

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

//     // ========================================================
//     // RESPONSE
//     // ========================================================

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product updated successfully.',

//       product:
//         populatedProduct,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // DELETE PRODUCT FROM ADMIN
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

//     await Product.findByIdAndDelete(
//       req.params.id
//     )

//     return res.status(200).json({
//       success: true,
//       message:
//         'Product deleted successfully.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // APPROVE PRODUCT
// // ============================================================

// export const approveProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const product =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           approvalStatus:
//             'approved',

//           rejectionReason:
//             '',

//           isActive:
//             true,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'businessName email phone status logo'
//         )
//         .populate(
//           'store',
//           'name slug status logo banner'
//         )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message:
//         'Product approved successfully.',

//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // REJECT PRODUCT
// // ============================================================

// export const rejectProduct = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       reason = '',
//     } = req.body

//     const product =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           approvalStatus:
//             'rejected',

//           rejectionReason:
//             String(reason).trim(),

//           isActive:
//             false,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'businessName email phone status'
//         )
//         .populate(
//           'store',
//           'name slug status'
//         )

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Product not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message: reason
//         ? `Product rejected: ${reason}`
//         : 'Product rejected successfully.',

//       product,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // STORES
// // ============================================================

// export const approveStore = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const store =
//       await Store.findByIdAndUpdate(
//         req.params.id,
//         {
//           status:
//             'approved',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           'seller',
//           'name email'
//         )

//     if (!store) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'Store not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,

//       message:
//         'Store approved successfully.',

//       store,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // ORDERS
// // ============================================================

// export const getOrders = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const orders =
//       await Order.find()
//         .sort({
//           createdAt: -1,
//         })
//         .populate(
//           'user',
//           'name email phone'
//         )
//         .populate(
//           'items.product'
//         )
//         .populate(
//           'items.seller',
//           'businessName email phone status'
//         )
//         .populate(
//           'items.store',
//           'name slug status'
//         )

//     return res.status(200).json({
//       success: true,
//       orders,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // NOTIFICATIONS
// // ============================================================

// export const getNotifications =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const notifications =
//         await Notification.find()
//           .sort({
//             createdAt: -1,
//           })

//       return res.status(200).json({
//         success: true,
//         notifications,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // MARK ONE NOTIFICATION AS READ
// // ============================================================

// export const markNotificationAsRead =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const notification =
//         await Notification.findByIdAndUpdate(
//           req.params.id,
//           {
//             read: true,
//           },
//           {
//             new: true,
//           }
//         )

//       if (!notification) {
//         return res.status(404).json({
//           success: false,
//           message:
//             'Notification not found.',
//         })
//       }

//       return res.status(200).json({
//         success: true,
//         notification,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // MARK ALL NOTIFICATIONS AS READ
// // ============================================================

// export const markAllNotificationsAsRead =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       await Notification.updateMany(
//         {
//           read: false,
//         },
//         {
//           read: true,
//         }
//       )

//       return res.status(200).json({
//         success: true,
//         message:
//           'All notifications marked as read.',
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // ADMIN SETTINGS
// // ============================================================

// // ------------------------------------------------------------
// // GET ADMIN SETTINGS
// // ------------------------------------------------------------

// export const getAdminSettings =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       let settings =
//         await AdminSettings.findOne({
//           key: 'default',
//         })

//       // ------------------------------------------------------
//       // CREATE DEFAULT SETTINGS IF NOT FOUND
//       // ------------------------------------------------------

//       if (!settings) {
//         settings =
//           await AdminSettings.create({
//             key: 'default',

//             platformName:
//               'Fegegta',

//             currency:
//               'EUR',

//             commissionRate:
//               10,

//             allowSellerRegistration:
//               true,

//             requireProductApproval:
//               true,

//             requireSellerVerification:
//               true,
//           })
//       }

//       return res.status(200).json({
//         success: true,
//         settings,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ------------------------------------------------------------
// // UPDATE ADMIN SETTINGS
// // ------------------------------------------------------------

// export const updateAdminSettings =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const {
//         platformName,
//         currency,
//         commissionRate,
//         allowSellerRegistration,
//         requireProductApproval,
//         requireSellerVerification,
//       } = req.body

//       // ------------------------------------------------------
//       // PLATFORM NAME
//       // ------------------------------------------------------

//       if (
//         platformName === undefined ||
//         !String(platformName).trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Platform name is required.',
//         })
//       }

//       // ------------------------------------------------------
//       // CURRENCY
//       // ------------------------------------------------------

//       if (
//         !['EUR', 'USD'].includes(
//           currency
//         )
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Currency must be EUR or USD.',
//         })
//       }

//       // ------------------------------------------------------
//       // COMMISSION RATE
//       // ------------------------------------------------------

//       const finalCommissionRate =
//         Number(commissionRate)

//       if (
//         Number.isNaN(
//           finalCommissionRate
//         ) ||
//         finalCommissionRate < 0 ||
//         finalCommissionRate > 100
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Commission rate must be between 0 and 100.',
//         })
//       }

//       // ------------------------------------------------------
//       // BOOLEAN VALIDATION
//       // ------------------------------------------------------

//       const normalizeBoolean = (
//         value,
//         fieldName
//       ) => {
//         if (
//           typeof value === 'boolean'
//         ) {
//           return value
//         }

//         if (
//           value === 'true'
//         ) {
//           return true
//         }

//         if (
//           value === 'false'
//         ) {
//           return false
//         }

//         throw new Error(
//           `${fieldName} must be true or false.`
//         )
//       }

//       let finalAllowSellerRegistration

//       let finalRequireProductApproval

//       let finalRequireSellerVerification

//       try {
//         finalAllowSellerRegistration =
//           normalizeBoolean(
//             allowSellerRegistration,
//             'allowSellerRegistration'
//           )

//         finalRequireProductApproval =
//           normalizeBoolean(
//             requireProductApproval,
//             'requireProductApproval'
//           )

//         finalRequireSellerVerification =
//           normalizeBoolean(
//             requireSellerVerification,
//             'requireSellerVerification'
//           )
//       } catch (booleanError) {
//         return res.status(400).json({
//           success: false,
//           message:
//             booleanError.message,
//         })
//       }

//       // ------------------------------------------------------
//       // UPDATE SETTINGS
//       // ------------------------------------------------------

//       const settings =
//         await AdminSettings.findOneAndUpdate(
//           {
//             key: 'default',
//           },
//           {
//             platformName:
//               String(
//                 platformName
//               ).trim(),

//             currency,

//             commissionRate:
//               finalCommissionRate,

//             allowSellerRegistration:
//               finalAllowSellerRegistration,

//             requireProductApproval:
//               finalRequireProductApproval,

//             requireSellerVerification:
//               finalRequireSellerVerification,
//           },
//           {
//             new: true,

//             upsert: true,

//             setDefaultsOnInsert:
//               true,

//             runValidators:
//               true,
//           }
//         )

//       return res.status(200).json({
//         success: true,

//         message:
//           'Admin settings saved successfully.',

//         settings,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

import User from '../models/User.js'
import Seller from '../models/Seller.js'
import Product from '../models/Product.js'
import Store from '../models/Store.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'
import AdminSettings from '../models/AdminSettings.js'
import bcrypt from 'bcryptjs'

// ============================================================
// HELPERS
// ============================================================

// ------------------------------------------------------------
// CONVERT VALUE TO ARRAY
// ------------------------------------------------------------

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

// ------------------------------------------------------------
// GENERATE SLUG
// ------------------------------------------------------------

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
// CREATE INITIAL ADMIN
// ONE-TIME SETUP ONLY
// ============================================================

export const createInitialAdmin = async (
  req,
  res,
  next
) => {
  try {
    const {
      setupSecret,
      email,
      password,
    } = req.body

    // --------------------------------------------------------
    // CHECK SETUP SECRET
    // --------------------------------------------------------

    if (
      !process.env.ADMIN_SETUP_SECRET ||
      setupSecret !== process.env.ADMIN_SETUP_SECRET
    ) {
      return res.status(403).json({
        success: false,
        message: 'Invalid setup secret.',
      })
    }

    // --------------------------------------------------------
    // CHECK EMAIL + PASSWORD
    // --------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Email and password are required.',
      })
    }

    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase()

    // --------------------------------------------------------
    // VALIDATE EMAIL
    // --------------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide a valid email address.',
      })
    }

    // --------------------------------------------------------
    // PASSWORD
    // --------------------------------------------------------

    const normalizedPassword =
      String(password)

    if (normalizedPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters.',
      })
    }

    // --------------------------------------------------------
    // CHECK EXISTING ADMIN
    // --------------------------------------------------------

    const existingAdmin =
      await User.findOne({
        role: 'admin',
      })

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message:
          'An admin account already exists. Use the existing admin account.',
      })
    }

    // --------------------------------------------------------
    // CHECK EMAIL ALREADY EXISTS
    // --------------------------------------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          'A user with this email already exists.',
      })
    }

    // --------------------------------------------------------
    // HASH PASSWORD
    // --------------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        normalizedPassword,
        12
      )

    // --------------------------------------------------------
    // CREATE ADMIN USER
    // --------------------------------------------------------

    const admin =
      await User.create({
        firstName: 'Fegegta',
        lastName: 'Admin',
        name: 'Fegegta Admin',

        email: normalizedEmail,

        password: hashedPassword,

        role: 'admin',

        status: 'active',

        notificationsEnabled: true,
      })

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        'Admin account created successfully.',

      user: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// DASHBOARD
// ============================================================

export const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const [
      users,
      sellers,
      products,
      stores,
      orders,
      unreadNotifications,
    ] = await Promise.all([
      User.countDocuments(),

      Seller.countDocuments(),

      Product.countDocuments(),

      Store.countDocuments(),

      Order.countDocuments(),

      Notification.countDocuments({
        read: false,
      }),
    ])

    const salesResult =
      await Order.aggregate([
        {
          $match: {
            status: {
              $ne: 'cancelled',
            },
          },
        },

        {
          $group: {
            _id: null,

            totalSales: {
              $sum: '$total',
            },
          },
        },
      ])

    const totalSales =
      salesResult[0]?.totalSales || 0

    return res.status(200).json({
      success: true,

      dashboard: {
        users,
        sellers,
        products,
        stores,
        orders,
        unreadNotifications,
        totalSales,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// COMPATIBILITY ALIAS
// ============================================================

export const getAdminDashboard =
  getDashboard

// ============================================================
// USERS
// ============================================================

export const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await User.find()
        .select('-password')
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE USER ROLE
// ============================================================

export const updateUserRole = async (
  req,
  res,
  next
) => {
  try {
    const { role } = req.body

    const allowedRoles = [
      'customer',
      'seller',
      'admin',
    ]

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user role.',
      })
    }

    // --------------------------------------------------------
    // PREVENT ADMIN FROM CHANGING OWN ROLE
    // --------------------------------------------------------

    if (
      req.user &&
      String(req.user._id) ===
        String(req.params.id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'You cannot change your own admin role.',
      })
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          role,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message:
        'User role updated successfully.',

      user,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// SELLERS
// ============================================================

export const getSellers = async (
  req,
  res,
  next
) => {
  try {
    const sellers =
      await Seller.find()
        .populate(
          'user',
          'name firstName lastName email phone role'
        )
        .populate(
          'store',
          'name slug status'
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
// APPROVE SELLER
// ============================================================

export const approveSeller = async (
  req,
  res,
  next
) => {
  try {
    const seller =
      await Seller.findByIdAndUpdate(
        req.params.id,
        {
          status: 'approved',
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          'user',
          'name firstName lastName email phone role'
        )
        .populate(
          'store',
          'name slug status'
        )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message:
        'Seller approved successfully.',

      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// REJECT SELLER
// ============================================================

export const rejectSeller = async (
  req,
  res,
  next
) => {
  try {
    const {
      reason = '',
    } = req.body

    const seller =
      await Seller.findByIdAndUpdate(
        req.params.id,
        {
          status: 'rejected',
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          'user',
          'name firstName lastName email phone role'
        )
        .populate(
          'store',
          'name slug status'
        )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message: reason
        ? `Seller rejected: ${reason}`
        : 'Seller rejected successfully.',

      seller,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// PRODUCTS - GET ALL ADMIN PRODUCTS
// ============================================================

export const getProducts = async (
  req,
  res,
  next
) => {
  try {
    const products =
      await Product.find()
        .populate(
          'seller',
          'businessName email phone status logo'
        )
        .populate(
          'store',
          'name slug status logo banner'
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
// CREATE PRODUCT FROM ADMIN
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
      category,
      subcategory,
      sku,
      price,
      oldPrice,
      compareAtPrice,
      stock,
      material,
      sizes,
      colors,
      features,
      tags,
      sellerId,
      storeId,
    } = req.body

    // --------------------------------------------------------
    // REQUIRED INFORMATION
    // --------------------------------------------------------

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

    if (
      !category ||
      !category.trim()
    ) {
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

    // --------------------------------------------------------
    // SELLER + STORE
    // --------------------------------------------------------

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message:
          'A seller must be selected for this product.',
      })
    }

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message:
          'A store must be selected for this product.',
      })
    }

    // --------------------------------------------------------
    // FIND SELLER
    // --------------------------------------------------------

    const seller =
      await Seller.findById(
        sellerId
      )

    if (!seller) {
      return res.status(404).json({
        success: false,
        message:
          'Selected seller was not found.',
      })
    }

    if (
      seller.status !==
      'approved'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'The selected seller is not approved.',
      })
    }

    // --------------------------------------------------------
    // FIND STORE
    // --------------------------------------------------------

    const store =
      await Store.findById(
        storeId
      )

    if (!store) {
      return res.status(404).json({
        success: false,
        message:
          'Selected store was not found.',
      })
    }

    if (
      ![
        'approved',
        'active',
      ].includes(store.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'The selected store is not active.',
      })
    }

    // --------------------------------------------------------
    // VERIFY SELLER OWNS STORE
    // --------------------------------------------------------

    if (
      !seller.store ||
      String(seller.store) !==
        String(store._id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'The selected store does not belong to the selected seller.',
      })
    }

    // --------------------------------------------------------
    // PRODUCT IMAGES
    // --------------------------------------------------------

    const images =
      (req.files || []).map(
        (file) => ({
          url:
            file.path ||
            file.secure_url ||
            file.url ||
            '',

          publicId:
            file.filename ||
            file.public_id ||
            '',
        })
      )

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

    // --------------------------------------------------------
    // GENERATE UNIQUE SLUG
    // --------------------------------------------------------

    const baseSlug =
      generateSlug(name)

    if (!baseSlug) {
      return res.status(400).json({
        success: false,
        message:
          'Product name cannot be converted into a valid URL slug.',
      })
    }

    let slug = baseSlug
    let slugNumber = 1

    while (
      await Product.exists({
        slug,
      })
    ) {
      slug =
        `${baseSlug}-${slugNumber}`

      slugNumber += 1
    }

    // --------------------------------------------------------
    // COMPARE AT PRICE
    // --------------------------------------------------------

    const finalCompareAtPrice =
      compareAtPrice !== undefined &&
      compareAtPrice !== ''
        ? Number(compareAtPrice)
        : oldPrice !== undefined &&
            oldPrice !== ''
          ? Number(oldPrice)
          : 0

    if (
      Number.isNaN(
        finalCompareAtPrice
      ) ||
      finalCompareAtPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid old/compare price.',
      })
    }

    // --------------------------------------------------------
    // STOCK
    // --------------------------------------------------------

    const finalStock =
      stock !== undefined &&
      stock !== ''
        ? Number(stock)
        : 0

    if (
      Number.isNaN(finalStock) ||
      finalStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid stock quantity.',
      })
    }

    // --------------------------------------------------------
    // MATERIAL
    // --------------------------------------------------------

    const finalMaterial =
      material !== undefined &&
      material !== null
        ? String(material).trim()
        : ''

    // --------------------------------------------------------
    // ARRAYS
    // --------------------------------------------------------

    const finalFeatures =
      toArray(features)

    const finalTags =
      toArray(tags)

    // --------------------------------------------------------
    // CREATE PRODUCT
    // --------------------------------------------------------

    const product =
      await Product.create({
        seller: seller._id,

        store: store._id,

        name: name.trim(),

        slug,

        description:
          String(description).trim(),

        category:
          category.trim(),

        subcategory:
          subcategory
            ? String(
                subcategory
              ).trim()
            : '',

        material:
          finalMaterial,

        price:
          Number(price),

        compareAtPrice:
          finalCompareAtPrice,

        stock:
          finalStock,

        sku:
          sku
            ? String(sku).trim()
            : '',

        images,

        sizes:
          toArray(sizes),

        colors:
          toArray(colors),

        features:
          finalFeatures,

        tags:
          finalTags,

        approvalStatus:
          'approved',

        isActive:
          true,

        rejectionReason:
          '',
      })

    // --------------------------------------------------------
    // POPULATE
    // --------------------------------------------------------

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
        'Product created successfully and published.',

      product:
        populatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE PRODUCT FROM ADMIN
// ============================================================

export const updateProduct = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      description,
      category,
      subcategory,
      sku,
      price,
      oldPrice,
      compareAtPrice,
      stock,
      material,
      sizes,
      colors,
      features,
      tags,
      existingImages,
    } = req.body

    // --------------------------------------------------------
    // FIND PRODUCT
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // REQUIRED INFORMATION
    // --------------------------------------------------------

    if (
      name === undefined ||
      !String(name).trim()
    ) {
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

    if (
      category === undefined ||
      !String(category).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Product category is required.',
      })
    }

    // --------------------------------------------------------
    // PRICE
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // COMPARE AT PRICE
    // --------------------------------------------------------

    const finalCompareAtPrice =
      compareAtPrice !== undefined &&
      compareAtPrice !== ''
        ? Number(compareAtPrice)
        : oldPrice !== undefined &&
            oldPrice !== ''
          ? Number(oldPrice)
          : 0

    if (
      Number.isNaN(
        finalCompareAtPrice
      ) ||
      finalCompareAtPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid old/compare price.',
      })
    }

    // --------------------------------------------------------
    // STOCK
    // --------------------------------------------------------

    const finalStock =
      stock !== undefined &&
      stock !== ''
        ? Number(stock)
        : 0

    if (
      Number.isNaN(finalStock) ||
      finalStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid stock quantity.',
      })
    }

    // --------------------------------------------------------
    // PARSE ARRAY FIELDS
    // --------------------------------------------------------

    const parseArrayField = (
      value,
      fallback = []
    ) => {
      if (
        value === undefined ||
        value === null ||
        value === ''
      ) {
        return fallback
      }

      if (Array.isArray(value)) {
        return value
          .map((item) =>
            String(item).trim()
          )
          .filter(Boolean)
      }

      if (
        typeof value === 'string'
      ) {
        try {
          const parsed =
            JSON.parse(value)

          if (
            Array.isArray(parsed)
          ) {
            return parsed
              .map((item) =>
                String(item).trim()
              )
              .filter(Boolean)
          }
        } catch {
          return toArray(value)
        }
      }

      return fallback
    }

    const finalSizes =
      parseArrayField(
        sizes,
        product.sizes || []
      )

    const finalColors =
      parseArrayField(
        colors,
        product.colors || []
      )

    const finalFeatures =
      parseArrayField(
        features,
        product.features || []
      )

    const finalTags =
      parseArrayField(
        tags,
        product.tags || []
      )

    // --------------------------------------------------------
    // EXISTING IMAGES
    // --------------------------------------------------------

    let requestedExistingImages = []

    if (
      existingImages !==
        undefined &&
      existingImages !== null &&
      existingImages !== ''
    ) {
      try {
        const parsed =
          JSON.parse(
            existingImages
          )

        if (
          Array.isArray(parsed)
        ) {
          requestedExistingImages =
            parsed
              .map((image) =>
                String(image).trim()
              )
              .filter(Boolean)
        }
      } catch {
        requestedExistingImages =
          toArray(
            existingImages
          )
      }
    }

    const currentImages =
      Array.isArray(product.images)
        ? product.images
        : []

    const keptImages =
      currentImages.filter(
        (image) =>
          image &&
          requestedExistingImages.includes(
            String(image.url)
          )
      )

    // --------------------------------------------------------
    // NEW IMAGES
    // --------------------------------------------------------

    const newImages =
      (req.files || []).map(
        (file) => ({
          url:
            file.path ||
            file.secure_url ||
            file.url ||
            '',

          publicId:
            file.filename ||
            file.public_id ||
            '',
        })
      )

    // --------------------------------------------------------
    // FINAL IMAGES
    // --------------------------------------------------------

    const finalImages = [
      ...keptImages,
      ...newImages,
    ]

    if (
      finalImages.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'At least one product image is required.',
      })
    }

    if (
      finalImages.length > 4
    ) {
      return res.status(400).json({
        success: false,
        message:
          'A product can have a maximum of 4 images.',
      })
    }

    // --------------------------------------------------------
    // UPDATE SLUG
    // --------------------------------------------------------

    let slug =
      product.slug

    if (
      String(product.name)
        .trim()
        .toLowerCase() !==
      String(name)
        .trim()
        .toLowerCase()
    ) {
      const baseSlug =
        generateSlug(name)

      if (!baseSlug) {
        return res.status(400).json({
          success: false,
          message:
            'Product name cannot be converted into a valid URL slug.',
        })
      }

      slug =
        baseSlug

      let slugNumber = 1

      while (
        await Product.exists({
          slug,

          _id: {
            $ne:
              product._id,
          },
        })
      ) {
        slug =
          `${baseSlug}-${slugNumber}`

        slugNumber += 1
      }
    }

    // --------------------------------------------------------
    // MATERIAL
    // --------------------------------------------------------

    const finalMaterial =
      material !== undefined &&
      material !== null
        ? String(material).trim()
        : ''

    // --------------------------------------------------------
    // UPDATE PRODUCT
    // --------------------------------------------------------

    product.name =
      String(name).trim()

    product.slug =
      slug

    product.description =
      String(description).trim()

    product.category =
      String(category).trim()

    product.subcategory =
      subcategory !== undefined &&
      subcategory !== null
        ? String(
            subcategory
          ).trim()
        : ''

    product.sku =
      sku !== undefined &&
      sku !== null
        ? String(sku).trim()
        : ''

    product.price =
      Number(price)

    product.compareAtPrice =
      finalCompareAtPrice

    product.stock =
      finalStock

    product.material =
      finalMaterial

    product.sizes =
      finalSizes

    product.colors =
      finalColors

    product.features =
      finalFeatures

    product.tags =
      finalTags

    product.images =
      finalImages

    await product.save()

    // --------------------------------------------------------
    // POPULATE
    // --------------------------------------------------------

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

    return res.status(200).json({
      success: true,

      message:
        'Product updated successfully.',

      product:
        populatedProduct,
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

    await Product.findByIdAndDelete(
      req.params.id
    )

    return res.status(200).json({
      success: true,
      message:
        'Product deleted successfully.',
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// APPROVE PRODUCT
// ============================================================

export const approveProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          approvalStatus:
            'approved',

          rejectionReason:
            '',

          isActive:
            true,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          'seller',
          'businessName email phone status logo'
        )
        .populate(
          'store',
          'name slug status logo banner'
        )

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message:
        'Product approved successfully.',

      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// REJECT PRODUCT
// ============================================================

export const rejectProduct = async (
  req,
  res,
  next
) => {
  try {
    const {
      reason = '',
    } = req.body

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          approvalStatus:
            'rejected',

          rejectionReason:
            String(reason).trim(),

          isActive:
            false,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          'seller',
          'businessName email phone status'
        )
        .populate(
          'store',
          'name slug status'
        )

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message: reason
        ? `Product rejected: ${reason}`
        : 'Product rejected successfully.',

      product,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// APPROVE STORE
// ============================================================

export const approveStore = async (
  req,
  res,
  next
) => {
  try {
    const store =
      await Store.findByIdAndUpdate(
        req.params.id,
        {
          status: 'approved',
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          'seller',
          'name email'
        )

    if (!store) {
      return res.status(404).json({
        success: false,
        message:
          'Store not found.',
      })
    }

    return res.status(200).json({
      success: true,

      message:
        'Store approved successfully.',

      store,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// ORDERS
// ============================================================

export const getOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders =
      await Order.find()
        .sort({
          createdAt: -1,
        })
        .populate(
          'user',
          'name email phone'
        )
        .populate(
          'items.product'
        )
        .populate(
          'items.seller',
          'businessName email phone status'
        )
        .populate(
          'items.store',
          'name slug status'
        )

    return res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export const getNotifications =
  async (
    req,
    res,
    next
  ) => {
    try {
      const notifications =
        await Notification.find()
          .sort({
            createdAt: -1,
          })

      return res.status(200).json({
        success: true,
        notifications,
      })
    } catch (error) {
      next(error)
    }
  }

// ============================================================
// MARK ONE NOTIFICATION AS READ
// ============================================================

export const markNotificationAsRead =
  async (
    req,
    res,
    next
  ) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            read: true,
          },
          {
            new: true,
          }
        )

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            'Notification not found.',
        })
      }

      return res.status(200).json({
        success: true,
        notification,
      })
    } catch (error) {
      next(error)
    }
  }

// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// ============================================================

export const markAllNotificationsAsRead =
  async (
    req,
    res,
    next
  ) => {
    try {
      await Notification.updateMany(
        {
          read: false,
        },
        {
          read: true,
        }
      )

      return res.status(200).json({
        success: true,

        message:
          'All notifications marked as read.',
      })
    } catch (error) {
      next(error)
    }
  }

// ============================================================
// GET ADMIN SETTINGS
// ============================================================

export const getAdminSettings =
  async (
    req,
    res,
    next
  ) => {
    try {
      let settings =
        await AdminSettings.findOne({
          key: 'default',
        })

      if (!settings) {
        settings =
          await AdminSettings.create({
            key: 'default',

            platformName:
              'Fegegta',

            currency:
              'EUR',

            commissionRate:
              10,

            allowSellerRegistration:
              true,

            requireProductApproval:
              true,

            requireSellerVerification:
              true,
          })
      }

      return res.status(200).json({
        success: true,
        settings,
      })
    } catch (error) {
      next(error)
    }
  }

// ============================================================
// UPDATE ADMIN SETTINGS
// ============================================================

export const updateAdminSettings =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        platformName,
        currency,
        commissionRate,
        allowSellerRegistration,
        requireProductApproval,
        requireSellerVerification,
      } = req.body

      // ------------------------------------------------------
      // PLATFORM NAME
      // ------------------------------------------------------

      if (
        platformName === undefined ||
        !String(platformName).trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Platform name is required.',
        })
      }

      // ------------------------------------------------------
      // CURRENCY
      // ------------------------------------------------------

      if (
        !['EUR', 'USD'].includes(
          currency
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Currency must be EUR or USD.',
        })
      }

      // ------------------------------------------------------
      // COMMISSION
      // ------------------------------------------------------

      const finalCommissionRate =
        Number(commissionRate)

      if (
        Number.isNaN(
          finalCommissionRate
        ) ||
        finalCommissionRate < 0 ||
        finalCommissionRate > 100
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Commission rate must be between 0 and 100.',
        })
      }

      // ------------------------------------------------------
      // BOOLEAN NORMALIZER
      // ------------------------------------------------------

      const normalizeBoolean = (
        value,
        fieldName
      ) => {
        if (
          typeof value === 'boolean'
        ) {
          return value
        }

        if (
          value === 'true'
        ) {
          return true
        }

        if (
          value === 'false'
        ) {
          return false
        }

        throw new Error(
          `${fieldName} must be true or false.`
        )
      }

      let finalAllowSellerRegistration
      let finalRequireProductApproval
      let finalRequireSellerVerification

      try {
        finalAllowSellerRegistration =
          normalizeBoolean(
            allowSellerRegistration,
            'allowSellerRegistration'
          )

        finalRequireProductApproval =
          normalizeBoolean(
            requireProductApproval,
            'requireProductApproval'
          )

        finalRequireSellerVerification =
          normalizeBoolean(
            requireSellerVerification,
            'requireSellerVerification'
          )
      } catch (booleanError) {
        return res.status(400).json({
          success: false,
          message:
            booleanError.message,
        })
      }

      // ------------------------------------------------------
      // SAVE SETTINGS
      // ------------------------------------------------------

      const settings =
        await AdminSettings.findOneAndUpdate(
          {
            key: 'default',
          },
          {
            key: 'default',

            platformName:
              String(
                platformName
              ).trim(),

            currency,

            commissionRate:
              finalCommissionRate,

            allowSellerRegistration:
              finalAllowSellerRegistration,

            requireProductApproval:
              finalRequireProductApproval,

            requireSellerVerification:
              finalRequireSellerVerification,
          },
          {
            new: true,

            upsert: true,

            setDefaultsOnInsert:
              true,

            runValidators:
              true,
          }
        )

      return res.status(200).json({
        success: true,

        message:
          'Admin settings saved successfully.',

        settings,
      })
    } catch (error) {
      next(error)
    }
  }