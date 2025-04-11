import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { useTheme } from '../../context/ThemeContext';

interface OnboardingNavigationProps {
  currentSection: number;
  totalSections: number;
  onNext: () => void;
  onBack: () => void;
}

export default function OnboardingNavigation({
  currentSection,
  totalSections,
  onNext,
  onBack,
}: OnboardingNavigationProps) {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      {currentSection > 0 && (
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={onBack}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
          <ThemedText style={styles.buttonText}>Back</ThemedText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={onNext}
      >
        <ThemedText style={styles.buttonText}>
          {currentSection === totalSections - 1 ? 'Finish' : 'Next'}
        </ThemedText>
        <Ionicons
          name="arrow-forward"
          size={24}
          color={isDarkMode ? '#FFFFFF' : '#000000'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#FF6B00',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
}); 