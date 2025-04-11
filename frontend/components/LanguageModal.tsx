import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage, Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const languages: Record<Language, string> = {
  en: 'English',
  pcm: 'Nigerian Pidgin',
  ha: 'Hausa',
  ig: 'Igbo',
};

export const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode } = useTheme();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[
        styles.modalContainer,
        { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)' }
      ]}>
        <View style={[
          styles.modalContent,
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }
        ]}>
          <Text style={[
            styles.title,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>
            {t('settings.language.modalTitle')}
          </Text>
          
          {Object.entries(languages).map(([code, name]) => (
            <TouchableOpacity
              key={code}
              style={[
                styles.languageOption,
                language === code && styles.selectedLanguage,
                { borderColor: isDarkMode ? '#333333' : '#e0e0e0' }
              ]}
              onPress={() => handleLanguageSelect(code as Language)}
            >
              <Text style={[
                styles.languageText,
                { color: isDarkMode ? '#ffffff' : '#000000' }
              ]}>
                {name}
              </Text>
              {language === code && (
                <View style={styles.checkmark}>
                  <Text style={{ color: '#007AFF' }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.closeButton,
              { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }
            ]}
            onPress={onClose}
          >
            <Text style={[
              styles.closeButtonText,
              { color: isDarkMode ? '#ffffff' : '#000000' }
            ]}>
              {t('common.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  selectedLanguage: {
    borderColor: '#007AFF',
  },
  languageText: {
    fontSize: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 