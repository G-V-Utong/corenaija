import { ThemeProvider } from '../context/ThemeContext';
import { AppContent } from '../components/AppContent';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}