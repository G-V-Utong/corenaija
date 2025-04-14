import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { ThemedView } from './ThemedView';
import { supabase } from '../lib/supabase';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Skip the effect if still loading
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const isGetStartedRoute = segments[0] === 'get-started';
    const isSplashScreen = segments[0] === 'index';

    // Don't redirect if we're on the splash screen
    if (isSplashScreen) return;

    if (!session) {
      // Not authenticated
      if (!inAuthGroup && !inOnboardingGroup && !isGetStartedRoute) {
        // Always redirect to get-started if not authenticated
        router.replace('/get-started');
      }
    } else {
      // User is authenticated, but let OnboardingContext handle onboarding status
      if (inAuthGroup || isGetStartedRoute) {
        router.replace('/(onboarding)');
      }
    }
  }, [session, loading, segments, router]);

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F36746" />
      </ThemedView>
    );
  }

  return <>{children}</>;
} 