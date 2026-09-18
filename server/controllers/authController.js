// import crypto from 'crypto'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// import User from '../models/User.js'

// // ============================================================
// // CONFIG
// // ============================================================

// const FRONTEND_URL =
//   process.env.FRONTEND_URL ||
//   'https://fegegta.onrender.com'

// // ============================================================
// // GENERATE TOKEN
// // ============================================================

// export const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       role: user.role,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '7d',
//     }
//   )
// }

// // ============================================================
// // REGISTER
// // ============================================================

// export const registerUser = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       name,
//       email,
//       phone,
//       password,
//       role,
//     } = req.body

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Email and password are required.',
//       })
//     }

//     const normalizedEmail =
//       email.trim().toLowerCase()

//     // ----------------------------------------------------------
//     // VALIDATE EMAIL
//     // ----------------------------------------------------------

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailRegex.test(normalizedEmail)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Please enter a valid email address.',
//       })
//     }

//     // ----------------------------------------------------------
//     // CHECK EXISTING USER
//     // ----------------------------------------------------------

//     const existingUser =
//       await User.findOne({
//         email: normalizedEmail,
//       })

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'An account with this email already exists.',
//       })
//     }

//     // ----------------------------------------------------------
//     // HASH PASSWORD
//     // ----------------------------------------------------------

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         12
//       )

//     // ----------------------------------------------------------
//     // CREATE USER
//     // ----------------------------------------------------------

//     const user = await User.create({
//       firstName,
//       lastName,

//       name:
//         name ||
//         `${firstName || ''} ${
//           lastName || ''
//         }`.trim(),

//       email: normalizedEmail,
//       phone,
//       password: hashedPassword,

//       // Users cannot create an admin
//       // or seller account directly.
//       role:
//         role === 'seller'
//           ? 'customer'
//           : role || 'customer',
//     })

//     // ----------------------------------------------------------
//     // GENERATE TOKEN
//     // ----------------------------------------------------------

//     const token =
//       generateToken(user)

//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     return res.status(201).json({
//       success: true,
//       message:
//         'Registration successful.',

//       token,

//       user: {
//         id: user._id,
//         firstName:
//           user.firstName,
//         lastName:
//           user.lastName,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         status: user.status,
//         notificationsEnabled:
//           user.notificationsEnabled,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // LOGIN
// // ============================================================

// export const loginUser = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       email,
//       password,
//     } = req.body

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Email and password are required.',
//       })
//     }

//     const normalizedEmail =
//       email.trim().toLowerCase()

//     // ----------------------------------------------------------
//     // FIND USER
//     // ----------------------------------------------------------

//     const user =
//       await User.findOne({
//         email: normalizedEmail,
//       }).select('+password')

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Invalid email or password.',
//       })
//     }

//     // ----------------------------------------------------------
//     // CHECK PASSWORD
//     // ----------------------------------------------------------

//     const passwordMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       )

//     if (!passwordMatch) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Invalid email or password.',
//       })
//     }

//     // ----------------------------------------------------------
//     // GENERATE TOKEN
//     // ----------------------------------------------------------

//     const token =
//       generateToken(user)

//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message:
//         'Login successful.',

//       token,

//       user: {
//         id: user._id,
//         firstName:
//           user.firstName,
//         lastName:
//           user.lastName,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         status: user.status,
//         notificationsEnabled:
//           user.notificationsEnabled,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // CURRENT USER
// // ============================================================

// export const getCurrentUser = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const user =
//       await User.findById(
//         req.user.id
//       )

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'User not found.',
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE PROFILE
// // ============================================================

// export const updateProfile = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       phone,
//       email,
//     } = req.body

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (
//       !firstName ||
//       !lastName ||
//       !email
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'First name, last name, and email are required.',
//       })
//     }

//     const normalizedFirstName =
//       firstName.trim()

//     const normalizedLastName =
//       lastName.trim()

//     const normalizedEmail =
//       email.trim().toLowerCase()

//     const normalizedPhone =
//       phone?.trim() || ''

//     if (
//       !normalizedFirstName ||
//       !normalizedLastName ||
//       !normalizedEmail
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'First name, last name, and email cannot be empty.',
//       })
//     }

//     // ----------------------------------------------------------
//     // CHECK EMAIL FORMAT
//     // ----------------------------------------------------------

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (
//       !emailRegex.test(
//         normalizedEmail
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Please enter a valid email address.',
//       })
//     }

//     // ----------------------------------------------------------
//     // CHECK USER
//     // ----------------------------------------------------------

//     const user =
//       await User.findById(
//         req.user.id
//       )

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'User not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // CHECK WHETHER EMAIL BELONGS
//     // TO ANOTHER USER
//     // ----------------------------------------------------------

//     const existingUser =
//       await User.findOne({
//         email: normalizedEmail,
//         _id: {
//           $ne: user._id,
//         },
//       })

//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message:
//           'An account with this email already exists.',
//       })
//     }

//     // ----------------------------------------------------------
//     // UPDATE USER
//     // ----------------------------------------------------------

//     user.firstName =
//       normalizedFirstName

//     user.lastName =
//       normalizedLastName

//     user.name =
//       `${normalizedFirstName} ${normalizedLastName}`.trim()

//     user.email =
//       normalizedEmail

//     user.phone =
//       normalizedPhone

//     const updatedUser =
//       await user.save()

//     // ----------------------------------------------------------
//     // RETURN SAFE USER DATA
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message:
//         'Profile updated successfully.',

//       user: {
//         id: updatedUser._id,
//         firstName:
//           updatedUser.firstName,
//         lastName:
//           updatedUser.lastName,
//         name:
//           updatedUser.name,
//         email:
//           updatedUser.email,
//         phone:
//           updatedUser.phone,
//         role:
//           updatedUser.role,
//         status:
//           updatedUser.status,
//         notificationsEnabled:
//           updatedUser.notificationsEnabled,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // UPDATE SETTINGS
// // ============================================================

// export const updateSettings = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {
//       notificationsEnabled,
//     } = req.body

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (
//       typeof notificationsEnabled !==
//       'boolean'
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'notificationsEnabled must be a boolean value.',
//       })
//     }

//     // ----------------------------------------------------------
//     // FIND USER
//     // ----------------------------------------------------------

//     const user =
//       await User.findById(
//         req.user.id
//       )

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message:
//           'User not found.',
//       })
//     }

//     // ----------------------------------------------------------
//     // UPDATE SETTINGS
//     // ----------------------------------------------------------

//     user.notificationsEnabled =
//       notificationsEnabled

//     const updatedUser =
//       await user.save()

//     // ----------------------------------------------------------
//     // RETURN UPDATED USER
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message:
//         'Settings updated successfully.',

//       user: {
//         id: updatedUser._id,
//         firstName:
//           updatedUser.firstName,
//         lastName:
//           updatedUser.lastName,
//         name:
//           updatedUser.name,
//         email:
//           updatedUser.email,
//         phone:
//           updatedUser.phone,
//         role:
//           updatedUser.role,
//         status:
//           updatedUser.status,
//         notificationsEnabled:
//           updatedUser.notificationsEnabled,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // FORGOT PASSWORD
// // ============================================================

// export const forgotPassword = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { email } = req.body

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Email is required.',
//       })
//     }

//     const normalizedEmail =
//       email.trim().toLowerCase()

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailRegex.test(normalizedEmail)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Please enter a valid email address.',
//       })
//     }

//     // ----------------------------------------------------------
//     // FIND USER
//     // ----------------------------------------------------------

//     const user =
//       await User.findOne({
//         email: normalizedEmail,
//       })

//     /*
//       We intentionally return the same response whether
//       the email exists or not.

//       This prevents people from discovering which emails
//       have Fegegta accounts.
//     */

//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message:
//           'If an account with that email exists, a password reset link has been sent.',
//       })
//     }

//     // ----------------------------------------------------------
//     // GENERATE RESET TOKEN
//     // ----------------------------------------------------------

//     const resetToken =
//       crypto.randomBytes(32).toString('hex')

//     // ----------------------------------------------------------
//     // HASH TOKEN BEFORE SAVING
//     // ----------------------------------------------------------

//     const hashedResetToken =
//       crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex')

//     // ----------------------------------------------------------
//     // SAVE RESET TOKEN
//     // ----------------------------------------------------------

//     user.passwordResetToken =
//       hashedResetToken

//     user.passwordResetExpires =
//       Date.now() +
//       15 * 60 * 1000

//     await user.save({
//       validateBeforeSave: false,
//     })

//     // ----------------------------------------------------------
//     // CREATE RESET URL
//     // ----------------------------------------------------------

//     const resetUrl =
//       `${FRONTEND_URL}/reset-password/${resetToken}`

//     // ----------------------------------------------------------
//     // EMAIL
//     // ----------------------------------------------------------

//     /*
//       Email sending will be connected through the email
//       service configured in the project.

//       The generated resetUrl is ready for the email template.
//     */

//     console.log(
//       'Password reset URL:',
//       resetUrl
//     )

//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message:
//         'If an account with that email exists, a password reset link has been sent.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // ============================================================
// // RESET PASSWORD
// // ============================================================

// export const resetPassword = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const { token } = req.params
//     const { password } = req.body

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Password reset token is required.',
//       })
//     }

//     if (!password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'New password is required.',
//       })
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Password must be at least 6 characters long.',
//       })
//     }

//     // ----------------------------------------------------------
//     // HASH TOKEN
//     // ----------------------------------------------------------

//     const hashedToken =
//       crypto
//         .createHash('sha256')
//         .update(token)
//         .digest('hex')

//     // ----------------------------------------------------------
//     // FIND USER WITH VALID TOKEN
//     // ----------------------------------------------------------

//     const user =
//       await User.findOne({
//         passwordResetToken:
//           hashedToken,

//         passwordResetExpires: {
//           $gt: Date.now(),
//         },
//       }).select('+password')

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Password reset token is invalid or has expired.',
//       })
//     }

//     // ----------------------------------------------------------
//     // HASH NEW PASSWORD
//     // ----------------------------------------------------------

//     const hashedPassword =
//       await bcrypt.hash(
//         password,
//         12
//       )

//     // ----------------------------------------------------------
//     // UPDATE PASSWORD
//     // ----------------------------------------------------------

//     user.password =
//       hashedPassword

//     // ----------------------------------------------------------
//     // CLEAR RESET TOKEN
//     // ----------------------------------------------------------

//     user.passwordResetToken =
//       undefined

//     user.passwordResetExpires =
//       undefined

//     await user.save()

//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     return res.status(200).json({
//       success: true,
//       message:
//         'Password reset successfully. You can now log in with your new password.',
//     })
//   } catch (error) {
//     next(error)
//   }
// }

import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// ============================================================
// CONFIG
// ============================================================

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  'https://fegegta.onrender.com'

// ============================================================
// GENERATE TOKEN
// ============================================================

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

// ============================================================
// REGISTER
// ============================================================

export const registerUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      password,
      role,
    } = req.body

    // ----------------------------------------------------------
    // REQUIRED FIELDS
    // ----------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    // ----------------------------------------------------------
    // VALIDATE EMAIL
    // ----------------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      })
    }

    // ----------------------------------------------------------
    // CHECK PASSWORD
    // ----------------------------------------------------------

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long.',
      })
    }

    // ----------------------------------------------------------
    // CHECK EXISTING USER
    // ----------------------------------------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          'An account with this email already exists.',
      })
    }

    // ----------------------------------------------------------
    // HASH PASSWORD
    // ----------------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(password, 12)

    // ----------------------------------------------------------
    // CREATE USER
    // ----------------------------------------------------------

    const user = await User.create({
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),

      name:
        name?.trim() ||
        `${firstName || ''} ${lastName || ''}`.trim(),

      email: normalizedEmail,

      phone: phone?.trim() || '',

      password: hashedPassword,

      // Users cannot create seller/admin accounts
      // directly from public registration.
      role:
        role === 'seller'
          ? 'customer'
          : role === 'admin'
            ? 'customer'
            : role || 'customer',
    })

    // ----------------------------------------------------------
    // GENERATE TOKEN
    // ----------------------------------------------------------

    const token =
      generateToken(user)

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        notificationsEnabled:
          user.notificationsEnabled,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// LOGIN
// ============================================================

export const loginUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      email,
      password,
    } = req.body

    // ----------------------------------------------------------
    // REQUIRED FIELDS
    // ----------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Email and password are required.',
      })
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    // ----------------------------------------------------------
    // FIND USER
    // ----------------------------------------------------------

    const user =
      await User.findOne({
        email: normalizedEmail,
      }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password.',
      })
    }

    // ----------------------------------------------------------
    // CHECK ACCOUNT STATUS
    // ----------------------------------------------------------

    if (
      user.status === 'blocked' ||
      user.status === 'suspended' ||
      user.status === 'inactive'
    ) {
      return res.status(403).json({
        success: false,
        message:
          'Your account is not currently active.',
      })
    }

    // ----------------------------------------------------------
    // CHECK PASSWORD
    // ----------------------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          'Invalid email or password.',
      })
    }

    // ----------------------------------------------------------
    // GENERATE TOKEN
    // ----------------------------------------------------------

    const token =
      generateToken(user)

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        notificationsEnabled:
          user.notificationsEnabled,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// CURRENT USER
// ============================================================

export const getCurrentUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE PROFILE
// ============================================================

export const updateProfile = async (
  req,
  res,
  next
) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
    } = req.body

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message:
          'First name, last name, and email are required.',
      })
    }

    const normalizedFirstName =
      firstName.trim()

    const normalizedLastName =
      lastName.trim()

    const normalizedEmail =
      email.trim().toLowerCase()

    const normalizedPhone =
      phone?.trim() || ''

    if (
      !normalizedFirstName ||
      !normalizedLastName ||
      !normalizedEmail
    ) {
      return res.status(400).json({
        success: false,
        message:
          'First name, last name, and email cannot be empty.',
      })
    }

    // ----------------------------------------------------------
    // CHECK EMAIL FORMAT
    // ----------------------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailRegex.test(
        normalizedEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter a valid email address.',
      })
    }

    // ----------------------------------------------------------
    // CHECK USER
    // ----------------------------------------------------------

    const user =
      await User.findById(
        req.user.id
      )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    // ----------------------------------------------------------
    // CHECK EMAIL BELONGS TO ANOTHER USER
    // ----------------------------------------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
        _id: {
          $ne: user._id,
        },
      })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          'An account with this email already exists.',
      })
    }

    // ----------------------------------------------------------
    // UPDATE USER
    // ----------------------------------------------------------

    user.firstName =
      normalizedFirstName

    user.lastName =
      normalizedLastName

    user.name =
      `${normalizedFirstName} ${normalizedLastName}`.trim()

    user.email =
      normalizedEmail

    user.phone =
      normalizedPhone

    const updatedUser =
      await user.save()

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        'Profile updated successfully.',

      user: {
        id: updatedUser._id,
        firstName:
          updatedUser.firstName,
        lastName:
          updatedUser.lastName,
        name:
          updatedUser.name,
        email:
          updatedUser.email,
        phone:
          updatedUser.phone,
        role:
          updatedUser.role,
        status:
          updatedUser.status,
        notificationsEnabled:
          updatedUser.notificationsEnabled,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// UPDATE SETTINGS
// ============================================================

export const updateSettings = async (
  req,
  res,
  next
) => {
  try {
    const {
      notificationsEnabled,
    } = req.body

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (
      typeof notificationsEnabled !==
      'boolean'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'notificationsEnabled must be a boolean value.',
      })
    }

    // ----------------------------------------------------------
    // FIND USER
    // ----------------------------------------------------------

    const user =
      await User.findById(
        req.user.id
      )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      })
    }

    // ----------------------------------------------------------
    // UPDATE SETTINGS
    // ----------------------------------------------------------

    user.notificationsEnabled =
      notificationsEnabled

    const updatedUser =
      await user.save()

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        'Settings updated successfully.',

      user: {
        id: updatedUser._id,
        firstName:
          updatedUser.firstName,
        lastName:
          updatedUser.lastName,
        name:
          updatedUser.name,
        email:
          updatedUser.email,
        phone:
          updatedUser.phone,
        role:
          updatedUser.role,
        status:
          updatedUser.status,
        notificationsEnabled:
          updatedUser.notificationsEnabled,
      },
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// FORGOT PASSWORD
// ============================================================

export const forgotPassword = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      })
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailRegex.test(
        normalizedEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter a valid email address.',
      })
    }

    // ----------------------------------------------------------
    // FIND USER
    // ----------------------------------------------------------

    const user =
      await User.findOne({
        email: normalizedEmail,
      })

    /*
      We intentionally return the same response
      whether the email exists or not.

      This prevents people from discovering
      which emails have Fegegta accounts.
    */

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          'If an account with that email exists, a password reset link has been sent.',
      })
    }

    // ----------------------------------------------------------
    // GENERATE RESET TOKEN
    // ----------------------------------------------------------

    const resetToken =
      crypto
        .randomBytes(32)
        .toString('hex')

    // ----------------------------------------------------------
    // HASH TOKEN BEFORE SAVING
    // ----------------------------------------------------------

    const hashedResetToken =
      crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // ----------------------------------------------------------
    // SAVE RESET TOKEN
    // ----------------------------------------------------------

    user.passwordResetToken =
      hashedResetToken

    user.passwordResetExpires =
      Date.now() +
      15 * 60 * 1000

    await user.save({
      validateBeforeSave: false,
    })

    // ----------------------------------------------------------
    // CREATE RESET URL
    // ----------------------------------------------------------

    const resetUrl =
      `${FRONTEND_URL}/reset-password/${resetToken}`

    // ----------------------------------------------------------
    // TEMPORARY LOG
    // ----------------------------------------------------------

    console.log(
      'Password reset URL:',
      resetUrl
    )

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        'If an account with that email exists, a password reset link has been sent.',
    })
  } catch (error) {
    next(error)
  }
}

// ============================================================
// RESET PASSWORD
// ============================================================

export const resetPassword = async (
  req,
  res,
  next
) => {
  try {
    const { token } =
      req.params

    const { password } =
      req.body

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!token) {
      return res.status(400).json({
        success: false,
        message:
          'Password reset token is required.',
      })
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message:
          'New password is required.',
      })
    }

    // Same requirement as Register.jsx
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long.',
      })
    }

    // ----------------------------------------------------------
    // HASH TOKEN
    // ----------------------------------------------------------

    const hashedToken =
      crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

    // ----------------------------------------------------------
    // FIND USER WITH VALID TOKEN
    // ----------------------------------------------------------

    const user =
      await User.findOne({
        passwordResetToken:
          hashedToken,

        passwordResetExpires: {
          $gt: Date.now(),
        },
      }).select('+password')

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          'Password reset token is invalid or has expired.',
      })
    }

    // ----------------------------------------------------------
    // HASH NEW PASSWORD
    // ----------------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      )

    // ----------------------------------------------------------
    // UPDATE PASSWORD
    // ----------------------------------------------------------

    user.password =
      hashedPassword

    // ----------------------------------------------------------
    // CLEAR RESET TOKEN
    // ----------------------------------------------------------

    user.passwordResetToken =
      undefined

    user.passwordResetExpires =
      undefined

    await user.save()

    // ----------------------------------------------------------
    // RESPONSE
    // ----------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        'Password reset successfully. You can now log in with your new password.',
    })
  } catch (error) {
    next(error)
  }
}