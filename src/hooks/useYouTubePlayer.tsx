// src/hooks/useYouTubePlayer.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { UseYouTubePlayerProps, UseYouTubePlayerReturn } from "@/types/youtubePlayer";

// Gerar ID único para o player
const generateUniqueId = () => `player-${Math.random().toString(36).substr(2, 9)}`;

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const playerRef = useRef<HTMLIFrameElement>(null);
  const playerInstance = useRef<YouTubePlayer | null>(null);
  const progressInterval = useRef<number | null>(null);
  const playerId = useRef(`youtube-player-${videoId}`);

  const startProgressTracker = useCallback(() => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }

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

  const handleStateChange = useCallback((stateCode: number) => {
    console.log("Player state changed:", stateCode);
    switch (stateCode) {
      case -1: // unstarted
        break;
      case 0: // ended
        setIsPlaying(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        setProgress(100);
        break;
      case 1: // playing
        setIsPlaying(true);
        setIsVideoLoaded(true);
        if (!progressInterval.current) {
          startProgressTracker();
        }
        break;
      case 2: // paused
        setIsPlaying(false);
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
        break;
      case 3: // buffering
        setIsVideoLoaded(true);
        break;
      case 5: // video cued
        setIsVideoLoaded(true);
        break;
    }
  }, [startProgressTracker]);

  const handlePlayerReady = useCallback(() => {
    console.log("Player is ready");
    setIsVideoLoaded(true);
    
    if (playerInstance.current) {
      playerInstance.current.mute();
      const duration = playerInstance.current.getDuration();
      if (duration) {
        setDuration(duration);
      }
    }
    
    onReady?.();
  }, [onReady]);

  const initializePlayer = useCallback(() => {
    if (!window.YT || !playerRef.current) {
      console.log('YT not loaded or playerRef not available');
      return () => {}; // Retorna uma função vazia para manter a consistência
    }

    const containerId = playerRef.current.parentElement?.id;
    if (!containerId) {
      console.error('Player container ID not found');
      return () => {}; // Retorna uma função vazia para manter a consistência
    }

    console.log('Initializing YouTube player with ID:', containerId);
    
    try {
      // Limpa a instância anterior se existir
      if (playerInstance.current) {
        try {
          playerInstance.current.destroy();
        } catch (e) {
          console.warn('Error destroying previous player instance:', e);
        }
        playerInstance.current = null;
      }
      
      // Configura um timeout para evitar que o player fique travado
      const initTimeout = setTimeout(() => {
        console.warn('YouTube player initialization is taking too long...');
      }, 10000); // 10 segundos
      
      playerInstance.current = new window.YT.Player(containerId, {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          widgetid: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            clearTimeout(initTimeout);
            console.log('YouTube Player is ready');
            handlePlayerReady();
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            handleStateChange(event.data);
          },
          onError: (event: YT.PlayerEvent) => {
            console.error('YouTube Player error:', event.data);
            setHasError(true);
          }
        }
      });
      
      // Função de limpeza
      return () => {
        clearTimeout(initTimeout);
        if (playerInstance.current) {
          try {
            playerInstance.current.destroy();
          } catch (e) {
            console.warn('Error cleaning up YouTube player:', e);
          }
          playerInstance.current = null;
        }
      };
      
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
      setHasError(true);
      return () => {}; // Retorna uma função vazia em caso de erro
    }
  }, [videoId, handlePlayerReady, handleStateChange]);

  useEffect(() => {
    console.log('Loading YouTube API...');
    
    // Efeito para limpar recursos quando o componente é desmontado
    return () => {
      console.log('Cleaning up YouTube player resources...');
      
      // Limpa o intervalo de progresso
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      
      // Destroi a instância do player se existir
      if (playerInstance.current) {
        try {
          console.log('Destroying YouTube player instance...');
          playerInstance.current.destroy();
        } catch (e) {
          console.warn('Error destroying YouTube player:', e);
        } finally {
          playerInstance.current = null;
        }
      }
      
      // Reseta os estados
      setIsPlaying(false);
      setIsVideoLoaded(false);
      setHasError(false);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    };
  }, []);

  useEffect(() => {
    console.log('Loading YouTube API...');
    
    // Função para limpar recursos
    const cleanup = () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      
      if (playerInstance.current) {
        try {
          playerInstance.current.destroy();
        } catch (e) {
          console.warn('Error destroying YouTube player:', e);
        }
        playerInstance.current = null;
      }
      
      setIsVideoLoaded(false);
      setHasError(false);
      setIsPlaying(false);
    };
    
    // Verifica se a API já está carregada
    if (window.YT) {
      console.log('YouTube API already loaded');
      cleanup(); // Limpa qualquer instância anterior
      initializePlayer();
      return cleanup;
    }

    // Verifica se já existe um script de carregamento do YouTube
    const scriptId = 'youtube-iframe-api';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('Failed to load YouTube API script');
        setHasError(true);
      };
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag?.parentNode) {
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      } else {
        document.head.appendChild(script);
      }
    }

    // Usa o carregador de API do YouTube em vez de sobrescrever diretamente
    const originalOnYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady;
    
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API is ready');
      
      // Pequeno atraso para garantir que tudo esteja pronto
      setTimeout(() => {
        cleanup(); // Limpa qualquer instância anterior
        initializePlayer();
      }, 100);
      
      // Chama o callback original se existir
      if (typeof originalOnYouTubeIframeAPIReady === 'function') {
        originalOnYouTubeIframeAPIReady();
      }
    };

    // Configura um timeout para evitar que o carregamento fique travado
    const loadTimeout = setTimeout(() => {
      if (!window.YT) {
        console.error('YouTube API failed to load within timeout');
        setHasError(true);
      }
    }, 15000); // 15 segundos

    return () => {
      clearTimeout(loadTimeout);
      
      // Restaura o callback original ao desmontar
      window.onYouTubeIframeAPIReady = originalOnYouTubeIframeAPIReady;
      
      // Limpa recursos
      cleanup();
    };
    
  }, [startProgressTracker, initializePlayer]);

  const playVideo = useCallback(() => {
    if (playerInstance.current) {
      playerInstance.current.playVideo();
      setIsPlaying(true);
      if (!progressInterval.current) {
        startProgressTracker();
      }
    }
  }, [startProgressTracker]);

  const pauseVideo = useCallback(() => {
    if (playerInstance.current) {
      playerInstance.current.pauseVideo();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  }, [isPlaying, playVideo, pauseVideo]);

  const toggleMute = useCallback(() => {
    if (playerInstance.current) {
      if (isMuted) {
        playerInstance.current.unMute();
        playerInstance.current.setVolume(50);
      } else {
        playerInstance.current.mute();
      }
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const seekTo = useCallback((time: number) => {
    if (playerInstance.current) {
      playerInstance.current.seekTo(time, true);
      setCurrentTime(time);
      if (duration > 0) {
        setProgress((time / duration) * 100);
      }
    }
  }, [duration]);

  return {
    playerRef,
    isVideoLoaded,
    hasError,
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