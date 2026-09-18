
// import mongoose from 'mongoose'

// const userSchema = new mongoose.Schema(
//   {
//     // ============================================================
//     // PERSONAL INFORMATION
//     // ============================================================

//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     name: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       trim: true,
//     },

//     // ============================================================
//     // PASSWORD
//     // ============================================================

//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },

//     // ============================================================
//     // PASSWORD RESET
//     // ============================================================

//     passwordResetToken: {
//       type: String,
//       default: undefined,
//     },

//     passwordResetExpires: {
//       type: Date,
//       default: undefined,
//     },

//     // ============================================================
//     // ROLE
//     // ============================================================

//     role: {
//       type: String,
//       enum: [
//         'customer',
//         'seller',
//         'admin',
//       ],
//       default: 'customer',
//     },

//     // ============================================================
//     // ACCOUNT STATUS
//     // ============================================================

//     status: {
//       type: String,
//       enum: [
//         'active',
//         'blocked',
//         'suspended',
//         'inactive',
//       ],
//       default: 'active',
//     },

//     // ============================================================
//     // ACCOUNT SETTINGS
//     // ============================================================

//     notificationsEnabled: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// )

// const User =
//   mongoose.models.User ||
//   mongoose.model(
//     'User',
//     userSchema
//   )

// export default User

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    // ============================================================
    // PERSONAL INFORMATION
    // ============================================================

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
      default: '',
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
      default: '',
    },

    // ============================================================
    // PASSWORD
    // ============================================================

    password: {
      type: String,
      required: true,
      select: false,
    },

    // ============================================================
    // PASSWORD RESET
    // ============================================================

    passwordResetToken: {
      type: String,
      default: undefined,
    },

    passwordResetExpires: {
      type: Date,
      default: undefined,
    },

    // ============================================================
    // ROLE
    // ============================================================

    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },

    // ============================================================
    // ACCOUNT STATUS
    // ============================================================

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

    // ============================================================
    // ACCOUNT SETTINGS
    // ============================================================

    notificationsEnabled: {
      type: Boolean,
      default: true,
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