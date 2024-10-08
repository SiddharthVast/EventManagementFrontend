import axios from "axios";
import { create } from "zustand";
import { College } from "./collegeStore";

export interface FestivalStoreState {
  festivals: Festival[];
  festival: Festival;
  getAllFestivals: () => void;
  getFestivalById: (id: number) => void;
  getByCollege: (id: number) => void;
  deleteFestival: (id: number) => void;
  updateFestival: (data: FormData) => Promise<void>;
  updateFestStatus: (id: number) => void;
  addFestival: (data: FestivalData) => void;
  getActiveFest: (id: number) => void;
}
export interface Festival {
  id: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  imageUrl?: string | FileList;
  description: string;
  college: College;
  status?: boolean;
}
export interface FestivalData {
  id?: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  imageUrl: string | FileList;
  description: string;
  collegeId?: number;
  status?: boolean;
}

const http = axios.create({ baseURL: "http://localhost:3000" });

const useFestivalStore = create<FestivalStoreState>((set) => ({
  festivals: [],
  festival: {
    id: 0,
    festivalTitle: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    description: "",
    status: true,
    college: {
      id: 0,
      collegeName: "",
      number: "",
      emailId: "",
      address: "",
    },
  },

  getAllFestivals: async () => {
    try {
      const res = await http.get("/festivals", {
        headers: { authorization: sessionStorage.token },
      });
      set(() => ({ festivals: res.data }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "An error occurred while fetching festivals."
        );
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  },


  getFestivalById: async (id: number) => {
    const res = await http.get(`/festivals/${id}`);
    set((state: FestivalStoreState) => ({ festival: res.data }));
  },
  getActiveFest: async (id: number) => {
    const res = await http.get(`/festivals/getByCollege/active/${id}`);
    set((state: FestivalStoreState) => ({ festival: res.data }));
  },
  getByCollege: async (id: number) => {
    try {
      const res = await http.get(`/festivals/getByCollege/${id}`);
      set((state: FestivalStoreState) => ({
        festivals: res.data,
      }));
    } catch (error) {
      console.error("Error fetching festivals:", error);
    }
  },

  addFestival: async (data: FestivalData) => {
    try {
      const res = await http.post("/festivals", data, {
        headers: { authorization: sessionStorage.token },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          throw new Error("The college already has an active festival.");
        } else {
          throw new Error(
            error.response?.data.message || "An unknown error occurred."
          );
        }
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  },

  updateFestival: async (formData: FormData) => {
    try {
      const id = formData.get("id");
      const res = await http.patch(`/festivals/${id}`, formData, {
        headers: {
          authorization: sessionStorage.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        set((state) => ({
          festivals: state.festivals.map((f) =>
            f.id === parseInt(id as string) ? { ...f, ...res.data } : f
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating festival:", error);
    }
  },

  updateFestStatus: async (id: number) => {
    try {
      const res = await http.patch(
        `/festivals/festcomplete/${id}`,
        {},
        {
          headers: { authorization: sessionStorage.token },
        }
      );
      if (res.status === 200) {
        set((state) => ({
          festivals: state.festivals.map((f) =>
            f.id === id ? { ...f, ...res.data } : f
          ),
        }));
      } else {
        console.error(
          "Failed to update festival status:",
          res.status,
          res.statusText
        );
      }
    } catch (error) {
      console.error("Error updating festival status:", error);
    }
  },

  deleteFestival: async (id: number) => {
    const res = await http.delete(`/festivals/${id}`, {
      headers: { authorization: sessionStorage.token },
    });
    if (res.status === 200) {
      set((state) => ({
        festivals: state.festivals.filter((c) => c.id !== id),
      }));
    }
  },
}));

export default useFestivalStore;
