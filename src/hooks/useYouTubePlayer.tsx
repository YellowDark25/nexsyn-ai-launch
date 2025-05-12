
import { useState, useRef, useEffect } from "react";

interface UseYouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
}

interface UseYouTubePlayerReturn {
  playerRef: React.RefObject<HTMLIFrameElement>;
  isVideoLoaded: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  progress: number;
  playVideo: () => void;
  pauseVideo: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
}

const useYouTubePlayer = ({ videoId, onReady }: UseYouTubePlayerProps): UseYouTubePlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const youtubeApiReady = useRef(false);
  const progressInterval = useRef<number | null>(null);

  // Load YouTube API
  useEffect(() => {
    // Define callback for API ready
    window.onYouTubeIframeAPIReady = () => {
      youtubeApiReady.current = true;
      console.log("YouTube API loaded");
    };

    // Add YouTube API script if not already loaded
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
  }, []);

  // Function to track video progress
  const startProgressTracker = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }

    // More reliable progress tracking using regular interval
    progressInterval.current = window.setInterval(() => {
      if (playerRef.current && playerRef.current.contentWindow) {
        // Request current time and duration
        playerRef.current.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
        playerRef.current.contentWindow.postMessage('{"event":"command","func":"getDuration","args":""}', '*');
      }
    }, 500); // Poll more frequently for smoother updates
  };

  // Handle YouTube messages
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          let data;
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            // Ignore non-JSON messages
            return;
          }
          
          // Handle player state changes
          if (data.event === 'onStateChange') {
            if (data.info === 0) { // video ended
              setIsPlaying(false);
              if (progressInterval.current) {
                window.clearInterval(progressInterval.current);
                progressInterval.current = null;
              }
              setProgress(100); // Ensure progress bar shows completed
            } else if (data.info === 1) { // video playing
              setIsPlaying(true);
              if (!progressInterval.current) {
                startProgressTracker();
              }
            } else if (data.info === 2) { // video paused
              setIsPlaying(false);
              if (progressInterval.current) {
                window.clearInterval(progressInterval.current);
                progressInterval.current = null;
              }
            }
          }
          
          // Handle duration info
          if (data.event === 'getDuration') {
            setDuration(data.info || 0);
          }
          
          // Handle current time info
          if (data.event === 'getCurrentTime') {
            const newTime = data.info || 0;
            setCurrentTime(newTime);
            if (duration > 0) {
              const newProgress = (newTime / duration) * 100;
              setProgress(newProgress);
            }
          }

          // Handle player ready
          if (data.event === 'onReady') {
            setIsVideoLoaded(true);
            // Send initial commands to hide annotations and related videos
            if (playerRef.current && playerRef.current.contentWindow) {
              playerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
              
              // Initial duration query
              playerRef.current.contentWindow.postMessage('{"event":"command","func":"getDuration","args":""}', '*');
              
              if (onReady) {
                onReady();
              }
            }
          }
        }
      } catch (error) {
        console.error("Error handling YouTube message:", error);
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    
    return () => {
      window.removeEventListener('message', handleYouTubeMessage);
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [duration, onReady]);

  // Function to handle video play/pause
  const togglePlay = () => {
    if (playerRef.current && playerRef.current.contentWindow) {
      if (isPlaying) {
        pauseVideo();
      } else {
        playVideo();
      }
    }
  };

  const playVideo = () => {
    if (playerRef.current && playerRef.current.contentWindow) {
      playerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      startProgressTracker();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current && playerRef.current.contentWindow) {
      playerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      setIsPlaying(false);
    }
  };

  // Function to handle mute/unmute
  const toggleMute = () => {
    if (playerRef.current && playerRef.current.contentWindow) {
      if (isMuted) {
        playerRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        playerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
      setIsMuted(!isMuted);
    }
  };

  // Function to seek to specific time
  const seekTo = (time: number) => {
    if (playerRef.current && playerRef.current.contentWindow) {
      playerRef.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${time}, true]}`, '*');
      
      // If video is paused, update tracker to show new position
      if (!isPlaying) {
        playerRef.current.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
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
