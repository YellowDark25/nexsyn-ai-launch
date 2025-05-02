
import { useState, useEffect } from "react";

type CountdownReturnType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

export const useCountdown = (targetDate: Date): CountdownReturnType => {
  const calculateTimeLeft = (): CountdownReturnType => {
    const difference = +targetDate - +new Date();
    
    let timeLeft: CountdownReturnType = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
    
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    }
    
    return timeLeft;
  };
  
  const [timeLeft, setTimeLeft] = useState<CountdownReturnType>(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return timeLeft;
};
