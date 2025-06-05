import React from "react";
import { Button } from "@/components/ui/button";
import useYouTubePlayer from "@/hooks/useYouTubePlayer";
import useFullscreen from "@/components/vsl/useFullscreen";
import YouTube from "@/components/vsl/YouTube";
import VideoProgressBar from "@/components/vsl/VideoProgressBar";
import VideoControls from "@/components/vsl/VideoControls";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

  const handleVideoLoad = () => {
    console.log("YouTube iframe loaded");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="vsl" className={cn("py-24 relative overflow-hidden bg-gradient-to-br from-[#0A1A3A] via-[#0F1B4D] to-[#1A1B51]", isFullscreen && "h-screen")}>
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent opacity-70"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMOSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/10"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        {/* Elementos decorativos */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full mix-blend-screen blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full mix-blend-screen blur-3xl"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-12 space-y-4"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-400 bg-clip-text text-transparent">Veja como podemos transformar</span> 
            <span className="text-white ml-2">sua empresa com IA</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Assista este vídeo e descubra como empresas como a sua estão usando IA para aumentar lucros e reduzir custos de forma significativa em poucas semanas.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto relative z-10"
          ref={elementRef}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(255,145,0,0.3)] border border-orange-400/20 bg-gradient-to-br from-[#03055B]/90 to-[#03055B]/90 backdrop-blur-xl p-1.5">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl -z-10 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-[#0A1A3A] to-[#1A1B51] p-1 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjkiPgo8cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjAyIj48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
              <YouTube
                videoId="s6mtYJ-pO6o"
                isPlaying={isPlaying}
                isVideoLoaded={isVideoLoaded}
                togglePlay={togglePlay}
                playerRef={playerRef}
                onLoad={handleVideoLoad}
              />
              {/* Custom video controls */}
              <div className="bg-gradient-to-r from-black/90 to-black/80 p-3 flex flex-col gap-2 backdrop-blur-sm">
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
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="max-w-xl mx-auto mt-10 text-center space-y-6"
        >
          <motion.p variants={itemVariants} className="text-xl text-gray-200 font-medium">
            Pronto para implementar IA na sua empresa e ver os resultados em apenas 15 dias?
          </motion.p>
          <motion.div variants={itemVariants} className="relative group">
            <motion.a
              href="#contato"
              className="relative z-10 inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Quero começar agora</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.a>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent rounded-xl -z-10 blur-md"></div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Removido o SVG decorativo para melhorar a transição entre as seções */}
    </section>
  );
};

export default VSLSection;
