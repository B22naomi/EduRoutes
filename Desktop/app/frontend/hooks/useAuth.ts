import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

type UserRole = 'parent' | 'driver' | 'admin';

export function useAuth() {
  const { user, setUser, isAuthenticated } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  const signIn = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock user data based on role
      let name = '';
      if (role === 'parent') name = 'Sarah Johnson';
      else if (role === 'driver') name = 'David Wilson';
      else if (role === 'admin') name = 'Michael Adams';
      
      // Set the user in context
      setUser({
        id: '123456',
        name,
        email,
        role,
      });
      
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Set the user in context
      setUser({
        id: '123456',
        name,
        email,
        role,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Clear the user from context
      setUser(null);
      
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    register,
    signOut,
  };
}