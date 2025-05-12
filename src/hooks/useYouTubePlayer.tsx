
import { useState, useRef, useEffect } from "react";
import { UseYouTubePlayerProps, UseYouTubePlayerReturn } from "@/types/youtubePlayer";
import { loadYouTubeApi } from "@/utils/youtubeApiLoader";
import useYouTubeMessages from "./useYouTubeMessages";

const useYouTubePlayer = ({ videoId, onReady }: UseYouTubePlayerProps): UseYouTubePlayerReturn => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Refs
  const playerRef = useRef<HTMLIFrameElement>(null);
  const progressInterval = useRef<number | null>(null);

  // Load YouTube API
  useEffect(() => {
    loadYouTubeApi();
  }, []);

  // Function to track video progress
  const startProgressTracker = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }

    // Poll for time updates
    progressInterval.current = window.setInterval(() => {
      if (playerRef.current && playerRef.current.contentWindow) {
        // Request current time and duration
        sendPlayerCommand("getCurrentTime");
        sendPlayerCommand("getDuration");
      }
    }, 500);
  };

  // Handle player state changes
  const handleStateChange = (stateCode: number) => {
    switch (stateCode) {
      case 0: // video ended
        setIsPlaying(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        setProgress(100); // Ensure progress bar shows completed
        break;
      case 1: // video playing
        setIsPlaying(true);
        if (!progressInterval.current) {
          startProgressTracker();
        }
        break;
      case 2: // video paused
        setIsPlaying(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        break;
    }
  };

  // Handle duration update
  const handleDurationReceived = (newDuration: number) => {
    setDuration(newDuration);
  };

  // Handle time update
  const handleTimeUpdate = (newTime: number) => {
    setCurrentTime(newTime);
    if (duration > 0) {
      const newProgress = (newTime / duration) * 100;
      setProgress(newProgress);
    }
  };

  // Handle player ready
  const handlePlayerReady = () => {
    setIsVideoLoaded(true);
    
    // Send initial commands
    sendPlayerCommand("mute");
    sendPlayerCommand("getDuration");
    
    if (onReady) {
      onReady();
    }
  };

  // Setup player message handling
  const { sendPlayerCommand } = useYouTubeMessages({
    playerRef,
    onStateChange: handleStateChange,
    onDurationReceived: handleDurationReceived,
    onTimeUpdate: handleTimeUpdate,
    onReady: handlePlayerReady
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, []);

  // Player control functions
  const playVideo = () => {
    sendPlayerCommand("playVideo");
    startProgressTracker();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    sendPlayerCommand("pauseVideo");
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendPlayerCommand("unMute");
    } else {
      sendPlayerCommand("mute");
    }
    setIsMuted(!isMuted);
  };

  const seekTo = (time: number) => {
    sendPlayerCommand("seekTo", [time, true]);
    
    // If video is paused, update tracker to show new position
    if (!isPlaying) {
      sendPlayerCommand("getCurrentTime");
    }
  };

  return {
    playerRef,
    isVideoLoaded,
    isPlaying,
    isMuted,
    duration,
    currentTime,
    progress,
    playVideo,
    pauseVideo,
    togglePlay,
    toggleMute,
    seekTo
  };
};

export default useYouTubePlayer;
