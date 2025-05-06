import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bus, Clock, AlertTriangle, LocateFixed } from 'lucide-react-native';

interface BusListItemProps {
  bus: any;
  onPress: () => void;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
}

const BusListItem: React.FC<BusListItemProps> = ({
  bus,
  onPress,
  textColor,
  secondaryTextColor,
  borderColor,
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
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return <LocateFixed size={16} color={getStatusColor(status)} />;
      case 'delayed':
        return <Clock size={16} color={getStatusColor(status)} />;
      case 'inactive':
        return <AlertTriangle size={16} color={getStatusColor(status)} />;
      default:
        return <LocateFixed size={16} color={getStatusColor(status)} />;
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
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: borderColor }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Bus size={24} color={textColor} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.busNumber, { color: textColor }]}>
          Bus #{bus.number}
        </Text>
        
        <View style={styles.statusContainer}>
          {getStatusIcon(bus.status)}
          <Text style={[styles.statusText, { color: getStatusColor(bus.status) }]}>
            {getStatusText(bus.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={[styles.speedText, { color: secondaryTextColor }]}>
          {bus.speed} mph
        </Text>
        <Text style={[styles.timeText, { color: secondaryTextColor }]}>
          ETA: {bus.eta || '5 min'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  busNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  details: {
    alignItems: 'flex-end',
  },
  speedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});

export default BusListItem;