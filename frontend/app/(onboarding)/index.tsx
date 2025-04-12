import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { LoadingModal } from '../../components/LoadingModal';
import PersonalBasics from '../../components/onboarding/sections/PersonalBasics';
import PhysicalProfile from '../../components/onboarding/sections/PhysicalProfile';
import FitnessGoals from '../../components/onboarding/sections/FitnessGoals';
import NutritionPreferences from '../../components/onboarding/sections/NutritionPreferences';
import FastingPreferences from '../../components/onboarding/sections/FastingPreferences';
import OnboardingProgress from '../../components/onboarding/OnboardingProgress';
import OnboardingNavigation from '../../components/onboarding/OnboardingNavigation';
import { OnboardingData } from '../../types/onboarding.types';

const SECTIONS = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'physical', title: 'Physical Profile' },
  { id: 'fitness', title: 'Fitness Goals' },
  { id: 'nutrition', title: 'Nutrition Preferences' },
  { id: 'fasting', title: 'Fasting Preferences' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { onboardingData, saveOnboardingData, updateOnboardingData, isLoading, saveSectionData } = useOnboarding();
  const { refreshUserProfile } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // Add effect to scroll to top when section changes
  useEffect(() => {
    if (scrollViewRef.current) {
      console.log('Scrolling to top for section:', currentSection);
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [currentSection]);

  if (isLoading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  const handleNext = useCallback(async () => {
    if (currentSection < SECTIONS.length - 1) {
      // Save current section's data before moving to next
      if (onboardingData) {
        const sectionData = getCurrentSectionData(currentSection, onboardingData);
        await saveSectionData(sectionData);
      }
      setCurrentSection(prev => prev + 1);
    } else {
      // This is the final section, save all data and complete onboarding
      const success = await saveOnboardingData();
      if (success) {
        setShowLoadingModal(true);
      }
    }
  }, [currentSection, onboardingData, saveOnboardingData, saveSectionData]);

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleLoadingComplete = useCallback(async () => {
    await refreshUserProfile();
    setShowLoadingModal(false);
    router.replace('/(tabs)');
  }, [refreshUserProfile, router]);

  const getCurrentSectionData = (section: number, data: OnboardingData): Partial<OnboardingData> => {
    switch (section) {
      case 0:
        return {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
        };
      case 1:
        return {
          height: data.height,
          weight: data.weight,
          target_weight: data.target_weight,
          body_type: data.body_type,
          activity_level: data.activity_level,
          measurement_system: data.measurement_system,
        };
      case 2:
        return {
          fitness_goals: data.fitness_goals,
          muscle_group_focus: data.muscle_group_focus,
          health_conditions: data.health_conditions,
          medications: data.medications,
          sleep_hours: data.sleep_hours,
          energy_level: data.energy_level,
          stress_level: data.stress_level,
          sleep_quality: data.sleep_quality,
        };
      case 3:
        return {
          diet_type: data.diet_type,
          eating_pattern: data.eating_pattern,
          eating_out_frequency: data.eating_out_frequency,
          dietary_restrictions: data.dietary_restrictions,
          allergies: data.allergies,
        };
      case 4:
        return {
          fasting_status: data.fasting_status,
          preferred_fasting_protocol: data.preferred_fasting_protocol,
          fasting_reason: data.fasting_reason,
          fasting_experience: data.fasting_experience,
        };
      default:
        return {};
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return <PersonalBasics />;
      case 1:
        return <PhysicalProfile />;
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
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.title}>
          {SECTIONS[currentSection].title}
        </ThemedText>
        {renderCurrentSection()}
      </ScrollView>
      
      <OnboardingNavigation
        currentSection={currentSection}
        totalSections={SECTIONS.length}
        onNext={handleNext}
        onBack={handleBack}
      />

      <LoadingModal
        visible={showLoadingModal}
        onComplete={handleLoadingComplete}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});