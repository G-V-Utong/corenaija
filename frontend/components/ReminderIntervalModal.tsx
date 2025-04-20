import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ReminderIntervalModalProps {
  visible: boolean;
  onClose: () => void;
  currentInterval: number;
  onIntervalSelect: (interval: number) => void;
}

const intervals = [1, 2, 3, 4, 6, 8, 12, 24];

export const ReminderIntervalModal: React.FC<ReminderIntervalModalProps> = ({
  visible,
  onClose,
  currentInterval,
  onIntervalSelect,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <ThemedView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Select Reminder Interval</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={isDarkMode ? '#FFFFFF' : '#000000'}
              />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.intervalList}
            showsVerticalScrollIndicator={false}
          >
            {intervals.map((interval) => (
              <TouchableOpacity
                key={interval}
                style={[
                  styles.intervalOption,
                  currentInterval === interval && styles.selectedInterval,
                  { borderColor: isDarkMode ? '#334155' : '#CBD5E1' }
                ]}
                onPress={() => {
                  onIntervalSelect(interval);
                  onClose();
                }}
              >
                <ThemedText style={[
                  styles.intervalText,
                  currentInterval === interval && styles.selectedIntervalText
                ]}>
                  {interval} {interval === 1 ? 'Hour' : 'Hours'}
                </ThemedText>
                {currentInterval === interval && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color="#F36746"
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  intervalList: {
    maxHeight: 300,
  },
  intervalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedInterval: {
    borderColor: '#F36746',
    borderWidth: 2,
  },
  intervalText: {
    fontSize: 16,
  },
  selectedIntervalText: {
    color: '#F36746',
    fontWeight: '600',
  },
});