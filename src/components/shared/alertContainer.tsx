import React from 'react';
import AlertModal from './alertModal';
import type { Alert } from '../../hooks/shared/useAlert';

interface AlertContainerProps {
  alerts: Alert[];
  onClose: (id: string) => void;
}

export default function AlertContainer({ alerts, onClose }: AlertContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {alerts.map((alert, index) => (
        <div
          key={alert.id}
          style={{
            transform: `translateY(${index * -10}px)`,
            zIndex: 50 - index
          }}
        >
          <AlertModal
            type={alert.type}
            title={alert.title}
            message={alert.message}
            isVisible={true}
            onClose={() => onClose(alert.id)}
            autoClose={alert.autoClose}
            autoCloseDelay={alert.autoCloseDelay}
          />
        </div>
      ))}
    </div>
  );
}
