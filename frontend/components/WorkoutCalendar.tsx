import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useRouter } from 'expo-router';

interface WorkoutCalendarProps {
  userName?: string;
}

export const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ userName = '' }) => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const today = new Date();
  
  // Generate dates for 5 days (current day and 4 future days)
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  const getDayName = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  };

  const handleDatePress = () => {
    router.push('/calendar');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}
      >
        <TouchableOpacity onPress={handleDatePress}>
          <ThemedView style={styles.monthContainer}>
            <ThemedText style={styles.monthText}>
              {getMonthName(today)}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
        
        {dates.map((date, index) => {
          const isToday = date.getDate() === today.getDate();
          const containerStyle = [
            styles.dateContainer,
            isToday && {
              backgroundColor: '#F36746',
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
              paddingHorizontal: 10,
            }
          ];
          
          const textStyle = [
            styles.dateText,
            isToday && styles.todayText
          ];
          
          const dayStyle = [
            styles.dayText,
            isToday && styles.todayText
          ];

          return (
            <TouchableOpacity key={index} onPress={handleDatePress}>
              <View style={containerStyle}>
                <ThemedText style={textStyle}>
                  {date.getDate()}
                </ThemedText>
                <ThemedText style={dayStyle}>
                  {getDayName(date)}
                </ThemedText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 20,
    paddingRight: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 24,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  monthContainer: {
    backgroundColor: '#F36746',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 15,
    minWidth: 50,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  todayText: {
    color: '#FFFFFF',
  },
});
