import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

// A user cannot favorite the same product twice
favoriteSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
)

const Favorite =
  mongoose.models.Favorite ||
  mongoose.model('Favorite', favoriteSchema)

export default Favorite