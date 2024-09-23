import { create } from "zustand";
import axios from "axios";

export interface PointsToJudgeStoreState {
  pointsToJudge: PointToJudge[];
  pointToJudge: PointToJudge;
  getPointsById: (id: string) => void;
  deletePoint: (id: number) => void;
  addPoints: (points: PointToJudgeData[]) => Promise<void>;
}
export interface PointToJudge {
  id: number;
  point: string;
  eventId: number;
}
export interface PointToJudgeData {
  id?: number;
  point: string;
  eventId: number;
}
const http = axios.create({ baseURL: "http://localhost:3000" });

const usePointToJudgeStore = create<PointsToJudgeStoreState>((set) => ({
  pointsToJudge: [],
  pointToJudge: { id: 0, point: "", eventId: 0 },

  getPointsById: async (id: string) => {
    const res = await http.get(`/pointstojudge/${id}`);
    set((state: PointsToJudgeStoreState) => ({ pointsToJudge: res.data }));
  },

  addPoints: async (points: PointToJudgeData[]) => {
    try {
      const response = await http.post("/pointstojudge", { points });
      set((state: PointsToJudgeStoreState) => ({
        pointsToJudge: [...state.pointsToJudge, response.data],
      }));
    } catch (error: any) {
      console.error(
        "Error adding points to judge:",
        error.response?.data || error.message
      );
    }
  },

  deletePoint: async (id: number) => {
    const res = await http.delete(`/pointstojudge/${id}`);
    if (res.status === 200) {
      set((state) => ({
        pointsToJudge: state.pointsToJudge.filter((p) => p.id !== id),
      }));
    }
  },
}));

export default usePointToJudgeStore;
