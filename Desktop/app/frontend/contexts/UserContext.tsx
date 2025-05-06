import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'parent' | 'driver' | 'admin';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // In a real app, we would check for an existing user session here
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};