import React, { useState, useCallback } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Switch, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { supabase } from '../lib/supabase';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface WaterTrackerModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const REMINDER_INTERVALS = [1, 2, 3, 4, 6, 8];
const STORAGE_KEY = '@water_tracker_settings';

export const WaterTrackerModal = ({ isVisible, onClose }: WaterTrackerModalProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [reminderInterval, setReminderInterval] = useState<number>(2);
  const [waterAmount, setWaterAmount] = useState(0.0);
  const GLASS_SIZE = 0.3;
  const DAILY_GOAL = 2.0;

  // Add new function to fetch water intake
  const fetchWaterIntake = async () => {
    try {
      const { data, error } = await supabase
      .from('water_intake')
      .select('date, amount, target_amount')
      .eq('profile_id', profile.id)
      .order('date', { ascending: false })
      .limit(7);

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching water intake:', error);
        return;
      }

      if (data) {
        setWaterAmount(data.amount);
      }
    } catch (error) {
      console.error('Error loading water intake:', error);
    }
  };

  // Update useEffect to load both settings and water intake
  React.useEffect(() => {
    requestNotificationPermissions();
    loadSettings();
    fetchWaterIntake();
  }, []);

  const requestNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      
      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        setRemindersEnabled(false);
        console.log('Permission to send notifications was denied');
        return;
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      setRemindersEnabled(false);
    }
  };

  const scheduleNotifications = async () => {
    try {
      // Cancel any existing notifications first
      await Notifications.cancelAllScheduledNotificationsAsync();

      if (!remindersEnabled) return;
      
      // For Android, create a notification channel first
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('water-reminders', {
          name: 'Water Reminders',
          description: 'Reminders to drink water throughout the day',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      // Schedule notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: t('waterTracker.notifications.title'),
          body: t('waterTracker.notifications.body'),
          data: { type: 'water_reminder' },
          ...(Platform.OS === 'android' && { channelId: 'water-reminders' }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: reminderInterval * 60 * 60, // Convert hours to seconds
          repeats: true,
        },
      });

    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEY);
      if (settings) {
        const { remindersEnabled: enabled, reminderInterval: interval } = JSON.parse(settings);
        setRemindersEnabled(enabled);
        if (interval && REMINDER_INTERVALS.includes(interval)) {
          setReminderInterval(interval);
        }
      }
    } catch (error) {
      console.error('Error loading water tracker settings:', error);
    }
  };

  const saveWaterIntake = async () => {
    try {
      const { data: existing, error: fetchError } = await supabase
        .from('water_intake')
        .select()
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error('Error fetching water intake:', fetchError);
        return;
      }

      const waterIntakeData = {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        amount: waterAmount,
        target_amount: DAILY_GOAL,
        date: new Date().toISOString().split('T')[0],
      };

      if (existing) {
        const { error: updateError } = await supabase
          .from('water_intake')
          .update(waterIntakeData)
          .eq('id', existing.id);

        if (updateError) {
          console.error('Error updating water intake:', updateError);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from('water_intake')
          .insert([waterIntakeData]);

        if (insertError) {
          console.error('Error inserting water intake:', insertError);
          return;
        }
      }
    } catch (error) {
      console.error('Error saving water intake:', error);
    }
  };

  const saveSettings = useCallback(async () => {
    try {
      setIsSaving(true);
      const settings = {
        remindersEnabled,
        reminderInterval
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      await saveWaterIntake();

      if (remindersEnabled) {
        await scheduleNotifications();
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  }, [remindersEnabled, reminderInterval, waterAmount, onClose]);

  // Update notifications when reminder interval changes
  React.useEffect(() => {
    if (remindersEnabled) {
      scheduleNotifications();
    }
  }, [reminderInterval, remindersEnabled]);

  const handleIncrement = () => {
    setWaterAmount(prev => prev + GLASS_SIZE);
  };

  const handleDecrement = () => {
    setWaterAmount(prev => Math.max(prev - GLASS_SIZE, 0));
  };

  const handleIntervalSelect = (interval: number) => {
    setReminderInterval(interval);
  };

  const progressPercentage = Math.min((waterAmount / DAILY_GOAL) * 100, 100);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalOverlay}>
        <ThemedView style={[styles.modalContent, { 
          backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF'
        }]}>
          {/* Header with close button */}
          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('waterTracker.title')}</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Description text */}
          <ThemedText style={[styles.description, { 
            color: isDarkMode ? '#94A3B8' : '#64748B'
          }]}>
            {t('waterTracker.description')}
          </ThemedText>

          {/* Water Tracking Section */}
          <View style={[styles.waterTrackingSection, {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: isDarkMode ? '#334155' : '#CBD5E1',
            paddingVertical: 20,
          }]}>
            <View style={styles.trackingContainer}>
              <View style={styles.waterAmountContainer}>
                <ThemedText style={styles.waterLabel}>{t('waterTracker.waterDrunk')}</ThemedText>
                <ThemedText style={[styles.waterAmount, { color: '#F36746' }]}>{waterAmount.toFixed(1)} L</ThemedText>
              </View>

              <View style={styles.controlsContainer}>
                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: '#F36746' }]}
                  onPress={handleDecrement}
                >
                  <ThemedText style={styles.controlButtonText}>−</ThemedText>
                </TouchableOpacity>

                <View style={styles.glassContainer}>
                  <ThemedText style={[styles.glassAmount, {
                    color: isDarkMode ? '#94A3B8' : '#64748B'
                  }]}>{waterAmount.toFixed(1)} L</ThemedText>
                  <Ionicons 
                    name="water-outline" 
                    size={28} 
                    color={isDarkMode ? '#94A3B8' : '#64748B'} 
                  />
                </View>

                <TouchableOpacity
                  style={[styles.controlButton, { backgroundColor: '#F36746' }]}
                  onPress={handleIncrement}
                >
                  <ThemedText style={styles.controlButtonText}>+</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.humanIconContainer}>
                <View style={[styles.fillLevel, { 
                  height: `${progressPercentage}%`,
                  width: '20%',
                  backgroundColor: '#F36746',
                  opacity: 0.5 
                }]} />
                <Ionicons 
                  name="man-outline" 
                  size={64} 
                  color={isDarkMode ? '#94A3B8' : '#64748B'} 
                  style={styles.humanIcon}
                />
              </View>

              <View style={styles.goalContainer}>
                <ThemedText style={styles.goalLabel}>
                  {t('waterTracker.goal').replace('{amount}', DAILY_GOAL.toFixed(1))}
                </ThemedText>
                <ThemedText style={[styles.progressText, { color: '#F36746' }]}>
                  {progressPercentage.toFixed(0)}%
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Daily Goal */}
          <View style={styles.section}>
            <View style={styles.rowHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons 
                  name="trophy-outline" 
                  size={20} 
                  color={isDarkMode ? '#E2E8F0' : '#1A202C'}
                  style={styles.sectionIcon} 
                />
                <ThemedText style={[styles.sectionTitle, {
                  color: isDarkMode ? '#E2E8F0' : '#1A202C'
                }]}>{t('waterTracker.dailyGoal.title')}</ThemedText>
              </View>
              <ThemedText style={[styles.value, {
                color: isDarkMode ? '#E2E8F0' : '#1A202C'
              }]}>{t('waterTracker.dailyGoal.value')}</ThemedText>
            </View>
          </View>

          {/* Serving Size */}
          <View style={styles.section}>
            <View style={styles.rowHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons 
                  name="beaker-outline" 
                  size={20} 
                  color={isDarkMode ? '#E2E8F0' : '#1A202C'}
                  style={styles.sectionIcon} 
                />
                <ThemedText style={[styles.sectionTitle, {
                  color: isDarkMode ? '#E2E8F0' : '#1A202C'
                }]}>{t('waterTracker.servingSize.title')}</ThemedText>
              </View>
              <ThemedText style={[styles.value, {
                color: isDarkMode ? '#E2E8F0' : '#1A202C'
              }]}>{t('waterTracker.servingSize.value')}</ThemedText>
            </View>
          </View>

          {/* Reminders */}
          <View style={[styles.section, styles.lastSection]}>
            <View style={styles.rowHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons 
                  name="notifications-outline" 
                  size={20} 
                  color={isDarkMode ? '#E2E8F0' : '#1A202C'}
                  style={styles.sectionIcon} 
                />
                <ThemedText style={[styles.sectionTitle, {
                  color: isDarkMode ? '#E2E8F0' : '#1A202C'
                }]}>{t('waterTracker.reminders.title')}</ThemedText>
              </View>
              <Switch
                value={remindersEnabled}
                onValueChange={setRemindersEnabled}
                trackColor={{ false: isDarkMode ? '#4A5568' : '#CBD5E0', true: '#F36746' }}
                thumbColor={remindersEnabled ? '#FFFFFF' : '#F7FAFC'}
              />
            </View>
            {remindersEnabled && (
              <View style={styles.reminderInterval}>
                <ThemedText style={[styles.intervalText, {
                  color: isDarkMode ? '#94A3B8' : '#64748B'
                }]}>
                  {t('waterTracker.reminders.interval')}
                </ThemedText>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.intervalSelector}
                >
                  {REMINDER_INTERVALS.map((interval) => (
                    <TouchableOpacity
                      key={interval}
                      style={[
                        styles.intervalOption,
                        reminderInterval === interval && styles.selectedInterval,
                        { backgroundColor: isDarkMode ? '#374151' : '#F1F5F9' }
                      ]}
                      onPress={() => handleIntervalSelect(interval)}
                    >
                      <ThemedText style={[
                        styles.intervalOptionText,
                        reminderInterval === interval && styles.selectedIntervalText,
                        { color: isDarkMode ? '#E2E8F0' : '#1A202C' }
                      ]}>
                        {t('waterTracker.reminders.hourFormat').replace('{hours}', interval.toString())}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* OK Button */}
          <TouchableOpacity 
            style={[styles.okButton, { 
              backgroundColor: '#F36746',
              borderColor: isDarkMode ? '#4A5568' : '#E2E8F0',
            }]}
            onPress={saveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.okButtonText}>{t('common.ok')}</ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 12,
    paddingVertical: 2,
  },
  lastSection: {
    marginBottom: 0,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 32,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  reminderInterval: {
    marginTop: 16,
    marginBottom: 24,
  },
  intervalText: {
    fontSize: 14,
    marginBottom: 8,
  },
  intervalSelector: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  intervalOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedInterval: {
    backgroundColor: '#F36746',
    borderColor: '#F36746',
  },
  intervalOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedIntervalText: {
    color: '#FFFFFF',
  },
  okButton: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  waterTrackingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
    gap: 16,
  },
  trackingContainer: {
    width: '35%',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  waterAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  waterLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  waterAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#F36746',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  glassContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  glassAmount: {
    fontSize: 11,
    marginBottom: 2,
  },
  humanIconContainer: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  humanIcon: {
    zIndex: 2,
  },
  fillLevel: {
    position: 'absolute',
    bottom: 0,
    left: 25,
    right: 0,
    zIndex: 1,
    borderRadius: 50,
  },
  goalContainer: {
    alignItems: 'flex-start',
  },
  goalLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});