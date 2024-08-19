import { create } from "zustand";
import axios from "axios";

export interface UserStoreState {
  users: User[];
  user: User;
  getAllUsers: () => void;
  getUserById: (id: string) => void;
  deleteUser: (id: number) => void;
  updateUser: (data: UserData) => void;
  addUser: (data: UserData) => void;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName: string;
  role: string;
  collegeId: string;
}
export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName: string;
  role: string;
  collegeId: string;
}
const http = axios.create({ baseURL: "http://localhost:3000" });
const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    details: "",
    courseName: "",
    role: "",
    collegeId: "",
  },

  getAllUsers: async () => {
    const res = await http.get("/users");
    set(() => ({ users: res.data }));
  },
  getUserById: async (id: string) => {
    const res = await http.get(`/users/${id}`);
    set((state: UserStoreState) => ({ user: res.data }));
  },
  deleteUser: async (id: number) => {
    const res = await http.delete(`/users/${id}`, {
      headers: { authorization: sessionStorage.token },
    });
    if (res.status === 200) {
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    }
  },

  addUser: async (data: UserData) => {
    const res = await http.post("/users", data, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: UserStoreState) => ({
      users: [...state.users, res.data],
    }));
  },

  updateUser: async function (data: UserData) {
    try {
      const res = await http.patch(`/users/${data.id}`, data, {
        headers: { authorization: sessionStorage.token },
      });
      set((state) => ({ users: [...state.users, res.data] }));
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  },
}));

export default useUserStore;
