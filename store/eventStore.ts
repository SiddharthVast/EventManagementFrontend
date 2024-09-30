import { create } from "zustand";
import axios from "axios";
import { Festival } from "./festivalStore";
export interface EventStoreState {
  events: Event[];
  event: Event;
  getAllEvents: () => void;
  getEventById: (id: number) => void;
  getEventByFestId: (id: number) => void;
  deleteEvent: (id: number) => void;
  addEvent: (data: EventData) => void;
  updateEvent: (data: EventData) => void;
  updateEventStatus: (id: number) => void;
  uploadImageToCloudinary: (file: File) => Promise<string>;
}
export interface Event {
  id: number;
  eventType: string;
  eventName: string;
  members: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  festival: Festival;
  status?: boolean;
  imageUrl: string | FileList;
}
export interface EventData {
  id?: number;
  eventType: string;
  eventName: string;
  members: string;
  venue: string;
  startDateTime: string;
  endDateTime: string;
  festivalId?: number;
  status?: boolean;
  imageUrl: string | FileList;
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
    status: true,
    imageUrl: "",
    festival: {
      id: 0,
      festivalTitle: "",
      startDate: "",
      endDate: "",
      imageUrl: "",
      description: "",
      college: {
        id: 0,
        collegeName: "",
        number: "",
        emailId: "",
        address: "",
      },
      status: true,
    },
  },

  getAllEvents: async () => {
    const res = await http.get("/events", {
      headers: { authorization: sessionStorage.token },
    });
    set(() => ({ events: res.data }));
  },
  getEventById: async (id: number) => {
    const res = await http.get(`/events/${id}`, {
      headers: { authorization: sessionStorage.token },
    });
    set((state: EventStoreState) => ({ event: res.data }));
  },

  getEventByFestId: async (id: number) => {
    const res = await http.get(`/events/festId/${id}`);
    set((state: EventStoreState) => ({
      events: [...res.data],
    }));
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
  updateEventStatus: async (id: number) => {
    try {
      const res = await http.patch(
        `/events/eventcomplete/${id}`,
        {},
        {
          headers: { authorization: sessionStorage.token },
        }
      );
      if (res.status === 200) {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...res.data } : e
          ),
        }));
      } else {
        console.error(
          "Failed to update event status:",
          res.status,
          res.statusText
        );
      }
    } catch (error) {
      console.error("Error updating festival status:", error);
    }
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
  uploadImageToCloudinary: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EVENT_MGMT_SYS");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqkyppmk2/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  },
}));

export default useEventStore;
