import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},  
    },
  },
  { minimize: false } // Ensures empty objects are not removed
);

// Fix: Check if the model already exists before defining it
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
