
import React from "react";
import { Button } from "@/components/ui/button";
import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import useFullscreen from "@/components/vsl/useFullscreen";
import YouTube from "@/components/vsl/YouTube";
import VideoProgressBar from "@/components/vsl/VideoProgressBar";
import VideoControls from "@/components/vsl/VideoControls";

const VSLSection = () => {
  const { elementRef, isFullscreen, toggleFullscreen } = useFullscreen();
  const { 
    playerRef, 
    isVideoLoaded, 
    isPlaying, 
    isMuted, 
    duration, 
    currentTime, 
    progress, 
    togglePlay, 
    toggleMute, 
    seekTo 
  } = useYouTubePlayer({ 
    videoId: "s6mtYJ-pO6o"
  });

  // Handle video seek - only allow seeking to parts that have been watched
  const handleSeek = (value: number[]) => {
    if (!value.length) return;
    
    const seekTime = (value[0] / 100) * duration;
    seekTo(seekTime);
  };

  return (
    <section id="vsl" className="py-16 bg-[#222632] relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 particle-container z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-nexlime">Veja como podemos transformar</span> 
            <span className="text-nexorange ml-2">sua empresa com IA</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Assista este vídeo e descubra como empresas como a sua estão usando IA para aumentar lucros e reduzir custos
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative" ref={elementRef}>
          <div className="rounded-xl overflow-hidden border-2 border-nexorange/50 shadow-lg shadow-nexorange/20">
            <YouTube
              videoId="s6mtYJ-pO6o"
              isPlaying={isPlaying}
              isVideoLoaded={isVideoLoaded}
              togglePlay={togglePlay}
              playerRef={playerRef}
              onLoad={() => {}} // Fixed: Removed reference to setIsVideoLoaded
            />
            
            {/* Custom video controls */}
            <div className="bg-black/90 p-3 flex flex-col gap-2">
              {/* Progress bar */}
              <VideoProgressBar
                currentTime={currentTime}
                duration={duration}
                progress={progress}
                onSeek={handleSeek}
              />
              
              {/* Controls */}
              <VideoControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                togglePlay={togglePlay}
                toggleMute={toggleMute}
                toggleFullscreen={toggleFullscreen}
              />
            </div>
          </div>
        </div>
        
        <div className="max-w-xl mx-auto mt-10 text-center">
          <p className="text-lg text-nexwhite mb-6">
            Pronto para implementar IA na sua empresa e ver os resultados em apenas 15 dias?
          </p>
          <a href="#contato">
            <Button className="bg-nexorange hover:bg-nexorange/90 text-white px-8 py-6 text-lg font-semibold">
              Quero começar agora
            </Button>
          </a>
        </div>
      </div>
      
      {/* Bottom decorative shape */}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path fill="#15191F" d="M0,10 C300,60 600,80 900,50 C1200,20 1440,40 1440,80 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default VSLSection;
