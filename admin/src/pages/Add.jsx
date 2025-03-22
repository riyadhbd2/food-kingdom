import axios from "axios";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  // Cleanup URL object to avoid memory leaks
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  // Form data onChange handler
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    }
  };

// API call
const onSubmitHandler = async (e) => {
  // Prevent default form submission behavior
  e.preventDefault();

  // Create a new FormData object to send data as multipart/form-data
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", Number(data.price)); // Convert price to a number
  formData.append("category", data.category);
  formData.append("image", image); // Correct the typo here: "iamge" -> "image"

  try {
    // Sending the data to the server via axios
    const response = await axios.post(`${url}/api/food/add`, formData);

    // Check if the response is successful
    if (response.data.success) {
      // Reset form data on success
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(null); // Reset image
      toast.success(response.data.message)
    } else {
      // Log failure if response is unsuccessful
      console.log("Error: Product not added");
      toast.error(response.data.message)
    }
  } catch (error) {
    // Handle any error that might occur during the API request
    console.log("Error:", error);
  }
};


  return (
    <div className="max-w-3xl ml-10 p-6 bg-white rounded-md">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
        {/* Upload Image Section */}
        <div className="flex flex-col items-center">
          <p className="font-medium text-gray-700">Upload Image</p>
          <label
            htmlFor="image"
            className="w-full flex flex-col items-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            {/* Image Preview */}
            <img
              src={image ? image.preview : assets.upload_area}
              alt="Upload Preview"
              className="w-20 h-20 opacity-80 mb-2"
            />
            <span className="text-gray-500 text-sm">
              {image ? "Click to change" : "Click to upload"}
            </span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <p className="font-medium text-gray-700">Product Name</p>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Type Here"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="font-medium text-gray-700">Product Description</p>
          <textarea
            name="description"
            rows="4"
            placeholder="Write content here"
            onChange={onChangeHandler}
            value={data.description}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            required
          ></textarea>
        </div>

        {/* Product Category & Price - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Category */}
          <div>
            <p className="font-medium text-gray-700">Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price */}
          <div>
            <p className="font-medium text-gray-700">Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="$20"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-400 text-white font-semibold py-2 rounded-md hover:bg-orange-500 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
