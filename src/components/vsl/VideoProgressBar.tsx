
import React from "react";
import { Slider } from "@/components/ui/slider";

interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  progress: number;
  onSeek: (value: number[]) => void;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ 
  currentTime, 
  duration, 
  progress, 
  onSeek 
}) => {
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white min-w-[40px]">{formatTime(currentTime)}</span>
      <Slider
        value={[progress]}
        min={0}
        max={100}
        step={0.1}
        onValueChange={onSeek}
        className="flex-1"
      />
      <span className="text-xs text-white min-w-[40px]">{formatTime(duration)}</span>
    </div>
  );
};

export default VideoProgressBar;
