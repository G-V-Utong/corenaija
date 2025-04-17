import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { supabase } from '../lib/supabase';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

interface WaterIntakeData {
  date: string;
  amount: number;
  target_amount: number;
}

export const WaterTrackingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [waterData, setWaterData] = useState<WaterIntakeData[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchWaterIntakeHistory();
  }, []);

  const fetchWaterIntakeHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('water_intake')
        .select('date, amount, target_amount')
        .order('date', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Error fetching water intake:', error);
        return;
      }

      setWaterData(data || []);
    } catch (error) {
      console.error('Error in water intake history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F36746" />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water" size={24} color="#F36746" />
        <ThemedText style={styles.title}>Water Tracking History</ThemedText>
      </View>

      {waterData.length === 0 ? (
        <ThemedText style={styles.noDataText}>
          No water tracking data available yet
        </ThemedText>
      ) : (
        waterData.map((data) => (
          <View key={data.date} style={[styles.dayContainer, {
            borderColor: isDarkMode ? '#334155' : '#E2E8F0'
          }]}>
            <ThemedText style={styles.date}>
              {new Date(data.date).toLocaleDateString()}
            </ThemedText>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min((data.amount / data.target_amount) * 100, 100)}%`,
                      backgroundColor: '#F36746'
                    }
                  ]}
                />
              </View>
              <ThemedText style={styles.progressText}>
                {data.amount.toFixed(1)}L / {data.target_amount.toFixed(1)}L
              </ThemedText>
            </View>
          </View>
        ))
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
  },
  dayContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  date: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    minWidth: 80,
  },
});