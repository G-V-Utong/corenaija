import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { LoadingSpinner } from './LoadingSpinner';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  isLoading, 
  children
}) => {
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <LoadingSpinner size={50} />
      </ThemedView>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 