import { View, ViewProps } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
  style?: ViewProps['style'];
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
