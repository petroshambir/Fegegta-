// import mongoose from 'mongoose'

// const sellerApplicationSchema = new mongoose.Schema(
//   {
//     // ============================================================
//     // USER
//     // ============================================================

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       index: true,
//     },

//     // ============================================================
//     // BUSINESS INFORMATION
//     // ============================================================

//     businessName: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 200,
//     },

//     phone: {
//       type: String,
//       trim: true,
//       default: '',
//     },

//     email: {
//       type: String,
//       lowercase: true,
//       trim: true,
//       default: '',
//     },

//     address: {
//       type: String,
//       trim: true,
//       default: '',
//     },

//     description: {
//       type: String,
//       trim: true,
//       default: '',
//       maxlength: 3000,
//     },

//     // ============================================================
//     // STORE / BUSINESS LOGO
//     // ============================================================

//     logo: {
//       type: String,
//       default: '',
//       trim: true,
//     },

//     // ============================================================
//     // DOCUMENTS
//     // ============================================================

//     documents: {
//       type: mongoose.Schema.Types.Mixed,
//       default: {},
//     },

//     // ============================================================
//     // APPLICATION STATUS
//     // ============================================================

//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'rejected',
//       ],
//       default: 'pending',
//       index: true,
//     },

//     // ============================================================
//     // ADMIN REVIEW
//     // ============================================================

//     rejectionReason: {
//       type: String,
//       trim: true,
//       default: '',
//     },

//     reviewedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//     },

//     reviewedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// // ============================================================
// // INDEXES
// // ============================================================

// sellerApplicationSchema.index({
//   user: 1,
//   status: 1,
// })

// sellerApplicationSchema.index({
//   createdAt: -1,
// })

// // ============================================================
// // MODEL
// // ============================================================

// const SellerApplication =
//   mongoose.models.SellerApplication ||
//   mongoose.model(
//     'SellerApplication',
//     sellerApplicationSchema
//   )

// export default SellerApplication

import mongoose from 'mongoose'

// ============================================================
// SELLER APPLICATION SCHEMA
// ============================================================

const sellerApplicationSchema = new mongoose.Schema(
  {
    // ==========================================================
    // USER
    // ==========================================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // ==========================================================
    // BUSINESS INFORMATION
    // ==========================================================

    businessName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    phone: {
      type: String,
      trim: true,
      default: '',
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },

    address: {
      type: String,
      trim: true,
      default: '',
    },

    // ==========================================================
    // STORE INFORMATION
    // ==========================================================

    storeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    storeDescription: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000,
    },

    // ==========================================================
    // PRODUCT INFORMATION
    // ==========================================================

    productType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    productCategory: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    productDescription: {
      type: String,
      trim: true,
      default: '',
      maxlength: 3000,
    },

    productQuality: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000,
    },

    // ==========================================================
    // ADDITIONAL INFORMATION
    // ==========================================================

    otherInformation: {
      type: String,
      trim: true,
      default: '',
      maxlength: 3000,
    },

    // ==========================================================
    // GENERAL DESCRIPTION
    //
    // This can be used for compatibility with older applications.
    // ==========================================================

    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 5000,
    },

    // ==========================================================
    // STORE / BUSINESS LOGO
    // ==========================================================

    logo: {
      type: String,
      default: '',
      trim: true,
    },

    // ==========================================================
    // DOCUMENTS
    // ==========================================================

    documents: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // ==========================================================
    // APPLICATION STATUS
    // ==========================================================

    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'rejected',
      ],
      default: 'pending',
      index: true,
    },

    // ==========================================================
    // ADMIN REVIEW
    // ==========================================================

    rejectionReason: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// ============================================================
// INDEXES
// ============================================================

sellerApplicationSchema.index({
  user: 1,
  status: 1,
})

sellerApplicationSchema.index({
  createdAt: -1,
})

sellerApplicationSchema.index({
  status: 1,
  createdAt: -1,
})

// ============================================================
// MODEL
// ============================================================

const SellerApplication =
  mongoose.models.SellerApplication ||
  mongoose.model(
    'SellerApplication',
    sellerApplicationSchema
  )

export default SellerApplication