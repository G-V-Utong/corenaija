import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthGuard } from '../components/AuthGuard';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AuthGuard>
            <Stack>
              <Stack.Screen 
                name="index" 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="(onboarding)" 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="(auth)" 
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
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
