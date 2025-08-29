import { Search } from "lucide-react";
import { Link } from "react-router";
import React from "react";
import Logo from "../assets/logo1.jpg";

const Navbar = () => {
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
            className="bg-gray-500 px-4 py-2 rounded-full min-w-72 pr-10 outline-none text-white"
            placeholder="Search..."
          />
          <Search className=" absolute top-2 right-4 w-5  " />
        </div>
        <button className="bg-red-500 text-white px-5 py-2 rounded">
          Get AI Movie Picks
        </button>
        <Link to={"/signin"}>
          <button className="border border-gray-500 text-white px-4 py-1 cursor-pointer">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
