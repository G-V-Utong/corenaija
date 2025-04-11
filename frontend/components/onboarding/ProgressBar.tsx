import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { isDarkMode } = useTheme();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progressBar,
          { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
        ]}
      >
        <View 
          style={[
            styles.progress,
            { 
              width: `${progress}%`,
              backgroundColor: '#FF6B00'
            }
          ]} 
        />
      </View>
      <View style={styles.stepsContainer}>
        <View style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#64748B',
  },
}); 