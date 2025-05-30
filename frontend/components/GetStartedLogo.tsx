import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: number;
  color?: string;
}

export default function GetStartedLogo({ size = 40, color = '#F36746' }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/RBwhite.png')}
        style={{ width: size * 1.5, height: size * 1.5 }}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: '#fff', fontSize: size * 0.8 }]}>
          Reform
        </Text>
        <Text style={[styles.bodiText, { color: '#fff', fontSize: size * 0.8 }]}>
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
    color: '#1E293B',
  },
  bodiText: {
    fontWeight: '800',
    fontStyle: 'italic',
    transform: [{ skewX: '-10deg' }],
  },
}); 