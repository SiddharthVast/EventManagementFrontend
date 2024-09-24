import axios from "axios";
import { create } from "zustand";

interface Input {
  email: string;
  password: string;
}

interface LoginState {
  token: string;
  user: any;
  login: (data: Input) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const http = axios.create({ baseURL: "http://localhost:3000" });

const useLoginStore = create<LoginState>((set, get) => ({
  token: "",
  user: null,

  fetchUser: async () => {
    if (typeof window === "undefined") return;
    const token = sessionStorage.getItem("token");
    if (!token) return set({ user: null });

    try {
      const response = await http.get("/auth/profile", {
        headers: { Authorization: `${token}` },
      });

      if (response.status === 200) {
        set({ user: response.data });
      } else {
        set({ user: null });
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      set({ user: null });
      console.error("Failed to fetch user:", error);
    }
  },

  login: async (data: Input) => {
    try {
      const response = await http.post("/auth/login", data);
      const accessToken = response.data["access_token"];
      sessionStorage.setItem("token", accessToken);
      set({ token: accessToken });
      await get().fetchUser();
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  logout: () => {
    set({ token: "", user: null });
    sessionStorage.removeItem("token");
  },
}));

// Fetch user when store is created
useLoginStore.getState().fetchUser();

export default useLoginStore;
