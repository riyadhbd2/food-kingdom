import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0); // Initialize cartCount with 0
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const url = "http://localhost:6006";

  // Add to cart function
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      setCartCount((prevCount) => prevCount + 1); // Increment cartCount
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      setCartCount((prevCount) => prevCount + 1); // Increment cartCount
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  // Remove one item from cart (decrement quantity)
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        // Decrease quantity by 1
        const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
        return newCart;
      } else {
        // If quantity is 1, remove the item from cart
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
    });

    // Decrease cartCount when an item is removed or its quantity decreases
    setCartCount((prevCount) => prevCount - 1);

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  // Get total function
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // Convert food_list into a Map for faster lookups
    const foodMap = new Map(foodList.map((product) => [String(product._id), product]));

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const itemInfo = foodMap.get(itemId); // Use string keys
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  // Fetch food list
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // Not delete if refresh
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    const fetchedCartData = response.data.cartData;
    setCartItems(fetchedCartData);

    // Update cartCount when cart data is loaded
    let count = 0;
    for (const itemId in fetchedCartData) {
      count += fetchedCartData[itemId];
    }
    setCartCount(count); // Set cartCount based on the loaded cart items
  };

  // Not to logout logic if refresh
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token")); // Not to delete cart if refresh
      }
    }
    loadData();
  }, []);

  

  const contextValue = {
    foodList,
    cartItems,
    cartCount, // Include cartCount in the context so it can be accessed by children
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
