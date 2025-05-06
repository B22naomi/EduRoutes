import { Stack } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function AuthLayout() {
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
        animation: 'fade',
      }}
    />
  );
}