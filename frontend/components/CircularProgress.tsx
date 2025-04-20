import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

interface CircularProgressProps {
  size: number;
  progress: number;
  strokeWidth?: number;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  iconColor?: string;
  iconSize?: number;
}

export const CircularProgress = ({
  size,
  progress,
  strokeWidth = 3,
  icon = "water-outline",
  color = "#F36746",
  backgroundColor = "#E2E8F0",
  iconColor = "#000000",
  iconSize,
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStroke = (circumference * (1 - progress / 100));

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressStroke}
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon as any}
          size={iconSize || size / 2}
          color={iconColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});