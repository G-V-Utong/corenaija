declare module '@react-navigation/native' {
  export const DarkTheme: any
  export const DefaultTheme: any
  export const ThemeProvider: React.FC<{
    value: any
    children: React.ReactNode
  }>
}

declare module '@react-navigation/bottom-tabs' {
  export interface BottomTabBarButtonProps {
    children: React.ReactNode
    onPress?: () => void
    onPressIn?: (e: any) => void
    style?: any
  }
  
  export function useBottomTabBarHeight(): number
}

declare module '@react-navigation/elements' {
  export const PlatformPressable: React.FC<{
    onPressIn?: (e: any) => void
    children: React.ReactNode
    style?: any
  }>
} 