import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, Map, Bell, User, Settings } from 'lucide-react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const iconColor = useThemeColor({ light: '#94A3B8', dark: '#64748B' });
  const activeIconColor = useThemeColor({ light: '#1E40AF', dark: '#3B82F6' });
  const tabBarBg = useThemeColor({ light: '#FFFFFF', dark: '#0F172A' });

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBg,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopColor: useThemeColor({ light: '#E2E8F0', dark: '#1E293B' }),
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: iconColor,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
          marginBottom: 8,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, size }) => <Map size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => <Bell size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size - 2} color={color} />,
        }}
      />
    </Tabs>
  );
}