
// import mongoose from 'mongoose'

// const sellerSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       unique: true,
//     },

//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Store',
//       default: null,
//     },

//     businessName: {
//       type: String,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
//       lowercase: true,
//       trim: true,
//     },

//     address: {
//       type: String,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     logo: {
//       type: String,
//       default: '',
//     },

//     documents: {
//       type: mongoose.Schema.Types.Mixed,
//       default: {},
//     },

//     commissionRate: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 100,
//     },

//     // ========================================================
//     // SELLER EARNINGS
//     // ========================================================

//     availableBalance: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     totalEarnings: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     totalCommission: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'rejected',
//         'suspended',
//         'inactive',
//       ],
//       default: 'pending',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// const Seller =
//   mongoose.models.Seller ||
//   mongoose.model('Seller', sellerSchema)

// export default Seller


// import mongoose from 'mongoose'
// import crypto from 'crypto'

// // ============================================================
// // GENERATE SELLER ID
// // Example:
// // FEG-SELLER-A8K42P7X
// // ============================================================

// const generateSellerId = () => {
//   const randomPart = crypto
//     .randomBytes(4)
//     .toString('hex')
//     .toUpperCase()

//   return `FEG-SELLER-${randomPart}`
// }

// // ============================================================
// // SELLER SCHEMA
// // ============================================================

// const sellerSchema = new mongoose.Schema(
//   {
//     // ========================================================
//     // PUBLIC SELLER ID
//     // ========================================================

//     sellerId: {
//       type: String,
//       unique: true,
//       sparse: true,
//       uppercase: true,
//       trim: true,
//       index: true,
//     },

//     // ========================================================
//     // USER
//     // ========================================================

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       unique: true,
//     },

//     // ========================================================
//     // STORE
//     // ========================================================

//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Store',
//       default: null,
//     },

//     // ========================================================
//     // BUSINESS INFORMATION
//     // ========================================================

//     businessName: {
//       type: String,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
//       lowercase: true,
//       trim: true,
//     },

//     address: {
//       type: String,
//       trim: true,
//     },

//     description: {
//       type: String,
//       trim: true,
//     },

//     logo: {
//       type: String,
//       default: '',
//     },

//     documents: {
//       type: mongoose.Schema.Types.Mixed,
//       default: {},
//     },

//     // ========================================================
//     // COMMISSION
//     // ========================================================

//     commissionRate: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 100,
//     },

//     // ========================================================
//     // SELLER EARNINGS
//     // ========================================================

//     availableBalance: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     totalEarnings: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     totalCommission: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     // ========================================================
//     // STATUS
//     // ========================================================

//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'rejected',
//         'suspended',
//         'inactive',
//       ],
//       default: 'pending',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// // ============================================================
// // AUTOMATIC SELLER ID
// // ============================================================
// //
// // This also handles older Seller documents that do not yet
// // have a sellerId. The next time the document is saved,
// // an ID will be assigned automatically.
// // ============================================================

// sellerSchema.pre('save', function (next) {
//   if (!this.sellerId) {
//     this.sellerId = generateSellerId()
//   }

//   next()
// })

// // ============================================================
// // MODEL
// // ============================================================

// const Seller =
//   mongoose.models.Seller ||
//   mongoose.model('Seller', sellerSchema)

// export default Seller

import mongoose from 'mongoose'
import crypto from 'crypto'

// ============================================================
// GENERATE SELLER ID
// Example: FEG-SELLER-A8K42P7X
// ============================================================

const generateSellerId = () => {
  const randomPart = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()

  return `FEG-SELLER-${randomPart}`
}

// ============================================================
// SELLER SCHEMA
// ============================================================

const sellerSchema = new mongoose.Schema(
  {
    // PUBLIC SELLER ID
    sellerId: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },

    // USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // STORE
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      default: null,
    },

    // BUSINESS INFORMATION
    businessName: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      default: '',
    },

    documents: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // COMMISSION
    commissionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // SELLER EARNINGS
    availableBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalCommission: {
      type: Number,
      default: 0,
      min: 0,
    },

    // STATUS
    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'rejected',
        'suspended',
        'inactive',
      ],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

// ============================================================
// AUTOMATIC SELLER ID
// Assigns an ID to new documents and older documents
// that do not yet have a sellerId.
// ============================================================

sellerSchema.pre('save', function () {
  if (!this.sellerId) {
    this.sellerId = generateSellerId()
  }
})

// ============================================================
// MODEL
// ============================================================

const Seller =
  mongoose.models.Seller ||
  mongoose.model('Seller', sellerSchema)

export default Seller