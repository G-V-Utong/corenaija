import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useTheme } from '../../../context/ThemeContext';
import { ThemedText } from '../../ThemedText';
import { Ionicons } from '@expo/vector-icons';

const FASTING_TYPES = [
  { id: 'none', label: 'None' },
  { id: 'intermittent', label: 'Intermittent Fasting' },
  { id: 'extended', label: 'Extended Fasting' },
  { id: 'time_restricted', label: 'Time-Restricted Eating' },
  { id: 'religious', label: 'Religious Fasting' },
];

const FASTING_SCHEDULES = [
  { id: '16_8', label: '16:8 (16 hours fast, 8 hours eat)' },
  { id: '18_6', label: '18:6 (18 hours fast, 6 hours eat)' },
  { id: '20_4', label: '20:4 (20 hours fast, 4 hours eat)' },
  { id: '5_2', label: '5:2 (5 days normal, 2 days restricted)' },
  { id: 'custom', label: 'Custom Schedule' },
];

const FASTING_GOALS = [
  { id: 'weight_loss', label: 'Weight Loss' },
  { id: 'metabolic_health', label: 'Metabolic Health' },
  { id: 'insulin_sensitivity', label: 'Insulin Sensitivity' },
  { id: 'mental_clarity', label: 'Mental Clarity' },
  { id: 'longevity', label: 'Longevity' },
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export default function FastingPreferences() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { isDarkMode } = useTheme();

  const setFastingStatus = (status: string) => {
    updateOnboardingData({ 
      fasting_status: status,
      // Clear other fasting-related fields if 'none' is selected
      ...(status === 'none' ? {
        preferred_fasting_protocol: undefined,
        fasting_reason: undefined,
        fasting_experience: undefined
      } : {})
    });
  };

  const setFastingProtocol = (protocol: string) => {
    updateOnboardingData({ preferred_fasting_protocol: protocol });
  };

  const setFastingReason = (reason: string) => {
    updateOnboardingData({ fasting_reason: reason });
  };

  const setFastingExperience = (experience: string) => {
    updateOnboardingData({ fasting_experience: experience });
  };

  const renderOption = (
    id: string,
    label: string,
    isSelected: boolean,
    onPress: () => void,
    isMultiSelect = false
  ) => (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.selectedOption,
        { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
      ]}
      onPress={onPress}
    >
      <ThemedText style={styles.optionLabel}>{label}</ThemedText>
      {isSelected && (
        <Ionicons
          name={isMultiSelect ? 'checkmark-circle' : 'radio-button-on'}
          size={24}
          color="#F36746"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.subtext}>If fasting's part of your lifestyle or something you want to try, we'll guide you step by step.</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Are you currently practicing any form of fasting?
        </ThemedText>
        {FASTING_TYPES.map(type => (
          <View key={type.id} style={styles.optionContainer}>
            {renderOption(
              type.id,
              type.label,
              onboardingData.fasting_status === type.id,
              () => setFastingStatus(type.id)
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Preferred Protocol</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Choose your preferred fasting schedule
        </ThemedText>
        {FASTING_SCHEDULES.map(schedule => (
          <View key={schedule.id} style={styles.optionContainer}>
            {renderOption(
              schedule.id,
              schedule.label,
              onboardingData.preferred_fasting_protocol === schedule.id,
              () => setFastingProtocol(schedule.id)
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Fasting Goals</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          What's your primary reason for fasting?
        </ThemedText>
        {FASTING_GOALS.map(goal => (
          <View key={goal.id} style={styles.optionContainer}>
            {renderOption(
              goal.id,
              goal.label,
              onboardingData.fasting_reason === goal.id,
              () => setFastingReason(goal.id)
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Experience Level</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          How experienced are you with fasting?
        </ThemedText>
        {EXPERIENCE_LEVELS.map(level => (
          <View key={level.id} style={styles.optionContainer}>
            {renderOption(
              level.id,
              level.label,
              onboardingData.fasting_experience === level.id,
              () => setFastingExperience(level.id)
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
  },
  optionContainer: {
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#F36746',
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 16,
    flex: 1,
  },
}); 