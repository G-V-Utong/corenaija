import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function ThemedView({ style, ...props }: ViewProps) {
  const { isDarkMode } = useTheme();

  return (
    <View 
      style={[
        { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' },
        style
      ]} 
      {...props} 
    />
  );
}
