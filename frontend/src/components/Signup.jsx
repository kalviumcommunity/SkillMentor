import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

function Signup(props) {
  const [hide, setHide] = useState(true);
  const [hided, setHided] = useState(true);
  const [err, setErr] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleHide = () => setHide(!hide);
  const handleHided = () => setHided(!hided);

  const handleForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmpass } = data;
    if (!name || !email || !password || !confirmpass) {
      setErr("Please fill all fields");
      return;
    }
    if (password !== confirmpass) {
      setErr("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });
      console.log("Successfully registered:", response.data);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200">
        <img
          src="https://d1muf25xaso8hp.cloudfront.net/https://e33c4c5b632a810b01b2cd6cfedf523b.cdn.bubble.io/f1658771954894x663868872868510500/signup-banner.png?w=768&h=1282&auto=compress&dpr=2&fit=crop&q=75"
          alt="Signup Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account
          </h1>

          {err && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
              {err}
            </div>
          )}

          {/* Google Sign up */}
          <button
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-md mb-6 hover:bg-gray-100 transition"
            onClick={() => alert("Google signup not implemented")}
          >
            <img
              src="https://cdn-teams-slug.flaticon.com/google.jpg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Sign up with Google
            </span>
          </button>

          {/* Name */}
          <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <label htmlFor="confirmpass" className="block text-gray-600 font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmpass"
              name="confirmpass"
              type={hided ? "password" : "text"}
              value={data.confirmpass}
              onChange={handleForm}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleHided}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {hided ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition"
          >
            Signup
          </button>

          {/* Already have account */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <span
                onClick={props.x}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
