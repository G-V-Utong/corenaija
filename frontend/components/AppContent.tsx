import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { NavigationBarThemer } from './NavigationBarThemer';
import { AppEventsProvider } from '../context/AppEventsContext';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { LanguageProvider } from '../context/LanguageContext';
import { OnboardingProvider } from '../context/OnboardingContext';
import { AuthGuard } from './AuthGuard';

export function AppContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <NavigationBarThemer />
      <AppEventsProvider>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} translucent={false} backgroundColor={isDarkMode ? '#1A1A1A' : '#FFFFFF'}/>
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
    </>
  );
}