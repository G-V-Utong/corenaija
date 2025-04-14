import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { AppEventsProvider } from '../context/AppEventsContext';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { OnboardingProvider } from '../context/OnboardingContext';
import { AuthGuard } from '../components/AuthGuard';
import { NavigationBarThemer } from '../components/NavigationBarThemer';

export default function RootLayout() {
  const { isDarkMode } = useTheme();

  return (
    <ThemeProvider>
      <NavigationBarThemer />
      <AppEventsProvider>
        <StatusBar style={isDarkMode ? 'light' : 'dark'}/>
        <AuthProvider>
          <ToastProvider>
            <LanguageProvider>
              <OnboardingProvider>
                <AuthGuard>
                  <Stack>
                    <Stack.Screen 
                      name="index" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="get-started" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="(auth)" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="(onboarding)" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="(tabs)" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name="settings" 
                      options={{ headerShown: false }} 
                    />
                  </Stack>
                </AuthGuard>
              </OnboardingProvider>
            </LanguageProvider>
          </ToastProvider>
        </AuthProvider>
      </AppEventsProvider>
    </ThemeProvider>
  );
}
