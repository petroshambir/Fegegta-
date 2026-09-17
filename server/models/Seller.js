import mongoose from 'mongoose'

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      default: null,
    },

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

    commissionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

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

const Seller =
  mongoose.models.Seller ||
  mongoose.model('Seller', sellerSchema)

export default Seller