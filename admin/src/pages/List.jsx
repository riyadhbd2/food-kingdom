import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // get all data function
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    }
  };

  // remove data from list
  const removeFromList = async (id) => {
    console.log(id);

    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        All Food List
      </h2>
      <div className="overflow-x-auto mt-10">
        {/* Column headers */}
        <div className="flex justify-between text-center mb-4 font-medium text-gray-600">
          <div className="w-1/4">Image</div>
          <div className="w-1/4">Name</div>
          <div className="w-1/4">Category</div>
          <div className="w-1/4">Price</div>
          <div className="w-1/4">Action</div>
        </div>

        {/* Mapping through the list of items */}
        {list.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b border-gray-200"
          >
            {/* Image */}
            <div className="w-1/4">
              <img
                src={`${url}/images/` + item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mx-auto"
              />
            </div>

            {/* Name */}
            <div className="w-1/4 text-center">{item.name}</div>

            {/* Category */}
            <div className="w-1/4 text-center">{item.category}</div>

            {/* Price */}
            <div className="w-1/4 text-center">${item.price}</div>

            {/* Action */}
            <div className="w-1/4 text-center">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFromList(item._id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
