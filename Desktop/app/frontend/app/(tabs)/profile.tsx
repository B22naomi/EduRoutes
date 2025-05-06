import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Bus,
  School,
  ChevronRight,
  Shield,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { mockStudents } from '@/data/mockData';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  const isParent = user?.role === 'parent';
  const isDriver = user?.role === 'driver';
  const isAdmin = user?.role === 'admin';
  
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={
                isParent
                  ? { uri: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' }
                  : isDriver
                  ? { uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' }
                  : { uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }
              }
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: textColor }]}>
                {user?.name || (isParent ? 'Sarah Johnson' : isDriver ? 'David Wilson' : 'Michael Adams')}
              </Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Parent'}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.editButton, { borderColor }]}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={[styles.editButtonText, { color: textColor }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <Animated.View
          entering={FadeInDown.delay(100).duration(300)}
          style={[styles.infoCard, { backgroundColor: cardBgColor, borderColor }]}
        >
          <Text style={[styles.cardTitle, { color: textColor }]}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Phone size={20} color="#64748B" />
            </View>
            <View>
              <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Phone</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>+1 (555) 123-4567</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Mail size={20} color="#64748B" />
            </View>
            <View>
              <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Email</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {user?.email || (
                  isParent
                    ? 'sarah.johnson@example.com'
                    : isDriver
                    ? 'david.wilson@example.com'
                    : 'michael.adams@example.com'
                )}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MapPin size={20} color="#64748B" />
            </View>
            <View>
              <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Address</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                123 Maple Street, Springfield
              </Text>
            </View>
          </View>
        </Animated.View>
        
        {isParent && (
          <Animated.View
            entering={FadeInDown.delay(200).duration(300)}
            style={[styles.infoCard, { backgroundColor: cardBgColor, borderColor }]}
          >
            <Text style={[styles.cardTitle, { color: textColor }]}>Your Children</Text>
            
            {mockStudents.map((student) => (
              <TouchableOpacity
                key={student.id}
                style={styles.childRow}
                onPress={() => router.push(`/student/${student.id}`)}
              >
                <Image source={{ uri: student.avatar }} style={styles.childAvatar} />
                <View style={styles.childInfo}>
                  <Text style={[styles.childName, { color: textColor }]}>{student.name}</Text>
                  <Text style={[styles.childDetails, { color: secondaryTextColor }]}>
                    {student.grade} • Bus #{student.busNumber}
                  </Text>
                </View>
                <ChevronRight size={20} color={secondaryTextColor} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
        
        {isDriver && (
          <Animated.View
            entering={FadeInDown.delay(200).duration(300)}
            style={[styles.infoCard, { backgroundColor: cardBgColor, borderColor }]}
          >
            <Text style={[styles.cardTitle, { color: textColor }]}>Bus Information</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Bus size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Bus Number</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>Bus #42</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <School size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>School</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>Springfield Elementary</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <MapPin size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Route</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>North Springfield Route</Text>
              </View>
            </View>
          </Animated.View>
        )}
        
        {isAdmin && (
          <Animated.View
            entering={FadeInDown.delay(200).duration(300)}
            style={[styles.infoCard, { backgroundColor: cardBgColor, borderColor }]}
          >
            <Text style={[styles.cardTitle, { color: textColor }]}>Administration</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <School size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>School</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>Springfield Elementary</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Shield size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Role</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>Transportation Director</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Bus size={20} color="#64748B" />
              </View>
              <View>
                <Text style={[styles.infoLabel, { color: secondaryTextColor }]}>Total Buses</Text>
                <Text style={[styles.infoValue, { color: textColor }]}>12 Buses</Text>
              </View>
            </View>
          </Animated.View>
        )}
        
        <Animated.View
          entering={FadeInDown.delay(300).duration(300)}
          style={styles.actions}
        >
          <TouchableOpacity
            style={[styles.signOutButton, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}
            onPress={handleSignOut}
          >
            <Text style={[styles.signOutText, { color: '#DC2626' }]}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  editButton: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  childInfo: {
    flex: 1,
    marginLeft: 12,
  },
  childName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  childDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  actions: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  signOutButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  signOutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});