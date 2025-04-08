import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, TranslationKey } from '../translations';

type Language = 'en' | 'pcm'; // en = English, pcm = Nigerian Pidgin

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getLanguageLabel: (code: Language) => string;
  t: (key: TranslationKey) => string;
}

export const languages = {
  en: 'English',
  pcm: 'Pidgin',
} as const;

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  getLanguageLabel: () => '',
  t: (key: TranslationKey) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language preference
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pcm')) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    loadLanguagePreference();
  }, []);

  // Save language preference whenever it changes
  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const getLanguageLabel = (code: Language): string => {
    return languages[code];
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLanguageLabel, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 