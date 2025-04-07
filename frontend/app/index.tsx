import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

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
          router.replace('/(tabs)');
        } else {
          router.replace('/(onboarding)/get-started');
        }
      }
    };

    checkAuthAndNavigate();
  }, [session, loading]);

  return (
    <View style={styles.container}>
      <Logo size={80} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
