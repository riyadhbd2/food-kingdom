import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from 'axios';
import { toast } from "react-toastify";


const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for password confirmation
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(""); // Added error state

  // onChange handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Login/Signup Function
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(`${currentState === "Login" ? "Login Successfully" : "Register Successfully"}`)
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#00000090]">
      <form
        onSubmit={onLogin}
        className="w-[max(23vw,330px)] bg-white flex flex-col gap-6 px-6 py-7 rounded-md text-md text-[#808080]"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <button type="button" onClick={() => setShowLogin(false)}>
            <img
              className="cursor-pointer"
              src={assets.cross_icon}
              alt="Close"
            />
          </button>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-3">
          {currentState === "Login" ? (
            <>
              <label htmlFor="email">Email</label>
              <input
                onChange={onChangeHandler}
                name="email"
                value={data.email}
                className="border p-2 rounded"
                type="email"
                placeholder="Your Email"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={onChangeHandler}
                name="password"
                value={data.password}
                className="border p-2 rounded"
                type="password"
                placeholder="Your Password"
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="name">Name</label>
              <input
                onChange={onChangeHandler}
                name="name"
                value={data.name}
                className="border p-2 rounded"
                type="text"
                placeholder="Your Name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={onChangeHandler}
                name="email"
                value={data.email}
                className="border p-2 rounded"
                type="email"
                placeholder="Your Email"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={onChangeHandler}
                name="password"
                value={data.password}
                className="border p-2 rounded"
                type="password"
                placeholder="Your Password"
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={onChangeHandler}
                name="confirmPassword"
                value={data.confirmPassword}
                className="border p-2 rounded"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms Agreement */}
        {currentState === "Sign Up" && (
          <div className="flex items-center gap-2">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms and conditions.</p>
          </div>
        )}

        {/* Switch between Login & Signup */}
        <p className="text-sm">
          {currentState === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                className="cursor-pointer text-orange-400"
                onClick={() => setCurrentState("Sign Up")}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-orange-400"
                onClick={() => setCurrentState("Login")}
              >
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