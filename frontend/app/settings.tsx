import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, themeMode, setThemeMode } = useTheme();
  const { signOut, deleteAccount } = useAuth();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getThemeValue = () => {
    switch (themeMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  };

  const settingsOptions = [
    {
      icon: 'contrast-outline',
      label: 'Theme',
      value: getThemeValue(),
      onPress: () => setShowThemeModal(true),
    },
    {
      icon: 'notifications-outline',
      label: 'Notifications',
      value: 'On',
      onPress: () => {},
    },
    {
      icon: 'language-outline',
      label: 'Language',
      value: 'English',
      onPress: () => {},
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response.success) {
        // Force navigation to sign-in page
        router.replace('/(auth)/sign-in');
      } else {
        console.error('Logout failed:', response.error?.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteAccount();
      if (response.success) {
        // Force navigation to sign-in page
        router.replace('/(auth)/sign-in');
      } else {
        Alert.alert('Error', response.error?.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const themeOptions = [
    { label: 'Light', value: 'light', icon: 'sunny-outline' },
    { label: 'Dark', value: 'dark', icon: 'moon-outline' },
    { label: 'System', value: 'system', icon: 'phone-portrait-outline' },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title="Settings" />
      </SafeAreaView>
      <ThemedView style={styles.content}>
        <View style={styles.section}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.settingItem,
                index !== settingsOptions.length - 1 && styles.settingItemBorder
              ]}
              onPress={option.onPress}
            >
              <View style={styles.settingLeft}>
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={isDarkMode ? '#FFFFFF' : '#000000'}
                  style={styles.settingIcon}
                />
                <ThemedText style={styles.settingLabel}>{option.label}</ThemedText>
              </View>
              <View style={styles.settingRight}>
                <ThemedText style={styles.settingValue}>{option.value}</ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isDarkMode ? '#64748B' : '#94A3B8'}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowDeleteModal(true)}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="trash-outline"
                size={24}
                color="#FF3B30"
                style={styles.settingIcon}
              />
              <ThemedText style={[styles.settingLabel, { color: '#FF3B30' }]}>
                Delete Account
              </ThemedText>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#FF3B30"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <ThemedText style={[styles.logoutText, { color: '#FF3B30' }]}>
            Logout
          </ThemedText>
        </TouchableOpacity>

        {/* Theme Modal */}
        <Modal
          visible={showThemeModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowThemeModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowThemeModal(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Choose Theme</ThemedText>
              {themeOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeOption,
                    index !== themeOptions.length - 1 && styles.themeOptionBorder,
                    themeMode === option.value && styles.themeOptionSelected
                  ]}
                  onPress={() => {
                    setThemeMode(option.value as 'light' | 'dark' | 'system');
                    setShowThemeModal(false);
                  }}
                >
                  <View style={styles.themeOptionLeft}>
                    <Ionicons
                      name={option.icon as any}
                      size={24}
                      color={isDarkMode ? '#FFFFFF' : '#000000'}
                      style={styles.themeOptionIcon}
                    />
                    <ThemedText style={styles.themeOptionLabel}>
                      {option.label}
                    </ThemedText>
                  </View>
                  {themeMode === option.value && (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color="#FF6B00"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ThemedView>
          </TouchableOpacity>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          visible={showDeleteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => !isDeleting && setShowDeleteModal(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Delete Account</ThemedText>
              <ThemedText style={styles.deleteWarningText}>
                This action is irreversible. All your data will be permanently deleted.
              </ThemedText>
              <ThemedText style={styles.deleteQuestionText}>
                Are you sure you want to delete your account?
              </ThemedText>
              
              <View style={styles.deleteModalButtons}>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.cancelButton]}
                  onPress={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.deleteButton]}
                  onPress={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <ThemedText style={styles.deleteButtonText}>Deleting...</ThemedText>
                  ) : (
                    <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
                  )}
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        </Modal>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    marginRight: 8,
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  themeOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  themeOptionSelected: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  themeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeOptionIcon: {
    marginRight: 16,
  },
  themeOptionLabel: {
    fontSize: 16,
  },
  deleteWarningText: {
    fontSize: 16,
    marginBottom: 16,
  },
  deleteQuestionText: {
    fontSize: 16,
    marginBottom: 24,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  deleteModalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
}); 