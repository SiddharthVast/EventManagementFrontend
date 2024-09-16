import { create } from "zustand";
import axios from "axios";

export interface CollegeStoreState {
  colleges: College[];
  college: College;
  getAllColleges: () => void;
  getCollegeById: (id: string) => void;
  deleteCollege: (id: number) => void;
  updateCollege: (id: number, data: CollegeData) => void;
  addCollege: (data: CollegeData) => void;
}
export interface College {
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
const http = axios.create({ baseURL: "http://localhost:3000" });
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
    const res = await http.get("/colleges");
    set(() => ({ colleges: res.data }));
  },
  getCollegeById: async (id: string) => {
    const res = await http.get(`/colleges/${id}`);
    set((state: CollegeStoreState) => ({ college: res.data }));
  },
  deleteCollege: async (id: number) => {
    const res = await http.delete(`/colleges/${id}`, {
      headers: { authorization: sessionStorage.token },
    });
    if (res.status === 200) {
      set((state) => ({
        colleges: state.colleges.filter((c) => c.id !== id),
      }));
    }
  },

  addCollege: async (data: CollegeData) => {
    const res = await http.post("/colleges", data, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: CollegeStoreState) => ({
      colleges: [...state.colleges, res.data],
    }));
  },

  updateCollege: async function (id, data) {
    try {
      const res = await http.patch(`/colleges/${id}`, data, {
        headers: { authorization: sessionStorage.token },
      });
      set((state) => ({ colleges: [...state.colleges, res.data] }));
    } catch (error) {
      console.error("Error updating college:", error);
    }
    // const response = await fetch(`http://localhost:3000/colleges/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     " Content-Type": "application/json",
    //     Authorization: sessionStorage.token || "",
    //   },
    //   body: JSON.stringify(data),
    // });
    // if (response.ok) {
    //   const updatedCollege = await response.json();
    //   set((state) => ({
    //     colleges: state.colleges.map((m) => (m.id === id ? updatedCollege : m))
    //   }));
    // }
  },
}));

export default useCollegeStore;
