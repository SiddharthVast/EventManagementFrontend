// "use client"; // This marks the file as a Client Component

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'

// // Create the context
// const UserContext = createContext();
// export const useUserContext = () => useContext(UserContext);

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         // Fetch user data from the backend
//         const fetchUser = async () => {
//             try {
//                 const token = sessionStorage.getItem('token'); // Retrieve the JWT from sessionStorage
//                 if (!token) {
//                     router.push('/login');
//                     return;
//                 }

//                 const response = await fetch('http://localhost:3000/auth/profile', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`, // Use the token from sessionStorage
//                     },
//                 });

//                 if (response.ok) {
//                     const userData = await response.json();
//                     setUser(userData);
//                 } else {
//                     // If the token is invalid or expired, redirect to login
//                     router.push('/login');
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user data:", error);
//                 router.push('/login');
//             }
//         };

//         fetchUser();
//     }, [router]);

//     const login = (userData) => {
//         setUser(userData);
//         if (userData.role === 'admin') {
//             router.push('/admin');
//         } else if (userData.role === 'volunteer') {
//             router.push('/volunteer');
//         } else {
//             router.push('/student');
//         }
//         router.refresh(); // Force a re-render
//     };

//     const logout = () => {
//         setUser(null);
//         sessionStorage.removeItem('token'); // Clear the token from sessionStorage on logout
//         router.push('/login');
//     };

//     return (
//         <UserContext.Provider value={{ user, login, logout }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
