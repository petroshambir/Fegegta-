import mongoose from 'mongoose'

const adminSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      default: 'default',
      immutable: true,
    },

    platformName: {
      type: String,
      trim: true,
      default: 'Fegegta',
    },

    currency: {
      type: String,
      enum: ['EUR', 'USD'],
      default: 'EUR',
    },

    commissionRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 10,
    },

    allowSellerRegistration: {
      type: Boolean,
      default: true,
    },

    requireProductApproval: {
      type: Boolean,
      default: true,
    },

    requireSellerVerification: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const AdminSettings =
  mongoose.models.AdminSettings ||
  mongoose.model(
    'AdminSettings',
    adminSettingsSchema
  )

export default AdminSettings