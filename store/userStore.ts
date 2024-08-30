import { create } from "zustand";
import axios from "axios";
import { College } from './collegeStore'; // Unified import statement

export interface UserStoreState {
  users: User[];
  user: User;
  getAllUsers: () => void;
  getUserById: (id: string) => void;
  deleteUser: (id: number) => void;
  updateUser: (data: UserData) => void;
  addUser: (data: UserData) => void;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName?: string;
  role: string;
  college?: College;
}

export interface UserData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  details: string;
  courseName?: string;
  role: string;
  collegeId?: number;
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
    college: {
      id: 0,
      collegeName: "",
      number: "",
      emailId: "",
      address: "",
    },
  },

  getAllUsers: async () => {
    try {
      const res = await http.get("/users");
      set(() => ({ users: res.data }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  getUserById: async (id: string) => {
    try {
      const res = await http.get(`/users/${id}`);
      set(() => ({ user: res.data }));
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  },

  addUser: async (data: UserData) => {
    try {
      const res = await http.post("/users", data, {
        headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` }, // Correct token handling
      });
      set((state) => ({
        users: [...state.users, res.data],
      }));
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  updateUser: async (data: UserData) => {
    try {
      const res = await http.patch(`/users/${data.id}`, data, {
        headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` }, // Correct token handling
      });
      set((state) => ({
        users: state.users.map((user) => (user.id === data.id ? res.data : user)),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  deleteUser: async (id: number) => {
    try {
      const res = await http.delete(`/users/${id}`, {
        headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` }, // Correct token handling
      });
      if (res.status === 200) {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
}));

export default useUserStore;
