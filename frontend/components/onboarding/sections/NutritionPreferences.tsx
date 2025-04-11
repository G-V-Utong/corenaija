import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useOnboarding } from '@/context/OnboardingContext';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const DIET_TYPES = [
  {
    id: 'balanced',
    title: 'Balanced',
    description: 'A mix of all food groups',
    icon: 'restaurant'
  },
  {
    id: 'low_carb',
    title: 'Low Carb',
    description: 'Reduced carbohydrate intake',
    icon: 'nutrition'
  },
  {
    id: 'high_protein',
    title: 'High Protein',
    description: 'Focus on protein-rich foods',
    icon: 'barbell'
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    description: 'Plant-based with healthy fats',
    icon: 'leaf'
  },
  {
    id: 'keto',
    title: 'Ketogenic',
    description: 'Very low carb, high fat',
    icon: 'flame'
  }
];

const DIETARY_RESTRICTIONS = [
  'None',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Nut-free',
  'Halal',
  'Kosher'
];

const EATING_PATTERNS = [
  {
    id: 'three_meals',
    title: '3 meals per day',
    description: 'Traditional breakfast, lunch, dinner'
  },
  {
    id: 'small_frequent',
    title: 'Small frequent meals',
    description: '5-6 smaller meals throughout the day'
  },
  {
    id: 'two_meals',
    title: '2 meals per day',
    description: 'Lunch and dinner only'
  },
  {
    id: 'flexible',
    title: 'Flexible eating',
    description: 'No fixed meal schedule'
  }
];

const EATING_OUT_FREQUENCY = [
  'Rarely (1-2 times/month)',
  'Sometimes (1-2 times/week)',
  'Often (3-4 times/week)',
  'Very often (5+ times/week)'
];

const COOKING_SKILLS = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

export default function NutritionPreferences() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { isDarkMode } = useTheme();

  const toggleDietType = (dietId: string) => {
    const currentTypes = onboardingData.diet_type || [];
    const newTypes = currentTypes.includes(dietId)
      ? currentTypes.filter((id: string) => id !== dietId)
      : [...currentTypes, dietId];
    updateOnboardingData({ diet_type: newTypes });
  };

  const toggleDietaryRestriction = (restriction: string) => {
    const currentRestrictions = onboardingData.dietary_restrictions || [];
    let newRestrictions: string[];
    
    // Handle "None" as a mutually exclusive option
    if (restriction === 'None') {
      newRestrictions = currentRestrictions.includes('None') ? [] : ['None'];
    } else {
      // Remove "None" when selecting other restrictions
      const filteredRestrictions = currentRestrictions.filter(r => r !== 'None');
      newRestrictions = filteredRestrictions.includes(restriction)
        ? filteredRestrictions.filter(r => r !== restriction)
        : [...filteredRestrictions, restriction];
    }
    
    updateOnboardingData({ dietary_restrictions: newRestrictions });
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.subtext}>Understanding your eating routine helps us build a plan that fits your lifestyle, not change it overnight.</ThemedText>

      {/* Diet Type */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>What type of diet do you prefer?</ThemedText>
        <View style={styles.dietContainer}>
          {DIET_TYPES.map((diet) => (
            <TouchableOpacity
              key={diet.id}
              style={[
                styles.dietCard,
                { 
                  backgroundColor: onboardingData.diet_type?.includes(diet.id)
                    ? '#FF6B00' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => toggleDietType(diet.id)}
            >
              <Ionicons 
                name={diet.icon as any} 
                size={24} 
                color={onboardingData.diet_type?.includes(diet.id) ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000'} 
              />
              <ThemedText 
                style={[
                  styles.dietTitle,
                  { color: onboardingData.diet_type?.includes(diet.id) ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {diet.title}
              </ThemedText>
              <ThemedText 
                style={[
                  styles.dietDescription,
                  { color: onboardingData.diet_type?.includes(diet.id) ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {diet.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dietary Restrictions */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Do you have any dietary restrictions?</ThemedText>
        <View style={styles.optionsContainer}>
          {DIETARY_RESTRICTIONS.map((restriction) => (
            <TouchableOpacity
              key={restriction}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: onboardingData.dietary_restrictions?.includes(restriction)
                    ? '#FF6B00' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => toggleDietaryRestriction(restriction)}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { 
                    color: onboardingData.dietary_restrictions?.includes(restriction) 
                      ? '#FFFFFF' 
                      : isDarkMode ? '#FFFFFF' : '#000000' 
                  }
                ]}
              >
                {restriction}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Eating Pattern */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>What's your preferred eating pattern?</ThemedText>
        <View style={styles.patternContainer}>
          {EATING_PATTERNS.map((pattern) => (
            <TouchableOpacity
              key={pattern.id}
              style={[
                styles.patternCard,
                { 
                  backgroundColor: onboardingData.eating_pattern === pattern.id 
                    ? '#FF6B00' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => updateOnboardingData({ eating_pattern: pattern.id })}
            >
              <ThemedText 
                style={[
                  styles.patternTitle,
                  { color: onboardingData.eating_pattern === pattern.id ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {pattern.title}
              </ThemedText>
              <ThemedText 
                style={[
                  styles.patternDescription,
                  { color: onboardingData.eating_pattern === pattern.id ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {pattern.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Eating Out Frequency */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>How often do you eat out?</ThemedText>
        <View style={styles.optionsContainer}>
          {EATING_OUT_FREQUENCY.map((frequency) => (
            <TouchableOpacity
              key={frequency}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: onboardingData.eating_out_frequency === frequency 
                    ? '#FF6B00' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => updateOnboardingData({ eating_out_frequency: frequency })}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { color: onboardingData.eating_out_frequency === frequency ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {frequency}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cooking Skills */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>How would you rate your cooking skills?</ThemedText>
        <View style={styles.optionsContainer}>
          {COOKING_SKILLS.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: onboardingData.cooking_skills === skill 
                    ? '#FF6B00' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => updateOnboardingData({ cooking_skills: skill })}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { color: onboardingData.cooking_skills === skill ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {skill}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  dietContainer: {
    gap: 12,
  },
  dietCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  dietTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  dietDescription: {
    fontSize: 14,
  },
  patternContainer: {
    gap: 12,
  },
  patternCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  optionText: {
    fontSize: 14,
  },
}); 