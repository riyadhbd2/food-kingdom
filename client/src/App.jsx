import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import { ToastContainer} from 'react-toastify';
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";


const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer />
    {
      showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>
    }
      <div className="container mx-auto">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
};

export default App;
