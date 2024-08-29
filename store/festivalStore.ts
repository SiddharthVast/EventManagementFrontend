import axios from "axios";
import { create } from "zustand";
import { College } from "./collegeStore";

export interface FestivalStoreState {
  festivals: Festival[],
  festival: Festival,
  getAllFestivals: () => void;
  getFestivalById: (id: string) => void;
  deleteFestival: (id: number) => void;
  updateFestival: (data: FormData) => Promise<void>;
  addFestival: (data: FestivalData) => void;
}
export interface Festival {
  id: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  imageUrl?: string | FileList;
  description: string;
  college: College;
  status: boolean;
}
export interface FestivalData {
  id?: number;
  festivalTitle: string;
  startDate: string;
  endDate: string;
  imageUrl?: string | FileList;
  description: string;
  collegeId?: number;
  status: boolean;
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
    const res = await http.get("/festivals");
    set(() => ({ festivals: res.data }));
  },

  getFestivalById: async (id: string) => {
    const res = await http.get(`/festivals/${id}`);
    set((state: FestivalStoreState) => ({ festival: res.data }));
  },

  addFestival: async (data: FestivalData) => {
    const res = await http.post("/festivals", data, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: FestivalStoreState) => ({
      festivals: [...state.festivals, res.data],
    }));
    return res.data;
  },
  updateFestival: async (formData: FormData) => {
    try {
      const id = formData.get('id');
      const res = await http.patch(`/festivals/${id}`, formData, {
        headers: {
          authorization: sessionStorage.token,
          'Content-Type': 'multipart/form-data',
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