import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
}) => {
  // Calculate styles based on props
  const getBackgroundColor = () => {
    if (disabled) return '#CBD5E1';
    
    switch (variant) {
      case 'primary':
        return '#1E40AF';
      case 'secondary':
        return '#0D9488';
      case 'outline':
        return 'transparent';
      case 'danger':
        return '#DC2626';
      default:
        return '#1E40AF';
    }
  };
  
  const getTextColor = () => {
    if (disabled) return '#94A3B8';
    
    switch (variant) {
      case 'outline':
        return '#1E40AF';
      default:
        return '#FFFFFF';
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return '#CBD5E1';
    
    switch (variant) {
      case 'outline':
        return '#1E40AF';
      default:
        return 'transparent';
    }
  };
  
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 36;
      case 'medium':
        return 48;
      case 'large':
        return 56;
      default:
        return 48;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };
  
  const buttonStyles = {
    ...styles.button,
    backgroundColor: getBackgroundColor(),
    height: getHeight(),
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1 : 0,
  };
  
  const textStyles = {
    ...styles.text,
    color: getTextColor(),
    fontSize: getFontSize(),
  };

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && <View style={styles.leftIcon}>{icon}</View>}
          <Text style={[textStyles, textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.rightIcon}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;