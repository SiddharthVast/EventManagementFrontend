"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import useLoginStore from "@/store/loginStore"; 

interface UserContextProps {
  user: any; 
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
          await fetchUser();
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
