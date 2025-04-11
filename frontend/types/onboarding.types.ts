export interface OnboardingData {
  // Personal Basics
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  height: number;
  weight: number;
  target_weight: number;
  activity_level: string;
  fitness_goals: string[];
  dietary_restrictions: string[];
  health_conditions: string[];
  medications: string[];
  sleep_hours: number;
  energy_level: string;
  stress_level: string;

  // Physical Profile
  measurement_system: string;
  profile_picture: string;
  body_type: string;
  allergies: string[];
  sleep_quality: string;

  // Muscle Group Focus
  muscle_group_focus: 'balanced' | 'chest' | 'back' | 'arms' | 'legs' | 'abs' | 'glutes';

  // Fasting Preferences
  fasting_status: 'none' | 'intermittent' | 'extended' | 'time_restricted' | 'religious';
  preferred_fasting_protocol: '16_8' | '18_6' | '20_4' | '5_2' | 'custom';
  fasting_reason: 'weight_loss' | 'metabolic_health' | 'insulin_sensitivity' | 'mental_clarity' | 'longevity';
  fasting_experience: 'beginner' | 'intermediate' | 'advanced';

  // ... rest of the existing interface ...
} 