import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, pcm, ha, yo, ig } from '../translations';
import { useAuth } from './AuthContext';
import { getGenderedText } from '../utils/translations';

type Language = 'en' | 'pcm' | 'ha' | 'yo' | 'ig';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof en>;
type TranslationParams = Record<string, string | number>;

type TranslationFunction = {
  (key: string): string;
  (key: string, params: TranslationParams): string;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
}

const translations = {
  en,
  pcm,
  ha,
  yo,
  ig,
} as const;

const defaultLanguage: Language = 'en';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const { user } = useAuth();

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage && savedLanguage in translations) {
        setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const handleSetLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('userLanguage', lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const t: TranslationFunction = useCallback((key: string, params?: TranslationParams) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      
      if (typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Handle gendered text if we're using Hausa and the value is a gendered object
    if (language === 'ha' && typeof value === 'object' && ('male' in value || 'female' in value)) {
      value = getGenderedText(value, user);
    }

    let text = typeof value === 'string' ? value : key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, paramValue.toString());
      });
    }
    
    return text;
  }, [language, user]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};