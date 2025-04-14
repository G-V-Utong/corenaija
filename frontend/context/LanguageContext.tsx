import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../translations';
import type { TranslationsType } from '../translations';

export type Language = 'en' | 'pcm' | 'ha' | 'ig' | 'yo';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<TranslationsType>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: TranslationKey) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback(async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (typeof value === 'string') break;
    }
    
    if (typeof value !== 'string') {
      // Fallback to English if translation is missing
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (typeof value === 'string') break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [language]);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pcm' || savedLanguage === 'ha' || savedLanguage === 'ig' || savedLanguage === 'yo')) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};