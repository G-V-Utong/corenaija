import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 40, color = '#FF6B00' }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/RB.png')}
        style={{ width: size * 3, height: size * 3 }}
        resizeMode="contain"
      />
      {/* <Text style={[styles.text, { color, fontSize: size * 0.8 }]}>
        RB
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: 'bold',
  },
}); 