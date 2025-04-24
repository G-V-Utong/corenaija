import React, { useEffect, useState, useMemo } from "react";
import { LineChart } from "react-native-gifted-charts";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const PRIMARY = "#F36746";
const SKY_BLUE = "#00A9E0";
const WARM_YELLOW = "#F2C94C";
const DEEP_RED = "#D64F4F";
const LIGHT_GRAY = "#F4F6F9";
const DARK_GRAY = "#353535";
const OFF_WHITE = "#FFFFFF";
const ACCENT_GREEN = "#A4D96C";

const BMI_COLORS = [
  "#00A9E0", // Underweight
  "#A4D96C", // Normal
  "#F2C94C", // Overweight
  "#D64F4F", // Obese
];

// Update BMI_RANGES to use translated keys
const BMI_RANGES = [
  { label: "underweight", color: "#00A9E0" },
  { label: "normal", color: "#A4D96C" },
  { label: "overweight", color: "#F2C94C" },
  { label: "obese", color: "#D64F4F" },
];

type TimeFrame = "day" | "week" | "month";

type WeightRecord = {
  weight: number;
  created_at: string;
};

// Get x-axis labels based on timeframe
const getTimeLabels = (timeframe: TimeFrame): string[] => {
  const today = new Date();
  const labels: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    switch (timeframe) {
      case "day":
        date.setDate(today.getDate() - i);
        labels.push(date.getDate().toString());
        break;
      case "week":
        date.setDate(today.getDate() - i * 7);
        labels.push(
          date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        );
        break;
      case "month":
        date.setMonth(today.getMonth() - i);
        labels.push(date.toLocaleDateString("en-US", { month: "short" }));
        break;
    }
  }
  return labels;
};

// Create styles outside component to avoid TypeScript errors
const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 8,
      backgroundColor: isDarkMode ? "#000000" : OFF_WHITE,
    },
    card: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: isDarkMode ? "#23272F" : LIGHT_GRAY,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    cardTitle: {
      fontFamily: "Inter-Bold",
      fontSize: 18,
      color: isDarkMode ? "#FFFFFF" : "#000000",
    },
    progressBarBg: {
      height: 6,
      borderRadius: 3,
      backgroundColor: "#E0E0E0",
      marginVertical: 8,
      overflow: "hidden",
    },
    progressBar: {
      height: 6,
      borderRadius: 3,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    weightValue: {
      fontFamily: "Inter-Bold",
      fontSize: 32,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    },
    unit: {
      fontFamily: "Inter-Regular",
      fontSize: 16,
      color: "#888",
    },
    goalRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    goalLabel: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: isDarkMode ? "#94A3B8" : "#64748B",
    },
    goalValue: {
      fontSize: 12,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    },
    timeSelector: {
      flexDirection: "row",
      backgroundColor: isDarkMode ? "#1E2937" : "#E2E8F0",
      borderRadius: 20,
      padding: 4,
      marginVertical: 16,
    },
    timeButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      alignItems: "center",
    },
    timeButtonText: {
      fontFamily: "Inter-SemiBold",
      fontSize: 14,
      color: isDarkMode ? "#94A3B8" : "#64748B",
    },
    chartContainer: {
      marginTop: 8,
      alignItems: "start",
      backgroundColor: isDarkMode ? "#23272F" : LIGHT_GRAY,
      borderRadius: 12,
      overflow: "hidden", // Prevents chart content from overflowing
    },
    yAxis: {
      justifyContent: "space-between",
      paddingRight: 8,
      height: "100%",
    },
    targetLine: {
      position: "absolute",
      left: 0,
      right: 0,
      borderStyle: "dashed",
      height: 0,
      borderTopWidth: 1,
      zIndex: 1,
    },
    goalLineText: {
      position: "absolute",
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
      position: "relative",
      flex: 1,
      height: "100%",
    },
    weightPoint: {
      position: "absolute",
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#F36746",
      transform: [{ translateX: -6 }, { translateY: -6 }],
      zIndex: 3,
      shadowColor: "#F36746",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 6,
    },
    weightLine: {
      position: "absolute",
      height: 2,
      backgroundColor: PRIMARY,
      opacity: 0.5,
      zIndex: 2,
    },
    weightLabel: {
      position: "absolute",
      top: -36,
      left: -20,
      backgroundColor: SKY_BLUE,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      zIndex: 4,
    },
    weightLabelText: {
      fontFamily: "Inter-Bold",
      fontSize: 12,
      color: "#fff",
    },
    xAxis: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -16,
    },
    xAxisLabel: {
      fontSize: 12,
      color: isDarkMode ? "#94A3B8" : "#64748B",
      textAlign: "center",
      
    },
    bmiRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: 8,
      gap: 8,
    },
    bmiValue: {
      fontFamily: "Inter-Bold",
      fontSize: 32,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    },
    bmiStatus: {
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    },
    bmiBarWrap: {
      marginTop: 8,
    },
    bmiBarBg: {
      flexDirection: "row",
      height: 12,
      borderRadius: 6,
      backgroundColor: "#E0E0E0",
      alignItems: "center",
      marginBottom: 6,
      marginTop: 2,
      position: "relative",
    },
    bmiBarSeg: {
      flex: 1,
      height: 12,
    },
    bmiPointer: {
      position: "absolute",
      top: -16,
      width: 20,
      height: 20,
      backgroundColor: PRIMARY,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      transform: [{ translateX: -10 }],
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      zIndex: 10,
    },
    bmiRangeLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bmiRangeLabel: {
      fontSize: 10,
      color: "#888",
      minWidth: 18,
      textAlign: "center",
    },
    verticalLine: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: isDarkMode ? "#374151" : "#E0E0E0",
      zIndex: 0,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      backgroundColor: isDarkMode ? "#2D3748" : "#FFFFFF",
      padding: 16,
      borderRadius: 8,
    },
    modalTitle: {
      fontFamily: "Inter-Bold",
      fontSize: 18,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
      marginBottom: 12,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 8,
      marginBottom: 12,
      color: isDarkMode ? OFF_WHITE : DARK_GRAY,
    },
    modalButton: {
      height: 48,
      borderRadius: 8,
      backgroundColor: "#F36746",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    modalButtonText: {
      color: OFF_WHITE,
      fontSize: 16,
      fontFamily: "Inter-SemiBold",
    },
    modalCloseButton: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 2,
    },
    tooltipContainer: {
      position: "absolute",
      backgroundColor: isDarkMode ? "#374151" : "#FFFFFF",
      padding: 12,
      borderRadius: 8,
      width: 280,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1000,
      right: 0,
      top: 40,
    },
    tooltipText: {
      color: isDarkMode ? "#E5E7EB" : "#374151",
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "Inter-Regular",
    },
    tooltipTitle: {
      color: isDarkMode ? "#FFFFFF" : "#111827",
      fontSize: 16,
      fontFamily: "Inter-Bold",
      marginBottom: 8,
    },
    infoIcon: {
      marginLeft: 8,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  });

export const WeightAndBMITracker = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  // Move getBMIStatus inside component to access t function
  const getBMIStatus = (bmi: number): { label: string; color: string } => {
    if (bmi < 18.5) return { label: "underweight", color: BMI_COLORS[0] };
    if (bmi < 25) return { label: "normal", color: BMI_COLORS[1] };
    if (bmi < 30) return { label: "overweight", color: BMI_COLORS[2] };
    return { label: "obese", color: BMI_COLORS[3] };
  };

  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [startWeight, setStartWeight] = useState<number | null>(null);
  const [bmi, setBMI] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<TimeFrame>("day");
  const [modalVisible, setModalVisible] = useState(false);
  const [newWeightInput, setNewWeightInput] = useState("");
  const [showBMIInfo, setShowBMIInfo] = useState(false);
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>([]);

  const handleSaveWeight = async () => {
    const newWeight = parseFloat(newWeightInput);
    if (isNaN(newWeight)) return;
    setLoading(true);
    const userRes = await supabase.auth.getUser();
    if (userRes.data.user) {
      // Insert into weight_history
      await supabase.from("weight_history").insert({
        user_id: userRes.data.user.id,
        weight: newWeight,
      });
      // Update local state
      setWeight(newWeight);
      setWeightHistory([
        ...weightHistory,
        { weight: newWeight, created_at: new Date().toISOString() },
      ]);
    }
    setLoading(false);
    setModalVisible(false);
    setNewWeightInput("");
  };

  const getBMIRecommendation = () => {
    if (!height) return "";
    const minWeight = 18.5 * (height / 100) ** 2;
    const maxWeight = 24.9 * (height / 100) ** 2;
    return t("bmi.recommendation", {
      height: Math.round(height),
      minWeight: minWeight.toFixed(1),
      maxWeight: maxWeight.toFixed(1),
    });
  };

  const getWeightData = (
    timeframe: TimeFrame
  ): { value: number; label?: string }[] => {
    if (!weightHistory.length || !startWeight) return [];

    const now = new Date();
    const labels = getTimeLabels(timeframe);

    // Create date ranges for each label based on timeframe
    const dateRanges = labels.map((_, index) => {
      const date = new Date();
      switch (timeframe) {
        case "day":
          date.setDate(now.getDate() - (6 - index));
          return {
            start: new Date(date.setHours(0, 0, 0, 0)),
            end: new Date(date.setHours(23, 59, 59, 999)),
          };
        case "week":
          date.setDate(now.getDate() - (6 - index) * 7);
          return {
            start: new Date(date.setHours(0, 0, 0, 0)),
            end: new Date(new Date(date).setDate(date.getDate() + 6)),
          };
        case "month":
          date.setMonth(now.getMonth() - (6 - index));
          return {
            start: new Date(date.getFullYear(), date.getMonth(), 1),
            end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
          };
      }
    });

    // Sort weight history chronologically
    const sortedHistory = [...weightHistory].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    let lastKnownWeight = startWeight;
    const dataPoints = dateRanges.map((range) => {
      // Find all records in this date range
      const recordsInRange = sortedHistory.filter((record) => {
        const recordDate = new Date(record.created_at);
        return recordDate >= range.start && recordDate <= range.end;
      });

      // If there are records in this range, update the last known weight
      if (recordsInRange.length > 0) {
        // Use the most recent record in this range
        const mostRecent = recordsInRange.reduce((prev, current) =>
          new Date(prev.created_at) > new Date(current.created_at)
            ? prev
            : current
        );
        lastKnownWeight = mostRecent.weight;
      }

      // Return the last known weight (could be from a previous period)
      return {
        value: lastKnownWeight,
        // Add metadata for the tooltip
        dataPointText: lastKnownWeight.toFixed(1),
        label: labels[dateRanges.indexOf(range)],
        dateRange: range,
      };
    });

    return dataPoints;
  };

  // Current date for x-axis labels
  const currentDate = useMemo(() => new Date(), []);

  // Create styles with current theme
  const styles = createStyles(isDarkMode);

  // Calculate progress
  const progress = useMemo(() => {
    if (!weight || !startWeight || !goalWeight) return 0;
    return Math.min(
      100,
      Math.max(0, ((startWeight - weight) / (startWeight - goalWeight)) * 100)
    );
  }, [weight, startWeight, goalWeight]);

  const chartWeights = useMemo(
    () => getWeightData(timeframe),
    [weightHistory, timeframe]
  );
  const chartValues = useMemo(() => {
    const vals = chartWeights.map((point) => point.value);
    if (goalWeight !== null) vals.push(goalWeight);
    if (startWeight !== null) vals.push(startWeight);
    return vals;
  }, [chartWeights, goalWeight, startWeight]);

  const yMax = useMemo(
    () => Math.ceil(Math.max(...chartValues) + 2),
    [chartValues]
  );
  const yMin = useMemo(
    () => Math.floor(Math.min(...chartValues) - 2),
    [chartValues]
  );

  const getYPosition = (value: number | null): string => {
    if (value === null) return "50%";
    return `${((yMax - value) / (yMax - yMin)) * 100}%`;
  };

  const getXPosition = (index: number): string => {
    return `${(index / 6) * 100}%`; // Always 7 points (0-6)
  };

  const yLabels = useMemo(() => {
    const steps = 4;
    const stepSize = (yMax - yMin) / steps;
    return Array.from({ length: steps + 1 }, (_, i) =>
      Math.round(yMax - stepSize * i)
    );
  }, [yMax, yMin]);

  const xLabels = useMemo(() => getTimeLabels(timeframe), [timeframe]);

  // Update where BMI status is displayed
  const bmiStatus = useMemo(() => {
    if (!bmi) return null;
    const status = getBMIStatus(bmi);
    return {
      label: t(`bmi.status.${status.label}`),
      color: status.color,
    };
  }, [bmi, t]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("weight, height, target_weight")
        .eq("id", user.data.user.id)
        .single();

      // Fetch weight history
      const { data: weights, error: weightsError } = await supabase
        .from("weight_history")
        .select("weight, created_at")
        .eq("user_id", user.data.user.id)
        .order("created_at", { ascending: true });

      if (!profileError && profile) {
        setStartWeight(profile.weight);
        setHeight(profile.height);
        setGoalWeight(profile.target_weight);
      }

      if (!weightsError && weights && weights.length > 0) {
        setWeightHistory(weights);
        setWeight(weights[weights.length - 1].weight);
        if (profile?.height) {
          const bmiVal =
            weights[weights.length - 1].weight / (profile.height / 100) ** 2;
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
          <Text style={styles.cardTitle}>{t("weightTracker.title")}</Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons
              name="add"
              size={18}
              color={isDarkMode ? "#FFFFFF" : "#000000"}
            />
          </Pressable>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: progress >= 100 ? "#34C759" : PRIMARY,
              },
            ]}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.weightValue}>
            {weight ? weight.toFixed(1) : "--"}
            <Text style={styles.unit}>kg</Text>
          </Text>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>
              {t("weightTracker.starting")}:{" "}
            </Text>
            <Text style={styles.goalValue}>{startWeight ?? "--"}kg</Text>
            <Text style={[styles.goalLabel, { marginLeft: 8 }]}>
              {t("weightTracker.goal")}:{" "}
            </Text>
            <Text style={styles.goalValue}>{goalWeight ?? "--"}kg</Text>
          </View>
        </View>
        {/* Time Period Selector */}
        <View style={styles.timeSelector}>
          {(["day", "week", "month"] as TimeFrame[]).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.timeButton,
                timeframe === period && {
                  backgroundColor: isDarkMode ? "#374151" : "#fff",
                },
              ]}
              onPress={() => setTimeframe(period)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  timeframe === period && {
                    color: isDarkMode ? "#fff" : PRIMARY,
                  },
                ]}
              >
                {t(`weightTracker.timeframes.${period}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Chart */}
        // Replace your current chart container with this:
        <View style={styles.chartContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            <LineChart
              data={getWeightData(timeframe)}
              height={200}
              width={Dimensions.get("window").width * 1.15} // Wider than screen for scrolling
              maxValue={yMax}
              minValue={yMin}
              noOfSections={4}
              spacing={timeframe === "month" ? 40 : 60} // Adjust based on timeframe
              initialSpacing={10}
              endSpacing={10}
              backgroundColor={isDarkMode ? "#23272F" : LIGHT_GRAY}
              curved
              thickness={3}
              color={PRIMARY}
              dataPointsColor={PRIMARY}
              dataPointsHeight={8}
              dataPointsWidth={8}
              textFontSize1={8}
              textColor={isDarkMode ? OFF_WHITE : DARK_GRAY}
              textFontSize={12}
              textShiftY={20}
              textShiftX={-1}
              yAxisTextStyle={{
                color: isDarkMode ? "#94A3B8" : "#64748B",
                fontSize: 12,
              }}
              xAxisLabelTextStyle={{
                color: isDarkMode ? "#94A3B8" : "#64748B",
                fontSize: 12,
                width: timeframe === "month" ? 40 : 60,
              }}
              xAxisLabelsHeight={24}
              xAxisLabelsVerticalShift={4}
              yAxisLabelWidth={40}
              yAxisColor={isDarkMode ? "#374151" : "#E0E0E0"}
              xAxisColor={isDarkMode ? "#374151" : "#E0E0E0"}
              rulesColor={isDarkMode ? "#374151" : "#E0E0E0"}
              xAxisLabelTexts={getTimeLabels(timeframe)}
              referenceLines={[
                {
                  value: goalWeight || 0, // Fallback to 0 if goalWeight is null
                  color: WARM_YELLOW,    // Use your yellow color constant
                  thickness: 2,          // Line thickness
                  dashWidth: 4,          // Length of each dash
                  dashGap: 4,            // Space between dashes
                  labelText: goalWeight ? `${goalWeight}kg` : undefined,
                  labelTextStyle: {
                    color: OFF_WHITE,
                    backgroundColor: WARM_YELLOW,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 4,
                    fontSize: 12,
                    zIndex: 100,
                  },
                  labelComponent: () => (
                    <View style={{
                      backgroundColor: WARM_YELLOW,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 4,
                    }}>
                      <Text style={{ color: OFF_WHITE, fontSize: 12 }}>
                        {goalWeight ? `Goal: ${goalWeight}kg` : ''}
                      </Text>
                    </View>
                  ),
                },
              ]}
            />
          </ScrollView>
        </View>
      </View>

      {/* BMI Card */}
      <View style={[styles.card, { marginTop: 16 }]}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitle}>{t("bmi.title")}</Text>
            <TouchableOpacity onPress={() => setShowBMIInfo(!showBMIInfo)}>
              <Ionicons
                name="information-circle-outline"
                size={12}
                color={isDarkMode ? "#94A3B8" : "#64748B"}
                style={{ marginLeft: 4, marginTop: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {showBMIInfo && (
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipTitle}>{t("bmi.title")}</Text>
            <Text style={styles.tooltipText}>
              {t("bmi.description")}
              {"\n\n"}
              {t("bmi.ranges.underweight")}
              {"\n"}
              {t("bmi.ranges.normal")}
              {"\n"}
              {t("bmi.ranges.overweight")}
              {"\n"}
              {t("bmi.ranges.obese")}
              {"\n\n"}
              {getBMIRecommendation()}
            </Text>
          </View>
        )}

        <View style={styles.bmiRow}>
          <Text
            style={[styles.bmiValue, { color: bmiStatus?.color ?? PRIMARY }]}
          >
            {bmi ? bmi.toFixed(1) : "--"}
          </Text>
          <Text
            style={[styles.bmiStatus, { color: bmiStatus?.color ?? PRIMARY }]}
          >
            {bmiStatus?.label ?? ""}
          </Text>
        </View>

        {/* BMI Bar */}
        <View style={styles.bmiBarWrap}>
          <View style={styles.bmiBarBg}>
            {BMI_RANGES.map(({ color }, index) => (
              <View
                key={index}
                style={[styles.bmiBarSeg, { backgroundColor: color }]}
              />
            ))}
            {bmi && (
              <View
                style={[
                  styles.bmiPointer,
                  {
                    left: `${Math.min(
                      Math.max(((bmi - 16) / (35 - 16)) * 100, 0),
                      100
                    )}%`,
                    backgroundColor: bmiStatus?.color ?? PRIMARY,
                  },
                ]}
              />
            )}
          </View>
          <View style={styles.bmiRangeLabels}>
            {BMI_RANGES.map(({ label }, index) => (
              <Text key={index} style={styles.bmiRangeLabel}>
                {t(`bmi.status.${label}`)}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Weight Input Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons
                name="close"
                size={20}
                color={isDarkMode ? OFF_WHITE : DARK_GRAY}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {t("weightTracker.updateWeight")}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={t("weightTracker.enterWeight")}
              keyboardType="numeric"
              value={newWeightInput}
              onChangeText={setNewWeightInput}
              placeholderTextColor={isDarkMode ? "#888" : "#666"}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSaveWeight}
            >
              <Text style={styles.modalButtonText}>
                {t("weightTracker.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
