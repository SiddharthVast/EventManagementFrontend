import axios from "axios";
import { create } from "zustand";
import { User } from "./userStore";

interface Input {
  email: string;
  password: string;
}

interface LoginState {
  token: string;
  user: User | null;
  login: (data: Input) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}
const http = axios.create({ baseURL: "http://localhost:3000" });

const useLoginStore = create<LoginState>((set, get) => ({
  token: "",
  user: null,

  login: async (data: Input) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const resData = await response.json();
      const accessToken = resData["access_token"];
      sessionStorage.setItem("token", accessToken);

      // Update token in state
      set({ token: accessToken });

      // Fetch user profile after login
      await get().fetchUser();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("Login failed:", error);
      }
      throw new Error("Login failed");
    }
  },

  fetchUser: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await http.get("/auth/profile", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        const userData = await response.data;
        set({ user: userData });
      } else {
        set({ token: "", user: null });
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to fetch user:", error.message);
      } else {
        console.error("Failed to fetch user:", error);
      }
    }
  },

  logout: () => {
    set({ token: "", user: null });
    sessionStorage.removeItem("token");
  },
}));

export default useLoginStore;