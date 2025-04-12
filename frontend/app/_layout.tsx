import { Stack } from 'expo-router';
import { AppEventsProvider } from '../context/AppEventsContext';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { OnboardingProvider } from '../context/OnboardingContext';
import { AuthGuard } from '../components/AuthGuard';

export default function RootLayout() {
  return (
    <AppEventsProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </AppEventsProvider>
  );
}
