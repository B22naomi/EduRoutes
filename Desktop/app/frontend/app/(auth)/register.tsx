import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ROLES = ['parent', 'driver', 'admin'];

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(ROLES[0]);
  const { register, isLoading } = useAuth();
  const router = useRouter();
  
  const backgroundColor = useThemeColor({ light: '#F8FAFC', dark: '#0F172A' });
  const textColor = useThemeColor({ light: '#1E293B', dark: '#F8FAFC' });
  const placeholderColor = useThemeColor({ light: '#94A3B8', dark: '#64748B' });
  const inputBgColor = useThemeColor({ light: '#FFFFFF', dark: '#1E293B' });
  const inputBorderColor = useThemeColor({ light: '#E2E8F0', dark: '#334155' });
  const primaryColor = '#1E40AF';
  const primaryText = '#FFFFFF';

  const handleRegister = async () => {
    try {
      await register(name, email, password, role);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.formContainer}>
          <Text style={[styles.welcomeText, { color: textColor }]}>Create Account</Text>
          <Text style={[styles.instructionText, { color: placeholderColor }]}>
            Register to get started with EduRoutes
          </Text>

          <View style={styles.roleSelector}>
            {ROLES.map((roleType) => (
              <TouchableOpacity
                key={roleType}
                style={[
                  styles.roleButton,
                  { 
                    backgroundColor: role === roleType ? primaryColor : inputBgColor,
                    borderColor: role === roleType ? primaryColor : inputBorderColor,
                  },
                ]}
                onPress={() => handleRoleSelect(roleType)}
              >
                <Text
                  style={[
                    styles.roleText,
                    { color: role === roleType ? primaryText : textColor },
                  ]}
                >
                  {roleType.charAt(0).toUpperCase() + roleType.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: textColor }]}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="John Doe"
              placeholderTextColor={placeholderColor}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: textColor }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                  color: textColor,
                },
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={placeholderColor}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: textColor }]}>Password</Text>
            <View
              style={[
                styles.passwordInputContainer,
                {
                  backgroundColor: inputBgColor,
                  borderColor: inputBorderColor,
                },
              ]}
            >
              <TextInput
                style={[styles.passwordInput, { color: textColor }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Create a secure password"
                placeholderTextColor={placeholderColor}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={placeholderColor} />
                ) : (
                  <Eye size={20} color={placeholderColor} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            isLoading={isLoading}
            icon={<ArrowRight size={18} color="#FFFFFF" />}
            style={{ marginTop: 24 }}
          />

          <View style={styles.footerContainer}>
            <Text style={[styles.footerText, { color: placeholderColor }]}>
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: primaryColor }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 32,
  },
  formContainer: {
    padding: 24,
  },
  welcomeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 8,
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 24,
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  roleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});