

// // import jwt from 'jsonwebtoken'

// // import User from '../models/User.js'

// // // ============================================================
// // // AUTHENTICATION MIDDLEWARE
// // // ============================================================

// // export const protect = async (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization

// //     if (!authHeader) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Authentication required.',
// //       })
// //     }

// //     if (!authHeader.startsWith('Bearer ')) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid authorization format.',
// //       })
// //     }

// //     const token = authHeader.split(' ')[1]

// //     if (!token) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Authentication token is missing.',
// //       })
// //     }

// //     const decoded = jwt.verify(
// //       token,
// //       process.env.JWT_SECRET
// //     )

// //     const user = await User.findById(decoded.id)
// //       .select('-password')

// //     if (!user) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'User account no longer exists.',
// //       })
// //     }

// //     if (
// //       user.status &&
// //       ['blocked', 'suspended', 'inactive'].includes(
// //         user.status
// //       )
// //     ) {
// //       return res.status(403).json({
// //         success: false,
// //         message: 'Your account is not active.',
// //       })
// //     }

// //     req.user = user

// //     next()
// //   } catch (error) {
// //     if (error.name === 'TokenExpiredError') {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Authentication token has expired.',
// //       })
// //     }

// //     if (error.name === 'JsonWebTokenError') {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid authentication token.',
// //       })
// //     }

// //     next(error)
// //   }
// // }

// // // ============================================================
// // // DEFAULT EXPORT
// // // ============================================================

// // export default protect

// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

// // ============================================================
// // AUTHENTICATION MIDDLEWARE
// // ============================================================

// export const protect = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     // ----------------------------------------------------------
//     // JWT SECRET
//     // ----------------------------------------------------------

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         success: false,
//         message:
//           'JWT_SECRET is not configured on the server.',
//       })
//     }

//     // ----------------------------------------------------------
//     // AUTHORIZATION HEADER
//     // ----------------------------------------------------------

//     const authHeader =
//       req.headers.authorization

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Authentication required.',
//       })
//     }

//     // ----------------------------------------------------------
//     // BEARER TOKEN
//     // ----------------------------------------------------------

//     if (
//       !authHeader.startsWith('Bearer ')
//     ) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Invalid authorization format.',
//       })
//     }

//     const token =
//       authHeader.substring(7).trim()

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Authentication token is missing.',
//       })
//     }

//     // ----------------------------------------------------------
//     // VERIFY TOKEN
//     // ----------------------------------------------------------

//     const decoded =
//       jwt.verify(
//         token,
//         process.env.JWT_SECRET
//       )

//     if (!decoded?.id) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Invalid authentication token.',
//       })
//     }

//     // ----------------------------------------------------------
//     // FIND USER
//     // ----------------------------------------------------------

//     const user =
//       await User.findById(
//         decoded.id
//       )

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'User account no longer exists.',
//       })
//     }

//     // ----------------------------------------------------------
//     // ACCOUNT STATUS
//     // ----------------------------------------------------------

//     if (
//       [
//         'blocked',
//         'suspended',
//         'inactive',
//       ].includes(user.status)
//     ) {
//       return res.status(403).json({
//         success: false,
//         message:
//           'Your account is not active.',
//       })
//     }

//     // ----------------------------------------------------------
//     // ATTACH USER
//     // ----------------------------------------------------------

//     req.user = user

//     next()
//   } catch (error) {
//     // ----------------------------------------------------------
//     // EXPIRED TOKEN
//     // ----------------------------------------------------------

//     if (
//       error.name ===
//       'TokenExpiredError'
//     ) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Authentication token has expired.',
//       })
//     }

//     // ----------------------------------------------------------
//     // INVALID TOKEN
//     // ----------------------------------------------------------

//     if (
//       error.name ===
//       'JsonWebTokenError'
//     ) {
//       return res.status(401).json({
//         success: false,
//         message:
//           'Invalid authentication token.',
//       })
//     }

//     next(error)
//   }
// }

// export default protect


import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// ============================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // ==========================================================
    // CHECK AUTHORIZATION HEADER
    // ==========================================================

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    // ==========================================================
    // CHECK BEARER FORMAT
    // ==========================================================

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format.',
      })
    }

    // ==========================================================
    // GET TOKEN
    // ==========================================================

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      })
    }

    // ==========================================================
    // CHECK JWT SECRET
    // ==========================================================

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT configuration is missing.',
      })
    }

    // ==========================================================
    // VERIFY TOKEN
    // ==========================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // ==========================================================
    // FIND USER
    // ==========================================================

    const user = await User.findById(decoded.id)
      .select('-password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account no longer exists.',
      })
    }

    // ==========================================================
    // CHECK ACCOUNT STATUS
    // ==========================================================

    if (
      ['blocked', 'suspended', 'inactive'].includes(
        user.status
      )
    ) {
      return res.status(403).json({
        success: false,
        message: 'Your account is not active.',
      })
    }

    // ==========================================================
    // ATTACH USER TO REQUEST
    // ==========================================================

    req.user = user

    next()
  } catch (error) {
    // ==========================================================
    // TOKEN EXPIRED
    // ==========================================================

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired.',
      })
    }

    // ==========================================================
    // INVALID TOKEN
    // ==========================================================

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