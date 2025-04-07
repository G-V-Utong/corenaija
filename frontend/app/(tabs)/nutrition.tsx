import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { ThemedView } from '../../components/ThemedView';

export default function NutritionScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Nutrition" />
      </SafeAreaView>
      <ThemedView style={styles.content}>
        {/* Nutrition content will go here */}
      </ThemedView>
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
}); 