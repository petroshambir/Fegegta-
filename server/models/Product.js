// import mongoose from 'mongoose';

// const productImageSchema = new mongoose.Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//     },

//     publicId: {
//       type: String,
//       default: '',
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const productSchema = new mongoose.Schema(
//   {
//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Seller',
//       required: true,
//     },

//     store: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Store',
//       required: true,
//     },

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

//     images: {
//       type: [productImageSchema],
//       default: [],
//     },

//     sizes: {
//       type: [String],
//       default: [],
//     },

//     colors: {
//       type: [String],
//       default: [],
//     },

//     tags: {
//       type: [String],
//       default: [],
//     },

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

//     views: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// productSchema.index({ name: 'text', description: 'text', tags: 'text' });
// productSchema.index({ category: 1 });
// productSchema.index({ store: 1 });
// productSchema.index({ seller: 1 });

// const Product = mongoose.model('Product', productSchema);

// export default Product;

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
    // SELLER
    // ========================================================

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

    // ========================================================
    // STORE
    // ========================================================

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
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