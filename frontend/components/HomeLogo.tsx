import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: number;
  color?: string;
}

export default function HomeLogo({ size = 40, color = '#F36746' }: LogoProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/RB.png')}
        style={{ width: size * 1.5, height: size * 1.5 }}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={[
          styles.text, 
          { 
            fontSize: size * 0.8, 
            color: isDarkMode ? '#FFFFFF' : '#000000'
          }
        ]}>
          Reform
        </Text>
        <Text style={[styles.bodiText, { color, fontSize: size * 0.8 }]}>
          Bodi
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
  },
  bodiText: {
    fontWeight: '800',
    fontStyle: 'italic',
    transform: [{ skewX: '-10deg' }],
  },
}); 