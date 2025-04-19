import React, { createContext, useContext, useRef } from 'react';
import { Animated } from 'react-native';

interface TabBarContextType {
  tabBarTranslate: Animated.Value;
  handleScroll: (event: any) => void;
}

const TabBarContext = createContext<TabBarContextType | null>(null);

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const tabBarTranslate = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const tabBarHeight = 80;

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      // Scrolling down - hide tab bar
      Animated.spring(tabBarTranslate, {
        toValue: tabBarHeight,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      // Scrolling up - show tab bar
      Animated.spring(tabBarTranslate, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <TabBarContext.Provider value={{ tabBarTranslate, handleScroll }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error('useTabBar must be used within TabBarProvider');
  }
  return context;
};
