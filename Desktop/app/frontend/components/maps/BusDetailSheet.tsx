import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { X, Navigation, Phone, AlertTriangle, Users } from 'lucide-react-native';

interface BusDetailSheetProps {
  bus: any;
  onClose: () => void;
  animatedStyle: any;
  cardBgColor: string;
  textColor: string;
  secondaryTextColor: string;
}

const BusDetailSheet: React.FC<BusDetailSheetProps> = ({
  bus,
  onClose,
  animatedStyle,
  cardBgColor,
  textColor,
  secondaryTextColor,
}) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return '#10B981';
      case 'delayed':
        return '#F59E0B';
      case 'inactive':
        return '#64748B';
      default:
        return '#64748B';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'on-time':
        return 'On time';
      case 'delayed':
        return `Delayed (${bus.delayMinutes || 5} min)`;
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  return (
    <Animated.View
      style={[
        styles.sheetContainer,
        { backgroundColor: cardBgColor },
        animatedStyle,
      ]}
    >
      <View style={styles.sheetHeader}>
        <View>
          <Text style={[styles.busTitle, { color: textColor }]}>
            Bus #{bus.number}
          </Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(bus.status) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(bus.status) },
              ]}
            >
              {getStatusText(bus.status)}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <X size={20} color={secondaryTextColor} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={[styles.detailIconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Users size={20} color="#1E40AF" />
          </View>
          <View>
            <Text style={[styles.detailValue, { color: textColor }]}>
              {bus.capacity || 48} seats / {bus.studentsOnboard || 23} students
            </Text>
            <Text style={[styles.detailLabel, { color: secondaryTextColor }]}>
              Capacity / Onboard
            </Text>
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <View style={[styles.detailIconContainer, { backgroundColor: '#FEF2F2' }]}>
            <AlertTriangle size={20} color="#DC2626" />
          </View>
          <View>
            <Text style={[styles.detailValue, { color: textColor }]}>
              {bus.incidentCount || 0} incidents today
            </Text>
            <Text style={[styles.detailLabel, { color: secondaryTextColor }]}>
              Service Status
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#F1F5F9' }]}
        >
          <Navigation size={20} color="#0F172A" />
          <Text style={styles.actionText}>Navigate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#1E40AF' }]}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={[styles.actionText, { color: '#FFFFFF' }]}>Contact Driver</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  busTitle: {
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
  closeButton: {
    padding: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 2,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 8,
  },
});

export default BusDetailSheet;