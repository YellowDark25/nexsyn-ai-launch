
export interface YouTubePlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  isVideoLoaded: boolean;
  hasError: boolean;
  progress: number;
  duration: number;
  currentTime: number;
}

export interface YouTubePlayerActions {
  playVideo: () => void;
  pauseVideo: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
}

export interface YouTubePlayerMessageData {
  event: string;
  info?: unknown;
}

export interface UseYouTubePlayerProps {
  videoId: string;
  onReady?: () => void;
}

export interface UseYouTubePlayerReturn extends YouTubePlayerState, YouTubePlayerActions {
  playerRef: React.RefObject<HTMLIFrameElement>;
}
