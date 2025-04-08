import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Animation value for sidebar
  const sidebarAnimation = useRef(new Animated.Value(-width)).current;

  const mainMenuItems = [
    { icon: 'fitness-outline', label: t('sidebar.menu.coach'), onPress: () => router.push('/coach') },
    { icon: 'bar-chart-outline', label: t('sidebar.menu.trainingHistory'), onPress: () => router.push('/training-history') },
    { icon: 'nutrition-outline', label: t('sidebar.menu.nutrition'), onPress: () => router.push('/nutrition') },
  ];

  const bottomMenuItems = [
    { icon: 'help-circle-outline', label: t('sidebar.menu.help'), onPress: () => {} },
    { icon: 'information-circle-outline', label: t('sidebar.menu.about'), onPress: () => {} },
    { icon: 'settings-outline', label: t('sidebar.menu.settings'), onPress: () => router.push('/settings') },
  ];
  
  // Toggle sidebar with animation
  const toggleSidebar = (open: boolean) => {
    if (open) {
      setIsSidebarOpen(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(sidebarAnimation, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsSidebarOpen(false);
      });
    }
  };
  
  // Handle navigation with animation
  const handleNavigation = (onPress: () => void) => {
    toggleSidebar(false);
    setTimeout(() => {
      onPress();
    }, 300);
  };

  // Get user's full name or display a default
  const userFullName = user?.full_name || 'User';
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        { 
          backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
          borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      ]}>
        <TouchableOpacity onPress={() => toggleSidebar(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>

      <Modal
        visible={isSidebarOpen}
        animationType="none"
        transparent={true}
        onRequestClose={() => toggleSidebar(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => toggleSidebar(false)}
        >
          <Animated.View
            style={[
              styles.sidebar,
              { 
                backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                transform: [{ translateX: sidebarAnimation }]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => toggleSidebar(false)}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#000000'} 
              />
            </TouchableOpacity>
            
            <View style={[
              styles.profileSection,
              { borderBottomColor: isDarkMode ? '#4a5057' : '#E2E8F0' }
            ]}>
              <View style={styles.profileHeader}>
                <View style={styles.profileImage}>
                  <Ionicons 
                    name="person-circle" 
                    size={60} 
                    color={isDarkMode ? '#64748B' : '#94A3B8'} 
                  />
                </View>
                <View style={styles.profileInfo}>
                  <ThemedText style={styles.profileName}>{userFullName}</ThemedText>
                  <TouchableOpacity onPress={() => handleNavigation(() => {
                    router.push('/profile');
                  })}>
                    <ThemedText style={styles.viewProfile}>{t('sidebar.viewProfile')}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>108</ThemedText>
                  <ThemedText style={styles.statLabel}>{t('sidebar.stats.kilometers')}</ThemedText>
                </View>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statValue}>4</ThemedText>
                  <ThemedText style={styles.statLabel}>{t('sidebar.stats.rides')}</ThemedText>
                </View>
              </View>
            </View>
            
            <View style={styles.menuSection}>
              {mainMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.onPress)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={isDarkMode ? '#FFFFFF' : '#000000'}
                  />
                  <ThemedText style={styles.menuItemText}>{item.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.bottomMenuSection,
                { borderTopColor: isDarkMode ? '#4a5057' : '#E2E8F0' }
            ]}>
              {bottomMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.onPress)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={isDarkMode ? '#FFFFFF' : '#000000'}
                  />
                  <ThemedText style={styles.menuItemText}>{item.label}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
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
    borderBottomWidth: 1,
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
    paddingTop: 0,
  },
  profileSection: {
    paddingLeft: 20,
    paddingTop:20,
    borderBottomWidth: 1,
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
    marginBottom: 2,
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
  menuSection: {
    paddingVertical: 8,
  },
  bottomMenuSection: {
    borderTopWidth: 1,
    marginTop: 'auto',
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
}); 