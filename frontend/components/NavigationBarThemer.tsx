import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useTheme } from '../context/ThemeContext';

export function NavigationBarThemer() {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const updateNavBar = async () => {
      if (Platform.OS === 'android') {
        const navBarColor = isDarkMode ? '#1A1A1A' : '#FFFFFF';
        try {
          await NavigationBar.setVisibilityAsync('visible');
          await NavigationBar.setBackgroundColorAsync(navBarColor);
          await NavigationBar.setButtonStyleAsync(
            isDarkMode ? 'light' : 'dark'
          );
        } catch (error) {
          console.error('Navigation bar error:', error);
        }
      }
    };

    updateNavBar();
  }, [isDarkMode]);

  return null;
}
