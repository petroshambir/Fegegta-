

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