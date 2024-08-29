import { create } from "zustand";
import axios from "axios";
import { Event } from "./interfaces_Data";
export interface EventStoreState {
  events: Event[];
  event: Event;
  getAllEvents: () => void;
  getEventById: (id: string) => void;
  deleteEvent: (id: number) => void;
  addEvent: (data: EventData) => void;
  updateEvent: (data: EventData) => void;
}
export interface EventData {
  id?: number;
  eventType: string;
  eventName: string;
  members: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  festivalId: number;
  // pointtojudge: PointsToJudge[];
  // usereventregs: User_event_reg[];
}
const http = axios.create({ baseURL: "http://localhost:3000" });
const useEventStore = create<EventStoreState>((set) => ({
  events: [],
  event: {
    id: 0,
    eventType: "",
    eventName: "",
    members: "",
    venue: "",
    startDateTime: "",
    endDateTime: "",
    festivalId: 0,
  },
  // pointtojudge: PointsToJudge[],
  // usereventregs: User_event_reg[]

  getAllEvents: async () => {
    const res = await http.get("/events");
    set(() => ({ events: res.data }));
  },
  getEventById: async (id: string) => {
    const res = await http.get(`/events/${id}`);
    set((state: EventStoreState) => ({ event: res.data }));
  },
  deleteEvent: async (id: number) => {
    const res = await http.delete(`/events/${id}`, {
      headers: { authorization: sessionStorage.token },
    });
    if (res.status === 200) {
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
      }));
    }
  },

  addEvent: async (data: EventData) => {
    const res = await http.post("/events", data, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: EventStoreState) => ({
      events: [...state.events, res.data],
    }));
  },

  updateEvent: async function (data: EventData) {
    try {
      const res = await http.patch(`/events/${data.id}`, data, {
        headers: { authorization: sessionStorage.token },
      });
      set((state) => ({ events: [...state.events, res.data] }));
    } catch (error) {
      console.error("Error updating events:", error);
    }
  },
}));

export default useEventStore;
