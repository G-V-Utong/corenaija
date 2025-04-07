import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: isDarkMode ? '#94A3B8' : '#64748B',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#1E293B' : '#E2E8F0',
          height: 80,
          paddingTop: 8,
          paddingBottom: 24,
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
          title: 'Training',
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="fitness" 
              size={size} 
              color={focused ? '#FF6B00' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="nutrition" 
              size={size} 
              color={focused ? '#FF6B00' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fasting"
        options={{
          title: 'Fasting',
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="time" 
              size={size} 
              color={focused ? '#FF6B00' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons 
              name="person" 
              size={size} 
              color={focused ? '#FF6B00' : (isDarkMode ? '#FFFFFF' : color)} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
