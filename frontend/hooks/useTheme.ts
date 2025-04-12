import { useColorScheme } from 'react-native';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  border: string;
  error: string;
  success: string;
}

const lightColors: ThemeColors = {
  primary: '#006F3C',
  background: '#FFFFFF',
  text: '#353535',
  border: '#E5E5E5',
  error: '#D64F4F',
  success: '#A4D96C',
};

const darkColors: ThemeColors = {
  primary: '#00A9E0',
  background: '#1A1A1A',
  text: '#F4F6F9',
  border: '#404040',
  error: '#FF6B6B',
  success: '#B8E986',
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
};
