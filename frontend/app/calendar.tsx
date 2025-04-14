import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ActivityCalendar } from '../components/ActivityCalendar';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface UserProfile {
  weight: number;
  updated_at: string;
}

export default function CalendarScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<'activities' | 'history'>('activities');
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('weight, updated_at')
        .eq('id', session?.user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    return {
      day: date.getDate(),
      weekDay: t(`calendar.weekDays.${weekDays[date.getDay()]}`)
    };
  };

  const handleDayPress = (date: Date) => {
    // Handle day selection
    console.log('Selected date:', date);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
            onPress={() => setActiveTab('activities')}
          >
            <View style={styles.tabContent}>
              <ThemedText style={[
                styles.tabText,
                activeTab === 'activities' && styles.activeTabText
              ]}>
                {t('calendar.activities')}
              </ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <View style={styles.tabContent}>
              <ThemedText style={[
                styles.tabText,
                activeTab === 'history' && styles.activeTabText
              ]}>
                {t('calendar.history')}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ActivityCalendar onDayPress={handleDayPress} />

      {activeTab === 'history' && (
        <View style={styles.historyList}>
          {profile && (
            <TouchableOpacity 
              style={[
                styles.historyItem,
                { backgroundColor: isDarkMode ? '#2A2A2A' : '#F4F6F9' }
              ]}
            >
              <View style={styles.dateInfo}>
                <ThemedText style={styles.dateNumber}>{formatDate(profile.updated_at).day}</ThemedText>
                <ThemedText style={styles.dateDay}>{formatDate(profile.updated_at).weekDay}</ThemedText>
              </View>
              <View style={styles.historyContent}>
                <ThemedText style={styles.historyTitle}>{t('calendar.bodyInformation')}</ThemedText>
                <ThemedText style={styles.historySubtitle}>{profile.weight}kg</ThemedText>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#000000'} 
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {activeTab === 'activities' && (
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#000000" />
          <ThemedText style={styles.addButtonText}>{t('calendar.add')}</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F36746',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#F36746',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 24,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  dateInfo: {
    alignItems: 'center',
    marginRight: 16,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  dateDay: {
    fontSize: 14,
    color: '#1E90FF',
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  historySubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    left: 24,
    backgroundColor: '#FFE5B4',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
