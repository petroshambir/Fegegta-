
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ንነብሮም ቦታታት ዝጠቅም (multer-storage-cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'projects',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => Date.now().toString(),
  },
});

export const upload = multer({ storage: storage });

// ን Sharp ዝጠቅም ኸኣ ቐሊል memory storage 
export const uploadMemory = multer({ storage: multer.memoryStorage() });

export { cloudinary };