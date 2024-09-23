import axios from "axios";
import { create } from "zustand";
export interface ContactUsStoreState {
    contact: Contact;
    handleContactSubmission: (data: Contact) => void;
}
export interface Contact {
    name: string;
    email: string;
    mobileNumber: string;
    message: string;
}

const http = axios.create({ baseURL: "http://localhost:3000" });
const useContactUsStore = create<ContactUsStoreState>((set) => ({
    contact: {
        name: "",
        email: "",
        mobileNumber: "",
        message: ""
    },
    handleContactSubmission: async (data: Contact) => {
        const res = await http.post("/contactus", data, {
            headers: { Authorization: sessionStorage.token },
        })
    }
}))
export default useContactUsStore;