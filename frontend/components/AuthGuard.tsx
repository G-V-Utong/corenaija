import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { ThemedView } from './ThemedView';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Skip the effect if still loading
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const isIndexRoute = segments.length === 0 || segments[0] === 'index';

    if (!session) {
      // Not authenticated
      if (!inAuthGroup && !inOnboardingGroup && !isIndexRoute) {
        // Redirect to sign-in if trying to access protected routes
        router.replace('/(auth)/sign-in');
      }
    } else {
      // Authenticated
      if (inAuthGroup || inOnboardingGroup) {
        // Redirect to home if trying to access auth/onboarding routes
        router.replace('/(tabs)');
      }
    }
  }, [session, segments, loading]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </ThemedView>
    );
  }

  return <>{children}</>;
} 