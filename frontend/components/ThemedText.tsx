import { Text, TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  children?: React.ReactNode;
}

export function ThemedText({ style, lightColor, darkColor, type = 'default', children, ...otherProps }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text style={[{ color }, styles[type], style]} {...otherProps}>
      {children}
    </Text>
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
