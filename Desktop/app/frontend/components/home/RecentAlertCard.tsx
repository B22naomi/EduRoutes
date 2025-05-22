import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AlertTriangle, Clock, X, ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

interface RecentAlertCardProps {
  title: string;
  description: string;
  time: string;
  type: 'delay' | 'alert' | 'info' | 'success';
}

const RecentAlertCard: React.FC<RecentAlertCardProps> = ({
  title,
  description,
  time,
  type,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  const getAlertColor = () => {
    switch (type) {
      case 'delay':
        return '#F59E0B';
      case 'alert':
        return '#DC2626';
      case 'info':
        return '#3B82F6';
      case 'success':
        return '#10B981';
      default:
        return '#64748B';
    }
  };
  
  const getAlertIcon = () => {
    switch (type) {
      case 'delay':
        return <Clock size={24} color={getAlertColor()} />;
      case 'alert':
        return <AlertTriangle size={24} color={getAlertColor()} />;
      default:
        return <AlertTriangle size={24} color={getAlertColor()} />;
    }
  };
  
  const contentHeight = useSharedValue(0);
  
  const toggleExpand = () => {
    const newValue = !expanded;
    setExpanded(newValue);
    contentHeight.value = withTiming(newValue ? 100 : 0);
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(contentHeight.value, [0, 100], [0, 80]),
      opacity: interpolate(contentHeight.value, [0, 50, 100], [0, 0.8, 1]),
      overflow: 'hidden',
    };
  });
  
  if (dismissed) return null;

  return (
    <View style={[styles.card, { backgroundColor: cardBgColor, borderColor }]}>
      <View style={styles.header}>
        <View style={styles.alertInfo}>
          <View style={[styles.iconContainer, { backgroundColor: `${getAlertColor()}10` }]}>
            {getAlertIcon()}
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: textColor }]} numberOfLines={expanded ? 0 : 1}>
              {title}
            </Text>
            <Text style={[styles.time, { color: secondaryTextColor }]}>{time}</Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleExpand}
          >
            {expanded ? (
              <ChevronUp size={20} color={secondaryTextColor} />
            ) : (
              <ChevronDown size={20} color={secondaryTextColor} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setDismissed(true)}
          >
            <X size={20} color={secondaryTextColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={[styles.description, { color: secondaryTextColor }]}>
          {description}
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButtonExpanded, { backgroundColor: `${getAlertColor()}20` }]}
          >
            <Text style={[styles.actionButtonText, { color: getAlertColor() }]}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButtonExpanded: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});

export default RecentAlertCard;