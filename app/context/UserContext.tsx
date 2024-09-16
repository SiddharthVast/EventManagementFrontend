"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import useLoginStore from "@/store/loginStore"; // Adjust the path as needed
// import useUserEventRegistartionStore from "../../store/user_event_registrationStore";

interface UserContextProps {
  user: any; // Replace `any` with your actual user type
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = useLoginStore((state) => state.user);
  const fetchUser = useLoginStore((state) => state.fetchUser);
  const logout = useLoginStore((state) => state.logout);

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        try {
          await fetchUser(); // Fetch user data if not already loaded
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    loadUser();
  }, [user, fetchUser]);

  return (
    <UserContext.Provider value={{ user, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
