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

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Store =
  mongoose.models.Store ||
  mongoose.model('Store', storeSchema)

export default Store