
// Type declarations for YouTube iframe API
declare namespace YT {
  interface PlayerEvent {
    target: Player;
    data: unknown;
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: number; // YT.PlayerState.*
  }

  interface OnErrorEvent extends PlayerEvent {
    data: number; // Error code
  }

  interface PlayerVars {
    autoplay?: 0 | 1;
    cc_load_policy?: 1;
    color?: 'red' | 'white';
    controls?: 0 | 1 | 2;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    end?: number;
    fs?: 0 | 1;
    hl?: string;
    iv_load_policy?: 1 | 3;
    list?: string;
    listType?: 'playlist' | 'user_uploads' | 'search';
    loop?: 0 | 1;
    modestbranding?: 0 | 1;
    origin?: string;
    playlist?: string;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    start?: number;
    widget_referrer?: string;
    [key: string]: string | number | boolean | undefined;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: number | string;
    height?: number | string;
    playerVars?: PlayerVars;
    host?: string;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onPlaybackQualityChange?: (event: PlayerEvent) => void;
      onPlaybackRateChange?: (event: PlayerEvent) => void;
      onError?: (event: OnErrorEvent) => void;
      onApiChange?: (event: PlayerEvent) => void;
    };
  }

  class Player {
    constructor(elementId: string, options: PlayerOptions);
    constructor(element: HTMLElement, options: PlayerOptions);
    
    // Player controls
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    
    // Player status
    getPlayerState(): PlayerState;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    
    // Volume controls
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
    
    // Playback controls
    setSize(width: number, height: number): void;
    setPlaybackQuality(suggestedQuality: string): void;
    getPlaybackQuality(): string;
    getAvailableQualityLevels(): string[];
    
    // Playlist controls
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;
    
    // Event handling
    addEventListener(event: string, listener: (event: Event) => void): void;
    removeEventListener(event: string, listener: (event: Event) => void): void;
    
    // Cleanup
    destroy(): void;
    
    // Player information
    getIframe(): HTMLIFrameElement;
    getOptions(): PlayerOptions;
    getVideoData(): {
      video_id: string;
      author: string;
      title: string;
    };
  }

  enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }

  enum PlayerError {
    INVALID_PARAM = 2,
    HTML5_ERROR = 5,
    NOT_FOUND = 100,
    EMBEDDING_DISABLED = 101,
    EMBEDDING_DISABLED_SIMPLE = 150
  }
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: typeof YT.Player;
      PlayerState: typeof YT.PlayerState;
      PlayerError: typeof YT.PlayerError;
      loading: number;
      loaded: number;
      setConfig: (config: Record<string, unknown>) => void;
      get: <T = unknown>(key: string) => T;
      ready: (fn: () => void) => void;
      _loading: {
        start: number;
        end: number;
        firstOnReady: number;
      };
    };
  }
}
