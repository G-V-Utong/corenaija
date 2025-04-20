import { ThemeProvider } from '../context/ThemeContext';
import { TabBarProvider } from '../context/TabBarContext';
import { AppContent } from '../components/AppContent';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TabBarProvider>
        <AppContent />
      </TabBarProvider>
    </ThemeProvider>
  );
}