

// import mongoose from 'mongoose'

// const storeSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       default: '',
//       trim: true,
//     },

//     logo: {
//       type: String,
//       default: '',
//     },

//     banner: {
//       type: String,
//       default: '',
//     },

//     // Store belongs to a Seller, not directly to User
//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Seller',
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'active',
//         'rejected',
//         'suspended',
//       ],
//       default: 'pending',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// // Helpful indexes
// storeSchema.index({ seller: 1 })
// storeSchema.index({ status: 1 })

// const Store =
//   mongoose.models.Store ||
//   mongoose.model('Store', storeSchema)

// export default Store

// import mongoose from 'mongoose'
// import crypto from 'crypto'

// // ============================================================
// // GENERATE STORE ID
// // Example:
// // FEG-STORE-K9M31Q5B
// // ============================================================

// const generateStoreId = () => {
//   const randomPart = crypto
//     .randomBytes(4)
//     .toString('hex')
//     .toUpperCase()

//   return `FEG-STORE-${randomPart}`
// }

// // ============================================================
// // STORE SCHEMA
// // ============================================================

// const storeSchema = new mongoose.Schema(
//   {
//     // ========================================================
//     // PUBLIC STORE ID
//     // ========================================================

//     storeId: {
//       type: String,
//       unique: true,
//       sparse: true,
//       uppercase: true,
//       trim: true,
//       index: true,
//     },

//     // ========================================================
//     // STORE NAME
//     // ========================================================

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     // ========================================================
//     // STORE SLUG
//     // ========================================================

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     // ========================================================
//     // DESCRIPTION
//     // ========================================================

//     description: {
//       type: String,
//       default: '',
//       trim: true,
//     },

//     // ========================================================
//     // LOGO
//     // ========================================================

//     logo: {
//       type: String,
//       default: '',
//     },

//     // ========================================================
//     // BANNER
//     // ========================================================

//     banner: {
//       type: String,
//       default: '',
//     },

//     // ========================================================
//     // SELLER
//     // Store belongs to Seller, not directly to User
//     // ========================================================

//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Seller',
//       required: true,
//     },

//     // ========================================================
//     // STATUS
//     // ========================================================

//     status: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'active',
//         'rejected',
//         'suspended',
//       ],
//       default: 'pending',
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// // ============================================================
// // AUTOMATIC STORE ID
// // ============================================================
// //
// // This also handles older Store documents that do not yet
// // have a storeId. The next time the document is saved,
// // an ID will be assigned automatically.
// // ============================================================

// storeSchema.pre('save', function (next) {
//   if (!this.storeId) {
//     this.storeId = generateStoreId()
//   }

//   next()
// })

// // ============================================================
// // INDEXES
// // ============================================================

// storeSchema.index({ seller: 1 })
// storeSchema.index({ status: 1 })

// // ============================================================
// // MODEL
// // ============================================================

// const Store =
//   mongoose.models.Store ||
//   mongoose.model('Store', storeSchema)

// export default Store

import mongoose from 'mongoose'
import crypto from 'crypto'

// ============================================================
// GENERATE STORE ID
// Example: FEG-STORE-K9M31Q5B
// ============================================================

const generateStoreId = () => {
  const randomPart = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()

  return `FEG-STORE-${randomPart}`
}

// ============================================================
// STORE SCHEMA
// ============================================================

const storeSchema = new mongoose.Schema(
  {
    // PUBLIC STORE ID
    storeId: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },

    // STORE NAME
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // STORE SLUG
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // DESCRIPTION
    description: {
      type: String,
      default: '',
      trim: true,
    },

    // LOGO
    logo: {
      type: String,
      default: '',
    },

    // BANNER
    banner: {
      type: String,
      default: '',
    },

    // SELLER
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

    // STATUS
    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'active',
        'rejected',
        'suspended',
      ],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

// ============================================================
// AUTOMATIC STORE ID
// ============================================================

storeSchema.pre('save', function () {
  if (!this.storeId) {
    this.storeId = generateStoreId()
  }
})

// ============================================================
// INDEXES
// ============================================================

storeSchema.index({ seller: 1 })
storeSchema.index({ status: 1 })

// ============================================================
// MODEL
// ============================================================

const Store =
  mongoose.models.Store ||
  mongoose.model('Store', storeSchema)

export default Store