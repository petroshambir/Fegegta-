
// // ============================================================
// // GLOBAL ERROR HANDLER
// // ============================================================

// const errorMiddleware = (
//   error,
//   req,
//   res,
//   next
// ) => {
//   console.error('Backend Error:', error)

//   let statusCode =
//     error.statusCode ||
//     error.status ||
//     500

//   let message =
//     error.message ||
//     'Internal server error.'

//   // ----------------------------------------------------------
//   // MONGOOSE VALIDATION ERROR
//   // ----------------------------------------------------------

//   if (error.name === 'ValidationError') {
//     statusCode = 400

//     const messages = Object.values(
//       error.errors || {}
//     ).map((item) => item.message)

//     message =
//       messages.length > 0
//         ? messages.join(', ')
//         : 'Validation failed.'
//   }

//   // ----------------------------------------------------------
//   // MONGOOSE CAST ERROR
//   // ----------------------------------------------------------

//   if (error.name === 'CastError') {
//     statusCode = 400
//     message = 'Invalid ID or data format.'
//   }

//   // ----------------------------------------------------------
//   // DUPLICATE KEY ERROR
//   // ----------------------------------------------------------

//   if (error.code === 11000) {
//     statusCode = 409

//     const fields = Object.keys(
//       error.keyPattern || {}
//     )

//     message =
//       fields.length > 0
//         ? `${fields.join(', ')} already exists.`
//         : 'Duplicate data already exists.'
//   }

//   // ----------------------------------------------------------
//   // JWT ERRORS
//   // ----------------------------------------------------------

//   if (error.name === 'JsonWebTokenError') {
//     statusCode = 401
//     message = 'Invalid authentication token.'
//   }

//   if (error.name === 'TokenExpiredError') {
//     statusCode = 401
//     message = 'Authentication token has expired.'
//   }

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     ...(process.env.NODE_ENV === 'development' && {
//       error: error.stack,
//     }),
//   })
// }

// export default errorMiddleware


 // ============================================================
// 404 NOT FOUND HANDLER
// ============================================================

export const notFound = (
  req,
  res,
  next
) => {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  )

  error.statusCode = 404

  next(error)
}

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error('Backend Error:', error)

  let statusCode =
    error.statusCode ||
    error.status ||
    500

  let message =
    error.message ||
    'Internal server error.'

  // ----------------------------------------------------------
  // MONGOOSE VALIDATION ERROR
  // ----------------------------------------------------------

  if (error.name === 'ValidationError') {
    statusCode = 400

    const messages = Object.values(
      error.errors || {}
    ).map(
      (item) => item.message
    )

    message =
      messages.length > 0
        ? messages.join(', ')
        : 'Validation failed.'
  }

  // ----------------------------------------------------------
  // MONGOOSE CAST ERROR
  // ----------------------------------------------------------

  if (error.name === 'CastError') {
    statusCode = 400

    message =
      'Invalid ID or data format.'
  }

  // ----------------------------------------------------------
  // DUPLICATE KEY ERROR
  // ----------------------------------------------------------

  if (error.code === 11000) {
    statusCode = 409

    const fields = Object.keys(
      error.keyPattern || {}
    )

    message =
      fields.length > 0
        ? `${fields.join(', ')} already exists.`
        : 'Duplicate data already exists.'
  }

  // ----------------------------------------------------------
  // JWT ERRORS
  // ----------------------------------------------------------

  if (
    error.name ===
    'JsonWebTokenError'
  ) {
    statusCode = 401

    message =
      'Invalid authentication token.'
  }

  if (
    error.name ===
    'TokenExpiredError'
  ) {
    statusCode = 401

    message =
      'Authentication token has expired.'
  }

  // ----------------------------------------------------------
  // RESPONSE
  // ----------------------------------------------------------

  return res
    .status(statusCode)
    .json({
      success: false,
      message,

      ...(process.env.NODE_ENV ===
        'development' && {
        error: error.stack,
      }),
    })
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default errorHandler