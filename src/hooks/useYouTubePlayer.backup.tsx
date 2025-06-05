
import { useState, useRef, useEffect, useCallback } from "react";
import { UseYouTubePlayerProps, UseYouTubePlayerReturn } from "@/types/youtubePlayer";

// Extend the Window interface to include YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: {
        events: {
          onReady: (event: any) => void;
          onStateChange: (event: any) => void;
        };
      }) => any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

// Type for the YouTube player instance
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

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
  const playerInstance = useRef<YouTubePlayer | null>(null);
  const progressInterval = useRef<number | null>(null);

  // Function to track video progress
  const startProgressTracker = useCallback(() => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }

    // Poll for time updates
    progressInterval.current = window.setInterval(() => {
      if (playerInstance.current) {
        try {
          const currentTime = playerInstance.current.getCurrentTime();
          const duration = playerInstance.current.getDuration();
          
          if (typeof currentTime === 'number' && typeof duration === 'number' && duration > 0) {
            setCurrentTime(currentTime);
            setDuration(duration);
            setProgress((currentTime / duration) * 100);
          }
        } catch (e) {
          console.error('Error getting player time:', e);
        }
      }
    }, 200);
  }, []);

  // Handle player state changes
  const handleStateChange = useCallback((stateCode: number) => {
    console.log("Player state changed:", stateCode);
    switch (stateCode) {
      case -1: // unstarted
        break;
      case 0: // video ended
        setIsPlaying(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        setProgress(100);
        break;
      case 1: // video playing
        setIsPlaying(true);
        setIsVideoLoaded(true);
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
      case 3: // video buffering
        setIsVideoLoaded(true);
        break;
      case 5: // video cued
        setIsVideoLoaded(true);
        break;
    }
  }, [startProgressTracker]);

  // Handle player ready
  const handlePlayerReady = useCallback(() => {
    console.log("Player is ready");
    setIsVideoLoaded(true);
    
    // Set initial volume to 0 (muted)
    if (playerInstance.current) {
      playerInstance.current.setVolume(0);
      
      // Get initial duration
      const duration = playerInstance.current.getDuration();
      if (duration) {
        setDuration(duration);
      }
    }
    
    if (onReady) {
      onReady();
    }
  }, [onReady]);

  // Initialize YouTube player
  const initializePlayer = useCallback(() => {
    if (!window.YT || !playerRef.current) return;

    playerInstance.current = new window.YT.Player('youtube-player', {
      events: {
        onReady: handlePlayerReady,
        onStateChange: (event: { data: number }) => handleStateChange(event.data),
      },
    });
  }, [handlePlayerReady, handleStateChange]);

  // Load YouTube API
  useEffect(() => {
    // Check if YouTube API is already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Create a promise that resolves when the API is ready
      const loadPromise = new Promise<void>((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
          console.log('YouTube API is ready');
          resolve();
        };
      });

      loadPromise.then(() => {
        if (playerRef.current) {
          initializePlayer();
        }
      });
    } else if (playerRef.current) {
      // If API is already loaded, initialize player immediately
      initializePlayer();
    }

    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [videoId, initializePlayer]);

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
    if (playerInstance.current) {
      playerInstance.current.playVideo();
      setIsPlaying(true);
      if (!progressInterval.current) {
        startProgressTracker();
      }
    }
  };

  const pauseVideo = () => {
    if (playerInstance.current) {
      playerInstance.current.pauseVideo();
      setIsPlaying(false);
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = () => {
    if (playerInstance.current) {
      if (isMuted) {
        playerInstance.current.unMute();
        playerInstance.current.setVolume(50);
      } else {
        playerInstance.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const seekTo = (time: number) => {
    if (playerInstance.current) {
      playerInstance.current.seekTo(time, true);
      // Force update the progress after seeking
      if (duration > 0) {
        const newProgress = (time / duration) * 100;
        setProgress(newProgress);
        setCurrentTime(time);
      }
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
