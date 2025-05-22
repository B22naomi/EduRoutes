import { useState, useEffect } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useColorScheme() {
  const deviceColorScheme = useNativeColorScheme();
  const [colorScheme, setColorSchemeState] = useState<'light' | 'dark' | null>(null);
  
  useEffect(() => {
    // Load the saved color scheme from AsyncStorage
    const loadColorScheme = async () => {
      try {
        const savedColorScheme = await AsyncStorage.getItem('@color_scheme');
        if (savedColorScheme) {
          setColorSchemeState(savedColorScheme as 'light' | 'dark');
        } else {
          setColorSchemeState(deviceColorScheme as 'light' | 'dark');
        }
      } catch (error) {
        console.error('Failed to load color scheme:', error);
        setColorSchemeState(deviceColorScheme as 'light' | 'dark');
      }
    };
    
    loadColorScheme();
  }, [deviceColorScheme]);
  
  const setColorScheme = async (scheme: 'light' | 'dark' | null) => {
    try {
      if (scheme) {
        await AsyncStorage.setItem('@color_scheme', scheme);
        setColorSchemeState(scheme);
      } else {
        await AsyncStorage.removeItem('@color_scheme');
        setColorSchemeState(deviceColorScheme as 'light' | 'dark');
      }
    } catch (error) {
      console.error('Failed to save color scheme:', error);
    }
  };
  
  return {
    colorScheme: colorScheme || 'light',
    setColorScheme,
    isSystemDefault: colorScheme === null,
  };
}