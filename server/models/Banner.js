import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      trim: true,
    },

    subtitle: {
      type: String,
      default: '',
      trim: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    buttonText: {
      type: String,
      default: '',
      trim: true,
    },

    buttonLink: {
      type: String,
      default: '',
      trim: true,
    },

    image: {
      type: String,
      default: '',
      trim: true,
    },

    type: {
      type: String,
      enum: [
        'image-text',
        'image-only',
        'text-only',
      ],
      default: 'image-text',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

bannerSchema.index({
  isActive: 1,
  order: 1,
})

const Banner = mongoose.model(
  'Banner',
  bannerSchema
)

export default Banner