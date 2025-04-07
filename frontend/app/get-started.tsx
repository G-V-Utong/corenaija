import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../components/ThemedText';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/images/ben-iwara-UzLYRIjDGCI-unsplash.jpg'),
    title: 'YOUR ALL-IN-ONE SKIING,',
    subtitle: 'AND SNOWBOARDING',
    description: 'Explore untouched slopes, conquer rugged mountains, and experience the thrill of freeride skiing and snowboarding',
  },
  {
    id: '2',
    image: require('../assets/images/jason-leung-Vh0kWMtcZo8-unsplash.jpg'),
    title: 'DISCOVER NEW TRAILS',
    subtitle: 'AND ADVENTURES',
    description: 'Find the best slopes and trails suited to your skill level and preferences',
  },
  {
    id: '3',
    image: require('../assets/images/mary-borozdina--1M0lktLFqk-unsplash.jpg'),
    title: 'JOIN THE COMMUNITY',
    subtitle: 'OF WINTER SPORTS',
    description: 'Connect with fellow skiing and snowboarding enthusiasts and share your experiences',
  },
];

export default function GetStartedScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 5000);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      // Reset timer when manually scrolled
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      startAutoPlay();
    }
  };

  const renderSlide = ({ item }: { item: typeof slides[0] }) => (
    <ImageBackground
      source={item.image}
      style={styles.slide}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
            <ThemedText style={styles.description}>{item.description}</ThemedText>
          </View>

          <View style={styles.footer}>
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentIndex && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/sign-in')}
            >
              <ThemedText style={styles.buttonText}>GET STARTED</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push('/sign-in')}
            >
              <ThemedText style={styles.loginText}>
                Already have an account? Login
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: height * 0.4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    lineHeight: 24,
  },
  footer: {
    gap: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  button: {
    backgroundColor: '#FF6B00',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
}); 