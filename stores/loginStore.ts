import { create } from "zustand";
import axiosInstance from "../app/api/axiosInstance"; // Adjust the import path as necessary
import axios from "axios";

interface Input {
  email: string;
  password: string;
}

interface User {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  courseName?: string;
  role: string;
  // Add other user properties if needed
}

interface LoginState {
  token: string;
  user: User | null;
  login: (data: Input) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useLoginStore = create<LoginState>((set, get) => ({
  token: "",
  user: null,

  login: async (data: Input) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const accessToken = response.data.access_token;
      sessionStorage.setItem("token", accessToken);

      // Update token in state
      set({ token: accessToken });

      // Fetch user profile after login
      await get().fetchUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Login failed:", error);
      }
      throw new Error("Login failed");
    }
  },

  fetchUser: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      set({ user: null });
      return;
    }

    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to fetch user:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("Failed to fetch user:", error);
      }

      // Clear token and user data if fetching user fails
      set({ token: "", user: null });
      sessionStorage.removeItem("token");
    }
  },

  logout: () => {
    set({ token: "", user: null });
    sessionStorage.removeItem("token");
  },
}));

export default useLoginStore;
