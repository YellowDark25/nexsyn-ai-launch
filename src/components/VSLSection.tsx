
import React, { useState, useRef, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX } from "lucide-react";

const VSLSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // YouTube iframe API reference
  const youtubePlayerRef = useRef<HTMLIFrameElement>(null);

  // Load YouTube API
  useEffect(() => {
    // Add YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Function to handle video play/pause
  const togglePlay = () => {
    if (youtubePlayerRef.current && youtubePlayerRef.current.contentWindow) {
      if (isPlaying) {
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to handle mute/unmute
  const toggleMute = () => {
    if (youtubePlayerRef.current && youtubePlayerRef.current.contentWindow) {
      if (isMuted) {
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle YouTube iframe load event
  const handleIframeLoad = () => {
    setIsVideoLoaded(true);
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
        
        <div className="max-w-4xl mx-auto relative" ref={videoContainerRef}>
          <div className="rounded-xl overflow-hidden border-2 border-nexorange/50 shadow-lg shadow-nexorange/20">
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full border-4 border-t-nexorange border-r-nexlime border-b-nexorange border-l-nexlime animate-spin mb-4"></div>
                  <p className="text-white">Carregando vídeo...</p>
                </div>
              </div>
            )}
            
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <iframe 
                  ref={youtubePlayerRef}
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID?enablejsapi=1&rel=0&modestbranding=1&autoplay=0&mute=1"
                  title="Nexsyn IA - Transformando seu negócio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={handleIframeLoad}
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
            
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              <button 
                onClick={toggleMute} 
                className="p-2 bg-black/70 rounded-full hover:bg-nexorange/80 transition-colors"
              >
                {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
              </button>
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
