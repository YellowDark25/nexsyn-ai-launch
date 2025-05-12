
import React from "react";
import { Play, Pause, Volume2, VolumeX, Fullscreen } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  isPlaying, 
  isMuted, 
  togglePlay, 
  toggleMute, 
  toggleFullscreen 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button 
          onClick={togglePlay}
          className="p-2 bg-nexorange/20 rounded-full hover:bg-nexorange/40 transition-colors"
          aria-label={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? 
            <Pause size={20} className="text-white" /> : 
            <Play size={20} className="text-white ml-0.5" />
          }
        </button>
        
        <button 
          onClick={toggleMute} 
          className="p-2 bg-black/70 rounded-full hover:bg-nexorange/40 transition-colors"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
        </button>
      </div>
      
      <button 
        onClick={toggleFullscreen}
        className="p-2 bg-black/70 rounded-full hover:bg-nexorange/40 transition-colors"
        aria-label="Tela cheia"
      >
        <Fullscreen size={20} className="text-white" />
      </button>
    </div>
  );
};

export default VideoControls;
