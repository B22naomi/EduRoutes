import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Bus, Users, MapPin, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const BusStatusCard = () => {
  const router = useRouter();
  
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  // Mock data - in a real app, this would come from props or context
  const busData = {
    number: '42',
    status: 'on-route',
    studentsOnboard: 23,
    nextStop: 'Maple Street & 5th Avenue',
    estimatedArrival: '7 min',
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-route':
        return '#10B981';
      case 'delayed':
        return '#F59E0B';
      case 'stopped':
        return '#DC2626';
      default:
        return '#64748B';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'on-route':
        return 'On Route';
      case 'delayed':
        return 'Delayed';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };
  
  const statusColor = getStatusColor(busData.status);

  return (
    <View style={[styles.card, { backgroundColor: cardBgColor, borderColor }]}>
      <View style={styles.header}>
        <View style={styles.busInfo}>
          <View style={[styles.busIconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Bus size={24} color="#1E40AF" />
          </View>
          <View>
            <Text style={[styles.busNumber, { color: textColor }]}>Bus #{busData.number}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {getStatusText(busData.status)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.viewRouteButton, { borderColor }]}
          onPress={() => router.push('/(tabs)/maps')}
        >
          <Text style={[styles.viewRouteText, { color: '#1E40AF' }]}>View Route</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.divider, { backgroundColor: borderColor }]} />
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={20} color={secondaryTextColor} />
          <Text style={[styles.statValue, { color: textColor }]}>{busData.studentsOnboard}</Text>
          <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Onboard</Text>
        </View>
        
        <View style={[styles.dividerVertical, { backgroundColor: borderColor }]} />
        
        <View style={styles.statItem}>
          <MapPin size={20} color={secondaryTextColor} />
          <Text style={[styles.statValue, { color: textColor }]} numberOfLines={1}>
            {busData.nextStop}
          </Text>
          <Text style={[styles.statLabel, { color: secondaryTextColor }]}>Next Stop</Text>
        </View>
        
        <View style={[styles.dividerVertical, { backgroundColor: borderColor }]} />
        
        <View style={styles.statItem}>
          <Clock size={20} color={secondaryTextColor} />
          <Text style={[styles.statValue, { color: textColor }]}>{busData.estimatedArrival}</Text>
          <Text style={[styles.statLabel, { color: secondaryTextColor }]}>ETA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  busNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  viewRouteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  viewRouteText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  dividerVertical: {
    width: 1,
    height: '100%',
  },
});

export default BusStatusCard;