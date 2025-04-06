declare module 'react-native' {
  export * from '@types/react-native'
  export const StyleSheet: any
  export const Platform: any
  export const useColorScheme: () => 'light' | 'dark' | null
  export type ColorSchemeName = 'light' | 'dark' | null
  export type StyleProp<T> = any
  export type TextStyle = any
  export type ViewStyle = any
  export type OpaqueColorValue = any
  export const View: any
  export const Text: any
  export const TextInput: any
  export const TouchableOpacity: any
  export const ActivityIndicator: any
  // Add other components as needed
} 