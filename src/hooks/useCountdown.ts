
import { useState, useEffect, useCallback } from "react";

type CountdownReturnType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const useCountdown = (initialTargetDate: Date): CountdownReturnType => {
  const [targetDate, setTargetDate] = useState<Date>(initialTargetDate);
  const [timeLeft, setTimeLeft] = useState<CountdownReturnType>({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const calculateTimeLeft = useCallback((): CountdownReturnType => {
    const now = new Date();
    const difference = +targetDate - +now;
    
    // If countdown is finished, reset to 7 days from now
    if (difference <= 0) {
      const newTargetDate = new Date(now.getTime() + SEVEN_DAYS_IN_MS);
      setTargetDate(newTargetDate);
      
      return {
        days: 7,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
      };
    }
    
    // Calculate time left
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
    };
  }, [targetDate]);
  
  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval for countdown
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  
  return timeLeft;
};
