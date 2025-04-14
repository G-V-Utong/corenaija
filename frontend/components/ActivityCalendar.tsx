import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ActivityCalendarProps {
  onDayPress?: (date: Date) => void;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ onDayPress }) => {
  const { isDarkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthSelector}>
          <ThemedText style={styles.monthYear}>
            {formatMonthYear(currentDate)}
          </ThemedText>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons 
              name="chevron-down" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={previousMonth}>
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMonth}>
            <Ionicons 
              name="chevron-forward" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ThemedView style={[
        styles.calendar,
        { backgroundColor: isDarkMode ? '#2A2A2A' : '#F4F6F9' }
      ]}>
        <View style={styles.weekDays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <ThemedText key={index} style={styles.weekDayText}>
              {day}
            </ThemedText>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {generateCalendarDays().map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => day && onDayPress?.(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            >
              {day && (
                <View style={[
                  styles.dayContainer,
                  isToday(day) && { backgroundColor: '#1E90FF' },
                  day === 13 && { backgroundColor: '#F36746' } // Example activity day
                ]}>
                  <ThemedText style={[
                    styles.dayText,
                    (isToday(day) || day === 13) && styles.selectedDayText
                  ]}>
                    {day}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  calendar: {
    borderRadius: 16,
    padding: 16,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDayText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
});
