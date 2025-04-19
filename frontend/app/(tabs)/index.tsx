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
import { useTabBar } from '../../context/TabBarContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [userName, setUserName] = useState('');
  const { isDarkMode } = useTheme();
  const [isWaterModalVisible, setIsWaterModalVisible] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [timeframe, setTimeframe] = useState('today');
  const { handleScroll } = useTabBar();
  const { t } = useLanguage();

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

  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
  type WeekDay = typeof weekDays[number];

  const getTranslatedDay = (day: WeekDay) => {
    return t(`activitySummary.weekDays.${day}`);
  };

  const formatTranslationParams = (key: string, params: Record<string, string | number>) => {
    return t(key, params);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Me" />
      </SafeAreaView>
      <ScrollView 
        style={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <WorkoutCalendar userName={userName} />
        
        {/* Activity Summary Header */}
        <View style={[styles.summaryHeader, { 
          marginHorizontal: 16,
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }]}>
          <ThemedText style={styles.summaryTitle}>{t('activitySummary.title')}</ThemedText>
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
              <Picker.Item label={t('activitySummary.timeframes.today')} value="today" />
              <Picker.Item label={t('activitySummary.timeframes.week')} value="week" />
              <Picker.Item label={t('activitySummary.timeframes.month')} value="month" />
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
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>
                      {formatTranslationParams('activitySummary.stats.activeMinutes.value', { minutes: 60 })}
                    </ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      {t('activitySummary.stats.activeMinutes.title')}
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
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>
                      {formatTranslationParams('activitySummary.stats.caloriesBurned.value', { calories: 480 })}
                    </ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      {t('activitySummary.stats.caloriesBurned.title')}
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
                    <ThemedText style={[styles.statValue, { fontSize: 24 }]}>
                      {formatTranslationParams('activitySummary.stats.fastingHours.value', { hours: 16 })}
                    </ThemedText>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      {t('activitySummary.stats.fastingHours.title')}
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
                      <ThemedText style={[styles.statValue, { fontSize: 24 }]}>
                        {waterIntake}
                      </ThemedText>
                      <ThemedText style={[styles.statValue, { fontSize: 14, color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                        /{getWaterGoal()}L
                      </ThemedText>
                    </View>
                    <ThemedText style={[styles.statLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                      {t('activitySummary.stats.waterIntake.title')}
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
              <ThemedText style={styles.workoutTitle}>
                {formatTranslationParams('activitySummary.workoutDuration.title', { duration: 45 })}
              </ThemedText>
              <ThemedText style={[styles.workoutSubtitle, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                {t('activitySummary.workoutDuration.subtitle')}
              </ThemedText>
            </View>
            <View style={styles.chartContainer}>
              {weekDays.map((day, index) => (
                <View key={day} style={styles.barColumn}>
                  <View style={[styles.bar, { 
                    height: index === 3 ? 45 : 25,
                    backgroundColor: index === 3 ? '#F36746' : (isDarkMode ? '#374151' : '#F1F5F9')
                  }]} />
                  <ThemedText style={[styles.barLabel, { color: isDarkMode ? '#94A3B8' : '#64748B' }]}>
                    {getTranslatedDay(day)}
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
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '70%',
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
    width: '100%',
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
    alignItems: 'baseline',
    marginBottom: 4,
  },
  waterGoalText: {
    fontSize: 14,
    marginLeft: 2,
  },
});