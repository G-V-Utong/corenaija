import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';
import { useAppEvents } from './AppEventsContext';
import { supabase } from '../lib/supabase';
import { OnboardingData } from '../types/onboarding.types';
import { USER_SIGNED_IN, USER_SIGNED_UP } from './AppEventsContext';
import { validateOnboardingData } from '../utils/onboardingValidation';

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  onboardingData: OnboardingData | null;
  updateOnboardingData: (data: Partial<OnboardingData>) => Promise<void>;
  nextStep: () => void;
  previousStep: () => void;
  saveOnboardingData: () => Promise<boolean>;
  resetOnboardingData: () => void;
  isLoading: boolean;
  error: string | null;
  canProceed: boolean;
  validationErrors: string[];
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

const defaultOnboardingData: OnboardingData = {
  // Personal Basics
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  date_of_birth: '',
  gender: '',
  height: 0,
  weight: 0,
  target_weight: 0,
  activity_level: '',
  fitness_goals: [],
  dietary_restrictions: [],
  health_conditions: [],
  medications: [],
  sleep_hours: 0,
  energy_level: '',
  stress_level: '',

  // Physical Profile
  measurement_system: 'metric',
  profile_picture: '',
  body_type: '',
  allergies: [],
  sleep_quality: '',

  // Muscle Group Focus
  muscle_group_focus: 'balanced',

  // Fasting Preferences
  fasting_status: 'none',
  preferred_fasting_protocol: '16_8',
  fasting_reason: 'weight_loss',
  fasting_experience: 'beginner'
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const { subscribe } = useAppEvents();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  
  const totalSteps = 6;

  // Load data immediately when component mounts or user changes
  useEffect(() => {
    const loadData = async () => {
      console.log('[OnboardingContext] Loading data for user:', user?.id);
      
      if (!user) {
        console.log('[OnboardingContext] No user found, setting loading to false');
        setLoading(false);
        return;
      }

      try {
        console.log('[OnboardingContext] Fetching profile from database');
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('[OnboardingContext] Error fetching profile:', error);
          throw error;
        }

        console.log('[OnboardingContext] Profile fetched:', profile);

        if (!profile?.onboarding_completed) {
          if (profile) {
            console.log('[OnboardingContext] Setting existing profile data');
            const existingData: OnboardingData = {
              first_name: profile.first_name || '',
              last_name: profile.last_name || '',
              email: profile.email || '',
              phone_number: profile.phone || '',
              date_of_birth: profile.date_of_birth || '',
              gender: profile.gender || '',
              height: profile.height || 0,
              weight: profile.weight || 0,
              target_weight: profile.target_weight || 0,
              activity_level: profile.activity_level || '',
              fitness_goals: profile.fitness_goals || [],
              dietary_restrictions: profile.dietary_restrictions || [],
              health_conditions: profile.health_conditions || [],
              medications: profile.medications || [],
              sleep_hours: profile.sleep_hours || 0,
              energy_level: profile.energy_level || '',
              stress_level: profile.stress_level || '',
              measurement_system: profile.measurement_system || 'metric',
              profile_picture: profile.profile_picture || '',
              body_type: profile.body_type || '',
              allergies: profile.allergies || [],
              sleep_quality: profile.sleep_quality || '',
              muscle_group_focus: profile.muscle_group_focus || 'balanced',
              fasting_status: profile.fasting_status || 'none',
              preferred_fasting_protocol: profile.preferred_fasting_protocol || '16_8',
              fasting_reason: profile.fasting_reason || 'weight_loss',
              fasting_experience: profile.fasting_experience || 'beginner'
            };
            setOnboardingData(existingData);
          } else {
            console.log('[OnboardingContext] No profile found, using default data');
            setOnboardingData(defaultOnboardingData);
          }
        }
      } catch (error) {
        console.error('[OnboardingContext] Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Listen for auth events as updates
  useEffect(() => {
    const unsubscribeSignIn = subscribe(USER_SIGNED_IN, async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!profile?.onboarding_completed) {
          if (profile) {
            const existingData: OnboardingData = {
              first_name: profile.first_name || '',
              last_name: profile.last_name || '',
              email: profile.email || '',
              phone_number: profile.phone || '',
              date_of_birth: profile.date_of_birth || '',
              gender: profile.gender || '',
              height: profile.height || 0,
              weight: profile.weight || 0,
              target_weight: profile.target_weight || 0,
              activity_level: profile.activity_level || '',
              fitness_goals: profile.fitness_goals || [],
              dietary_restrictions: profile.dietary_restrictions || [],
              health_conditions: profile.health_conditions || [],
              medications: profile.medications || [],
              sleep_hours: profile.sleep_hours || 0,
              energy_level: profile.energy_level || '',
              stress_level: profile.stress_level || '',
              measurement_system: profile.measurement_system || 'metric',
              profile_picture: profile.profile_picture || '',
              body_type: profile.body_type || '',
              allergies: profile.allergies || [],
              sleep_quality: profile.sleep_quality || '',
              muscle_group_focus: profile.muscle_group_focus || 'balanced',
              fasting_status: profile.fasting_status || 'none',
              preferred_fasting_protocol: profile.preferred_fasting_protocol || '16_8',
              fasting_reason: profile.fasting_reason || 'weight_loss',
              fasting_experience: profile.fasting_experience || 'beginner'
            };
            setOnboardingData(existingData);
          } else {
            setOnboardingData(defaultOnboardingData);
          }
        }
      }
    });

    const unsubscribeSignUp = subscribe(USER_SIGNED_UP, async () => {
      if (user) {
        setOnboardingData(defaultOnboardingData);
      }
    });

    return () => {
      unsubscribeSignIn();
      unsubscribeSignUp();
    };
  }, [user, subscribe]);

  const updateOnboardingData = useCallback(async (data: Partial<OnboardingData>) => {
    console.log('[OnboardingContext] Updating data:', data);
    
    if (!user) {
      console.error('[OnboardingContext] No user found, cannot update data');
      return;
    }

    try {
      // First update the database
      console.log('[OnboardingContext] Updating database');
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('[OnboardingContext] Database update error:', updateError);
        throw updateError;
      }

      // Then update local state
      console.log('[OnboardingContext] Updating local state');
      setOnboardingData(prev => {
        if (!prev) return null;
        const newData = { ...prev, ...data };
        console.log('[OnboardingContext] New state:', newData);
        return newData;
      });

      // Validate the updated data
      console.log('[OnboardingContext] Validating data');
      const { errors } = validateOnboardingData(onboardingData);
      setValidationErrors(errors);
    } catch (error) {
      console.error('[OnboardingContext] Error updating data:', error);
      throw error;
    }
  }, [user, onboardingData]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const saveOnboardingData = useCallback(async () => {
    if (!user || !onboardingData) {
      console.error('Cannot save onboarding data:', { user: !!user, onboardingData: !!onboardingData });
      return false;
    }

    try {
      console.log('Attempting to save final onboarding data:', onboardingData);
      // Save final onboarding data to profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: onboardingData.first_name,
          last_name: onboardingData.last_name,
          email: onboardingData.email,
          phone: onboardingData.phone_number,
          date_of_birth: onboardingData.date_of_birth,
          gender: onboardingData.gender,
          height: onboardingData.height,
          weight: onboardingData.weight,
          target_weight: onboardingData.target_weight,
          activity_level: onboardingData.activity_level,
          fitness_goals: onboardingData.fitness_goals,
          dietary_restrictions: onboardingData.dietary_restrictions,
          health_conditions: onboardingData.health_conditions,
          medications: onboardingData.medications,
          sleep_hours: onboardingData.sleep_hours,
          energy_level: onboardingData.energy_level,
          stress_level: onboardingData.stress_level,
          measurement_system: onboardingData.measurement_system,
          body_type: onboardingData.body_type,
          allergies: onboardingData.allergies,
          sleep_quality: onboardingData.sleep_quality,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error saving final onboarding data:', error);
        return false;
      }

      console.log('Successfully completed onboarding process');
      // Navigate to main app after successful save
      router.replace('/(tabs)');
      return true;
    } catch (error) {
      console.error('Error in saveOnboardingData:', error);
      return false;
    }
  }, [user, onboardingData, router]);

  const resetOnboardingData = useCallback(() => {
    setOnboardingData(defaultOnboardingData);
    setCurrentStep(0);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        onboardingData,
        updateOnboardingData,
        nextStep,
        previousStep,
        saveOnboardingData,
        resetOnboardingData,
        isLoading: loading,
        error: null,
        canProceed: validationErrors.length === 0,
        validationErrors,
        currentSection,
        setCurrentSection
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 