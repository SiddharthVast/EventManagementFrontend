import axios from "axios";
import { User } from "./userStore";
import { create } from "zustand";
import { Event } from "./eventStore";

export interface UserEventRegistrationStoreState {
  registrations: UserEventRegistration[];
  registration: UserEventRegistration;
  getAllRegistarations: () => void;
  getRegistartionById: (id: string) => void;
  deleteUserEvntReg: (id: number) => void;
  getRegistartionByUserId: (id: number) => void;
  addRegistration: (data: {
    eventId: number;
    userId: number;
    topic?: string;
  }) => void;
  getRegByEidRole: (id: number, userRole: string) => void;

  updateUserEvntReg: (payload: {
    regData: { id: number; totalScores: number }[];
  }) => Promise<void>;

  checkRegistrationStatus: (
    userId: number,
    eventId: number
  ) => Promise<boolean>;
}

export interface UserEventRegistration {
  id: number;
  groupName: string;
  totalScores: number;
  topic: string;
  user: User;
  event: Event;
}
export interface UserEventRegistrationData {
  id?: number;
  groupName: string;
  totalScores: number;
  topic: string;
  user: User;
  event: Event;
}
const http = axios.create({ baseURL: "http://localhost:3000" });

const useUserEventRegistartionStore = create<UserEventRegistrationStoreState>(
  (set) => ({
    registrations: [],
    registration: {
      id: 0,
      groupName: "",
      totalScores: 0,
      topic: "",
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
        }
      },
    },

    getAllRegistarations: async () => {
      const res = await http.get("/user-event-registration");
      set(() => ({ registrations: res.data }));
    },

    updateUserEvntReg: async ({
      regData,
    }: {
      regData: { id: number; totalScores: number }[];
    }) => {
      try {
        const res = await http.patch(
          `/user-event-registration/update-multiple/`,
          {
            regData,
          }
        );

        console.log("User Event Registrations updated successfully:", res.data);
      } catch (error) {
        console.error("Error updating user event registrations:", error);
        throw error;
      }
    },

    getRegistartionById: async (id: string) => {
      const res = await http.get(`/user-event-registration/${id}`);
      set((state: UserEventRegistrationStoreState) => ({
        registration: res.data,
      }));
    },
    deleteUserEvntReg: async (id: number) => {
      const res = await http.delete(`/user-event-registration/${id}`);
      if (res.status === 200) {
        set((state) => ({
          registrations: state.registrations.filter((r) => r.id !== id),
        }));
      }
    },
    getRegistartionByUserId: async (id: number) => {
      const res = await http.get(`/user-event-registration/userId/${id}`,
        { headers: { authorization: sessionStorage.token }, })
      set((state: UserEventRegistrationStoreState) => ({
        registrations: res.data,
      }));
    },

    
    getRegByEidRole: async (id: number, userRole: string) => {
      const res = await http.get(
        `/user-event-registration/getRegByEidRole/${id}/${userRole}`,
        {
          headers: { authorization: sessionStorage.token },
        }
      );
      set((state: UserEventRegistrationStoreState) => ({
        registrations: res.data,
      }));
    },


    addRegistration: async (data: {
      eventId: number;
      userId: number;
      topic?: string;
    }) => {
      const res = await http.post("/user-event-registration", data, {
        headers: { authorization: sessionStorage.token },
      });
      set((state: UserEventRegistrationStoreState) => ({
        registrations: [...state.registrations, res.data],
      }));
    },

    checkRegistrationStatus: async (userId: number, eventId: number) => {
      try {
        const res = await http.get(
          `/user-event-registration/check-registration`,
          {
            params: { userId, eventId },
          }
        );
        return res.data.registered;
      } catch (error) {
        console.error("Failed to fetch registration status:", error);
        return false;
      }
    },
  })
);

export default useUserEventRegistartionStore;
