import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "https://movie-recomdation.onrender.com";

export const useAuthStore = create((set) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,
  message: null,

  // Functions
  signup: async (username, email, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up",
      });

      console.error("Signup error:", error); // Log the error for debugging
      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, message: null, error: null });
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const { user, message } = response.data;
      set({
        user,
        message,
        isLoading: false,
      });
      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging in",
      });
      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });
    try {
      const response = await axios.get("http://localhost:5000/api/fetch-user");
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        fetchingUser: false,
        error: null,
        user: null,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post("http://localhost:5000/api/logout");
      const { message } = response.data;
      set({
        message,
        isLoading: false,
        user: null,
        error: null,
      });

      return { message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging out",
      });
      throw error;
    }
  },
}));
