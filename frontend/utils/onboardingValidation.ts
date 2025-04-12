import { OnboardingData } from '../types/onboarding.types';

export const validateOnboardingData = (data: OnboardingData | null): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data) {
    return { isValid: false, errors: ['No onboarding data found'] };
  }

  // Personal Basics Validation
  if (!data.first_name) errors.push('First name is required');
  if (!data.last_name) errors.push('Last name is required');
  if (!data.email) errors.push('Email is required');
  if (!data.phone_number) errors.push('Phone number is required');
  if (!data.date_of_birth) errors.push('Date of birth is required');
  if (!data.gender) errors.push('Gender is required');
  if (!data.height) errors.push('Height is required');
  if (!data.weight) errors.push('Weight is required');
  if (!data.target_weight) errors.push('Target weight is required');
  if (!data.activity_level) errors.push('Activity level is required');
  if (!data.fitness_goals?.length) errors.push('At least one fitness goal is required');
  if (!data.dietary_restrictions?.length) errors.push('Dietary restrictions are required');
  if (!data.health_conditions?.length) errors.push('Health conditions are required');
  if (!data.medications?.length) errors.push('Medications are required');
  if (!data.sleep_hours) errors.push('Sleep hours are required');
  if (!data.energy_level) errors.push('Energy level is required');
  if (!data.stress_level) errors.push('Stress level is required');

  // Physical Profile Validation
  if (!data.measurement_system) errors.push('Measurement system is required');
  if (!data.profile_picture) errors.push('Profile picture is required');
  if (!data.body_type) errors.push('Body type is required');
  if (!data.allergies?.length) errors.push('Allergies are required');
  if (!data.sleep_quality) errors.push('Sleep quality is required');

  // Muscle Group Focus Validation
  if (!data.muscle_group_focus) errors.push('Muscle group focus is required');

  // Fasting Preferences Validation
  if (!data.fasting_status) errors.push('Fasting status is required');
  if (data.fasting_status !== 'none') {
    if (!data.preferred_fasting_protocol) errors.push('Preferred fasting protocol is required');
    if (!data.fasting_reason) errors.push('Fasting reason is required');
    if (!data.fasting_experience) errors.push('Fasting experience level is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 