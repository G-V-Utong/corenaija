import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: any) {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    
    if (!user && !inAuthGroup) {
      // Redirect to sign-in if user is not signed in and trying to access protected pages
      router.replace('/sign-in')
    } else if (user && inAuthGroup) {
      // Redirect to home if user is signed in and trying to access auth pages
      router.replace('/(tabs)')
    }
  }, [user, segments])
}

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav colorScheme={colorScheme} />
    </AuthProvider>
  );
}

function RootLayoutNav({ colorScheme }: { colorScheme: 'light' | 'dark' }) {
  const { session } = useAuth()
  useProtectedRoute(session)

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
