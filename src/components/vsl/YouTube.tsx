
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from "lucide-react";

interface YouTubeProps {
  videoId: string;
  isPlaying: boolean;
  isVideoLoaded: boolean;
  togglePlay: () => void;
  playerRef: React.RefObject<HTMLIFrameElement>;
  onLoad: () => void;
}

const YouTube: React.FC<YouTubeProps> = ({
  videoId,
  isPlaying,
  isVideoLoaded,
  togglePlay,
  playerRef,
  onLoad
}) => {
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        <iframe 
          ref={playerRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=0&mute=1&controls=0&showinfo=0&origin=${window.location.origin}`}
          title="Nexsyn IA - Transformando seu negócio"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={onLoad}
          loading="lazy"
          frameBorder="0"
        ></iframe>
      </AspectRatio>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer group"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-nexorange flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
            <Play size={32} className="text-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTube;
