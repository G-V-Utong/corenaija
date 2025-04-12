import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { PageLoader } from '../../components/common/PageLoader';

export default function TrainingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Training" />
      </SafeAreaView>
      <PageLoader isLoading={isLoading}>
        <ThemedView style={styles.content}>
          <ThemedView style={styles.messageContainer}>
            <ThemedText style={styles.message}>
              Training content loaded!
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </PageLoader>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});
