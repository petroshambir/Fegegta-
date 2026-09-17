
// import jwt from 'jsonwebtoken'

// import User from '../models/User.js'

// // ============================================================
// // AUTHENTICATION MIDDLEWARE
// // ============================================================

//  const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required.',
//       })
//     }

//     if (!authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid authorization format.',
//       })
//     }

//     const token = authHeader.split(' ')[1]

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication token is missing.',
//       })
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     )

//     const user = await User.findById(decoded.id)
//       .select('-password')

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'User account no longer exists.',
//       })
//     }

//     if (
//       user.status &&
//       ['blocked', 'suspended', 'inactive'].includes(
//         user.status
//       )
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: 'Your account is not active.',
//       })
//     }

//     req.user = user

//     next()
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication token has expired.',
//       })
//     }

//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid authentication token.',
//       })
//     }

//     next(error)
//   }
// }

// export default authMiddleware

import jwt from 'jsonwebtoken'

import User from '../models/User.js'

// ============================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format.',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const user = await User.findById(decoded.id)
      .select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account no longer exists.',
      })
    }

    if (
      user.status &&
      ['blocked', 'suspended', 'inactive'].includes(
        user.status
      )
    ) {
      return res.status(403).json({
        success: false,
        message: 'Your account is not active.',
      })
    }

    req.user = user

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired.',
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.',
      })
    }

    next(error)
  }
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default protect