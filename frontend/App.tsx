import React from 'react';
import { AppEventsProvider } from './context/AppEventsContext';
import { AuthProvider } from './context/AuthContext';
import { OnboardingProvider } from './context/OnboardingContext';
import { ThemeProvider } from './context/ThemeContext';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <AppEventsProvider>
      <ThemeProvider>
        <AuthProvider>
          <OnboardingProvider>
            <Slot />
          </OnboardingProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppEventsProvider>
  );
} 