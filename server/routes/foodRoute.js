import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const foodRouter = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

// Set up Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food-images', // Cloudinary folder name
    format: async (req, file) => 'jpg',
    public_id: (req, file) => Date.now() + '-' + file.originalname.replace(/\s+/g, "_"),
  },
});

const upload = multer({ storage });

// ✅ Upload to Cloudinary before calling `addFood`
foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
