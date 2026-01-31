'use client';

import  { useEffect, useRef } from 'react';

interface CountdownProps {
  time: number;
  settime: (time: number) => void;
}

const Countdown = ({ time, settime }: CountdownProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start countdown if time > 0
    if (time > 0) {
      intervalRef.current = setInterval(() => {
        settime(time - 1);
      }, 1000);
    }

    // Cleanup on unmount or when time changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time, settime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (time <= 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center my-4">
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-1">Resend code in</p>
        <p className="text-2xl font-semibold text-blue-600">
          {formatTime(time)}
        </p>
      </div>
    </div>
  );
};

export default Countdown;