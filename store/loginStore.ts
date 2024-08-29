import axios from "axios";
import { create } from "zustand";
import { User } from "./userStore";
interface Input {
  email: string;
  password: string;
}

// interface User {
//   firstName: string;
//   lastName: string;
//   mobileNumber: string;
//   courseName?: string;
//   role: string;
//   // Add other user properties if needed
// }

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
      const response = await http.post("/auth/login", data);

      set((state: LoginState) => ({ token: response.data["access_token"] }));
      const accessToken = response.data["access_token"];

      sessionStorage.setItem("token", response.data["access_token"]);
      // Update token in state
      set({ token: accessToken });
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
