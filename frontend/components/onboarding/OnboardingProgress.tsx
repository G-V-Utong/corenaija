import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useTheme } from '../../context/ThemeContext';

interface OnboardingProgressProps {
  sections: Array<{ id: string; title: string }>;
  currentSection: number;
}

export default function OnboardingProgress({ sections, currentSection }: OnboardingProgressProps) {
  const { isDarkMode } = useTheme();
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { backgroundColor: isDarkMode ? '#334155' : '#E2E8F0' }
          ]}
        >
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
        <ThemedText style={styles.progressText}>
          {currentSection + 1} of {sections.length}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  progressContainer: {
    marginBottom: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F36746',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionIndicator: {
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeSection: {
    backgroundColor: '#F36746',
  },
  sectionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeSectionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 