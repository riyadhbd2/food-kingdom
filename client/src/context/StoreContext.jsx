import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children})=>{

    const [cartItems, setCartItems] = useState({});


    // add to cart function
    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+ 1}))
        }
    }

    // remove from cart function
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId] - 1}))
    } 

    useEffect(()=>{
        console.log(cartItems);
    }, [cartItems])


    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;