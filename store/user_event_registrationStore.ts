import axios from "axios";
import { User } from "./userStore";
import { create } from "zustand";
import { Event } from "./interfaces_Data";

export interface UserEventRegistrationStoreState {
    registrations: UserEventRegistration[],
    registration: UserEventRegistration;
    getAllRegistarations: () => void;
    getRegistartionById: (id: string) => void;
    addRegistration: (data: {
        eventId: number,
        userId: number
    }) => void;
}

export interface UserEventRegistration {
    id?: number;
    groupName: string;
    totalScores: number;
    user: User;
    event: Event;
}

const http = axios.create({ baseURL: "http://localhost:3000" });

const useUserEventRegistartionStore = create<UserEventRegistrationStoreState>((set) => ({
    registrations: [],
    registration: {
        id: 0,
        groupName: '',
        totalScores: 0,
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
            }
        },
        event: {
            id: 0,
            eventType: "",
            eventName: "",
            members: "",
            venue: "",
            startDateTime: "",
            endDateTime: "",
            festivalId: 0,
            status: "",
        }
    },

    getAllRegistarations: async () => {
        const res = await http.get("/user-event-registration");
        set(() => ({ registrations: res.data }));
    },

    getRegistartionById: async (id: string) => {
        const res = await http.get(`/user-event-registration/${id}`);
        set((state: UserEventRegistrationStoreState) => ({ registration: res.data }));
    },

    addRegistration: async (data: { eventId: number, userId: number }) => {
        const res = await http.post("/user-event-registration", data, {
            headers: { authorization: sessionStorage.token },
        });
        set((state: UserEventRegistrationStoreState) => ({ registrations: [...state.registrations, res.data] }));
    },

}));

export default useUserEventRegistartionStore;
