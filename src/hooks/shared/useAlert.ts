import { useState, useCallback } from 'react';
import type { AlertType } from '../../components/shared/alertModal';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function useAlert() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((
    type: AlertType,
    title: string,
    message: string,
    options?: {
      autoClose?: boolean;
      autoCloseDelay?: number;
    }
  ) => {
    const id = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newAlert: Alert = {
      id,
      type,
      title,
      message,
      autoClose: options?.autoClose ?? true,
      autoCloseDelay: options?.autoCloseDelay ?? 5000,
    };

    setAlerts(prev => [...prev, newAlert]);
    return id;
  }, []);

  const hideAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((title: string, message: string, options?: { autoClose?: boolean; autoCloseDelay?: number }) => {
    return showAlert('success', title, message, options);
  }, [showAlert]);

  const showError = useCallback((title: string, message: string, options?: { autoClose?: boolean; autoCloseDelay?: number }) => {
    return showAlert('error', title, message, options);
  }, [showAlert]);

  const showWarning = useCallback((title: string, message: string, options?: { autoClose?: boolean; autoCloseDelay?: number }) => {
    return showAlert('warning', title, message, options);
  }, [showAlert]);

  const showInfo = useCallback((title: string, message: string, options?: { autoClose?: boolean; autoCloseDelay?: number }) => {
    return showAlert('info', title, message, options);
  }, [showAlert]);

  return {
    alerts,
    showAlert,
    hideAlert,
    clearAllAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
