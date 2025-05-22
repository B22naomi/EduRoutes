import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  Bell,
  Moon,
  Lock,
  HelpCircle,
  ExternalLink,
  Shield,
  ArrowRight,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const cardBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const secondaryTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' });
  const borderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };
  
  const isAdmin = user?.role === 'admin';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
        </View>
        
        <Animated.View
          entering={FadeInDown.delay(100).duration(300)}
          style={[styles.section, { backgroundColor: cardBgColor, borderColor }]}
        >
          <Text style={[styles.sectionTitle, { color: textColor }]}>Appearance</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Moon size={20} color="#1E40AF" />
              </View>
              <Text style={[styles.settingLabel, { color: textColor }]}>Dark Mode</Text>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={toggleColorScheme}
              trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Animated.View>
        
        <Animated.View
          entering={FadeInDown.delay(150).duration(300)}
          style={[styles.section, { backgroundColor: cardBgColor, borderColor }]}
        >
          <Text style={[styles.sectionTitle, { color: textColor }]}>Notifications</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#FEF2F2' }]}>
                <Bell size={20} color="#DC2626" />
              </View>
              <Text style={[styles.settingLabel, { color: textColor }]}>Push Notifications</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#F0FDF4' }]}>
                <Bell size={20} color="#16A34A" />
              </View>
              <Text style={[styles.settingLabel, { color: textColor }]}>Email Notifications</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Animated.View>
        
        <Animated.View
          entering={FadeInDown.delay(200).duration(300)}
          style={[styles.section, { backgroundColor: cardBgColor, borderColor }]}
        >
          <Text style={[styles.sectionTitle, { color: textColor }]}>Privacy & Security</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#FFF7ED' }]}>
                <Lock size={20} color="#EA580C" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: textColor }]}>Change Password</Text>
                <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                  Update your password for security
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/change-password')}>
              <ArrowRight size={20} color={secondaryTextColor} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#F8FAFC' }]}>
                <HelpCircle size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: textColor }]}>Location Services</Text>
                <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                  Allow app to access your location
                </Text>
              </View>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Animated.View>
        
        {isAdmin && (
          <Animated.View
            entering={FadeInDown.delay(250).duration(300)}
            style={[styles.section, { backgroundColor: cardBgColor, borderColor }]}
          >
            <Text style={[styles.sectionTitle, { color: textColor }]}>Admin Controls</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#F0F9FF' }]}>
                  <Shield size={20} color="#0369A1" />
                </View>
                <View>
                  <Text style={[styles.settingLabel, { color: textColor }]}>User Management</Text>
                  <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                    Manage drivers and staff accounts
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push('/admin/users')}>
                <ArrowRight size={20} color={secondaryTextColor} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#F0FDFA' }]}>
                  <Shield size={20} color="#0D9488" />
                </View>
                <View>
                  <Text style={[styles.settingLabel, { color: textColor }]}>Route Management</Text>
                  <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                    Configure bus routes and stops
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push('/admin/routes')}>
                <ArrowRight size={20} color={secondaryTextColor} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        
        <Animated.View
          entering={FadeInDown.delay(300).duration(300)}
          style={[styles.section, { backgroundColor: cardBgColor, borderColor }]}
        >
          <Text style={[styles.sectionTitle, { color: textColor }]}>Support</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#F3E8FF' }]}>
                <HelpCircle size={20} color="#7E22CE" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: textColor }]}>Help Center</Text>
                <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                  View FAQs and get support
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/help')}>
              <ArrowRight size={20} color={secondaryTextColor} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <View style={[styles.settingIconContainer, { backgroundColor: '#ECFDF5' }]}>
                <ExternalLink size={20} color="#059669" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: textColor }]}>About EduRoutes</Text>
                <Text style={[styles.settingDescription, { color: secondaryTextColor }]}>
                  Version 1.0.0
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/about')}>
              <ArrowRight size={20} color={secondaryTextColor} />
            </TouchableOpacity>
          </View>
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
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
  },
  section: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    padding: 16,
    paddingBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
});