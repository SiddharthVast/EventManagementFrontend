import { create } from "zustand";
import axiosInstance from "../app/api/axiosInstance"; // Import the Axios instance

export interface CollegeStoreState {
  colleges: College[];
  college: College;
  getAllColleges: () => void;
  getCollegeById: (id: string) => void;
  deleteCollege: (id: number) => void;
  updateCollege: (data: CollegeData) => void;
  addCollege: (data: CollegeData) => void;
}

interface College {
  id: number;
  collegeName: string;
  number: string;
  emailId: string;
  address: string;
}

export interface CollegeData {
  id?: number;
  collegeName: string;
  number: string;
  emailId: string;
  address: string;
}

const useCollegeStore = create<CollegeStoreState>((set) => ({
  colleges: [],
  college: {
    id: 0,
    collegeName: "",
    number: "",
    emailId: "",
    address: "",
  },

  getAllColleges: async () => {
    try {
      const response = await axiosInstance.get("/colleges");
      set({ colleges: response.data });
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  },

  getCollegeById: async (id: string) => {
    try {
      const res = await axiosInstance.get(`/colleges/${id}`);
      set({ college: res.data });
    } catch (error) {
      console.error("Error fetching college by ID:", error);
    }
  },

  deleteCollege: async (id: number) => {
    try {
      const res = await axiosInstance.delete(`/colleges/${id}`);
      if (res.status === 200) {
        set((state) => ({
          colleges: state.colleges.filter((c) => c.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  },

  addCollege: async (data: CollegeData) => {
    try {
      const res = await axiosInstance.post("/colleges", data);
      set((state) => ({
        colleges: [...state.colleges, res.data],
      }));
    } catch (error) {
      console.error("Error adding college:", error);
    }
  },

  updateCollege: async (data: CollegeData) => {
    try {
      const res = await axiosInstance.patch(`/colleges/${data.id}`, data);
      set((state) => ({
        colleges: state.colleges.map((college) =>
          college.id === res.data.id ? res.data : college
        ),
      }));
    } catch (error) {
      console.error("Error updating college:", error);
    }
  },
}));

export default useCollegeStore;
