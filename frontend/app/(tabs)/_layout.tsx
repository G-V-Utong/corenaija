import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

interface TabBarIconProps {
  color: string;
  size: number;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#64748B' : '#94A3B8',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#FFFFFF',
          borderTopColor: colorScheme === 'dark' ? '#334155' : '#E2E8F0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Training',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="fitness" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="nutrition" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fasting"
        options={{
          title: 'Fasting',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
