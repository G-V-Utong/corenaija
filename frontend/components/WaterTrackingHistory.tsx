import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
// import { useColorScheme } from '@/components/useColorScheme';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

interface WaterData {
  date: string;
  amount: number;
  target_amount: number;
}

export const WaterTrackingHistory = () => {
  const [loading, setLoading] = useState(true);
  const [waterData, setWaterData] = useState<WaterData[]>([]);
  const isDarkMode = useTheme();
  const screenWidth = Dimensions.get('window').width - 32; // Padding on both sides

  useEffect(() => {
    fetchWaterIntakeHistory();
  }, []);

  const fetchWaterIntakeHistory = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .single();

      if (profile) {
        const { data, error } = await supabase
          .from('water_intake')
          .select('date, amount, target_amount')
          .eq('profile_id', profile.id)
          .order('date', { ascending: false })
          .limit(7);

        if (error) throw error;
        setWaterData(data || []);
      }
    } catch (error) {
      console.error('Error fetching water intake history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Process data for the chart
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const chartData = last7Days.map(date => {
    const dayData = waterData.find(d => d.date === date);
    return dayData ? parseFloat(dayData.amount.toFixed(1)) : 0;
  });

  const waterGoal = waterData.length > 0 ? waterData[0].target_amount : 3.0; // Default to 3L if no data
  const maxValue = Math.max(...chartData, waterGoal);

  const dayLabels = last7Days.map(date => {
    const day = new Date(date).toLocaleDateString('en', { weekday: 'short' });
    return day.substring(0, 3);
  });

  const chartConfig = {
    backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    backgroundGradientFrom: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#1A1A1A' : '#FFFFFF',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 169, 224, ${opacity})`, // Sky Blue from app theme
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#00A9E0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: isDarkMode ? '#334155' : '#E2E8F0',
    },
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A9E0" />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water" size={24} color="#00A9E0" />
        <ThemedText style={styles.title}>Water Tracking History</ThemedText>
      </View>

      {waterData.length === 0 ? (
        <ThemedText style={styles.noDataText}>
          No water tracking data available yet
        </ThemedText>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: dayLabels,
              datasets: [
                {
                  data: chartData,
                  color: (opacity = 1) => `rgba(0, 169, 224, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: [waterGoal, waterGoal],
                  color: (opacity = 1) => `rgba(164, 217, 108, ${opacity})`,
                  strokeWidth: 1,
                  withDots: false,
                },
              ],
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              ...chartConfig,
              max: Math.ceil(maxValue),
              min: 0,
            }}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withDots={true}
            segments={4}
            fromZero={true}
            yAxisLabel=""
            yAxisSuffix="L"
          />
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.7,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
});