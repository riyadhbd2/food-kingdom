import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    const { name, price, category, description } = req.body;

    if (!name || !price || !category || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Get Cloudinary image URL
    const image_url = req.file.path;

    const food = new foodModel({
      name,
      price,
      category,
      description,
      image: image_url,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving food items" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    // Find food by ID
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Extract public_id from Cloudinary URL
    const imageUrlParts = food.image.split('/');
    const publicId = imageUrlParts[imageUrlParts.length - 1].split('.')[0];

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(`images/${publicId}`);

    // Delete food item from database
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
