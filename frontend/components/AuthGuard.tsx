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

    const checkOnboardingStatus = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (!data?.onboarding_completed && !inOnboardingGroup) {
          router.replace('/(onboarding)');
        } else if (data?.onboarding_completed && inOnboardingGroup) {
          router.replace('/(tabs)');
        }
      } catch (err) {
        console.error('Error checking onboarding status:', err);
      }
    };

    if (!session) {
      // Not authenticated
      if (!inAuthGroup && !inOnboardingGroup && !isGetStartedRoute) {
        // Always redirect to get-started if not authenticated
        router.replace('/get-started');
      }
    } else {
      // Authenticated
      if (inAuthGroup || isGetStartedRoute) {
        // Check onboarding status and redirect accordingly
        checkOnboardingStatus();
      } else {
        // Check onboarding status for other routes
        checkOnboardingStatus();
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