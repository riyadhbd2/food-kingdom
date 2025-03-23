import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Prevents negative prices
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Salad', 'Rolls', 'Desserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'], // Optional: Restrict values
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\/.+/, // Ensures a valid URL format
    },
}, { timestamps: true }); // ✅ Automatically adds createdAt & updatedAt

const foodModel = mongoose.model('Food', foodSchema);

export default foodModel;
