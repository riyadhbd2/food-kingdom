import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("")
  const url = "http://localhost:6006";
  

  // add to cart function
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  // remove from cart function
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId]; // Remove the entire item from the cart
      return newCart;
    });
  };

  //   get total function
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // Convert food_list into a Map for faster lookups
    const foodMap = new Map(
      food_list.map((product) => [String(product._id), product])
    );

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

  //   get total item number

  const getTotalItemCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };
  //   cart data to persist across refreshes
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemCount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
