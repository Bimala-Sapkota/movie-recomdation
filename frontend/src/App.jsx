import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Homepages from "./pages/Homepages";
import { Route, Routes } from "react-router";
import Moviepage from "./pages/Moviepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p> Loading.......</p>;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepages />} />
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
