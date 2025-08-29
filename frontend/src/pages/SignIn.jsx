import { React, useState } from "react";
import backgroundBanner from "../assets/background_banner.jpg"; // Correct import
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("Username:", username, "\n Password:", password);

  return (
    <div
      className="bg-black min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundBanner})`, // Use the imported image
      }}
    >
      <div className="max-w-[450px] w-full bg-black bg-opacity-75 rounded px-8 py-14 mx-auto mt-8">
        <h1 className="text-3xl font-medium text-white mb-7">Sign In</h1>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-full h-[50px] bg-[#333] text-white px-5 rounded text-base"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full h-[50px] bg-[#333] text-white px-5 rounded text-base"
          />
          <button className="w-full h-[50px] bg-red-500 text-white rounded hover:opacity-90 text-base cursor-pointer">
            Sign In
          </button>
        </form>
        <div className="mt-10 text-gray-500 text-sm">
          <p>
            New to Movie app?
            <span
              onClick={() => navigate("/signup")}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign Up Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
