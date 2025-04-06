import { StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Link } from 'expo-router';

export default function SignIn() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign In</ThemedText>
      <Link href="/sign-up">
        <ThemedText type="link">Don't have an account? Sign up</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
}); 