import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...' 
}) => {
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size="large" color="#1E40AF" />
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginTop: 16,
  },
});

export default LoadingScreen;