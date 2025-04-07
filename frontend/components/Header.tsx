import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { icon: 'fitness-outline', label: 'Coach', onPress: () => router.push('/coach') },
    { icon: 'bar-chart-outline', label: 'Training History', onPress: () => router.push('/training-history') },
    { icon: 'nutrition-outline', label: 'Nutrition', onPress: () => router.push('/nutrition') },
    { icon: 'settings-outline', label: 'Settings', onPress: () => router.push('/settings') },
    { icon: isDarkMode ? 'sunny-outline' : 'moon-outline', 
      label: isDarkMode ? 'Light Mode' : 'Dark Mode', 
      onPress: toggleTheme 
    },
    { icon: 'shield-checkmark-outline', label: 'Safety center', onPress: () => {} },
    { icon: 'help-circle-outline', label: 'Help', onPress: () => {} },
    { icon: 'information-circle-outline', label: 'About', onPress: () => {} },
    { icon: 'log-out-outline', label: 'Logout', onPress: () => {}, color: '#FF3B30' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsSidebarOpen(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>

      <Modal
        visible={isSidebarOpen}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsSidebarOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsSidebarOpen(false)}
        >
          <View style={[
            styles.sidebar,
            { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }
          ]}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsSidebarOpen(false)}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#000000'} 
              />
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
              <View style={styles.profileHeader}>
                <View style={styles.profileImage}>
                  <Ionicons 
                    name="person-circle" 
                    size={60} 
                    color={isDarkMode ? '#64748B' : '#94A3B8'} 
                  />
                </View>
                <View style={styles.profileInfo}>
                  <ThemedText style={styles.profileName}>Roger F. Bothman</ThemedText>
                  <TouchableOpacity onPress={() => {
                    router.push('/profile');
                    setIsSidebarOpen(false);
                  }}>
                    <ThemedText style={styles.viewProfile}>View profile</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>108</ThemedText>
                  <ThemedText style={styles.statLabel}>Kilometers</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>4</ThemedText>
                  <ThemedText style={styles.statLabel}>Rides</ThemedText>
                </View>
              </View>
            </View>
            
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  item.onPress();
                  if (item.label !== 'Dark Mode' && item.label !== 'Light Mode') {
                    setIsSidebarOpen(false);
                  }
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color || (isDarkMode ? '#FFFFFF' : '#000000')}
                />
                <ThemedText style={[
                  styles.menuItemText,
                  item.color ? { color: item.color } : {}
                ]}>{item.label}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  menuButton: {
    padding: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 360,
    paddingTop: 5,
  },
  profileSection: {
    paddingLeft: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 5,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  viewProfile: {
    fontSize: 14,
    color: '#FF6B00',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 32,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
}); 