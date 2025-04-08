import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, themeMode, setThemeMode } = useTheme();
  const { language, setLanguage, getLanguageLabel, t } = useLanguage();
  const { signOut, deleteAccount, updateEmail, updatePassword, user } = useAuth();
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const getThemeValue = () => {
    switch (themeMode) {
      case 'light':
        return t('settings.theme.light');
      case 'dark':
        return t('settings.theme.dark');
      case 'system':
        return t('settings.theme.system');
      default:
        return t('settings.theme.system');
    }
  };

  const settingsOptions = [
    {
      icon: 'contrast-outline',
      label: t('settings.theme.label'),
      value: getThemeValue(),
      onPress: () => setShowThemeModal(true),
    },
    {
      icon: 'person-outline',
      label: t('settings.account.label'),
      value: t('settings.account.value'),
      onPress: () => setShowAccountModal(true),
    },
    {
      icon: 'notifications-outline',
      label: t('settings.notifications.label'),
      value: t('settings.notifications.value'),
      onPress: () => {},
    },
    {
      icon: 'language-outline',
      label: t('settings.language.label'),
      value: getLanguageLabel(language),
      onPress: () => setShowLanguageModal(true),
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

  const handleUpdateEmail = async () => {
    if (!newEmail || !currentPassword) {
      Alert.alert(t('common.error'), t('validation.required'));
      return;
    }

    try {
      setIsUpdating(true);
      const response = await updateEmail(newEmail, currentPassword);
      if (response.success) {
        Alert.alert(t('common.success'), t('settings.account.emailUpdated'));
        setShowEmailModal(false);
        setNewEmail('');
        setCurrentPassword('');
      } else {
        Alert.alert(t('common.error'), response.error?.message || t('errors.updateFailed'));
      }
    } catch (error) {
      console.error('Update email error:', error);
      Alert.alert(t('common.error'), t('errors.default'));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert(t('common.error'), t('validation.required'));
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(t('common.error'), t('settings.account.passwordsDontMatch'));
      return;
    }

    try {
      setIsUpdating(true);
      const response = await updatePassword(newPassword);
      if (response.success) {
        Alert.alert(t('common.success'), t('settings.account.passwordUpdated'));
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert(t('common.error'), response.error?.message || t('errors.updateFailed'));
      }
    } catch (error) {
      console.error('Update password error:', error);
      Alert.alert(t('common.error'), t('errors.default'));
    } finally {
      setIsUpdating(false);
    }
  };

  const themeOptions = [
    { label: t('settings.theme.light'), value: 'light', icon: 'sunny-outline' },
    { label: t('settings.theme.dark'), value: 'dark', icon: 'moon-outline' },
    { label: t('settings.theme.system'), value: 'system', icon: 'phone-portrait-outline' },
  ];

  const accountOptions = [
    { 
      icon: 'mail-outline', 
      label: t('settings.account.changeEmail'), 
      onPress: () => setShowEmailModal(true) 
    },
    { 
      icon: 'lock-closed-outline', 
      label: t('settings.account.changePassword'), 
      onPress: () => setShowPasswordModal(true) 
    },
  ];

  const languageOptions = [
    { label: 'English', value: 'en', icon: 'language-outline' },
    { label: 'Pidgin', value: 'pcm', icon: 'language-outline' },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <Header title={t('settings.title')} />
      </SafeAreaView>
      <ScrollView style={styles.content}>
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
                {t('settings.deleteAccount.label')}
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
              <ThemedText style={styles.modalTitle}>{t('settings.theme.modalTitle')}</ThemedText>
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

        {/* Account Settings Modal */}
        <Modal
          visible={showAccountModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowAccountModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowAccountModal(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>{t('settings.account.modalTitle')}</ThemedText>
              {accountOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.themeOption,
                    index !== accountOptions.length - 1 && styles.themeOptionBorder
                  ]}
                  onPress={() => {
                    option.onPress();
                    setShowAccountModal(false);
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
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={isDarkMode ? '#64748B' : '#94A3B8'}
                  />
                </TouchableOpacity>
              ))}
            </ThemedView>
          </TouchableOpacity>
        </Modal>

        {/* Update Email Modal */}
        <Modal
          visible={showEmailModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowEmailModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => !isUpdating && setShowEmailModal(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>{t('settings.account.changeEmail')}</ThemedText>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>{t('settings.account.currentEmail')}</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                    }
                  ]}
                  value={user?.email || ''}
                  editable={false}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>{t('settings.account.newEmail')}</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                    }
                  ]}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder={t('settings.account.enterNewEmail')}
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>{t('settings.account.currentPassword')}</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                    }
                  ]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder={t('settings.account.enterCurrentPassword')}
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  secureTextEntry
                />
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowEmailModal(false)}
                  disabled={isUpdating}
                >
                  <ThemedText style={styles.cancelButtonText}>{t('common.cancel')}</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleUpdateEmail}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <ThemedText style={styles.saveButtonText}>{t('common.loading')}</ThemedText>
                  ) : (
                    <ThemedText style={styles.saveButtonText}>{t('common.update')}</ThemedText>
                  )}
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        </Modal>

        {/* Update Password Modal */}
        <Modal
          visible={showPasswordModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPasswordModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => !isUpdating && setShowPasswordModal(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>{t('settings.account.changePassword')}</ThemedText>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>{t('settings.account.newPassword')}</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                    }
                  ]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder={t('settings.account.enterNewPassword')}
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  secureTextEntry
                />
              </View>
              
              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>{t('settings.account.confirmPassword')}</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      color: isDarkMode ? '#FFFFFF' : '#000000',
                      backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9',
                      borderColor: isDarkMode ? '#334155' : '#CBD5E1'
                    }
                  ]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={t('settings.account.confirmNewPassword')}
                  placeholderTextColor={isDarkMode ? '#64748B' : '#94A3B8'}
                  secureTextEntry
                />
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowPasswordModal(false)}
                  disabled={isUpdating}
                >
                  <ThemedText style={styles.cancelButtonText}>{t('common.cancel')}</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleUpdatePassword}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <ThemedText style={styles.saveButtonText}>{t('common.loading')}</ThemedText>
                  ) : (
                    <ThemedText style={styles.saveButtonText}>{t('common.update')}</ThemedText>
                  )}
                </TouchableOpacity>
              </View>
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
              <ThemedText style={styles.modalTitle}>{t('settings.deleteAccount.modalTitle')}</ThemedText>
              <ThemedText style={styles.deleteWarningText}>
                {t('settings.deleteAccount.warning')}
              </ThemedText>
              <ThemedText style={styles.deleteQuestionText}>
                {t('settings.deleteAccount.question')}
              </ThemedText>
              
              <View style={styles.deleteModalButtons}>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.cancelButton]}
                  onPress={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  <ThemedText style={styles.cancelButtonText}>{t('common.cancel')}</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.deleteButton]}
                  onPress={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <ThemedText style={styles.deleteButtonText}>{t('settings.deleteAccount.deleting')}</ThemedText>
                  ) : (
                    <ThemedText style={styles.deleteButtonText}>{t('common.delete')}</ThemedText>
                  )}
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        </Modal>

        {/* Language Modal */}
        <Modal
          visible={showLanguageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowLanguageModal(false)}
          >
            <View style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF' }
            ]}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>{t('settings.language.modalTitle')}</ThemedText>
                <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={isDarkMode ? '#FFFFFF' : '#000000'}
                  />
                </TouchableOpacity>
              </View>
              {languageOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalOption,
                    index !== languageOptions.length - 1 && styles.modalOptionBorder
                  ]}
                  onPress={() => {
                    setLanguage(option.value as 'en' | 'pcm');
                    setShowLanguageModal(false);
                  }}
                >
                  <View style={styles.modalOptionContent}>
                    <Ionicons
                      name={option.icon as any}
                      size={24}
                      color={isDarkMode ? '#FFFFFF' : '#000000'}
                      style={styles.modalOptionIcon}
                    />
                    <ThemedText style={styles.modalOptionLabel}>
                      {option.label}
                    </ThemedText>
                  </View>
                  {language === option.value && (
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color="#FF6B00"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  saveButton: {
    backgroundColor: '#FF3B30',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  modalOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionIcon: {
    marginRight: 16,
  },
  modalOptionLabel: {
    fontSize: 16,
  },
}); 