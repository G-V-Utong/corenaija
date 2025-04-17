import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { ThemedView } from '../../components/ThemedView';
import { WorkoutCalendar } from '../../components/WorkoutCalendar';
import { ThemedText } from '../../components/ThemedText';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { WaterTrackerModal } from '../../components/WaterTrackerModal';
import { Ionicons } from '@expo/vector-icons';
import { WaterTrackingHistory } from '../../components/WaterTrackingHistory';
import { CircularProgress } from '../../components/CircularProgress';
import { Picker } from '@react-native-picker/picker';

export default function ProfileScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [userName, setUserName] = useState('');
  const { isDarkMode } = useTheme();
  const [isWaterModalVisible, setIsWaterModalVisible] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [timeframe, setTimeframe] = useState('today');

  const DAILY_WATER_GOAL = 2.0; // Match with WaterTrackerModal

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
      fetchWaterIntake();
    }
  }, [session]);

  const getDateRange = (timeframe: string) => {
    const today = new Date();
    const startDate = new Date();
    
    if (timeframe === 'week') {
      startDate.setDate(today.getDate() - 7);
    } else if (timeframe === 'month') {
      startDate.setMonth(today.getMonth() - 1);
    }
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0]
    };
  };

  const fetchUserProfile = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session?.user.id)
        .single();
      
      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchWaterIntake = async () => {
    try {
      const { start, end } = getDateRange(timeframe);
      
      if (timeframe === 'today') {
        const { data, error } = await supabase
          .from('water_intake')
          .select('amount')
          .eq('date', new Date().toISOString().split('T')[0])
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching water intake:', error);
          return;
        }
        setWaterIntake(data?.amount || 0);
      } else {
        const { data, error } = await supabase
          .from('water_intake')
          .select('amount')
          .gte('date', start)
          .lte('date', end);

        if (error) {
          console.error('Error fetching water intake:', error);
          return;
        }

        const total = data?.reduce((sum, record) => sum + (record.amount || 0), 0) || 0;
        setWaterIntake(total);
      }
    } catch (error) {
      console.error('Error in water intake fetch:', error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchWaterIntake();
    }
  }, [timeframe]);

  const getWaterGoal = () => {
    if (timeframe === 'week') return DAILY_WATER_GOAL * 7;
    if (timeframe === 'month') return DAILY_WATER_GOAL * 30;
    return DAILY_WATER_GOAL;
  };

  const handleCardPress = (route: `/${string}`) => {
    router.push(route);
  };

  const handleWaterModalClose = () => {
    setIsWaterModalVisible(false);
    fetchWaterIntake();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Me" />
      </SafeAreaView>
      <ScrollView style={styles.content}>
        <WorkoutCalendar userName={userName} />
        
        {/* Activity Summary Header */}
        <View style={[styles.summaryHeader, { 
          marginHorizontal: 16,
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }]}>
          <ThemedText style={styles.summaryTitle}>Activity Summary</ThemedText>
          <View style={[styles.timeframeSelect, { 
            backgroundColor: isDarkMode ? '#1A1A1A' : '#F1F5F9',
            borderRadius: 8,
            overflow: 'hidden',
            width: 'auto',
          }]}>
            <Picker
              selectedValue={timeframe}
              onValueChange={setTimeframe}
              dropdownIconColor={isDarkMode ? '#FFFFFF' : '#000000'}
              style={[styles.picker, {
                color: isDarkMode ? '#FFFFFF' : '#000000',
              }]}
            >
              <Picker.Item label="Today" value="today" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Month" value="month" />
            </Picker>
          </View>
        </View>

        {/* Activity Dashboard */}
        <View style={[styles.dashboardContainer, { 
          backgroundColor: isDarkMode ? '#1A1A1A' : '#F1F5F9',
        }]}>
          <View style={styles.topSection}>
            {/* Stats Cards */}
            <View style={styles.leftCards}>
              <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}>
                <View style={styles.statHeader}>
                  <View style={styles.leftContainer}>
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>60</ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      Active Minutes
                    </ThemedText>
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F1F5F9' }]}>
                      <Ionicons name="timer-outline" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    </View>
                    <TouchableOpacity 
                      style={[styles.addButton, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}
                      onPress={() => handleCardPress('/training')}
                    >
                      <ThemedText style={styles.addButtonText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}>
                <View style={styles.statHeader}>
                  <View style={styles.leftContainer}>
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>480</ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      Calories Burned
                    </ThemedText>
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F1F5F9' }]}>
                      <Ionicons name="flame-outline" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    </View>
                    <TouchableOpacity 
                      style={[styles.addButton, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}
                      onPress={() => handleCardPress('/training')}
                    >
                      <ThemedText style={styles.addButtonText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

             {/* Fasting and Water Cards */}
             <View style={styles.statsCards}>
              <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}>
                <View style={styles.statHeader}>
                  <View style={styles.leftContainer}>
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>16</ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      Fasting Hours
                    </ThemedText>
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F1F5F9' }]}>
                      <Ionicons name="time-outline" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    </View>
                    <TouchableOpacity 
                      style={[styles.addButton, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}
                      onPress={() => handleCardPress('/fasting')}
                    >
                      <ThemedText style={styles.addButtonText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={[styles.statCard, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}>
                <View style={styles.statHeader}>
                  <View style={styles.leftContainer}>
                    <View style={styles.waterValueContainer}>
                      <ThemedText style={[styles.statValue, { fontSize: 24 }]}>{waterIntake.toFixed(1)}</ThemedText>
                      <ThemedText style={[styles.waterGoalText, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                        /{getWaterGoal()}L
                      </ThemedText>
                    </View>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      Water Intake
                    </ThemedText>
                  </View>
                  <View style={styles.rightContainer}>
                    {waterIntake > 0 ? (
                      <CircularProgress
                        size={40}
                        progress={Math.min((waterIntake / getWaterGoal()) * 100, 100)}
                        iconColor={isDarkMode ? '#FFFFFF' : '#000000'}
                        backgroundColor={isDarkMode ? '#374151' : '#F1F5F9'}
                      />
                    ) : (
                      <View style={[styles.iconContainer, { backgroundColor: isDarkMode ? '#374151' : '#F1F5F9' }]}>
                        <Ionicons name="water-outline" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                      </View>
                    )}
                    <TouchableOpacity 
                      style={[styles.addButton, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}
                      onPress={() => setIsWaterModalVisible(true)}
                    >
                      <ThemedText style={styles.addButtonText}>+</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Workout Duration Chart */}
          <View style={[styles.workoutCard, { backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF' }]}>
            <View style={styles.workoutHeader}>
              <ThemedText style={styles.workoutTitle}>45 mins</ThemedText>
              <ThemedText style={[styles.workoutSubtitle, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                Workout Duration
              </ThemedText>
            </View>
            <View style={styles.chartContainer}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, index) => (
                <View key={day} style={styles.barColumn}>
                  <View style={[styles.bar, { 
                    height: index === 3 ? 45 : 25,
                    backgroundColor: index === 3 ? '#F36746' : (isDarkMode ? '#374151' : '#F1F5F9')
                  }]} />
                  <ThemedText style={[styles.barLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                    {day}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Water Tracking History */}
        <WaterTrackingHistory />
      </ScrollView>
      <WaterTrackerModal 
        isVisible={isWaterModalVisible}
        onClose={handleWaterModalClose}
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
  },
  dashboardContainer: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8
  },
  leftCards: {
    flex: 1,    
  },
  statsCards: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statCard: {
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  workoutCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutHeader: {
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutSubtitle: {
    fontSize: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
  },
  summaryHeader: {
    paddingVertical: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeframeSelect: {
    
  },
  picker: {
    width: 130,
    paddingHorizontal: 8,
  },
  waterValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterGoalText: {
    fontSize: 14,
    marginLeft: 2,
  },
});