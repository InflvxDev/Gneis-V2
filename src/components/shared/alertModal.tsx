import React, { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertModalProps {
  type: AlertType;
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700',
    progressColor: 'bg-green-500'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700',
    progressColor: 'bg-blue-500'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
    progressColor: 'bg-yellow-500'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700',
    progressColor: 'bg-red-500'
  }
};

export default function AlertModal({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000
}: AlertModalProps) {
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  const config = alertConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setProgress(100);

      if (autoClose) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev - (100 / (autoCloseDelay / 100));
            if (newProgress <= 0) {
              clearInterval(interval);
              handleClose();
              return 0;
            }
            return newProgress;
          });
        }, 100);

        return () => clearInterval(interval);
      }
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible && !isAnimating) return null;

  return (
    <div
      className={`
        relative max-w-sm w-full transform transition-all duration-300 ease-in-out
        ${isAnimating && isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div
        className={`
          relative rounded-lg border shadow-lg backdrop-blur-sm
          ${config.bgColor} ${config.borderColor}
          p-4 pr-12
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`
            absolute top-3 right-3 p-1 rounded-full transition-colors
            hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
          `}
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Content */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold ${config.titleColor}`}>
              {title}
            </h3>
            <p className={`mt-1 text-sm ${config.messageColor}`}>
              {message}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {autoClose && isVisible && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
            <div
              className={`h-full transition-all duration-100 linear ${config.progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
