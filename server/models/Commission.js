import mongoose from 'mongoose';

const commissionSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },

    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },

    orderAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    commissionRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    commissionAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    sellerAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },

    paidAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

commissionSchema.index({ seller: 1, createdAt: -1 });
commissionSchema.index({ order: 1 });
commissionSchema.index({ status: 1 });

const Commission = mongoose.model(
  'Commission',
  commissionSchema
);

export default Commission;