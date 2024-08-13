// import { create } from "zustand";

// interface Input {
//     username: string;
//     password: string;
// }

// interface LoginState {
//     token: string;
//     login: (data: Input) => Promise<{ token: string } | void>; // Adjusted to return token data
//     logout: () => void;
// }

// const useLoginStore = create<LoginState>((set) => ({
//     token: "",
//     login: async (data: Input) => {
//         try {
//             const response = await fetch("http://localhost:3000/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Login failed");
//             }

//             const resData = await response.json();
//             const accessToken = resData["access_token"];
//             set({ token: accessToken });
//             sessionStorage.setItem("token", accessToken);

//             return { token: accessToken }; // Return the token or other user data
//         } catch (error) {
//             console.error(error); // Log error for debugging
//             throw new Error('Login failed: ' + error);
//         }
//     },
//     logout: () => {
//         set({ token: "" });
//         sessionStorage.removeItem("token");
//     },
// }));

// export default useLoginStore;



// -----------------------------------2ndTime---------------

// import { create } from "zustand";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation

// interface Input {
//     username: string;
//     password: string;
// }

// interface User {
//     role: string;
//     // Add other user properties if needed
// }

// interface LoginState {
//     token: string;
//     user: User | null;
//     // login: (data: Input) => Promise<void>;
//     login: (data: Input) => Promise<{ token: string } | void>; // Adjusted to return token data
//     logout: () => void;
//     fetchUser: () => Promise<void>;
// }

// const useLoginStore = create<LoginState>((set) => ({
//     token: "",
//     user: null,

//     login: async (data: Input) => {
//         const router = useRouter();
//         try {
//             const response = await fetch("http://localhost:3000/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Login failed");
//             }

//             const resData = await response.json();
//             const accessToken = resData["access_token"];
//             sessionStorage.setItem("token", accessToken);

//             // Update token in state
//             set({ token: accessToken });

//             // Fetch user profile after login
//             await useLoginStore.getState().fetchUser();

//             // Redirect based on user role
//             const user = useLoginStore.getState().user; // Get the updated user data
//             if (user?.role === 'admin') {
//                 router.push('/admin');
//             } else if (user?.role === 'volunteer') {
//                 router.push('/volunteer');
//             } else {
//                 router.push('/student');
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error("Login failed:", error.message);
//             } else {
//                 console.error("Login failed:", error);
//             }
//             throw new Error('Login failed');
//         }
//     },

//     fetchUser: async () => {
//         const token = sessionStorage.getItem('token');
//         if (!token) return;

//         try {
//             const response = await fetch('http://localhost:3000/auth/profile', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const userData = await response.json();
//                 set({ user: userData });
//             } else {
//                 set({ token: "", user: null });
//                 sessionStorage.removeItem("token");
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error("Failed to fetch user:", error.message);
//             } else {
//                 console.error("Failed to fetch user:", error);
//             }
//         }
//     },

//     logout: () => {
//         set({ token: "", user: null });
//         sessionStorage.removeItem("token");
//         const router = useRouter();
//         router.push('/login');
//     },
// }));

// export default useLoginStore;

// ---------------------------------------3rd time---------------
// import { create } from "zustand";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation

// interface Input {
//     username: string;
//     password: string;
// }

// interface User {
//     role: string;
//     // Add other user properties if needed
// }

// interface LoginState {
//     token: string;
//     user: User | null;
//     login: (data: Input) => Promise<void>;
//     logout: () => void;
//     fetchUser: () => Promise<void>;
// }

// const useLoginStore = create<LoginState>((set, get) => ({
//     token: "",
//     user: null,

//     login: async (data: Input) => {
//         try {
//             const response = await fetch("http://localhost:3000/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Login failed");
//             }

//             const resData = await response.json();
//             const accessToken = resData["access_token"];
//             sessionStorage.setItem("token", accessToken);

//             // Update token in state
//             set({ token: accessToken });

//             // Fetch user profile after login
//             await get().fetchUser(); // Use get() to access the state

//             // Redirect based on user role
//             const user = get().user; // Get the updated user data
//             const router = useRouter();
//             if (user?.role === 'admin') {
//                 router.push('/admin');
//             } else if (user?.role === 'volunteer') {
//                 router.push('/volunteer');
//             } else {
//                 router.push('/student');
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error("Login failed:", error.message);
//             } else {
//                 console.error("Login failed:", error);
//             }
//             throw new Error('Login failed');
//         }
//     },

//     fetchUser: async () => {
//         const token = sessionStorage.getItem('token');
//         if (!token) return;

//         try {
//             const response = await fetch('http://localhost:3000/auth/profile', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.ok) {
//                 const userData = await response.json();
//                 set({ user: userData });
//             } else {
//                 set({ token: "", user: null });
//                 sessionStorage.removeItem("token");
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.error("Failed to fetch user:", error.message);
//             } else {
//                 console.error("Failed to fetch user:", error);
//             }
//         }
//     },

//     logout: () => {
//         set({ token: "", user: null });
//         sessionStorage.removeItem("token");
//         const router = useRouter();
//         router.push('/login');
//     },
// }));

// export default useLoginStore;

// --------------------------4th Time:----------------

import { create } from "zustand";

interface Input {
    username: string;
    password: string;
}

interface User {
    role: string;
    // Add other user properties if needed
}

interface LoginState {
    token: string;
    user: User | null;
    login: (data: Input) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const useLoginStore = create<LoginState>((set, get) => ({
    token: "",
    user: null,

    login: async (data: Input) => {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const resData = await response.json();
            const accessToken = resData["access_token"];
            sessionStorage.setItem("token", accessToken);

            // Update token in state
            set({ token: accessToken });

            // Fetch user profile after login
            // await get().fetchUser();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
            } else {
                console.error("Login failed:", error);
            }
            throw new Error('Login failed');
        }
    },

    fetchUser: async () => {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:3000/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                set({ user: userData });
            } else {
                set({ token: "", user: null });
                sessionStorage.removeItem("token");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to fetch user:", error.message);
            } else {
                console.error("Failed to fetch user:", error);
            }
        }
    },

    logout: () => {
        set({ token: "", user: null });
        sessionStorage.removeItem("token");
    },
}));

export default useLoginStore;
