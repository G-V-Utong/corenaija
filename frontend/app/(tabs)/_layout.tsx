import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { refreshUserProfile } = useAuth();

  useEffect(() => {
    // Load user data when tabs are mounted
    refreshUserProfile();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F36746',
        tabBarInactiveTintColor: isDarkMode ? '#94A3B8' : '#64748B',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#1E293B' : '#E2E8F0',
          height: 80,
          paddingTop: 8,
          paddingBottom: 24,
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="person" 
              size={size} 
              color={focused ? '#F36746' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          title: t('tabs.training'),
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="fitness" 
              size={size} 
              color={focused ? '#F36746' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: t('tabs.nutrition'),
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="nutrition" 
              size={size} 
              color={focused ? '#F36746' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fasting"
        options={{
          title: t('tabs.fasting'),
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="time" 
              size={size} 
              color={focused ? '#F36746' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
