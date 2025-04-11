import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import { ThemedView } from '../components/ThemedView';
import { supabase } from '../lib/supabase';

export default function SplashScreen() {
  const router = useRouter();
  const { session, loading } = useAuth();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      // Wait for 2 seconds to show the splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Only navigate if we're not still loading
      if (!loading) {
        if (session) {
          try {
            // Check onboarding status
            const { data: profile } = await supabase
              .from('profiles')
              .select('onboarding_completed')
              .eq('id', session.user.id)
              .single();

            if (profile?.onboarding_completed) {
              router.replace('/(tabs)');
            } else {
              router.replace('/onboarding');
            }
          } catch (error) {
            console.error('Error checking onboarding status:', error);
            router.replace('/(tabs)');
          }
        } else {
          // Navigate to get-started screen instead of directly to sign-in
          router.replace('/(onboarding)/get-started');
        }
      }
    };

    checkAuthAndNavigate();
  }, [session, loading]);

  return (
    <ThemedView style={styles.container}>
      <Logo size={80} color="#FF6B00" />
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#FF6B00" 
          style={styles.loader}
        />
      )}
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
