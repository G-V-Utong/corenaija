import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../context/OnboardingContext';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import PersonalBasics from '../components/onboarding/sections/PersonalBasics';
import PhysicalProfile from '../components/onboarding/sections/PhysicalProfile';
import FitnessGoals from '../components/onboarding/sections/FitnessGoals';
import NutritionPreferences from '../components/onboarding/sections/NutritionPreferences';
import FastingPreferences from '../components/onboarding/sections/FastingPreferences';
import OnboardingProgress from '../components/onboarding/OnboardingProgress';
import OnboardingNavigation from '../components/onboarding/OnboardingNavigation';

const SECTIONS = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'physical', title: 'Physical Profile' },
  { id: 'fitness', title: 'Fitness Goals' },
  { id: 'nutrition', title: 'Nutrition Preferences' },
  { id: 'fasting', title: 'Fasting Preferences' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { onboardingData, saveOnboardingData, updateOnboardingData } = useOnboarding();
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      saveOnboardingData();
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <PersonalBasics />;
      case 1:
        return <PhysicalProfile 
          onboardingData={onboardingData} 
          onUpdate={updateOnboardingData} 
        />;
      case 2:
        return <FitnessGoals />;
      case 3:
        return <NutritionPreferences />;
      case 4:
        return <FastingPreferences />;
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <OnboardingProgress
        sections={SECTIONS}
        currentSection={currentSection}
      />
      <ScrollView style={styles.content}>
        <ThemedText style={styles.title}>
          {SECTIONS[currentSection].title}
        </ThemedText>
        {renderSection()}
      </ScrollView>
      <OnboardingNavigation
        currentSection={currentSection}
        totalSections={SECTIONS.length}
        onNext={handleNext}
        onBack={handleBack}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 