import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { ThemedView } from '../components/ThemedView';
import { supabase } from '../lib/supabase';

export default function SplashScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [splashComplete, setSplashComplete] = useState(false);

  // Handle splash screen timer
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashComplete(true);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  // Handle navigation after splash screen
  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Only proceed if splash screen timer is complete
      if (!splashComplete) return;

      // For logged-in users, check their onboarding status
      if (session) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', session.user.id)
            .single();

          if (profile?.onboarding_completed) {
            router.replace('/(tabs)');
          } else {
            router.replace('/(onboarding)');
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          router.replace('/(tabs)');
        }
      } else if (!loading) {
        // Only navigate to get-started if we're sure there's no session
        router.replace('/get-started');
      }
    };

    checkAuthAndNavigate();
  }, [splashComplete, loading, session]);

  return (
    <ThemedView style={styles.container}>
      <Logo size={80} color="#F36746" />
      <ActivityIndicator 
        size="large" 
        color="#F36746" 
        style={styles.loader}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loader: {
    marginTop: 20,
  },
});
