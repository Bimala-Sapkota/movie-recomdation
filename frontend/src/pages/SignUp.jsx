import React, { useState } from "react";
import backgroundBanner from "../assets/background_banner.jpg"; // Ensure the correct path
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore();

  {
    /* console.log(
    "Username:",
    username,
    "\n Email:",
    email,
    "\n Password:",
    password
  );  */
  }
  console.log("Auth Store:", useAuthStore.getState());

  const handledSignUp = async (e) => {
    e.preventDefault();
    console.log(username, error, password);

    try {
      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="bg-black min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundBanner})`,
      }}
    >
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8">
        <h1 className="text-3xl font-medium text-white mb-7">Sign Up</h1>

        <form onSubmit={handledSignUp} className="flex flex-col space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
            className="w-full h-[50px] bg-[#333] text-white px-5 rounded text-base"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            className="w-full h-[50px] bg-[#333] text-white px-5 rounded text-base"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full h-[50px] bg-[#333] text-white px-5 rounded text-base"
          />

          {error && <p className="text-red-500"> {error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 mt-10 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/signin")}
            className="text-white font-medium cursor-pointer ml-2 hover:underline"
          >
            Sign In Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
