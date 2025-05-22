import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  RefreshControl,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { mockNotifications } from '@/data/mockData';
import { Bell, Clock, AlertTriangle, CheckCircle2, Info } from 'lucide-react-native';

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  // Process notifications into sections by date
  const processedNotifications = mockNotifications.reduce((acc, notification) => {
    const date = new Date(notification.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let sectionTitle;
    if (date.toDateString() === today.toDateString()) {
      sectionTitle = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      sectionTitle = 'Yesterday';
    } else {
      sectionTitle = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    
    // Find the section or create a new one
    const section = acc.find(section => section.title === sectionTitle);
    if (section) {
      section.data.push(notification);
    } else {
      acc.push({
        title: sectionTitle,
        data: [notification],
      });
    }
    
    return acc;
  }, []);
  
  const getIconByType = (type, color) => {
    switch (type) {
      case 'delay':
        return <Clock size={24} color={color} />;
      case 'alert':
        return <AlertTriangle size={24} color={color} />;
      case 'info':
        return <Info size={24} color={color} />;
      case 'success':
        return <CheckCircle2 size={24} color={color} />;
      default:
        return <Bell size={24} color={color} />;
    }
  };
  
  const getNotificationColor = (type) => {
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
  
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  const renderNotificationItem = ({ item, index, section }) => {
    const iconColor = getNotificationColor(item.type);
    
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 50).duration(300)}
        style={[
          styles.notificationCard,
          { 
            backgroundColor: cardBgColor,
            borderColor,
            borderLeftColor: iconColor,
            borderLeftWidth: 4,
          }
        ]}
      >
        <View style={styles.notificationIconContainer}>
          {getIconByType(item.type, iconColor)}
        </View>
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: textColor }]}>
            {item.title}
          </Text>
          <Text style={[styles.notificationMessage, { color: secondaryTextColor }]}>
            {item.message}
          </Text>
          <Text style={[styles.notificationTime, { color: secondaryTextColor }]}>
            {new Date(item.timestamp).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
        </View>
      </Animated.View>
    );
  };
  
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Notifications</Text>
        <TouchableOpacity>
          <Text style={[styles.markAllRead, { color: '#1E40AF' }]}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      
      {processedNotifications.length > 0 ? (
        <SectionList
          sections={processedNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Bell size={48} color={secondaryTextColor} />
          <Text style={[styles.emptyTitle, { color: textColor }]}>
            No notifications yet
          </Text>
          <Text style={[styles.emptyMessage, { color: secondaryTextColor }]}>
            We'll notify you when there are important updates.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
  },
  markAllRead: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingVertical: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
  },
  notificationIconContainer: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});