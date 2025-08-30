import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import { Link } from "react-router";
import React, { useState } from "react";
import Logo from "../assets/logo1.jpg";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"}>
        <img
          src={Logo}
          alt="logo"
          className=" w-20  cursor-pointer brightness-125"
        />
      </Link>

      <ul className="flex space-x-8">
        <li className=" cursor-pointer hover:text-red-500">Home</li>
        <li className=" cursor-pointer hover:text-red-500">TV Show</li>
        <li className=" cursor-pointer hover:text-red-500">Movie</li>
        <li className=" cursor-pointer hover:text-red-500">Anime</li>
        <li className=" cursor-pointer hover:text-red-500">Games</li>
        <li className=" cursor-pointer hover:text-red-500">New & Popular</li>
        <li className=" cursor-pointer hover:text-red-500">Upcoming</li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        <div div className="relative hidden md:inline-flex">
          <input
            type="text"
            className="bg-gray-500 px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            placeholder="Search..."
          />
          <Search className=" absolute top-2 right-4 w-5 h-5  " />
        </div>

        <Link to={user ? "ai-recommendations" : "signin"}>
          <button className="bg-red-500 text-white px-5 py-2 rounded cursor-pointer">
            Get AI Movie Picks
          </button>
        </Link>

        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-gray-500 text-white px-4 py-1 cursor-pointer">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white">
            <img
              src={avatarUrl}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col">
                <div className="mb-2 flex flex-col items-center ">
                  <span className="block text-gray-200">{user.username}</span>
                  <span className="block text-gray-400">{user.email}</span>
                </div>

                <button className="flex items-center text-gray-200 bg-black hover:bg-gray-700  gap-3 px-4 py-2 rounded cursor-pointer">
                  <HelpCircle className="mr-2 w-5 h-5" />
                  Help Center
                </button>

                <button className="flex items-center text-gray-200 gap-3   bg-black hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
                  <Settings className="mr-2" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-200 gap-3  bg-black hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                >
                  <LogOut className="mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
