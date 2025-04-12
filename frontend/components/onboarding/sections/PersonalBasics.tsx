import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useOnboarding } from '@/context/OnboardingContext';
import { useTheme } from '@/context/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingData } from '@/types/onboarding.types';

const genderOptions = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to say',
  'Custom'
];

const measurementOptions = [
  'Metric (kg, cm)',
  'Imperial (lbs, ft/in)'
];

export default function PersonalBasics() {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { isDarkMode } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customGender, setCustomGender] = useState('');
  const [showCustomGender, setShowCustomGender] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [fullName, setFullName] = useState(
    `${onboardingData?.first_name || ''} ${onboardingData?.last_name || ''}`.trim()
  );
  const [gender, setGender] = useState(onboardingData?.gender || '');
  const [dateOfBirth, setDateOfBirth] = useState(onboardingData?.date_of_birth || '');
  const [measurementSystem, setMeasurementSystem] = useState(
    onboardingData?.measurement_system || 'metric'
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      // Format the date as YYYY-MM-DD for PostgreSQL
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateOfBirth(formattedDate);
      updateOnboardingData({ date_of_birth: formattedDate });
    }
  };

  const handleGenderSelect = (selectedGender: string) => {
    if (selectedGender === 'other') {
      setShowCustomGender(true);
    } else {
      setShowCustomGender(false);
      setGender(selectedGender);
      updateOnboardingData({ gender: selectedGender });
    }
  };

  const handleCustomGenderSubmit = () => {
    if (customGender.trim()) {
      setGender(customGender);
      updateOnboardingData({ gender: customGender });
      setShowCustomGender(false);
    }
  };

  const handleMeasurementSystemChange = (system: 'metric' | 'imperial') => {
    setMeasurementSystem(system);
    updateOnboardingData({ measurement_system: system });
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.subtext}>You’re unique. A few quick answers now will help us personalize everything that comes next.</ThemedText>
      
      {/* Full Name */}
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>What's your full name?</ThemedText>
        <TextInput
          style={[
            styles.input,
            { 
              color: isDarkMode ? '#FFFFFF' : '#000000',
              backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
              borderColor: isDarkMode ? '#334155' : '#CBD5E1'
            }
          ]}
          value={fullName}
          onChangeText={(text: string) => {
            const [firstName, lastName] = text.split(' ');
            setFullName(text);
            updateOnboardingData({ first_name: firstName, last_name: lastName });
          }}
          placeholder="Enter your full name"
          placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
        />
      </View>

      {/* Gender */}
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>How do you identify?</ThemedText>
        <View style={styles.optionsContainer}>
          {['male', 'female', 'other'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: gender === option 
                    ? '#F36746' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => handleGenderSelect(option)}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { color: gender === option ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {showCustomGender && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                color: isDarkMode ? '#FFFFFF' : '#000000',
              }
            ]}
            value={customGender}
            onChangeText={setCustomGender}
            placeholder="Enter your gender"
            placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F36746' }]}
            onPress={handleCustomGenderSubmit}
          >
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Date of Birth */}
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>When were you born?</ThemedText>
        <TouchableOpacity
          style={[
            styles.dateButton,
            { 
              backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
              borderColor: isDarkMode ? '#334155' : '#CBD5E1'
            }
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText style={styles.dateText}>
            {dateOfBirth 
              ? new Date(dateOfBirth).toLocaleDateString()
              : 'Select your date of birth'}
          </ThemedText>
          <Ionicons 
            name="calendar-outline" 
            size={20} 
            color={isDarkMode ? '#FFFFFF' : '#000000'} 
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
            style={{ backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }}
          />
        )}
      </View>

      {/* Measurement System */}
      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Which measurement units do you prefer?</ThemedText>
        <View style={styles.optionsContainer}>
          {['metric', 'imperial'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                { 
                  backgroundColor: measurementSystem === option 
                    ? '#F36746' 
                    : isDarkMode ? '#1E293B' : '#F1F5F9'
                }
              ]}
              onPress={() => handleMeasurementSystemChange(option as 'metric' | 'imperial')}
            >
              <ThemedText 
                style={[
                  styles.optionText,
                  { color: measurementSystem === option ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#000000' }
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
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
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
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
  customInput: {
    marginTop: 8,
  },
  dateButton: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 