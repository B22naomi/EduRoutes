import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface GreetingHeaderProps {
  user: any;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ user }) => {
  const router = useRouter();
  
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const getUserName = () => {
    if (user?.name) return user.name.split(' ')[0];
    
    if (user?.role === 'parent') return 'Sarah';
    if (user?.role === 'driver') return 'David';
    if (user?.role === 'admin') return 'Michael';
    
    return 'User';
  };
  
  const getAvatarUri = () => {
    if (user?.role === 'parent') {
      return 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg';
    } else if (user?.role === 'driver') {
      return 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg';
    } else {
      return 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg';
    }
  };
  
  const getHeaderMessage = () => {
    if (user?.role === 'parent') {
      return 'Track your child\'s bus in real-time';
    } else if (user?.role === 'driver') {
      return 'Your route is optimized for today';
    } else {
      return 'Monitor all school buses in real-time';
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image source={{ uri: getAvatarUri() }} style={styles.avatar} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.greeting, { color: secondaryTextColor }]}>
              {getTimeOfDay()}
            </Text>
            <Text style={[styles.userName, { color: textColor }]}>
              {getUserName()}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.notificationButton, { backgroundColor: cardBgColor }]}
          onPress={() => router.push('/(tabs)/notifications')}
        >
          <Bell size={24} color={textColor} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.headerMessage, { color: secondaryTextColor }]}>
        {getHeaderMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  headerMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});

export default GreetingHeader;