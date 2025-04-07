import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function ThemedText({ style, ...props }: TextProps) {
  const { isDarkMode } = useTheme();

  return (
    <Text 
      style={[
        { color: isDarkMode ? '#FFFFFF' : '#000000' },
        style
      ]} 
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    color: '#0066CC',
  },
});
