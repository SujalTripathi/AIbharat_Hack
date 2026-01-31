import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnline } from '../hooks/useOnline';

const OfflineIndicator: React.FC = () => {
  const isOnline = useOnline();
  const [showNotification, setShowNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowNotification(true);
      setWasOffline(true);
    } else if (wasOffline && isOnline) {
      // Show "back online" notification briefly
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNotification(false);
    }
  }, [isOnline, wasOffline]);

  if (!showNotification) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-slideDown">
      <div
        className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-2xl backdrop-blur-lg ${
          isOnline
            ? 'bg-green-500/90 text-white'
            : 'bg-red-500/90 text-white'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi size={20} className="animate-pulse" />
            <span className="font-semibold">Back Online</span>
          </>
        ) : (
          <>
            <WifiOff size={20} className="animate-pulse" />
            <span className="font-semibold">No Internet Connection</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
