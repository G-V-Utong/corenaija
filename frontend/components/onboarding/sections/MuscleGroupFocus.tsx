import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../../../context/OnboardingContext';
import { OnboardingData } from '../../../types/onboarding.types';

interface MuscleGroupFocusProps {
  onboardingData: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
}

type MuscleGroup = 'balanced' | 'chest' | 'back' | 'arms' | 'legs' | 'abs' | 'glutes';

const muscleGroups: { id: MuscleGroup; label: string }[] = [
  { id: 'balanced', label: 'Balanced (Full Body)' },
  { id: 'chest', label: 'Chest Focus' },
  { id: 'back', label: 'Back Focus' },
  { id: 'arms', label: 'Arms Focus' },
  { id: 'legs', label: 'Legs Focus' },
  { id: 'abs', label: 'Abs Focus' },
  { id: 'glutes', label: 'Glutes Focus' }
];

export default function MuscleGroupFocus({ onboardingData, onUpdate }: MuscleGroupFocusProps) {
  const handleMuscleGroupSelect = (muscleGroup: MuscleGroup) => {
    onUpdate({ muscle_group_focus: muscleGroup });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Primary Muscle Group Focus</Text>
      <Text style={styles.description}>
        Choose which muscle groups you want to focus on during your workouts.
        This will help us customize your training program.
      </Text>

      <View style={styles.optionsContainer}>
        {muscleGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.optionButton,
              onboardingData.muscle_group_focus === group.id && styles.selectedButton
            ]}
            onPress={() => handleMuscleGroupSelect(group.id)}
          >
            <Text style={[
              styles.optionText,
              onboardingData.muscle_group_focus === group.id && styles.selectedText
            ]}>
              {group.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
}); 