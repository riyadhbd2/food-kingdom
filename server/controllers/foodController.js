import fs from "fs";
import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
  try {
    // ✅ Check if the file exists before accessing it
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    const { name, price, category, description } = req.body;

    // ✅ Check if all fields are provided
    if (!name || !price || !category || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Get the image filename
    const image_filename = req.file.filename;

    const food = new foodModel({
      name,
      price,
      category,
      description,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//all list food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const id = req.body.id;
    // find the specific food by id
    const food = await foodModel.findById(id);
    // delete file from folder
    fs.unlink(`uploads/${food.image}`, () => {});
    // delete the food of specific id
    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: true, message: false });
  }
};

export { addFood, listFood, removeFood };
