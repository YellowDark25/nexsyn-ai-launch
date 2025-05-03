
import React, { useState, useRef, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

const VSLSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number | null>(null);

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
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      } else {
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        startProgressTracker();
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

  // Function to track video progress
  const startProgressTracker = () => {
    if (progressInterval.current) {
      window.clearInterval(progressInterval.current);
    }

    progressInterval.current = window.setInterval(() => {
      if (youtubePlayerRef.current && youtubePlayerRef.current.contentWindow) {
        // Get current time
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"getCurrentTime","args":""}', '*');
        
        // Get duration
        youtubePlayerRef.current.contentWindow.postMessage('{"event":"command","func":"getDuration","args":""}', '*');
      }
    }, 1000);
  };

  // Handle YouTube messages
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          
          // Handle player state changes
          if (data.event === 'onStateChange') {
            if (data.info === 0) { // video ended
              setIsPlaying(false);
              if (progressInterval.current) {
                window.clearInterval(progressInterval.current);
                progressInterval.current = null;
              }
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
            setDuration(data.info);
          }
          
          // Handle current time info
          if (data.event === 'getCurrentTime') {
            setCurrentTime(data.info);
            if (duration > 0) {
              setProgress((data.info / duration) * 100);
            }
          }
        }
      } catch (error) {
        // Ignore parsing errors for non-JSON messages
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    return () => {
      window.removeEventListener('message', handleYouTubeMessage);
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, [duration]);

  // Handle video seek
  const handleSeek = (value: number[]) => {
    const seekTime = (value[0] / 100) * duration;
    if (youtubePlayerRef.current && youtubePlayerRef.current.contentWindow) {
      youtubePlayerRef.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${seekTime}, true]}`, '*');
      setProgress(value[0]);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                  src="https://www.youtube.com/embed/s6mtYJ-pO6o?enablejsapi=1&rel=0&modestbranding=1&autoplay=0&mute=1&controls=0"
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
            
            {/* Custom video controls */}
            <div className="bg-black/90 p-3 flex flex-col gap-2">
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white min-w-[40px]">{formatTime(currentTime)}</span>
                <Slider
                  value={[progress]}
                  min={0}
                  max={100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-xs text-white min-w-[40px]">{formatTime(duration)}</span>
              </div>
              
              {/* Controls */}
              <div className="flex justify-between items-center">
                <button 
                  onClick={togglePlay}
                  className="p-2 bg-nexorange/20 rounded-full hover:bg-nexorange/40 transition-colors"
                >
                  {isPlaying ? 
                    <Pause size={20} className="text-white" /> : 
                    <Play size={20} className="text-white ml-0.5" />
                  }
                </button>
                
                <button 
                  onClick={toggleMute} 
                  className="p-2 bg-black/70 rounded-full hover:bg-nexorange/40 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
                </button>
              </div>
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
