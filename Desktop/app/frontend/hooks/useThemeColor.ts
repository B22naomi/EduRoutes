import { useColorScheme } from 'react-native';

type ColorSchemeColors = {
  light: string;
  dark: string;
};

export function useThemeColor(colors: ColorSchemeColors): string {
  const colorScheme = useColorScheme();
  return colors[colorScheme || 'light'];
}