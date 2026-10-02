import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import { cloudinary } from '../utils/cloudinary.js'

// ============================================================
// CLOUDINARY STORAGE
// ============================================================

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    // All Fegegta product images
    // will be stored inside this Cloudinary folder.
    folder: 'fegegta/products',

    // Convert uploaded images to JPG
    format: async (req, file) => {
      return 'jpg'
    },

    // Create a readable unique public ID
    public_id: (req, file) => {
      const originalName =
        file.originalname
          .split('.')[0]
          .toLowerCase()

      const cleanName =
        originalName
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

      return `${Date.now()}-${cleanName || 'product'}`
    },
  },
})

// ============================================================
// FILE FILTER
// ============================================================

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Only JPG, JPEG, PNG, and WEBP images are allowed.'
      ),
      false
    )
  }
}

// ============================================================
// MULTER UPLOAD
// ============================================================

const upload = multer({
  storage,

  fileFilter,

  limits: {
    // Maximum 4 images per product
    files: 4,

    // Maximum 5 MB for each image
    fileSize: 5 * 1024 * 1024,
  },
})

// ============================================================
// EXPORT
// ============================================================

export { upload }

export default upload