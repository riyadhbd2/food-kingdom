import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");

  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Runs only once when the component mounts

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#00000090]">
      <form className="w-[max(23vw,330px)] bg-white flex flex-col gap-6 px-6 py-7 rounded-md text-md text-[#808080]">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <button type="button" onClick={() => setShowLogin(false)}>
            <img className="cursor-pointer" src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          {currentState === "Login" ? (
            <>
              <input className="border p-2 rounded" type="email" placeholder="Your Email" required />
              <input className="border p-2 rounded" type="password" placeholder="Your Password" required />
            </>
          ) : (
            <>
              <input className="border p-2 rounded" type="text" placeholder="Your Name" required />
              <input className="border p-2 rounded" type="email" placeholder="Your Email" required />
              <input className="border p-2 rounded" type="password" placeholder="Your Password" required />
            </>
          )}
        </div>

        {/* Submit Button */}
        <button className="bg-orange-500 text-white py-2 rounded">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms Agreement */}
        <div className="flex items-center gap-2">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions.</p>
        </div>

        {/* Switch between Login & Signup */}
        <p className="text-sm">
          {currentState === "Login" ? (
            <>
              Create a new account?{" "}
              <span className="cursor-pointer text-orange-400" onClick={() => setCurrentState("Sign Up")}>
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="cursor-pointer text-orange-400" onClick={() => setCurrentState("Login")}>
                Login...
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
