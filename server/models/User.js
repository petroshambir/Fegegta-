import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },

    status: {
      type: String,
      enum: [
        'active',
        'blocked',
        'suspended',
        'inactive',
      ],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

const User =
  mongoose.models.User ||
  mongoose.model('User', userSchema)

export default User