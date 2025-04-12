import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ThemedView } from './ThemedView';
import { LoadingSpinner } from './common/LoadingSpinner';
import { ThemedText } from './ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface LoadingModalProps {
  visible: boolean;
  onComplete: () => void;
  duration?: number;
}

export const LoadingModal = ({ visible, onComplete, duration = 2000 }: LoadingModalProps) => {
  const { colors } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      progress.setValue(0);
      translateX.setValue(-100);

      // Start progress animation
      Animated.timing(progress, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(() => {
        onComplete();
      });

      // Start shimmer animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -100,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      progress.setValue(0);
      translateX.setValue(-100);
    }
  }, [visible, duration, onComplete]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modalContent}>
          <LoadingSpinner size={60} />
          <ThemedText style={styles.message}>
            Please hold on while we create a tailored experience just for you.
          </ThemedText>
          <ThemedView style={styles.progressBarContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width: progressWidth }
              ]} 
            >
              <Animated.View
                style={[
                  styles.shimmer,
                  {
                    transform: [{ translateX }],
                  },
                ]}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </Animated.View>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  message: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Poppins',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#006F3C', // CoreNaija primary green
    borderRadius: 8,
    position: 'relative',
  },
  shimmer: {
    width: 100,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});