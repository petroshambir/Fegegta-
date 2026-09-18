

import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    logo: {
      type: String,
      default: '',
    },

    banner: {
      type: String,
      default: '',
    },

    // Store belongs to a Seller, not directly to User
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

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

// Helpful indexes
storeSchema.index({ seller: 1 })
storeSchema.index({ status: 1 })

const Store =
  mongoose.models.Store ||
  mongoose.model('Store', storeSchema)

export default Store