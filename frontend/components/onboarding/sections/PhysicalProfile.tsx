import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { OnboardingData } from '../../../types/onboarding.types';
import { Ionicons } from '@expo/vector-icons';

const bodyTypeOptions = [
  { 
    id: 'ectomorph', 
    label: 'Ectomorph',
    description: 'Lean, struggles to gain weight'
  },
  { 
    id: 'mesomorph', 
    label: 'Mesomorph',
    description: 'Naturally muscular'
  },
  { 
    id: 'endomorph', 
    label: 'Endomorph',
    description: 'Gains fat easily'
  },
  { 
    id: 'not_sure', 
    label: 'Not sure',
    description: 'I\'m not sure about my body type'
  }
];

const healthConditions = [
  'Hypertension',
  'Diabetes',
  'PCOS',
  'High cholesterol',
  'Thyroid issues',
  'Asthma',
  'None',
  'Prefer not to say'
];

const sleepOptions = [
  { value: 5, label: 'Less than 5h' },
  { value: 6, label: '5–6h' },
  { value: 7, label: '7–8h' },
  { value: 9, label: '9h or more' },
];

const energyLevelOptions = [
  'Great all day',
  'Sluggish in the morning',
  'Dips in the afternoon',
  'Low energy most of the time'
];

export default function PhysicalProfile() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { isDarkMode } = useTheme();
  
  // Add prop validation
  useEffect(() => {
    console.log('[PhysicalProfile] Initial data:', {
      height: onboardingData?.height,
      weight: onboardingData?.weight,
      target_weight: onboardingData?.target_weight,
      body_type: onboardingData?.body_type,
      activity_level: onboardingData?.activity_level,
      measurement_system: onboardingData?.measurement_system,
      health_conditions: onboardingData?.health_conditions,
      medications: onboardingData?.medications,
      sleep_hours: onboardingData?.sleep_hours,
      energy_level: onboardingData?.energy_level,
      stress_level: onboardingData?.stress_level,
      sleep_quality: onboardingData?.sleep_quality,
    });
  }, [onboardingData]);

  const safeUpdate = async (data: Partial<OnboardingData>) => {
    console.log('[PhysicalProfile] Updating data:', data);
    try {
      // Update local state first for immediate UI feedback
      if (data.health_conditions) {
        setSelectedHealthConditions(data.health_conditions);
      }
      if (data.sleep_hours) {
        setSleepHours(data.sleep_hours);
      }
      if (data.energy_level) {
        setEnergyLevel(data.energy_level);
      }
      if (data.weight) {
        setWeight(data.weight.toString());
      }
      if (data.height) {
        setHeight(data.height.toString());
      }
      if (data.target_weight) {
        setTargetWeight(data.target_weight.toString());
      }
      if (data.body_type) {
        setBodyType(data.body_type);
      }
      if (data.measurement_system) {
        setIsMetric(data.measurement_system === 'metric');
      }
      if (data.medications) {
        setMedications(data.medications);
      }

      // Then update the context
      await updateOnboardingData(data);
      console.log('[PhysicalProfile] Successfully saved to database:', data);
    } catch (error) {
      console.error('[PhysicalProfile] Error saving to database:', error);
      // Revert local state on error
      if (onboardingData) {
        setSelectedHealthConditions(onboardingData.health_conditions || []);
        setSleepHours(onboardingData.sleep_hours || 0);
        setEnergyLevel(onboardingData.energy_level || '');
        setWeight(onboardingData.weight?.toString() || '');
        setHeight(onboardingData.height?.toString() || '');
        setTargetWeight(onboardingData.target_weight?.toString() || '');
        setBodyType(onboardingData.body_type || '');
        setIsMetric(onboardingData.measurement_system === 'metric');
        setMedications(onboardingData.medications || []);
      }
    }
  };

  const [weight, setWeight] = useState(onboardingData?.weight?.toString() || '');
  const [height, setHeight] = useState(onboardingData?.height?.toString() || '');
  const [targetWeight, setTargetWeight] = useState(onboardingData?.target_weight?.toString() || '');
  const [bodyType, setBodyType] = useState(onboardingData?.body_type || '');
  const [isMetric, setIsMetric] = useState(onboardingData?.measurement_system === 'metric');
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>(onboardingData?.health_conditions || []);
  const [sleepHours, setSleepHours] = useState<number>(onboardingData?.sleep_hours || 0);
  const [energyLevel, setEnergyLevel] = useState<string>(onboardingData?.energy_level || '');
  const [medications, setMedications] = useState<string[]>([]);

  // Update local state when onboardingData changes
  useEffect(() => {
    console.log('onboardingData changed:', onboardingData);
    if (onboardingData) {
      setWeight(onboardingData.weight?.toString() || '');
      setHeight(onboardingData.height?.toString() || '');
      setTargetWeight(onboardingData.target_weight?.toString() || '');
      setBodyType(onboardingData.body_type || '');
      setIsMetric(onboardingData.measurement_system === 'metric');
      setSelectedHealthConditions(onboardingData.health_conditions || []);
      setSleepHours(onboardingData.sleep_hours || 0);
      setEnergyLevel(onboardingData.energy_level || '');
      setMedications(Array.isArray(onboardingData.medications) ? onboardingData.medications : []);
    }
  }, [onboardingData]);

  // Convert between metric and imperial
  const convertWeight = (value: string, fromMetric: boolean, toMetric: boolean) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    
    if (fromMetric && !toMetric) {
      // kg to lbs
      return (numValue * 2.20462).toFixed(1);
    } else if (!fromMetric && toMetric) {
      // lbs to kg
      return (numValue / 2.20462).toFixed(1);
    }
    return value;
  };

  const convertHeight = (value: string, fromMetric: boolean, toMetric: boolean) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    
    if (fromMetric && !toMetric) {
      // cm to inches
      return (numValue / 2.54).toFixed(1);
    } else if (!fromMetric && toMetric) {
      // inches to cm
      return (numValue * 2.54).toFixed(1);
    }
    return value;
  };

  // Handle measurement system toggle
  const toggleMeasurementSystem = () => {
    const newIsMetric = !isMetric;
    setIsMetric(newIsMetric);
    
    // Convert values
    const newWeight = convertWeight(weight, isMetric, newIsMetric);
    const newHeight = convertHeight(height, isMetric, newIsMetric);
    const newTargetWeight = convertWeight(targetWeight, isMetric, newIsMetric);
    
    setWeight(newWeight);
    setHeight(newHeight);
    setTargetWeight(newTargetWeight);
    
    // Update the measurement system in the onboarding data
    safeUpdate({ 
      measurement_system: newIsMetric ? 'metric' : 'imperial',
      weight: newWeight ? parseFloat(newWeight) : undefined,
      height: newHeight ? parseFloat(newHeight) : undefined,
      target_weight: newTargetWeight ? parseFloat(newTargetWeight) : undefined
    });
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      safeUpdate({ weight: numValue });
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      safeUpdate({ height: numValue });
    }
  };

  const handleTargetWeightChange = (value: string) => {
    setTargetWeight(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      safeUpdate({ target_weight: numValue });
    }
  };

  const handleBodyTypeSelect = async (type: string) => {
    // Update local state immediately for responsive UI
    setBodyType(type);
    
    // Then update the context asynchronously
    safeUpdate({ body_type: type });
  };

  const toggleHealthCondition = async (condition: string) => {
    console.log('toggleHealthCondition called with:', condition);
    console.log('Current selectedHealthConditions:', selectedHealthConditions);
    
    let newConditions: string[];
    
    // Handle "None" and "Prefer not to say" as mutually exclusive options
    if (condition === 'None' || condition === 'Prefer not to say') {
      console.log('Handling mutually exclusive option:', condition);
      newConditions = [condition];
    } else {
      // Remove "None" and "Prefer not to say" when selecting other conditions
      const filteredConditions = selectedHealthConditions.filter(
        c => c !== 'None' && c !== 'Prefer not to say'
      );
      
      newConditions = filteredConditions.includes(condition)
        ? filteredConditions.filter(c => c !== condition)
        : [...filteredConditions, condition];
    }
    
    console.log('New health conditions to be set:', newConditions);
    
    // Update local state immediately for responsive UI
    setSelectedHealthConditions(newConditions);
    
    // Then update the context asynchronously
    safeUpdate({ health_conditions: newConditions });
  };

  const handleSleepHoursSelect = async (hours: number) => {
    console.log('handleSleepHoursSelect called with:', hours);
    
    // Update local state immediately for responsive UI
    setSleepHours(hours);
    
    // Then update the context asynchronously
    safeUpdate({ sleep_hours: hours });
  };

  const handleEnergyLevelSelect = async (level: string) => {
    console.log('handleEnergyLevelSelect called with:', level);
    
    // Update local state immediately for responsive UI
    setEnergyLevel(level);
    
    // Then update the context asynchronously
    safeUpdate({ energy_level: level });
  };

  const handleMedicationsChange = async (text: string) => {
    try {
      const medicationsArray = text ? text.split(',').map(m => m.trim()).filter(Boolean) : [];
      
      // Update local state immediately for responsive UI
      setMedications(medicationsArray);
      
      // Then update the context asynchronously
      safeUpdate({ medications: medicationsArray });
    } catch (error) {
      console.error('Error updating medications:', error);
      // Revert local state on error
      setMedications(onboardingData?.medications || []);
    }
  };

  // Render option function similar to FastingPreferences
  const renderOption = (
    id: string,
    label: string,
    isSelected: boolean,
    onPress: () => void,
    isMultiSelect = false,
    description?: string
  ) => {
    console.log(`Rendering option: ${label}, isSelected: ${isSelected}, isMultiSelect: ${isMultiSelect}`);
    return (
      <TouchableOpacity
        style={[
          styles.option,
          isSelected && styles.selectedOption,
          { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
        ]}
        onPress={onPress}
      >
        <View style={styles.optionContent}>
          <ThemedText style={styles.optionLabel}>{label}</ThemedText>
          {description && (
            <ThemedText style={styles.optionDescription}>{description}</ThemedText>
          )}
        </View>
        {isSelected && (
          <Ionicons
            name={isMultiSelect ? 'checkmark-circle' : 'radio-button-on'}
            size={24}
            color="#F36746"
          />
        )}
      </TouchableOpacity>
    );
  };

  // Dynamic styles based on theme
  const dynamicStyles = {
    section: {
      marginBottom: 32,
      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: isDarkMode ? '#000' : '#CBD5E1',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isDarkMode ? '#FFFFFF' : '#1E293B',
    },
    sectionDescription: {
      fontSize: 14,
      marginBottom: 16,
      opacity: 0.7,
      lineHeight: 20,
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
    inputContainer: {
      backgroundColor: isDarkMode ? '#334155' : '#F8FAFC',
      borderColor: isDarkMode ? '#475569' : '#E2E8F0',
    },
    input: {
      color: isDarkMode ? '#FFFFFF' : '#1E293B',
    },
    unitText: {
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
    option: {
      backgroundColor: isDarkMode ? '#334155' : '#F8FAFC',
      shadowColor: isDarkMode ? '#000' : '#CBD5E1',
    },
    selectedOption: {
      backgroundColor: isDarkMode ? '#475569' : '#F1F5F9',
    },
    optionLabel: {
      color: isDarkMode ? '#FFFFFF' : '#1E293B',
    },
    optionContainer: {
      marginBottom: 12,
    },
    measurementToggleContainer: {
      borderColor: isDarkMode ? '#475569' : '#E2E8F0',
      backgroundColor: isDarkMode ? '#334155' : '#F8FAFC',
    },
    measurementToggleLabel: {
      color: isDarkMode ? '#FFFFFF' : '#1E293B',
    },
    optionDescription: {
      color: isDarkMode ? '#94A3B8' : '#64748B',
    },
  };

  const inputContainerStyle = {
    backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
  };

  const inputStyle = {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  const placeholderColor = isDarkMode ? '#64748B' : '#94A3B8';

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.subtext}>A few numbers to help us tailor workouts and nutrition that fit your body.</ThemedText>

      {/* Measurement System Toggle */}
      <View style={[
        styles.measurementToggleContainer,
        { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }
      ]}>
        <ThemedText style={styles.measurementToggleLabel}>Use Metric System</ThemedText>
        <Switch
          value={isMetric}
          onValueChange={toggleMeasurementSystem}
          trackColor={{ false: isDarkMode ? '#334155' : '#CBD5E1', true: '#F36746' }}
          thumbColor={isMetric ? '#FFFFFF' : isDarkMode ? '#94A3B8' : '#64748B'}
        />
      </View>

      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Current Weight</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Enter your current weight in {isMetric ? 'kilograms' : 'pounds'}
        </ThemedText>
        <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
          <TextInput
            style={[styles.input, dynamicStyles.input]}
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
            placeholder={`Enter weight in ${isMetric ? 'kg' : 'lbs'}`}
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={[styles.unitText, dynamicStyles.unitText]}>{isMetric ? 'kg' : 'lbs'}</ThemedText>
        </View>
      </View>

      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Height</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Enter your height in {isMetric ? 'centimeters' : 'inches'}
        </ThemedText>
        <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
          <TextInput
            style={[styles.input, dynamicStyles.input]}
            value={height}
            onChangeText={handleHeightChange}
            keyboardType="numeric"
            placeholder={`Enter height in ${isMetric ? 'cm' : 'in'}`}
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={[styles.unitText, dynamicStyles.unitText]}>{isMetric ? 'cm' : 'in'}</ThemedText>
        </View>
      </View>

      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Weight Goal</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Enter your target weight in {isMetric ? 'kilograms' : 'pounds'}
        </ThemedText>
        <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
          <TextInput
            style={[styles.input, dynamicStyles.input]}
            value={targetWeight}
            onChangeText={handleTargetWeightChange}
            keyboardType="numeric"
            placeholder={`Enter target weight in ${isMetric ? 'kg' : 'lbs'}`}
            placeholderTextColor={placeholderColor}
          />
          <ThemedText style={[styles.unitText, dynamicStyles.unitText]}>{isMetric ? 'kg' : 'lbs'}</ThemedText>
        </View>
      </View>

      {/* Body Type */}
      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>What's your body type?</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Select the option that best describes your body type
        </ThemedText>
        {bodyTypeOptions.map((type) => (
          <View key={type.id} style={[styles.optionContainer, dynamicStyles.optionContainer]}>
            {renderOption(
              type.id,
              type.label,
              bodyType === type.id,
              () => handleBodyTypeSelect(type.id),
              false,
              type.description
            )}
          </View>
        ))}
      </View>

      {/* Health Conditions */}
      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Health Conditions</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Have you ever been diagnosed with any of the following?
        </ThemedText>
        {healthConditions.map((condition) => (
          <View key={condition} style={[styles.optionContainer, dynamicStyles.optionContainer]}>
            {renderOption(
              condition,
              condition,
              selectedHealthConditions.includes(condition),
              () => toggleHealthCondition(condition),
              true
            )}
          </View>
        ))}
      </View>

      {/* Sleep Hours */}
      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Sleep Hours</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          How many hours of sleep do you usually get?
        </ThemedText>
        {sleepOptions.map((option) => (
          <View key={option.value} style={[styles.optionContainer, dynamicStyles.optionContainer]}>
            {renderOption(
              option.value.toString(),
              option.label,
              sleepHours === option.value,
              () => handleSleepHoursSelect(option.value)
            )}
          </View>
        ))}
      </View>

      {/* Energy Level */}
      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Energy Level</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          How's your energy throughout the day?
        </ThemedText>
        {energyLevelOptions.map((option) => (
          <View key={option} style={[styles.optionContainer, dynamicStyles.optionContainer]}>
            {renderOption(
              option,
              option,
              energyLevel === option,
              () => handleEnergyLevelSelect(option)
            )}
          </View>
        ))}
      </View>

      {/* Medications */}
      <View style={[styles.section, dynamicStyles.section]}>
        <ThemedText style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Medications</ThemedText>
        <ThemedText style={[styles.sectionDescription, dynamicStyles.sectionDescription]}>
          Are you currently taking any medications? (Optional)
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            dynamicStyles.inputContainer,
            dynamicStyles.input
          ]}
          value={Array.isArray(medications) ? medications.join(', ') : ''}
          onChangeText={handleMedicationsChange}
          placeholder="Enter medications or type 'None'"
          placeholderTextColor={placeholderColor}
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
}

// Static styles
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    opacity: 0.8,
  },
  section: {
    marginBottom: 32,
    borderRadius: 16,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.7,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    height: 56,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    padding: 12,
    borderRadius: 12,
  },
  unitText: {
    fontSize: 16,
    marginLeft: 8,
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  optionContainer: {
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transform: [{ scale: 1 }],
  },
  selectedOption: {
    borderColor: '#F36746',
    transform: [{ scale: 1.02 }],
  },
  optionLabel: {
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  measurementToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  measurementToggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkIcon: {
    position: 'absolute',
    right: 16,
    color: '#F36746',
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4,
    lineHeight: 18,
  },
}); 