


import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// ============================================================
// DATABASE
// ============================================================

import connectDB from './config/db.js'

// ============================================================
// ROUTES
// ============================================================

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import commissionRoutes from './routes/commissionRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import sellerApplicationRoutes from './routes/sellerApplicationRoutes.js'


// ============================================================
// ERROR MIDDLEWARE
// ============================================================

import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js'

// ============================================================
// LOAD ENVIRONMENT VARIABLES
// ============================================================

dotenv.config()

// ============================================================
// CONNECT DATABASE
// ============================================================

connectDB()

// ============================================================
// CREATE EXPRESS APP
// ============================================================

const app = express()

// ============================================================
// CORS
// ============================================================

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin
      // Example: Postman / server-to-server
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(
        new Error(
          `CORS blocked for origin: ${origin}`
        )
      )
    },

    credentials: true,
  })
)

// ============================================================
// BODY PARSER
// ============================================================

app.use(
  express.json({
    limit: '10mb',
  })
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
)

app.use(
  '/api/seller-applications',
  sellerApplicationRoutes
)

// ============================================================
// BASIC REQUEST LOG
// ============================================================

if (
  process.env.NODE_ENV ===
  'development'
) {
  app.use((req, res, next) => {
    console.log(
      `${req.method} ${req.originalUrl}`
    )

    next()
  })
}

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,

    message:
      'Fegegta ፈገግታ API is running',

    environment:
      process.env.NODE_ENV ||
      'development',

    timestamp:
      new Date().toISOString(),
  })
})

// ============================================================
// API HEALTH CHECK
// ============================================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,

    message:
      'Fegegta API is healthy',

    database:
      'Connected',

    timestamp:
      new Date().toISOString(),
  })
})

// ============================================================
// API ROUTES
// ============================================================

// ------------------------------------------------------------
// AUTHENTICATION
// ------------------------------------------------------------

app.use(
  '/api/auth',
  authRoutes
)

// ------------------------------------------------------------
// PRODUCTS
// ------------------------------------------------------------

app.use(
  '/api/products',
  productRoutes
)

// ------------------------------------------------------------
// STORES
// ------------------------------------------------------------

app.use(
  '/api/stores',
  storeRoutes
)

// ------------------------------------------------------------
// ORDERS
// ------------------------------------------------------------

app.use(
  '/api/orders',
  orderRoutes
)

// ------------------------------------------------------------
// ADMIN
// ------------------------------------------------------------

app.use(
  '/api/admin',
  adminRoutes
)

// ------------------------------------------------------------
// SELLER
// ------------------------------------------------------------

app.use(
  '/api/seller',
  sellerRoutes
)

// ------------------------------------------------------------
// COMMISSIONS
// ------------------------------------------------------------

app.use(
  '/api/commissions',
  commissionRoutes
)

// ------------------------------------------------------------
// ADDRESSES
// ------------------------------------------------------------

app.use(
  '/api/addresses',
  addressRoutes
)

// ------------------------------------------------------------
// FAVORITES
// ------------------------------------------------------------

app.use(
  '/api/favorites',
  favoriteRoutes
)

// ============================================================
// 404 ROUTE
// ============================================================

app.use(notFound)

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(errorHandler)

// ============================================================
// START SERVER
// ============================================================

const PORT =
  process.env.PORT || 5000

const server = app.listen(
  PORT,
  () => {
    console.log('')

    console.log(
      '============================================'
    )

    console.log(
      '   FEGEGTA ፈገግታ BACKEND SERVER'
    )

    console.log(
      '============================================'
    )

    console.log(
      `Server running on port: ${PORT}`
    )

    console.log(
      `Environment: ${
        process.env.NODE_ENV ||
        'development'
      }`
    )

    console.log(
      `API: http://localhost:${PORT}`
    )

    console.log(
      `Health: http://localhost:${PORT}/api/health`
    )

    console.log(
      `Addresses: http://localhost:${PORT}/api/addresses`
    )

    console.log(
      `Products: http://localhost:${PORT}/api/products`
    )

    console.log(
      `Favorites: http://localhost:${PORT}/api/favorites`
    )

    console.log(
      '============================================'
    )

    console.log('')
  }
)

// ============================================================
// HANDLE UNHANDLED PROMISE REJECTIONS
// ============================================================

process.on(
  'unhandledRejection',
  (error) => {
    console.error(
      'Unhandled Promise Rejection:',
      error
    )

    server.close(() => {
      process.exit(1)
    })
  }
)

// ============================================================
// HANDLE UNCAUGHT EXCEPTIONS
// ============================================================

process.on(
  'uncaughtException',
  (error) => {
    console.error(
      'Uncaught Exception:',
      error
    )

    process.exit(1)
  }
)