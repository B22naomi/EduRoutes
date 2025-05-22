import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

type ThemeContextType = {
  colorScheme: string;
  setColorScheme: (scheme: 'light' | 'dark' | null) => void;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        toggleColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};