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
   SafeAreaView,
 } from 'react-native';
 import { useRouter } from 'expo-router';
 import { LinearGradient } from 'expo-linear-gradient';
 import { ThemedText } from '../components/ThemedText';
 import Logo from '../components/Logo';
 import HomeLogo from '@/components/HomeLogo';
 import GetStartedLogo from '@/components/GetStartedLogo';
 
 const { width, height } = Dimensions.get('window');
 
 const slides = [
   {
     id: '1',
     image: require('../assets/images/colynary-media-_KfrVYciXBo-unsplash.jpg'),
     title: 'OWN YOUR JOURNEY',
     subtitle: 'TO A STRONGER YOU',
     description: 'Track your workouts, optimize your meals, and master your fasting rhythm—your transformation starts here.',
   },
   {
     id: '2',
     image: require('../assets/images/jason-leung-Vh0kWMtcZo8-unsplash.jpg'),
     title: 'FUEL WITH INTENTION',
     subtitle: 'EAT SMART, FEEL ALIVE',
     description: 'Track what you eat, plan better meals, and unlock the energy you need to perform at your peak.',
   },
   {
     id: '3',
     image: require('../assets/images/mary-borozdina--1M0lktLFqk-unsplash.jpg'),
     title: 'TAKE CONTROL THROUGH',
     subtitle: 'INTERMITTENT FASTING',
     description: 'Balance your hormones, boost metabolism, and improve focus—experience the science of fasting your way.',
   },
   {
     id: '4',
     image: require('../assets/images/sunday-ii-sunday-I0f5NJfMDSc-unsplash.jpg'),
     title: 'BUILD YOUR BEST BODY',
     subtitle: 'ONE REP AT A TIME',
     description: 'Push harder, move smarter, and crush your fitness goals with personalized tools that keep you locked in.',
   },
   {
     id: '5',
     image: require('../assets/images/giorgi-iremadze-3OV0ft7mG_o-unsplash.jpg'),
     title: 'DESIGN YOUR LIFESTYLE,',
     subtitle: 'FITNESS. NUTRITION. FASTING.',
     description: 'Customize routines, track habits, and stay aligned with your health vision—because this is about you.',
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
   }, [currentIndex]);
 
   const startAutoPlay = () => {
     if (timerRef.current) {
       clearInterval(timerRef.current);
     }
     
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
     const viewSize = event.nativeEvent.layoutMeasurement;
     const pageNum = Math.floor(contentOffset.x / viewSize.width);
     
     // Ensure pageNum is within valid range
     if (pageNum >= 0 && pageNum < slides.length && pageNum !== currentIndex) {
       setCurrentIndex(pageNum);
       // Reset timer when manually scrolled
       if (timerRef.current) {
         clearInterval(timerRef.current);
       }
       startAutoPlay();
     }
   };
 
   // Handle scroll end to ensure we're on a valid page
   const handleScrollEnd = () => {
     // If we've scrolled past the last slide, reset to the first one
     if (currentIndex >= slides.length) {
       setCurrentIndex(0);
       flatListRef.current?.scrollToIndex({
         index: 0,
         animated: false,
       });
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
           <View style={styles.textContainer}>
             <ThemedText style={styles.title}>{item.title}</ThemedText>
             <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
             <ThemedText style={styles.description}>{item.description}</ThemedText>
           </View>
         </View>
       </LinearGradient>
     </ImageBackground>
   );
 
   return (
     <SafeAreaView style={styles.container}>
       <StatusBar barStyle="light-content" />
       
       <View style={styles.logoContainer}>
         <GetStartedLogo size={30} color="#fff" />
       </View>
       
       <View style={styles.sliderContainer}>
         <FlatList
           ref={flatListRef}
           data={slides}
           renderItem={renderSlide}
           horizontal
           pagingEnabled
           showsHorizontalScrollIndicator={false}
           onScroll={handleScroll}
           onMomentumScrollEnd={handleScrollEnd}
           scrollEventThrottle={16}
           getItemLayout={(data, index) => ({
             length: width,
             offset: width * index,
             index,
           })}
         />
       </View>
       
       <View style={styles.fixedFooter}>
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
           onPress={() => router.push('/(auth)/sign-up')}
         >
           <ThemedText style={styles.buttonText}>GET STARTED</ThemedText>
         </TouchableOpacity>
 
         <View style={styles.loginContainer}>
           <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
           <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
             <ThemedText style={styles.loginLink}>Login</ThemedText>
           </TouchableOpacity>
         </View>
       </View>
     </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#000',
   },
   logoContainer: {
     position: 'absolute',
     top: 40,
     left: 20,
     zIndex: 10,
   },
   sliderContainer: {
     flex: 1,
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
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
     flex: 1,
     justifyContent: 'center',
     padding: 24,
     paddingBottom: 200,
   },
   textContainer: {
     marginTop: height * 0.4,
   },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#fff',
     textTransform: 'uppercase',
   },
   subtitle: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#fff',
     marginBottom: 10,
     textTransform: 'uppercase',
   },
   description: {
     fontSize: 16,
     color: '#fff',
     opacity: 0.8,
     lineHeight: 24,
   },
   fixedFooter: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     padding: 24,
     paddingBottom: 48,
     gap: 24,
   },
   pagination: {
     flexDirection: 'row',
     justifyContent: 'center',
     gap: 8,
   },
   paginationDot: {
     width: 4,
     height: 4,
     borderRadius: 4,
     backgroundColor: 'rgba(255, 255, 255, 0.4)',
   },
   paginationDotActive: {
     backgroundColor: '#F36746',
     width: 24,
   },
   button: {
     backgroundColor: '#F36746',
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
   loginContainer: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
   },
   loginText: {
     color: '#fff',
     fontSize: 14,
   },
   loginLink: {
     color: '#F36746',
     fontSize: 14,
     fontWeight: '600',
   },
 }); 
