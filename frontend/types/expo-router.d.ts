declare module "expo-router" {
  import { ComponentProps } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  
  export type RelativePathString = `/${string}`
  export type ExternalPathString = `https://${string}` | `http://${string}`
  export type PathString = RelativePathString | ExternalPathString

  export interface Router {
    push(path: PathString): void
    replace(path: PathString): void
  }

  export function useRouter(): Router
  export function useSegments(): string[]
  
  export interface StackScreenProps {
    name?: string
    options?: {
      headerShown?: boolean
      title?: string
    }
  }

  export const Stack: React.FC<{children: React.ReactNode}> & {
    Screen: React.FC<StackScreenProps>
  }

  export const Tabs: any
  export const Link: any
} 