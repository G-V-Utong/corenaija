import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useOnboarding } from '@/context/OnboardingContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const primaryGoals = [
  {
    id: 'weight_loss',
    title: 'Lose weight and tone up',
    description: 'Reduce body fat and achieve a toned physique',
    icon: 'trending-down',
    gender: 'female'
  },
  {
    id: 'curvy_figure',
    title: 'Get a curvier figure',
    description: 'Build curves and enhance feminine shape',
    icon: 'body',
    gender: 'female'
  },
  {
    id: 'lean_muscle',
    title: 'Build lean muscle and strength',
    description: 'Develop strength while maintaining a lean physique',
    icon: 'barbell',
    gender: 'female'
  },
  {
    id: 'flexibility',
    title: 'Improve flexibility and posture',
    description: 'Enhance mobility and body alignment',
    icon: 'body',
    gender: 'female'
  },
  {
    id: 'energy_stress',
    title: 'Boost energy and reduce stress',
    description: 'Improve overall well-being and vitality',
    icon: 'heart',
    gender: 'female'
  },
  {
    id: 'consistency',
    title: 'Stay consistent and healthy',
    description: 'Maintain a regular fitness routine',
    icon: 'calendar',
    gender: 'female'
  },
  {
    id: 'exploring',
    title: 'Just getting started — not sure yet',
    description: 'Exploring different fitness options',
    icon: 'help-circle',
    gender: 'female'
  },
  {
    id: 'bulk_up',
    title: 'Build muscle and bulk up',
    description: 'Increase muscle mass and size',
    icon: 'barbell',
    gender: 'male'
  },
  {
    id: 'define_abs',
    title: 'Lose fat and define abs',
    description: 'Achieve a lean, defined physique',
    icon: 'body',
    gender: 'male'
  },
  {
    id: 'endurance',
    title: 'Increase endurance and stamina',
    description: 'Improve cardiovascular fitness',
    icon: 'speedometer',
    gender: 'male'
  },
  {
    id: 'posture',
    title: 'Improve posture and mobility',
    description: 'Enhance movement quality and alignment',
    icon: 'body',
    gender: 'male'
  },
  {
    id: 'maintain_health',
    title: 'Maintain overall health and strength',
    description: 'Keep fit and strong',
    icon: 'heart',
    gender: 'male'
  },
  {
    id: 'stay_consistent',
    title: 'Stay on track consistently',
    description: 'Maintain regular training habits',
    icon: 'calendar',
    gender: 'male'
  },
  {
    id: 'exploring_male',
    title: 'Just getting started — exploring options',
    description: 'Discovering fitness possibilities',
    icon: 'help-circle',
    gender: 'male'
  }
];

const fitnessLevels = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'New to fitness or getting back into it'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Some experience with regular exercise'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Experienced with consistent training'
  }
];

const workoutFrequencyOptions = [
  { id: 2, label: '2-3 times per week' },
  { id: 3, label: '3-4 times per week' },
  { id: 4, label: '4-5 times per week' },
  { id: 6, label: '6+ times per week' }
];

const workoutDurationOptions = [
  '30 minutes or less',
  '30-45 minutes',
  '45-60 minutes',
  '60+ minutes'
];

const equipmentAccess = [
  'Home gym',
  'Commercial gym',
  'Resistance bands',
  'Dumbbells',
  'Bodyweight only'
];

const MUSCLE_GROUPS = [
  {
    id: 'balanced',
    title: 'Balanced (Recommended)',
    description: 'Focus on overall muscle development'
  },
  {
    id: 'chest',
    title: 'Chest',
    description: 'Focus on pectoral muscles'
  },
  {
    id: 'back',
    title: 'Back',
    description: 'Focus on back muscles'
  },
  {
    id: 'arms',
    title: 'Arms',
    description: 'Focus on biceps and triceps'
  },
  {
    id: 'legs',
    title: 'Legs',
    description: 'Focus on quadriceps and hamstrings'
  },
  {
    id: 'abs',
    title: 'Abs',
    description: 'Focus on core muscles'
  },
  {
    id: 'glutes',
    title: 'Glutes',
    description: 'Focus on gluteal muscles'
  }
];

export default function FitnessGoals() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { isDarkMode } = useTheme();

  // Filter goals based on user's gender
  const filteredGoals = primaryGoals.filter(goal => 
    goal.gender === onboardingData?.gender || goal.gender === 'both'
  );

  const toggleEquipmentAccess = (equipment: string) => {
    if (!onboardingData) return;
    
    const currentEquipment = onboardingData.equipment_access || [];
    const newEquipment = currentEquipment.includes(equipment)
      ? currentEquipment.filter((item: string) => item !== equipment)
      : [...currentEquipment, equipment];
    
    if (updateOnboardingData) {
      updateOnboardingData({ equipment_access: newEquipment });
    }
  };

  const renderOption = (
    id: string,
    title: string,
    description: string,
    isSelected: boolean,
    onPress: () => void,
    icon?: string
  ) => (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.selectedOption,
        { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={24}
          color={isSelected ? (isDarkMode ? '#FFFFFF' : '#000000') : (isDarkMode ? '#FFFFFF' : '#000000')}
        />
      )}
      <View style={styles.optionContent}>
        <ThemedText 
          style={[
            styles.optionTitle, 
            isSelected && (isDarkMode ? styles.selectedText : { color: '#000000' })
          ]}
        >
          {title}
        </ThemedText>
        <ThemedText 
          style={[
            styles.optionDescription, 
            isSelected && (isDarkMode ? styles.selectedText : { color: '#000000' })
          ]}
        >
          {description}
        </ThemedText>
      </View>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#F36746"
        />
      )}
    </TouchableOpacity>
  );

  const handleOptionSelect = (key: string, value: any) => {
    if (updateOnboardingData) {
      updateOnboardingData({ [key]: value });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.subtext}>Tell us what you're chasing — strength, energy, weight loss? We're here to run that race with you.</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          What's your main objective?
        </ThemedText>
        {filteredGoals.map(goal => (
          <View key={goal.id} style={styles.optionContainer}>
            {renderOption(
              goal.id,
              goal.title,
              goal.description,
              onboardingData?.primary_fitness_goal === goal.id,
              () => handleOptionSelect('primary_fitness_goal', goal.id),
              goal.icon
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Fitness Level</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          How would you describe your current fitness level?
        </ThemedText>
        {fitnessLevels.map(level => (
          <View key={level.id} style={styles.optionContainer}>
            {renderOption(
              level.id,
              level.title,
              level.description,
              onboardingData?.fitness_level === level.id,
              () => handleOptionSelect('fitness_level', level.id),
              undefined
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Workout Frequency</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          How often do you plan to work out?
        </ThemedText>
        {workoutFrequencyOptions.map(option => (
          <View key={option.id} style={styles.optionContainer}>
            {renderOption(
              option.id.toString(),
              option.label,
              '',
              onboardingData?.workout_frequency === option.id,
              () => handleOptionSelect('workout_frequency', option.id),
              undefined
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Workout Duration</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          How long do you prefer your workouts to be?
        </ThemedText>
        {workoutDurationOptions.map(option => (
          <View key={option} style={styles.optionContainer}>
            {renderOption(
              option,
              option,
              '',
              onboardingData?.workout_duration === option,
              () => handleOptionSelect('workout_duration', option),
              undefined
            )}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Available Equipment</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          What equipment do you have access to?
        </ThemedText>
        <View style={styles.equipmentContainer}>
          {equipmentAccess.map(equipment => (
            <TouchableOpacity
              key={equipment}
              style={[
                styles.equipmentOption,
                onboardingData?.equipment_access?.includes(equipment) && styles.selectedEquipment,
                { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
              ]}
              onPress={() => toggleEquipmentAccess(equipment)}
            >
              <ThemedText
                style={[
                  styles.equipmentText,
                  onboardingData?.equipment_access?.includes(equipment) && (isDarkMode ? styles.selectedText : { color: '#000000' })
                ]}
              >
                {equipment}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Muscle Group Focus */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Which muscle group would you like to focus on?</ThemedText>
        <View style={styles.optionsContainer}>
          {MUSCLE_GROUPS.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: onboardingData?.muscle_group_focus === group.id
                    ? '#F36746' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => handleOptionSelect('muscle_group_focus', group.id)}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { 
                    color: onboardingData?.muscle_group_focus === group.id 
                      ? '#FFFFFF' 
                      : isDarkMode ? '#FFFFFF' : '#000000' 
                  }
                ]}
              >
                {group.title}
              </ThemedText>
              <ThemedText 
                style={[
                  styles.optionDescription,
                  { 
                    color: onboardingData?.muscle_group_focus === group.id 
                      ? '#FFFFFF' 
                      : isDarkMode ? '#FFFFFF' : '#000000' 
                  }
                ]}
              >
                {group.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#F36746',
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  equipmentOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  selectedEquipment: {
    backgroundColor: '#F36746',
    borderColor: '#F36746',
  },
  equipmentText: {
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
}); 