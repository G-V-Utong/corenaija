import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from '../components/Toast';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');

  const showToast = (message: string, type: ToastType = 'info') => {
    setMessage(message);
    setType(type);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        visible={visible}
        message={message}
        type={type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}; 