import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    try {
        // ✅ Check if the file exists before accessing it
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const { name, price, category, description } = req.body;

        // ✅ Check if all fields are provided
        if (!name || !price || !category || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Get the image filename
        const image_filename = req.file.filename;

        const food = new foodModel({
            name,
            price,
            category,
            description,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { addFood };
