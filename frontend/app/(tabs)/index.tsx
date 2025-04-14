import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { ThemedView } from '../../components/ThemedView';
import { WorkoutCalendar } from '../../components/WorkoutCalendar';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const { session } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session?.user.id)
        .single();
      
      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]); // Get first name only
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Me" />
      </SafeAreaView>
      <ThemedView style={styles.content}>
        <WorkoutCalendar userName={userName} />
      </ThemedView>
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
});