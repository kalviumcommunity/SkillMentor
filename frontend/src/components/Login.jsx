import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleHide = () => {
    setHide(!hide);
  };

  const handleForm = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios
        .post(
          "http://localhost:8080/user/login",
          { email, password },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response, "888");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200">
        <img
          src="https://d1muf25xaso8hp.cloudfront.net/https://e33c4c5b632a810b01b2cd6cfedf523b.cdn.bubble.io/f1658771954894x663868872868510500/signup-banner.png?w=768&h=1282&auto=compress&dpr=2&fit=crop&q=75"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to your account
          </h1>

          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          {/* Google login */}
          <button
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-md mb-6 hover:bg-gray-100 transition"
            onClick={() => alert("Google login not implemented")}
          >
            <img
              src="https://cdn-teams-slug.flaticon.com/google.jpg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Login with Google
            </span>
          </button>

          {/* Email Input */}
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={hide ? "password" : "text"}
              value={data.password}
              onChange={handleForm}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleHide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {hide ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition mb-4"
          >
            Login
          </button>

          {/* Sign up */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <span
                onClick={props.x}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
