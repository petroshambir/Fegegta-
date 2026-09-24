
// import mongoose from 'mongoose'

// // ============================================================
// // PRODUCT IMAGE SCHEMA
// // ============================================================

// const productImageSchema = new mongoose.Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     publicId: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   {
//     _id: false,
//   }
// )

// // ============================================================
// // PRODUCT SCHEMA
// // ============================================================

// const productSchema = new mongoose.Schema(
//   {
//     // ========================================================
//     // PRODUCT OWNERSHIP TYPE
//     // ========================================================

//     ownerType: {
//       type: String,
//       enum: ['platform', 'seller'],
//       default: 'seller',
//       required: true,
//       index: true,
//     },

//     // ========================================================
//     // SELLER
//     // ========================================================
//     //
//     // Seller products:
//     //   seller = Seller ID
//     //
//     // Platform products:
//     //   seller = null
//     //
//     // ========================================================

//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Seller',
//       default: null,
//     },

//     // ========================================================
//     // STORE
//     // ========================================================
//     //
//     // Seller products:
//     //   store = Store ID
//     //
//     // Platform products:
//     //   store = null
//     //
//     // ========================================================

//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Store',
//       default: null,
//     },

//     // ========================================================
//     // BASIC PRODUCT INFORMATION
//     // ========================================================

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 200,
//     },

//     slug: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 5000,
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     subcategory: {
//       type: String,
//       trim: true,
//       default: '',
//     },

//     // ========================================================
//     // PRODUCT MATERIAL / QUALITY
//     // ========================================================

//     material: {
//       type: String,
//       trim: true,
//       default: '',
//       maxlength: 500,
//     },

//     // ========================================================
//     // PRICE
//     // ========================================================

//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     compareAtPrice: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     // ========================================================
//     // INVENTORY
//     // ========================================================

//     stock: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//     },

//     sku: {
//       type: String,
//       trim: true,
//       default: '',
//     },

//     // ========================================================
//     // IMAGES
//     // ========================================================

//     images: {
//       type: [productImageSchema],
//       default: [],
//     },

//     // ========================================================
//     // PRODUCT OPTIONS
//     // ========================================================

//     sizes: {
//       type: [String],
//       default: [],
//     },

//     colors: {
//       type: [String],
//       default: [],
//     },

//     // ========================================================
//     // PRODUCT FEATURES
//     // ========================================================

//     features: {
//       type: [String],
//       default: [],
//     },

//     // ========================================================
//     // PRODUCT TAGS
//     // ========================================================

//     tags: {
//       type: [String],
//       default: [],
//     },

//     // ========================================================
//     // RATINGS & REVIEWS
//     // ========================================================

//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//     },

//     totalReviews: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     // ========================================================
//     // PRODUCT VIEWS
//     // ========================================================

//     views: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     // ========================================================
//     // FEATURED PRODUCT
//     // ========================================================

//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },

//     // ========================================================
//     // PRODUCT ACTIVE STATUS
//     // ========================================================

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     // ========================================================
//     // ADMIN APPROVAL
//     // ========================================================

//     approvalStatus: {
//       type: String,
//       enum: [
//         'pending',
//         'approved',
//         'rejected',
//       ],
//       default: 'pending',
//     },

//     // ========================================================
//     // ADMIN REJECTION REASON
//     // ========================================================

//     rejectionReason: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },

//   // ==========================================================
//   // TIMESTAMPS
//   // ==========================================================

//   {
//     timestamps: true,
//   }
// )

// // ============================================================
// // INDEXES
// // ============================================================

// productSchema.index({
//   name: 'text',
//   description: 'text',
//   material: 'text',
//   features: 'text',
//   tags: 'text',
// })

// productSchema.index({
//   category: 1,
// })

// productSchema.index({
//   store: 1,
// })

// productSchema.index({
//   seller: 1,
// })

// productSchema.index({
//   ownerType: 1,
// })

// productSchema.index({
//   approvalStatus: 1,
// })

// productSchema.index({
//   isActive: 1,
// })

// productSchema.index({
//   createdAt: -1,
// })

// // ============================================================
// // MODEL
// // ============================================================

// const Product =
//   mongoose.models.Product ||
//   mongoose.model('Product', productSchema)

// export default Product


import mongoose from 'mongoose'

// ============================================================
// PRODUCT IMAGE SCHEMA
// ============================================================

const productImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    _id: false,
  }
)

// ============================================================
// PRODUCT SCHEMA
// ============================================================

const productSchema = new mongoose.Schema(
  {
    // ========================================================
    // PRODUCT OWNERSHIP TYPE
    // ========================================================

    ownerType: {
      type: String,
      enum: ['platform', 'seller'],
      default: 'seller',
      required: true,
      index: true,
    },

    // ========================================================
    // SELLER
    // ========================================================
    //
    // Seller products:
    //   seller = Seller ID
    //
    // Platform products:
    //   seller = null
    //
    // ========================================================

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      default: null,
    },

    // ========================================================
    // STORE
    // ========================================================
    //
    // Seller products:
    //   store = Store ID
    //
    // Platform products:
    //   store = null
    //
    // ========================================================

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      default: null,
    },

    // ========================================================
    // BASIC PRODUCT INFORMATION
    // ========================================================

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: String,
      trim: true,
      default: '',
    },

    // ========================================================
    // PRODUCT MATERIAL / QUALITY
    // ========================================================

    material: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
    },

    // ========================================================
    // PRICE
    // ========================================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ========================================================
    // INVENTORY
    // ========================================================

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      trim: true,
      default: '',
    },

    // ========================================================
    // PRODUCT WEIGHT
    // ========================================================
    //
    // Weight is stored in kilograms (kg).
    //
    // This value is used by the shipping system
    // to calculate DHL / FedEx shipping rates.
    //
    // Example:
    //   0.50 = 500 grams
    //   1.00 = 1 kilogram
    //   2.50 = 2.5 kilograms
    //
    // ========================================================

    weight: {
      type: Number,
      required: true,
      min: 0.01,
    },

    // ========================================================
    // IMAGES
    // ========================================================

    images: {
      type: [productImageSchema],
      default: [],
    },

    // ========================================================
    // PRODUCT OPTIONS
    // ========================================================

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: [],
    },

    // ========================================================
    // PRODUCT FEATURES
    // ========================================================

    features: {
      type: [String],
      default: [],
    },

    // ========================================================
    // PRODUCT TAGS
    // ========================================================

    tags: {
      type: [String],
      default: [],
    },

    // ========================================================
    // RATINGS & REVIEWS
    // ========================================================

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ========================================================
    // PRODUCT VIEWS
    // ========================================================

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ========================================================
    // FEATURED PRODUCT
    // ========================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ========================================================
    // PRODUCT ACTIVE STATUS
    // ========================================================

    isActive: {
      type: Boolean,
      default: true,
    },

    // ========================================================
    // ADMIN APPROVAL
    // ========================================================

    approvalStatus: {
      type: String,
      enum: [
        'pending',
        'approved',
        'rejected',
      ],
      default: 'pending',
    },

    // ========================================================
    // ADMIN REJECTION REASON
    // ========================================================

    rejectionReason: {
      type: String,
      default: '',
      trim: true,
    },
  },

  // ==========================================================
  // TIMESTAMPS
  // ==========================================================

  {
    timestamps: true,
  }
)

// ============================================================
// INDEXES
// ============================================================

productSchema.index({
  name: 'text',
  description: 'text',
  material: 'text',
  features: 'text',
  tags: 'text',
})

productSchema.index({
  category: 1,
})

productSchema.index({
  store: 1,
})

productSchema.index({
  seller: 1,
})

productSchema.index({
  ownerType: 1,
})

productSchema.index({
  approvalStatus: 1,
})

productSchema.index({
  isActive: 1,
})

productSchema.index({
  createdAt: -1,
})

// ============================================================
// MODEL
// ============================================================

const Product =
  mongoose.models.Product ||
  mongoose.model('Product', productSchema)

export default Product