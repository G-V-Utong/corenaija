import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Modal, TextInput } from 'react-native';
import { supabase } from '../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useTheme } from '../context/ThemeContext';

const PRIMARY = '#F36746';
const SKY_BLUE = '#00A9E0';
const WARM_YELLOW = '#F2C94C';
const DEEP_RED = '#D64F4F';
const LIGHT_GRAY = '#F4F6F9';
const DARK_GRAY = '#353535';
const OFF_WHITE = '#FFFFFF';
const ACCENT_GREEN = '#A4D96C';

const BMI_COLORS = [
  '#00A9E0', // Underweight
  '#A4D96C', // Normal
  '#F2C94C', // Overweight
  '#D64F4F', // Obese
];

const BMI_LABELS = [
  'Underweight',
  'Normal',
  'Overweight',
  'Obese',
];

const BMI_RANGES = [
  { label: 'Underweight', color: '#00A9E0' },
  { label: 'Normal', color: '#A4D96C' },
  { label: 'Overweight', color: '#F2C94C' },
  { label: 'Obese', color: '#D64F4F' },
];

type TimeFrame = 'day' | 'week' | 'month';

// Get x-axis labels based on timeframe
const getTimeLabels = (timeframe: TimeFrame, currentDate: Date = new Date()): string[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  switch (timeframe) {
    case 'day': {
      // Show days of current week (e.g., 15, 16, 17, 18, 19, 20)
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - 6); // Go back 6 days
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date.getDate().toString();
      });
    }
    case 'week': {
      // Show dates for last 7 weeks
      const result = [];
      const date = new Date(currentDate);
      for (let i = 6; i >= 0; i--) {
        const weekDate = new Date(date);
        weekDate.setDate(date.getDate() - (i * 7));
        // Format as "DD/MM"
        result.push(`${weekDate.getDate()}/${weekDate.getMonth() + 1}`);
      }
      return result;
    }
    case 'month': {
      // Show last 6 months + current month
      const result = [];
      const month = currentDate.getMonth();
      for (let i = 6; i >= 0; i--) {
        const monthIndex = (month - i + 12) % 12;
        result.push(months[monthIndex]);
      }
      return result;
    }
  }
};

// Mock weight data based on timeframe - only show current weight
const getWeightData = (weight: number | null, timeframe: TimeFrame): (number | null)[] => {
  if (!weight) return Array(7).fill(null);
  // Return array with null values except for the last position which has current weight
  return Array(7).fill(null).map((_, i) => i === 6 ? weight : null);
};

// Get BMI status based on BMI value
const getBMIStatus = (bmi: number): { label: string; color: string } => {
  if (bmi < 18.5) return { label: 'Underweight', color: BMI_COLORS[0] };
  if (bmi < 25) return { label: 'Normal', color: BMI_COLORS[1] };
  if (bmi < 30) return { label: 'Overweight', color: BMI_COLORS[2] };
  return { label: 'Obese', color: BMI_COLORS[3] };
};

// Create styles outside component to avoid TypeScript errors
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: isDarkMode ? DARK_GRAY : OFF_WHITE,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: isDarkMode ? '#23272F' : LIGHT_GRAY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weightValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#888',
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: isDarkMode ? '#94A3B8' : '#64748B',
  },
  goalValue: {
    fontSize: 12,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
  },
  timeSelector: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? '#1E2937' : '#E2E8F0',
    borderRadius: 20,
    padding: 4,
    marginVertical: 16,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  timeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: isDarkMode ? '#94A3B8' : '#64748B',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    paddingRight: 8,
    paddingBottom: 24,
    marginTop: 8,
    overflow: 'hidden',
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 8,
    height: '100%',
  },
  axisLabel: {
    fontSize: 12,
    color: isDarkMode ? '#94A3B8' : '#64748B',
    marginRight: 4,
  },
  chartArea: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  targetLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderStyle: 'dashed',
    height: 0,
    borderTopWidth: 1,
    zIndex: 1,
  },
  goalLineText: {
    position: 'absolute',
    right: 4,
    backgroundColor: WARM_YELLOW,
    color: OFF_WHITE,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    zIndex: 2,
  },
  pointsContainer: {
    position: 'relative',
    flex: 1,
    height: '100%',
  },
  weightPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F36746',
    transform: [{ translateX: -6 }, { translateY: -6 }],
    zIndex: 3,
    shadowColor: '#F36746',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  weightLabel: {
    position: 'absolute',
    top: -36,
    left: -20,
    backgroundColor: SKY_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 4,
  },
  weightLabelText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#fff',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -16,
  },
  xAxisLabel: {
    fontSize: 12,
    color: isDarkMode ? '#94A3B8' : '#64748B',
    textAlign: 'center',
  },
  bmiRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
    gap: 8,
  },
  bmiValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
  },
  bmiStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
  },
  bmiBarWrap: {
    marginTop: 8,
  },
  bmiBarBg: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    marginBottom: 6,
  },
  bmiBarSeg: {
    flex: 1,
    height: 12,
  },
  bmiPointer: {
    position: 'absolute',
    top: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#222',
    left: '50%',
    zIndex: 3,
  },
  bmiRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bmiRangeLabel: {
    fontSize: 10,
    color: '#888',
    minWidth: 18,
    textAlign: 'center',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: isDarkMode ? '#374151' : '#E0E0E0',
    zIndex: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    color: isDarkMode ? OFF_WHITE : DARK_GRAY,
  },
  modalButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F36746',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    color: OFF_WHITE,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
  },
});

export const WeightAndBMITracker = () => {
  const { isDarkMode } = useTheme();
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [bmi, setBMI] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<TimeFrame>('day');
  const [modalVisible, setModalVisible] = useState(false);
  const [newWeightInput, setNewWeightInput] = useState('');

  const handleSaveWeight = async () => {
    const newWeight = parseFloat(newWeightInput);
    if (isNaN(newWeight)) return;
    setLoading(true);
    const userRes = await supabase.auth.getUser();
    if (userRes.data.user) {
      await supabase.from('profiles')
        .update({ current_weight: newWeight })
        .eq('id', userRes.data.user.id);
      setWeight(newWeight);
    }
    setLoading(false);
    setModalVisible(false);
    setNewWeightInput('');
  };

  // Current date for x-axis labels
  const currentDate = useMemo(() => new Date('2025-04-20T10:41:43+01:00'), []);

  // Create styles with current theme
  const styles = createStyles(isDarkMode);

  // Calculate progress
  const progress = useMemo(() => {
    if (!weight || !startWeight || !goalWeight) return 0;
    return Math.min(100, Math.max(0, ((startWeight - weight) / (startWeight - goalWeight)) * 100));
  }, [weight, startWeight, goalWeight]);

  const chartWeights = useMemo(() => getWeightData(weight, timeframe), [weight, timeframe]);
  const chartValues = useMemo(() => {
    const vals = (chartWeights.filter(w => w !== null) as number[]);
    if (goalWeight !== null) vals.push(goalWeight);
    if (startWeight !== null) vals.push(startWeight);
    return vals;
  }, [chartWeights, goalWeight, startWeight]);
  const yMax = useMemo(() => Math.ceil(Math.max(...chartValues) + 2), [chartValues]);
  const yMin = useMemo(() => Math.floor(Math.min(...chartValues) - 2), [chartValues]);

  const getYPosition = (value: number | null): string => {
    if (value === null) return '50%';
    return `${((yMax - value) / (yMax - yMin)) * 100}%`;
  };
  
  const getXPosition = (index: number): string => {
    return `${(index / 6) * 100}%`; // Always 7 points (0-6)
  };

  const yLabels = useMemo(() => {
    const steps = 4;
    const stepSize = (yMax - yMin) / steps;
    return Array.from({ length: steps + 1 }, (_, i) => Math.round(yMax - stepSize * i));
  }, [yMax, yMin]);
  const xLabels = useMemo(() => getTimeLabels(timeframe, currentDate), [timeframe, currentDate]);

  const bmiStatus = useMemo(() => bmi ? getBMIStatus(bmi) : null, [bmi]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('weight, height, target_weight, current_weight')
        .eq('id', user.data.user.id)
        .single();
      if (!error && data) {
        setStartWeight(data.weight);
        setWeight(data.current_weight ?? data.weight);
        setHeight(data.height);
        setGoalWeight(data.target_weight);
        if (data.weight && data.height) {
          const bmiVal = data.weight / ((data.height / 100) ** 2);
          setBMI(Number(bmiVal.toFixed(2)));
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>      
      {/* Weight Card */}
      <View style={styles.card}>        
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle}>Weight</Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={18} color={isDarkMode ? '#FFFFFF' : '#000000'} />
          </Pressable>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, {
            width: `${progress}%`,
            backgroundColor: progress >= 100 ? '#34C759' : PRIMARY,
          }]} />
        </View>
        <View style={styles.row}>
          <Text style={styles.weightValue}>
            {weight ? weight.toFixed(1) : '--'}<Text style={styles.unit}>kg</Text>
          </Text>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>Starting: </Text>
            <Text style={styles.goalValue}>{startWeight ?? '--'}kg</Text>
            <Text style={[styles.goalLabel, { marginLeft: 8 }]}>Goal: </Text>
            <Text style={styles.goalValue}>{goalWeight ?? '--'}kg</Text>
          </View>
        </View>

        {/* Time Period Selector */}
        <View style={styles.timeSelector}>
          {(['day', 'week', 'month'] as TimeFrame[]).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeButton,
                timeframe === period && {
                  backgroundColor: isDarkMode ? '#374151' : '#fff',
                },
              ]}
              onPress={() => setTimeframe(period)}
            >
              <Text style={[
                styles.timeButtonText,
                timeframe === period && {
                  color: isDarkMode ? '#fff' : PRIMARY,
                },
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            {yLabels.map((label) => (
              <Text key={String(label)} style={styles.axisLabel}>{label}</Text>
            ))}
          </View>
          <View style={styles.chartArea}>
            {/* Target Weight Line */}
            {goalWeight !== null && (
              <>
                <View style={[styles.targetLine, {
                  top: getYPosition(goalWeight),
                  borderColor: WARM_YELLOW,
                }]} />
                <Text style={[styles.goalLineText, { top: getYPosition(goalWeight), marginTop: -16 }]}>
                  {goalWeight}kg
                </Text>
              </>
            )}

            {/* Vertical Grid Lines */}
            {xLabels.map((_, idx) => (
              <View key={idx} style={[styles.verticalLine, { left: getXPosition(idx) }]} />
            ))}

            {/* Weight Points */}
            <View style={styles.pointsContainer}>
              {chartWeights.map((w, i) => w !== null && (
                <View key={i} style={[styles.weightPoint, {
                  left: getXPosition(i),
                  top: getYPosition(w),
                }]} />
              ))}
            </View>

            {/* X-Axis */}
            <View style={styles.xAxis}>
              {xLabels.map((label, index) => (
                <Text key={index} style={styles.xAxisLabel}>{label}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* BMI Card */}
      <View style={[styles.card, { marginTop: 16 }]}>        
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle}>BMI (kg/m²)</Text>
          <TouchableOpacity>
            <Ionicons name="pencil" size={16} color={bmiStatus?.color ?? PRIMARY} />
          </TouchableOpacity>
        </View>
        <View style={styles.bmiRow}>
          <Text style={[styles.bmiValue, { color: bmiStatus?.color ?? PRIMARY }]}>
            {bmi ? bmi.toFixed(1) : '--'}
          </Text>
          <Text style={[styles.bmiStatus, { color: bmiStatus?.color ?? PRIMARY }]}>
            {bmiStatus?.label ?? ''}
          </Text>
        </View>

        {/* BMI Bar */}
        <View style={styles.bmiBarWrap}>
          <View style={styles.bmiBarBg}>
            {BMI_RANGES.map(({ color }, index) => (
              <View key={index} style={[styles.bmiBarSeg, { backgroundColor: color }]} />
            ))}
            {bmi && (
              <View style={[styles.bmiPointer, {
                left: `${((bmi - 16) / (35 - 16)) * 100}%`,
                borderBottomColor: bmiStatus?.color ?? PRIMARY,
              }]} />
            )}
          </View>
          <View style={styles.bmiRangeLabels}>
            {BMI_RANGES.map(({ label }, index) => (
              <Text key={index} style={styles.bmiRangeLabel}>{label}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Weight Input Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={20} color={isDarkMode ? OFF_WHITE : DARK_GRAY} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Update Weight</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter weight (kg)"
              keyboardType="numeric"
              value={newWeightInput}
              onChangeText={setNewWeightInput}
              placeholderTextColor={isDarkMode ? '#888' : '#666'}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveWeight}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
