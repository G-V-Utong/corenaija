import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ActivityCalendar } from '../components/ActivityCalendar';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface UserProfile {
  weight: number;
  updated_at: string;
}

export default function CalendarScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
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
    return {
      day: date.getDate(),
      weekDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
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
            <ThemedText style={[
              styles.tabText,
              activeTab === 'activities' && styles.activeTabText
            ]}>
              Activities
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <ThemedText style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}>
              History
            </ThemedText>
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
                <ThemedText style={styles.historyTitle}>Body Information</ThemedText>
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
          <ThemedText style={styles.addButtonText}>Add</ThemedText>
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
    paddingBottom: 8,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F36746',
  },
  tabText: {
    fontSize: 24,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#F36746',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
