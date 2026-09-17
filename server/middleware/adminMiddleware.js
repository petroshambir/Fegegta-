
// // ============================================================
// // ADMIN AUTHORIZATION MIDDLEWARE
// // ============================================================

// const adminMiddleware = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: 'Authentication required.',
//     })
//   }

//   if (req.user.role !== 'admin') {
//     return res.status(403).json({
//       success: false,
//       message: 'Admin access required.',
//     })
//   }

//   next()
// }

// export default adminMiddleware


// ============================================================
// ADMIN AUTHORIZATION MIDDLEWARE
// ============================================================

export const adminOnly = (req, res, next) => {
  try {
    // User must already be authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    // User must have admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required.',
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default adminOnly