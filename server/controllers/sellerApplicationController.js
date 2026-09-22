

// import SellerApplication from '../models/SellerApplication.js'
// import Seller from '../models/Seller.js'
// import Store from '../models/Store.js'
// import User from '../models/User.js'

// // ============================================================
// // HELPER — CREATE STORE SLUG
// // ============================================================

// const generateStoreSlug = (name) => {
//   return String(name)
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// // ============================================================
// // HELPER — MAKE UNIQUE STORE SLUG
// // ============================================================

// const createUniqueStoreSlug = async (name) => {
//   const baseSlug =
//     generateStoreSlug(name) ||
//     `store-${Date.now()}`

//   let slug = baseSlug
//   let counter = 1

//   while (await Store.findOne({ slug })) {
//     slug = `${baseSlug}-${counter}`
//     counter += 1
//   }

//   return slug
// }

// // ============================================================
// // HELPER — EXTRACT OLD DESCRIPTION FIELD
// // ============================================================

// const extractLegacyDescriptionField = (
//   description,
//   label
// ) => {
//   const text = String(description || '')

//   const escapedLabel = String(label).replace(
//     /[.*+?^${}()|[\]\\]/g,
//     '\\$&'
//   )

//   const regex = new RegExp(
//     `${escapedLabel}:\\s*([\\s\\S]*?)(?=\\n\\n[A-Za-z ]+:|$)`,
//     'i'
//   )

//   const match = text.match(regex)

//   return match?.[1]?.trim() || ''
// }

// // ============================================================
// // CUSTOMER / USER
// // APPLY TO BECOME A SELLER
// // ============================================================

// export const createSellerApplication = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const userId =
//       req.user?._id ||
//       req.user?.id

//     // ========================================================
//     // AUTHENTICATION
//     // ========================================================

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required.',
//       })
//     }

//     const {
//       // Business
//       businessName,
//       phone,
//       email,
//       address,

//       // Store
//       storeName,
//       storeDescription,

//       // Product
//       productType,
//       productCategory,
//       productDescription,
//       productQuality,

//       // Additional
//       otherInformation,

//       // Compatibility / old field
//       description,

//       logo,
//       documents,
//     } = req.body

//     // ========================================================
//     // REQUIRED INFORMATION
//     // ========================================================

//     if (
//       !businessName ||
//       !String(businessName).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Business name is required.',
//       })
//     }

//     if (
//       !phone ||
//       !String(phone).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number is required.',
//       })
//     }

//     if (
//       !email ||
//       !String(email).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email address is required.',
//       })
//     }

//     if (
//       !storeName ||
//       !String(storeName).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Store name is required.',
//       })
//     }

//     if (
//       !productType ||
//       !String(productType).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product type is required.',
//       })
//     }

//     if (
//       !productCategory ||
//       !String(productCategory).trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Product category is required.',
//       })
//     }

//     // ========================================================
//     // CHECK EXISTING APPLICATION FIRST
//     // ========================================================
//     //
//     // IMPORTANT:
//     // Always check SellerApplication BEFORE Seller.
//     //
//     // A previous failed approval may have created a partial
//     // Seller record. That Seller must NOT block a new
//     // application if the application itself is missing,
//     // pending, or rejected.
//     // ========================================================

//     const existingApplication =
//       await SellerApplication.findOne({
//         user: userId,
//       }).sort({
//         createdAt: -1,
//       })

//     // ========================================================
//     // EXISTING APPLICATION
//     // ========================================================

//     if (existingApplication) {
//       // ------------------------------------------------------
//       // PENDING
//       // ------------------------------------------------------

//       if (
//         existingApplication.status ===
//         'pending'
//       ) {
//         return res.status(409).json({
//           success: false,
//           message:
//             'You already have a pending seller application.',
//           application:
//             existingApplication,
//         })
//       }

//       // ------------------------------------------------------
//       // APPROVED
//       // ------------------------------------------------------

//       if (
//         existingApplication.status ===
//         'approved'
//       ) {
//         const approvedSeller =
//           await Seller.findOne({
//             user: userId,
//           })

//         return res.status(409).json({
//           success: false,
//           message:
//             'Your seller application has already been approved.',
//           application:
//             existingApplication,
//           seller:
//             approvedSeller || null,
//         })
//       }

//       // ------------------------------------------------------
//       // REJECTED
//       // ALLOW RESUBMISSION
//       // ------------------------------------------------------

//       if (
//         existingApplication.status ===
//         'rejected'
//       ) {
//         existingApplication.businessName =
//           String(
//             businessName
//           ).trim()

//         existingApplication.phone =
//           String(
//             phone
//           ).trim()

//         existingApplication.email =
//           String(email)
//             .trim()
//             .toLowerCase()

//         existingApplication.address =
//           address
//             ? String(address).trim()
//             : ''

//         // Store information
//         existingApplication.storeName =
//           String(
//             storeName
//           ).trim()

//         existingApplication.storeDescription =
//           storeDescription
//             ? String(
//                 storeDescription
//               ).trim()
//             : ''

//         // Product information
//         existingApplication.productType =
//           String(
//             productType
//           ).trim()

//         existingApplication.productCategory =
//           String(
//             productCategory
//           ).trim()

//         existingApplication.productDescription =
//           productDescription
//             ? String(
//                 productDescription
//               ).trim()
//             : ''

//         existingApplication.productQuality =
//           productQuality
//             ? String(
//                 productQuality
//               ).trim()
//             : ''

//         // Additional information
//         existingApplication.otherInformation =
//           otherInformation
//             ? String(
//                 otherInformation
//               ).trim()
//             : ''

//         // Old / compatibility description
//         existingApplication.description =
//           description
//             ? String(description).trim()
//             : ''

//         existingApplication.logo =
//           logo
//             ? String(logo).trim()
//             : ''

//         existingApplication.documents =
//           documents &&
//           typeof documents === 'object'
//             ? documents
//             : {}

//         // Reset review status
//         existingApplication.status =
//           'pending'

//         existingApplication.rejectionReason =
//           ''

//         existingApplication.reviewedBy =
//           null

//         existingApplication.reviewedAt =
//           null

//         await existingApplication.save()

//         const populatedApplication =
//           await SellerApplication.findById(
//             existingApplication._id
//           ).populate(
//             'user',
//             'name firstName lastName email phone'
//           )

//         return res.status(200).json({
//           success: true,
//           message:
//             'Seller application resubmitted successfully.',
//           application:
//             populatedApplication,
//         })
//       }
//     }

//     // ========================================================
//     // CHECK EXISTING SELLER
//     // ========================================================
//     //
//     // IMPORTANT FIX:
//     //
//     // Do NOT block simply because a Seller document exists.
//     //
//     // A previous failed approval may have created a partial
//     // Seller record.
//     //
//     // Only an APPROVED seller account should block a new
//     // application.
//     // ========================================================

//     const existingSeller =
//       await Seller.findOne({
//         user: userId,
//       })

//     if (
//       existingSeller &&
//       existingSeller.status === 'approved'
//     ) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'You already have a seller account.',
//         seller:
//           existingSeller,
//       })
//     }

//     // ========================================================
//     // CREATE APPLICATION
//     // ========================================================

//     const application =
//       await SellerApplication.create({
//         user: userId,

//         // ----------------------------------------------------
//         // Business
//         // ----------------------------------------------------

//         businessName:
//           String(
//             businessName
//           ).trim(),

//         phone:
//           String(
//             phone
//           ).trim(),

//         email:
//           String(email)
//             .trim()
//             .toLowerCase(),

//         address:
//           address
//             ? String(address).trim()
//             : '',

//         // ----------------------------------------------------
//         // Store
//         // ----------------------------------------------------

//         storeName:
//           String(
//             storeName
//           ).trim(),

//         storeDescription:
//           storeDescription
//             ? String(
//                 storeDescription
//               ).trim()
//             : '',

//         // ----------------------------------------------------
//         // Product
//         // ----------------------------------------------------

//         productType:
//           String(
//             productType
//           ).trim(),

//         productCategory:
//           String(
//             productCategory
//           ).trim(),

//         productDescription:
//           productDescription
//             ? String(
//                 productDescription
//               ).trim()
//             : '',

//         productQuality:
//           productQuality
//             ? String(
//                 productQuality
//               ).trim()
//             : '',

//         // ----------------------------------------------------
//         // Additional
//         // ----------------------------------------------------

//         otherInformation:
//           otherInformation
//             ? String(
//                 otherInformation
//               ).trim()
//             : '',

//         // ----------------------------------------------------
//         // Compatibility / old field
//         // ----------------------------------------------------

//         description:
//           description
//             ? String(description).trim()
//             : '',

//         logo:
//           logo
//             ? String(logo).trim()
//             : '',

//         documents:
//           documents &&
//           typeof documents === 'object'
//             ? documents
//             : {},

//         // ----------------------------------------------------
//         // Status
//         // ----------------------------------------------------

//         status: 'pending',

//         rejectionReason: '',

//         reviewedBy: null,

//         reviewedAt: null,
//       })

//     const populatedApplication =
//       await SellerApplication.findById(
//         application._id
//       ).populate(
//         'user',
//         'name firstName lastName email phone'
//       )

//     return res.status(201).json({
//       success: true,
//       message:
//         'Seller application submitted successfully. It is waiting for admin approval.',
//       application:
//         populatedApplication,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CUSTOMER / USER
// // GET MY SELLER APPLICATION
// // ============================================================

// export const getMySellerApplication = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const userId =
//       req.user?._id ||
//       req.user?.id

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Authentication required.',
//       })
//     }

//     const application =
//       await SellerApplication.findOne({
//         user: userId,
//       })
//         .populate(
//           'user',
//           'name firstName lastName email phone'
//         )
//         .sort({
//           createdAt: -1,
//         })

//     const seller =
//       await Seller.findOne({
//         user: userId,
//       })
//         .populate(
//           'user',
//           'name firstName lastName email phone'
//         )
//         .populate(
//           'store',
//           'name slug description logo banner status'
//         )

//     if (
//       !application &&
//       !seller
//     ) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'You have not submitted a seller application yet.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       application:
//         application || null,
//       seller:
//         seller || null,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // ADMIN — GET ALL SELLER APPLICATIONS
// // ============================================================

// export const getSellerApplications = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       status,
//     } = req.query

//     const filter = {}

//     if (
//       status &&
//       [
//         'pending',
//         'approved',
//         'rejected',
//       ].includes(status)
//     ) {
//       filter.status = status
//     }

//     const applications =
//       await SellerApplication.find(
//         filter
//       )
//         .populate(
//           'user',
//           'name firstName lastName email phone'
//         )
//         .populate(
//           'reviewedBy',
//           'name firstName lastName email'
//         )
//         .sort({
//           createdAt: -1,
//         })

//     return res.status(200).json({
//       success: true,
//       applications,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // ADMIN — GET SINGLE SELLER APPLICATION
// // ============================================================

// export const getSellerApplicationById =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const application =
//         await SellerApplication.findById(
//           req.params.id
//         )
//           .populate(
//             'user',
//             'name firstName lastName email phone'
//           )
//           .populate(
//             'reviewedBy',
//             'name firstName lastName email'
//           )

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message:
//             'Seller application not found.',
//         })
//       }

//       const seller =
//         await Seller.findOne({
//           user:
//             application.user._id,
//         })
//           .populate(
//             'user',
//             'name firstName lastName email phone'
//           )
//           .populate(
//             'store',
//             'name slug description logo banner status'
//           )

//       return res.status(200).json({
//         success: true,
//         application,
//         seller:
//           seller || null,
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // ADMIN — UPDATE SELLER APPLICATION STATUS
// // ============================================================

// export const updateSellerApplicationStatus =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const {
//         status,
//         rejectionReason,
//       } = req.body

//       const allowedStatuses = [
//         'pending',
//         'approved',
//         'rejected',
//       ]

//       if (
//         !allowedStatuses.includes(
//           status
//         )
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'Invalid application status.',
//         })
//       }

//       const application =
//         await SellerApplication.findById(
//           req.params.id
//         )

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message:
//             'Seller application not found.',
//         })
//       }

//       // ======================================================
//       // REJECT
//       // ======================================================

//       if (
//         status === 'rejected'
//       ) {
//         application.status =
//           'rejected'

//         application.rejectionReason =
//           rejectionReason
//             ? String(
//                 rejectionReason
//               ).trim()
//             : ''

//         application.reviewedBy =
//           req.user._id

//         application.reviewedAt =
//           new Date()

//         await application.save()

//         return res.status(200).json({
//           success: true,
//           message:
//             'Seller application rejected successfully.',
//           application,
//         })
//       }

//       // ======================================================
//       // PENDING
//       // ======================================================

//       if (
//         status === 'pending'
//       ) {
//         application.status =
//           'pending'

//         application.rejectionReason =
//           ''

//         application.reviewedBy =
//           null

//         application.reviewedAt =
//           null

//         await application.save()

//         return res.status(200).json({
//           success: true,
//           message:
//             'Seller application moved back to pending.',
//           application,
//         })
//       }

//       // ======================================================
//       // APPROVE
//       // ======================================================

//       if (
//         status === 'approved'
//       ) {
//         // ----------------------------------------------------
//         // REPAIR OLD APPLICATIONS
//         // ----------------------------------------------------

//         const legacyDescription =
//           String(
//             application.description || ''
//           )

//         if (
//           !application.storeName
//         ) {
//           application.storeName =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Store Name'
//             )
//         }

//         if (
//           !application.storeDescription
//         ) {
//           application.storeDescription =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Store Description'
//             )
//         }

//         if (
//           !application.productType
//         ) {
//           application.productType =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Product Type'
//             )
//         }

//         if (
//           !application.productCategory
//         ) {
//           application.productCategory =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Product Category'
//             )
//         }

//         if (
//           !application.productDescription
//         ) {
//           application.productDescription =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Product Description'
//             )
//         }

//         if (
//           !application.productQuality
//         ) {
//           application.productQuality =
//             extractLegacyDescriptionField(
//               legacyDescription,
//               'Product Quality'
//             )
//         }

//         // ----------------------------------------------------
//         // REQUIRED DATA CHECK
//         // ----------------------------------------------------

//         if (
//           !application.storeName ||
//           !String(
//             application.storeName
//           ).trim()
//         ) {
//           return res.status(400).json({
//             success: false,
//             message:
//               'This seller application is missing the store name. Please ask the applicant to resubmit the application.',
//           })
//         }

//         if (
//           !application.productType ||
//           !String(
//             application.productType
//           ).trim()
//         ) {
//           return res.status(400).json({
//             success: false,
//             message:
//               'This seller application is missing the product type. Please ask the applicant to resubmit the application.',
//           })
//         }

//         if (
//           !application.productCategory ||
//           !String(
//             application.productCategory
//           ).trim()
//         ) {
//           return res.status(400).json({
//             success: false,
//             message:
//               'This seller application is missing the product category. Please ask the applicant to resubmit the application.',
//           })
//         }

//         // ----------------------------------------------------
//         // VALIDATE BEFORE CREATING SELLER / STORE
//         // ----------------------------------------------------

//         await application.validate()

//         // ----------------------------------------------------
//         // FIND EXISTING SELLER
//         // ----------------------------------------------------

//         let seller =
//           await Seller.findOne({
//             user:
//               application.user,
//           })

//         // ----------------------------------------------------
//         // CREATE SELLER
//         // ----------------------------------------------------

//         if (!seller) {
//           seller =
//             await Seller.create({
//               user:
//                 application.user,

//               store: null,

//               businessName:
//                 application.businessName,

//               phone:
//                 application.phone,

//               email:
//                 application.email,

//               address:
//                 application.address,

//               description:
//                 application.description ||
//                 application.storeDescription ||
//                 '',

//               logo:
//                 application.logo ||
//                 '',

//               documents:
//                 application.documents ||
//                 {},

//               commissionRate: 0,

//               availableBalance: 0,

//               totalEarnings: 0,

//               totalCommission: 0,

//               status:
//                 'approved',
//             })
//         } else {
//           // --------------------------------------------------
//           // REUSE EXISTING SELLER
//           //
//           // This handles a partial Seller record created by
//           // a previous failed approval.
//           // --------------------------------------------------

//           seller.businessName =
//             application.businessName

//           seller.phone =
//             application.phone

//           seller.email =
//             application.email

//           seller.address =
//             application.address

//           seller.description =
//             application.description ||
//             application.storeDescription ||
//             ''

//           seller.logo =
//             application.logo ||
//             ''

//           seller.documents =
//             application.documents ||
//             {}

//           seller.status =
//             'approved'

//           await seller.save()
//         }

//         // ----------------------------------------------------
//         // CREATE OR FIND STORE
//         // ----------------------------------------------------

//         let store = null

//         if (
//           seller.store
//         ) {
//           store =
//             await Store.findById(
//               seller.store
//             )
//         }

//         // ----------------------------------------------------
//         // CREATE STORE
//         // ----------------------------------------------------

//         if (!store) {
//           const slug =
//             await createUniqueStoreSlug(
//               application.storeName ||
//               application.businessName
//             )

//           store =
//             await Store.create({
//               name:
//                 application.storeName ||
//                 application.businessName,

//               slug,

//               description:
//                 application.storeDescription ||
//                 application.description ||
//                 '',

//               logo:
//                 application.logo ||
//                 '',

//               banner: '',

//               seller:
//                 seller._id,

//               status:
//                 'approved',
//             })

//           seller.store =
//             store._id

//           await seller.save()
//         } else {
//           // --------------------------------------------------
//           // UPDATE EXISTING STORE
//           // --------------------------------------------------

//           store.name =
//             application.storeName ||
//             application.businessName

//           store.description =
//             application.storeDescription ||
//             application.description ||
//             ''

//           store.logo =
//             application.logo ||
//             ''

//           store.seller =
//             seller._id

//           store.status =
//             'approved'

//           await store.save()

//           if (
//             !seller.store
//           ) {
//             seller.store =
//               store._id

//             await seller.save()
//           }
//         }

//         // ----------------------------------------------------
//         // UPDATE USER ROLE
//         //
//         // Customer → Seller
//         // ----------------------------------------------------

//         const user =
//           await User.findById(
//             application.user
//           )

//         if (user) {
//           user.role = 'seller'

//           // If the account was inactive, make sure it is active.
//           if (
//             ['inactive', 'suspended'].includes(
//               user.status
//             )
//           ) {
//             user.status = 'active'
//           }

//           await user.save()
//         }

//         // ----------------------------------------------------
//         // FINALLY APPROVE APPLICATION
//         // ----------------------------------------------------

//         application.status =
//           'approved'

//         application.rejectionReason =
//           ''

//         application.reviewedBy =
//           req.user._id

//         application.reviewedAt =
//           new Date()

//         await application.save()

//         // ----------------------------------------------------
//         // RETURN COMPLETE SELLER DATA
//         // ----------------------------------------------------

//         const populatedSeller =
//           await Seller.findById(
//             seller._id
//           )
//             .populate(
//               'user',
//               'name firstName lastName email phone role status'
//             )
//             .populate(
//               'store',
//               'name slug description logo banner status'
//             )

//         // ----------------------------------------------------
//         // RETURN COMPLETE APPLICATION DATA
//         // ----------------------------------------------------

//         const populatedApplication =
//           await SellerApplication.findById(
//             application._id
//           )
//             .populate(
//               'user',
//               'name firstName lastName email phone role status'
//             )
//             .populate(
//               'reviewedBy',
//               'name firstName lastName email'
//             )

//         return res.status(200).json({
//           success: true,

//           message:
//             'Seller application approved successfully. Seller account and store are ready.',

//           application:
//             populatedApplication,

//           seller:
//             populatedSeller,
//         })
//       }
//     } catch (error) {
//       next(error)
//     }
//   }

// // ============================================================
// // ADMIN — DELETE SELLER APPLICATION
// // ============================================================

// export const deleteSellerApplication =
//   async (
//     req,
//     res,
//     next
//   ) => {
//     try {
//       const application =
//         await SellerApplication.findById(
//           req.params.id
//         )

//       if (!application) {
//         return res.status(404).json({
//           success: false,
//           message:
//             'Seller application not found.',
//         })
//       }

//       await application.deleteOne()

//       return res.status(200).json({
//         success: true,
//         message:
//           'Seller application deleted successfully.',
//       })
//     } catch (error) {
//       next(error)
//     }
//   }


import SellerApplication from '../models/SellerApplication.js'
import Seller from '../models/Seller.js'
import Store from '../models/Store.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'

// ============================================================
// HELPER — CREATE STORE SLUG
// ============================================================

const generateStoreSlug = (name) => {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ============================================================
// HELPER — MAKE UNIQUE STORE SLUG
// ============================================================

const createUniqueStoreSlug = async (name) => {
  const baseSlug =
    generateStoreSlug(name) ||
    `store-${Date.now()}`

  let slug = baseSlug
  let counter = 1

  while (await Store.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`
    counter += 1
  }

  return slug
}

// ============================================================
// HELPER — EXTRACT OLD DESCRIPTION FIELD
// ============================================================

const extractLegacyDescriptionField = (
  description,
  label
) => {
  const text = String(description || '')

  const escapedLabel = String(label).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  const regex = new RegExp(
    `${escapedLabel}:\\s*([\\s\\S]*?)(?=\\n\\n[A-Za-z ]+:|$)`,
    'i'
  )

  const match = text.match(regex)

  return match?.[1]?.trim() || ''
}

// ============================================================
// NOTIFICATION HELPER — NOTIFY ALL ADMINS
// ============================================================

const notifyAdminsAboutSellerApplication = async ({
  application,
  title = 'New Seller Application',
  message,
}) => {
  try {
    const admins = await User.find({
      role: 'admin',
    }).select('_id')

    if (!admins.length) {
      return
    }

    const applicantName =
      application?.businessName ||
      'A user'

    const notificationMessage =
      message ||
      `${applicantName} submitted a seller application for admin review.`

    const notifications =
      admins.map((admin) => ({
        recipient: admin._id,

        type: 'seller',

        title,

        message:
          notificationMessage,

        store: null,

        order: null,

        product: null,

        isRead: false,

        readAt: null,

        link:
          `/admin/seller-applications/${application._id}`,
      }))

    if (notifications.length > 0) {
      await Notification.insertMany(
        notifications
      )
    }
  } catch (error) {
    // Notification failure must not stop
    // seller application processing.
    console.error(
      'Failed to create admin seller application notification:',
      error
    )
  }
}

// ============================================================
// NOTIFICATION HELPER — NOTIFY APPLICANT
// ============================================================

const notifySellerApplicationUser = async ({
  userId,
  applicationId,
  title,
  message,
}) => {
  try {
    if (!userId) {
      return
    }

    await Notification.create({
      recipient: userId,

      type: 'seller',

      title,

      message,

      order: null,

      product: null,

      store: null,

      isRead: false,

      readAt: null,

      link:
        '/seller/application',
    })
  } catch (error) {
    // Notification failure must not stop
    // seller application processing.
    console.error(
      'Failed to create seller application notification:',
      error
    )
  }
}

// ============================================================
// CUSTOMER / USER
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

    // ========================================================
    // AUTHENTICATION
    // ========================================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const {
      // Business
      businessName,
      phone,
      email,
      address,

      // Store
      storeName,
      storeDescription,

      // Product
      productType,
      productCategory,
      productDescription,
      productQuality,

      // Additional
      otherInformation,

      // Compatibility / old field
      description,

      logo,
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
        message: 'Business name is required.',
      })
    }

    if (
      !phone ||
      !String(phone).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required.',
      })
    }

    if (
      !email ||
      !String(email).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      })
    }

    if (
      !storeName ||
      !String(storeName).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Store name is required.',
      })
    }

    if (
      !productType ||
      !String(productType).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Product type is required.',
      })
    }

    if (
      !productCategory ||
      !String(productCategory).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Product category is required.',
      })
    }

    // ========================================================
    // CHECK EXISTING APPLICATION FIRST
    // ========================================================
    //
    // IMPORTANT:
    // Always check SellerApplication BEFORE Seller.
    //
    // A previous failed approval may have created a partial
    // Seller record. That Seller must NOT block a new
    // application if the application itself is missing,
    // pending, or rejected.
    // ========================================================

    const existingApplication =
      await SellerApplication.findOne({
        user: userId,
      }).sort({
        createdAt: -1,
      })

    // ========================================================
    // EXISTING APPLICATION
    // ========================================================

    if (existingApplication) {
      // ------------------------------------------------------
      // PENDING
      // ------------------------------------------------------

      if (
        existingApplication.status ===
        'pending'
      ) {
        return res.status(409).json({
          success: false,
          message:
            'You already have a pending seller application.',
          application:
            existingApplication,
        })
      }

      // ------------------------------------------------------
      // APPROVED
      // ------------------------------------------------------

      if (
        existingApplication.status ===
        'approved'
      ) {
        const approvedSeller =
          await Seller.findOne({
            user: userId,
          })

        return res.status(409).json({
          success: false,
          message:
            'Your seller application has already been approved.',
          application:
            existingApplication,
          seller:
            approvedSeller || null,
        })
      }

      // ------------------------------------------------------
      // REJECTED
      // ALLOW RESUBMISSION
      // ------------------------------------------------------

      if (
        existingApplication.status ===
        'rejected'
      ) {
        existingApplication.businessName =
          String(
            businessName
          ).trim()

        existingApplication.phone =
          String(
            phone
          ).trim()

        existingApplication.email =
          String(email)
            .trim()
            .toLowerCase()

        existingApplication.address =
          address
            ? String(address).trim()
            : ''

        // Store information
        existingApplication.storeName =
          String(
            storeName
          ).trim()

        existingApplication.storeDescription =
          storeDescription
            ? String(
                storeDescription
              ).trim()
            : ''

        // Product information
        existingApplication.productType =
          String(
            productType
          ).trim()

        existingApplication.productCategory =
          String(
            productCategory
          ).trim()

        existingApplication.productDescription =
          productDescription
            ? String(
                productDescription
              ).trim()
            : ''

        existingApplication.productQuality =
          productQuality
            ? String(
                productQuality
              ).trim()
            : ''

        // Additional information
        existingApplication.otherInformation =
          otherInformation
            ? String(
                otherInformation
              ).trim()
            : ''

        // Old / compatibility description
        existingApplication.description =
          description
            ? String(description).trim()
            : ''

        existingApplication.logo =
          logo
            ? String(logo).trim()
            : ''

        existingApplication.documents =
          documents &&
          typeof documents === 'object'
            ? documents
            : {}

        // Reset review status
        existingApplication.status =
          'pending'

        existingApplication.rejectionReason =
          ''

        existingApplication.reviewedBy =
          null

        existingApplication.reviewedAt =
          null

        await existingApplication.save()

        // ======================================================
        // NOTIFICATION — ADMIN
        // ======================================================

        await notifyAdminsAboutSellerApplication({
          application:
            existingApplication,

          title:
            'Seller Application Resubmitted',

          message:
            `${existingApplication.businessName} resubmitted a seller application for admin review.`,
        })

        const populatedApplication =
          await SellerApplication.findById(
            existingApplication._id
          ).populate(
            'user',
            'name firstName lastName email phone'
          )

        return res.status(200).json({
          success: true,
          message:
            'Seller application resubmitted successfully.',
          application:
            populatedApplication,
        })
      }
    }

    // ========================================================
    // CHECK EXISTING SELLER
    // ========================================================
    //
    // IMPORTANT FIX:
    //
    // Do NOT block simply because a Seller document exists.
    //
    // A previous failed approval may have created a partial
    // Seller record.
    //
    // Only an APPROVED seller account should block a new
    // application.
    // ========================================================

    const existingSeller =
      await Seller.findOne({
        user: userId,
      })

    if (
      existingSeller &&
      existingSeller.status === 'approved'
    ) {
      return res.status(409).json({
        success: false,
        message:
          'You already have a seller account.',
        seller:
          existingSeller,
      })
    }

    // ========================================================
    // CREATE APPLICATION
    // ========================================================

    const application =
      await SellerApplication.create({
        user: userId,

        // ----------------------------------------------------
        // Business
        // ----------------------------------------------------

        businessName:
          String(
            businessName
          ).trim(),

        phone:
          String(
            phone
          ).trim(),

        email:
          String(email)
            .trim()
            .toLowerCase(),

        address:
          address
            ? String(address).trim()
            : '',

        // ----------------------------------------------------
        // Store
        // ----------------------------------------------------

        storeName:
          String(
            storeName
          ).trim(),

        storeDescription:
          storeDescription
            ? String(
                storeDescription
              ).trim()
            : '',

        // ----------------------------------------------------
        // Product
        // ----------------------------------------------------

        productType:
          String(
            productType
          ).trim(),

        productCategory:
          String(
            productCategory
          ).trim(),

        productDescription:
          productDescription
            ? String(
                productDescription
              ).trim()
            : '',

        productQuality:
          productQuality
            ? String(
                productQuality
              ).trim()
            : '',

        // ----------------------------------------------------
        // Additional
        // ----------------------------------------------------

        otherInformation:
          otherInformation
            ? String(
                otherInformation
              ).trim()
            : '',

        // ----------------------------------------------------
        // Compatibility / old field
        // ----------------------------------------------------

        description:
          description
            ? String(description).trim()
            : '',

        logo:
          logo
            ? String(logo).trim()
            : '',

        documents:
          documents &&
          typeof documents === 'object'
            ? documents
            : {},

        // ----------------------------------------------------
        // Status
        // ----------------------------------------------------

        status: 'pending',

        rejectionReason: '',

        reviewedBy: null,

        reviewedAt: null,
      })

    // ========================================================
    // NOTIFICATION — ADMIN
    // ========================================================

    await notifyAdminsAboutSellerApplication({
      application,

      title:
        'New Seller Application',

      message:
        `${application.businessName} submitted a new seller application for admin review.`,
    })

    const populatedApplication =
      await SellerApplication.findById(
        application._id
      ).populate(
        'user',
        'name firstName lastName email phone'
      )

    return res.status(201).json({
      success: true,
      message:
        'Seller application submitted successfully. It is waiting for admin approval.',
      application:
        populatedApplication,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CUSTOMER / USER
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

    const application =
      await SellerApplication.findOne({
        user: userId,
      })
        .populate(
          'user',
          'name firstName lastName email phone'
        )
        .sort({
          createdAt: -1,
        })

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

    if (
      !application &&
      !seller
    ) {
      return res.status(404).json({
        success: false,
        message:
          'You have not submitted a seller application yet.',
      })
    }

    return res.status(200).json({
      success: true,
      application:
        application || null,
      seller:
        seller || null,
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
      ].includes(status)
    ) {
      filter.status = status
    }

    const applications =
      await SellerApplication.find(
        filter
      )
        .populate(
          'user',
          'name firstName lastName email phone'
        )
        .populate(
          'reviewedBy',
          'name firstName lastName email'
        )
        .sort({
          createdAt: -1,
        })

    return res.status(200).json({
      success: true,
      applications,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// ADMIN — GET SINGLE SELLER APPLICATION
// ============================================================

export const getSellerApplicationById =
  async (
    req,
    res,
    next
  ) => {
    try {
      const application =
        await SellerApplication.findById(
          req.params.id
        )
          .populate(
            'user',
            'name firstName lastName email phone'
          )
          .populate(
            'reviewedBy',
            'name firstName lastName email'
          )

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            'Seller application not found.',
        })
      }

      const seller =
        await Seller.findOne({
          user:
            application.user._id,
        })
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
        application,
        seller:
          seller || null,
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
        rejectionReason,
      } = req.body

      const allowedStatuses = [
        'pending',
        'approved',
        'rejected',
      ]

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid application status.',
        })
      }

      const application =
        await SellerApplication.findById(
          req.params.id
        )

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            'Seller application not found.',
        })
      }

      // ======================================================
      // REJECT
      // ======================================================

      if (
        status === 'rejected'
      ) {
        application.status =
          'rejected'

        application.rejectionReason =
          rejectionReason
            ? String(
                rejectionReason
              ).trim()
            : ''

        application.reviewedBy =
          req.user._id

        application.reviewedAt =
          new Date()

        await application.save()

        // ====================================================
        // NOTIFICATION — APPLICANT
        // ====================================================

        await notifySellerApplicationUser({
          userId:
            application.user,

          applicationId:
            application._id,

          title:
            'Seller Application Rejected',

          message:
            application.rejectionReason
              ? `Your seller application has been rejected. Reason: ${application.rejectionReason}`
              : 'Your seller application has been rejected. You may review the application and resubmit it.',
        })

        return res.status(200).json({
          success: true,
          message:
            'Seller application rejected successfully.',
          application,
        })
      }

      // ======================================================
      // PENDING
      // ======================================================

      if (
        status === 'pending'
      ) {
        application.status =
          'pending'

        application.rejectionReason =
          ''

        application.reviewedBy =
          null

        application.reviewedAt =
          null

        await application.save()

        // ====================================================
        // NOTIFICATION — APPLICANT
        // ====================================================

        await notifySellerApplicationUser({
          userId:
            application.user,

          applicationId:
            application._id,

          title:
            'Seller Application Pending',

          message:
            'Your seller application has been moved back to pending and is waiting for admin review.',
        })

        return res.status(200).json({
          success: true,
          message:
            'Seller application moved back to pending.',
          application,
        })
      }

      // ======================================================
      // APPROVE
      // ======================================================

      if (
        status === 'approved'
      ) {
        // ----------------------------------------------------
        // REPAIR OLD APPLICATIONS
        // ----------------------------------------------------

        const legacyDescription =
          String(
            application.description || ''
          )

        if (
          !application.storeName
        ) {
          application.storeName =
            extractLegacyDescriptionField(
              legacyDescription,
              'Store Name'
            )
        }

        if (
          !application.storeDescription
        ) {
          application.storeDescription =
            extractLegacyDescriptionField(
              legacyDescription,
              'Store Description'
            )
        }

        if (
          !application.productType
        ) {
          application.productType =
            extractLegacyDescriptionField(
              legacyDescription,
              'Product Type'
            )
        }

        if (
          !application.productCategory
        ) {
          application.productCategory =
            extractLegacyDescriptionField(
              legacyDescription,
              'Product Category'
            )
        }

        if (
          !application.productDescription
        ) {
          application.productDescription =
            extractLegacyDescriptionField(
              legacyDescription,
              'Product Description'
            )
        }

        if (
          !application.productQuality
        ) {
          application.productQuality =
            extractLegacyDescriptionField(
              legacyDescription,
              'Product Quality'
            )
        }

        // ----------------------------------------------------
        // REQUIRED DATA CHECK
        // ----------------------------------------------------

        if (
          !application.storeName ||
          !String(
            application.storeName
          ).trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              'This seller application is missing the store name. Please ask the applicant to resubmit the application.',
          })
        }

        if (
          !application.productType ||
          !String(
            application.productType
          ).trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              'This seller application is missing the product type. Please ask the applicant to resubmit the application.',
          })
        }

        if (
          !application.productCategory ||
          !String(
            application.productCategory
          ).trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              'This seller application is missing the product category. Please ask the applicant to resubmit the application.',
          })
        }

        // ----------------------------------------------------
        // VALIDATE BEFORE CREATING SELLER / STORE
        // ----------------------------------------------------

        await application.validate()

        // ----------------------------------------------------
        // FIND EXISTING SELLER
        // ----------------------------------------------------

        let seller =
          await Seller.findOne({
            user:
              application.user,
          })

        // ----------------------------------------------------
        // CREATE SELLER
        // ----------------------------------------------------

        if (!seller) {
          seller =
            await Seller.create({
              user:
                application.user,

              store: null,

              businessName:
                application.businessName,

              phone:
                application.phone,

              email:
                application.email,

              address:
                application.address,

              description:
                application.description ||
                application.storeDescription ||
                '',

              logo:
                application.logo ||
                '',

              documents:
                application.documents ||
                {},

              commissionRate: 0,

              availableBalance: 0,

              totalEarnings: 0,

              totalCommission: 0,

              status:
                'approved',
            })
        } else {
          // --------------------------------------------------
          // REUSE EXISTING SELLER
          //
          // This handles a partial Seller record created by
          // a previous failed approval.
          // --------------------------------------------------

          seller.businessName =
            application.businessName

          seller.phone =
            application.phone

          seller.email =
            application.email

          seller.address =
            application.address

          seller.description =
            application.description ||
            application.storeDescription ||
            ''

          seller.logo =
            application.logo ||
            ''

          seller.documents =
            application.documents ||
            {}

          seller.status =
            'approved'

          await seller.save()
        }

        // ----------------------------------------------------
        // CREATE OR FIND STORE
        // ----------------------------------------------------

        let store = null

        if (
          seller.store
        ) {
          store =
            await Store.findById(
              seller.store
            )
        }

        // ----------------------------------------------------
        // CREATE STORE
        // ----------------------------------------------------

        if (!store) {
          const slug =
            await createUniqueStoreSlug(
              application.storeName ||
              application.businessName
            )

          store =
            await Store.create({
              name:
                application.storeName ||
                application.businessName,

              slug,

              description:
                application.storeDescription ||
                application.description ||
                '',

              logo:
                application.logo ||
                '',

              banner: '',

              seller:
                seller._id,

              status:
                'approved',
            })

          seller.store =
            store._id

          await seller.save()
        } else {
          // --------------------------------------------------
          // UPDATE EXISTING STORE
          // --------------------------------------------------

          store.name =
            application.storeName ||
            application.businessName

          store.description =
            application.storeDescription ||
            application.description ||
            ''

          store.logo =
            application.logo ||
            ''

          store.seller =
            seller._id

          store.status =
            'approved'

          await store.save()

          if (
            !seller.store
          ) {
            seller.store =
              store._id

            await seller.save()
          }
        }

        // ----------------------------------------------------
        // UPDATE USER ROLE
        //
        // Customer → Seller
        // ----------------------------------------------------

        const user =
          await User.findById(
            application.user
          )

        if (user) {
          user.role = 'seller'

          // If the account was inactive, make sure it is active.
          if (
            [
              'inactive',
              'suspended',
            ].includes(
              user.status
            )
          ) {
            user.status = 'active'
          }

          await user.save()
        }

        // ----------------------------------------------------
        // FINALLY APPROVE APPLICATION
        // ----------------------------------------------------

        application.status =
          'approved'

        application.rejectionReason =
          ''

        application.reviewedBy =
          req.user._id

        application.reviewedAt =
          new Date()

        await application.save()

        // ====================================================
        // NOTIFICATION — APPLICANT
        // ====================================================

        await notifySellerApplicationUser({
          userId:
            application.user,

          applicationId:
            application._id,

          title:
            'Seller Application Approved',

          message:
            'Congratulations! Your seller application has been approved. Your seller account and store are now ready.',
        })

        // ----------------------------------------------------
        // RETURN COMPLETE SELLER DATA
        // ----------------------------------------------------

        const populatedSeller =
          await Seller.findById(
            seller._id
          )
            .populate(
              'user',
              'name firstName lastName email phone role status'
            )
            .populate(
              'store',
              'name slug description logo banner status'
            )

        // ----------------------------------------------------
        // RETURN COMPLETE APPLICATION DATA
        // ----------------------------------------------------

        const populatedApplication =
          await SellerApplication.findById(
            application._id
          )
            .populate(
              'user',
              'name firstName lastName email phone role status'
            )
            .populate(
              'reviewedBy',
              'name firstName lastName email'
            )

        return res.status(200).json({
          success: true,

          message:
            'Seller application approved successfully. Seller account and store are ready.',

          application:
            populatedApplication,

          seller:
            populatedSeller,
        })
      }
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
      const application =
        await SellerApplication.findById(
          req.params.id
        )

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            'Seller application not found.',
        })
      }

      await application.deleteOne()

      return res.status(200).json({
        success: true,
        message:
          'Seller application deleted successfully.',
      })
    } catch (error) {
      next(error)
    }
  }