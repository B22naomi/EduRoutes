import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Map, Bus, Clock, AlertCircle, User, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { mockStudents } from '@/data/mockData';
import BusStatusCard from '@/components/home/BusStatusCard';
import RecentAlertCard from '@/components/home/RecentAlertCard';
import GreetingHeader from '@/components/home/GreetingHeader';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const isParent = user?.role === 'parent';
  const isDriver = user?.role === 'driver';
  const isAdmin = user?.role === 'admin';

  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  const accentColor = '#F59E0B';

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <GreetingHeader user={user} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {isParent 
              ? 'Your Children' 
              : isDriver 
              ? 'Your Bus Route'
              : 'School Overview'
            }
          </Text>
          
          {isParent && (
            <View>
              {mockStudents.map((student, index) => (
                <Animated.View 
                  key={student.id} 
                  entering={FadeInRight.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity
                    style={[styles.studentCard, { backgroundColor: cardBgColor, borderColor }]}
                    onPress={() => router.push(`/student/${student.id}`)}
                  >
                    <Image source={{ uri: student.avatar }} style={styles.studentAvatar} />
                    <View style={styles.studentInfo}>
                      <Text style={[styles.studentName, { color: textColor }]}>{student.name}</Text>
                      <Text style={[styles.studentDetails, { color: secondaryTextColor }]}>
                        {student.grade} • Bus #{student.busNumber}
                      </Text>
                    </View>
                    <View style={styles.studentActions}>
                      <View style={[styles.statusBadge, 
                        { backgroundColor: student.status === 'on-bus' ? '#10B981' : accentColor }]}
                      >
                        <Text style={styles.statusText}>
                          {student.status === 'on-bus' ? 'On Bus' : 'At School'}
                        </Text>
                      </View>
                      <ChevronRight size={20} color={secondaryTextColor} />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
              
              <TouchableOpacity
                style={[styles.addButton, { borderColor }]}
                onPress={() => router.push('/add-student')}
              >
                <Text style={[styles.addButtonText, { color: textColor }]}>
                  + Add Another Child
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {isDriver && (
            <Animated.View entering={FadeIn.duration(400)}>
              <BusStatusCard />
            </Animated.View>
          )}
          
          {isAdmin && (
            <View style={styles.statCards}>
              <Animated.View 
                entering={FadeIn.delay(100).duration(400)}
                style={[styles.statCard, { backgroundColor: cardBgColor, borderColor }]}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#EFF6FF' }]}>
                  <Bus size={24} color="#1E40AF" />
                </View>
                <Text style={[styles.statValue, { color: textColor }]}>12</Text>
                <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Buses Active</Text>
              </Animated.View>
              
              <Animated.View 
                entering={FadeIn.delay(200).duration(400)}
                style={[styles.statCard, { backgroundColor: cardBgColor, borderColor }]}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#F0FDF4' }]}>
                  <User size={24} color="#16A34A" />
                </View>
                <Text style={[styles.statValue, { color: textColor }]}>347</Text>
                <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Students</Text>
              </Animated.View>
              
              <Animated.View 
                entering={FadeIn.delay(300).duration(400)}
                style={[styles.statCard, { backgroundColor: cardBgColor, borderColor }]}
              >
                <View style={[styles.statIconContainer, { backgroundColor: '#FEF2F2' }]}>
                  <AlertCircle size={24} color="#DC2626" />
                </View>
                <Text style={[styles.statValue, { color: textColor }]}>2</Text>
                <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Alerts</Text>
              </Animated.View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Bus Status</Text>
          <RecentAlertCard 
            title="Bus #42 is running late"
            description="Estimated delay of 10 minutes due to traffic"
            time="5 mins ago"
            type="delay"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: cardBgColor, borderColor }]}
              onPress={() => router.push('/(tabs)/maps')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Map size={24} color="#1E40AF" />
              </View>
              <Text style={[styles.actionText, { color: textColor }]}>View Routes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: cardBgColor, borderColor }]}
              onPress={() => router.push('/schedule')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#FFF7ED' }]}>
                <Clock size={24} color="#EA580C" />
              </View>
              <Text style={[styles.actionText, { color: textColor }]}>Schedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: cardBgColor, borderColor }]}
              onPress={() => router.push('/(tabs)/notifications')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#FEF2F2' }]}>
                <AlertCircle size={24} color="#DC2626" />
              </View>
              <Text style={[styles.actionText, { color: textColor }]}>Alerts</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  studentName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  studentDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  studentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  addButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  statCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  statIconContainer: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  actionIconContainer: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});