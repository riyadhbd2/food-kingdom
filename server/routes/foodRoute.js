import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const foodRouter = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const fileFormat = file.mimetype.split('/')[1]; // Extract file extension from mimetype

    if (!allowedFormats.includes(fileFormat)) {
      throw new Error('Unsupported file format');
    }

    return {
      folder: 'images', // Cloudinary folder name
      format: fileFormat, // Maintain original format
      public_id: Date.now() + '-' + file.originalname.replace(/\s+/g, "_"),
    };
  },
});

// Multer upload middleware with file type validation
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  }
});

// Route to add food with image upload
foodRouter.post('/add', upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  next();
}, addFood);

// Route to list food items
foodRouter.get('/list', listFood);

// Route to remove a food item
foodRouter.post('/remove', removeFood);

export default foodRouter;
