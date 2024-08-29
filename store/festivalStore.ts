import axios from "axios";
import { create } from "zustand";

export interface FestivalStoreState {
  festivals: Festival[];
  festival: Festival;
  getAllFestivals: () => void;
  getFestivalById: (id: number) => void;
  getByCollege: (id: number) => void;
  deleteFestival: (id: number) => void;
  updateFestival: (data: FestivalData) => void;
  addFestival: (data: FestivalData) => void;
}

export interface Festival {
  id: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  photo: string;
  collegeId?: number;
}

export interface FestivalData {
  id?: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  photo: string;
  collegeId?: number;
}

const http = axios.create({ baseURL: "http://localhost:3000" });

const useFestivalStore = create<FestivalStoreState>((set) => ({
  festivals: [],
  festival: {
    id: 0,
    festivalTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    photo: "",
    collegeId: 0,
  },

  getAllFestivals: async () => {
    const res = await http.get("/festivals");
    set(() => ({ festivals: res.data }));
  },

  getFestivalById: async (id: number) => {
    const res = await http.get(`/festivals/${id}`);
    set((state: FestivalStoreState) => ({ festival: res.data }));
  },
  getByCollege: async (id: number) => {
    try {
      // console.log("in store", id);
      const res = await http.get(`/festivals/getByCollege/${id}`);
      // console.log("result in store:", res);
      set((state: FestivalStoreState) => ({ festival: res.data }));
    } catch (error) {
      console.error("Error fetching festival:", error);
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

  updateFestival: async (data: FestivalData) => {
    const res = await http.patch(`/festivals/${data.id}`, data, {
      headers: { authorization: sessionStorage.token },
    });
    if (res.status === 200) {
      set((state) => ({
        festivals: state.festivals.map((f) =>
          f.id === data.id ? { ...f, ...data } : f
        ),
      }));
    }
  },

  addFestival: async (data: FestivalData) => {
    const res = await http.post("/festivals", data, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: FestivalStoreState) => ({
      festivals: [...state.festivals, res.data],
    }));
    // return res.data; // Return the response data
  },
}));

export default useFestivalStore;
