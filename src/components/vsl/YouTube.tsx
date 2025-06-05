// src/components/vsl/YouTube.tsx
import React, { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from "lucide-react";

interface YouTubeProps {
  videoId: string;
  isPlaying: boolean;
  isVideoLoaded: boolean;
  togglePlay: () => void;
  playerRef: React.RefObject<HTMLIFrameElement>;
  onLoad: () => void;
  videoTitle?: string;
  videoDescription?: string;
}

const YouTube: React.FC<YouTubeProps> = ({
  videoId,
  isPlaying,
  isVideoLoaded,
  togglePlay,
  playerRef,
  onLoad,
  videoTitle = "Nexsyn IA - Transformando seu negócio com Inteligência Artificial",
  videoDescription = "Descubra como a Nexsyn IA pode revolucionar sua empresa com soluções em inteligência artificial personalizadas."
}) => {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerId = React.useMemo(() => `youtube-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`, [videoId]);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    setIsClient(true);
    
    // Função para lidar com mensagens do iframe do YouTube
    const handleMessage = (event: MessageEvent) => {
      // Verifica se a mensagem é do YouTube
      if (event.origin !== 'https://www.youtube.com') return;
      
      // Aqui você pode adicionar lógica para lidar com mensagens específicas do YouTube
      // como eventos de player, erros, etc.
      console.log('YouTube message received:', event.data);
    };
    
    // Adiciona o listener de mensagens
    window.addEventListener('message', handleMessage);
    
    // Limpa o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Dados estruturados para SEO
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle,
    "description": videoDescription,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": new Date().toISOString(),
    "duration": "PT5M", // Ajuste conforme a duração real do vídeo
    "contentUrl": videoUrl,
    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": {
        "@type": "http://schema.org/WatchAction"
      },
      "userInteractionCount": 0 // Atualize com o número real de visualizações se disponível
    }
  });

  // Adiciona o script de dados estruturados ao head do documento
  useEffect(() => {
    if (typeof document === 'undefined') return; // Verifica se estamos no navegador
    
    const scriptId = `youtube-structured-data-${videoId}`;
    
    try {
      // Verifica se já existe um script com o mesmo ID para evitar duplicação
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = structuredData;
        document.head.appendChild(script);
      } else if (script.text !== structuredData) {
        // Atualiza o script se os dados forem diferentes
        script.text = structuredData;
      }
      
      return () => {
        // Remove o script apenas se ainda existir e for o que criamos
        const existingScript = document.getElementById(scriptId);
        if (existingScript && existingScript.isSameNode(script)) {
          document.head.removeChild(existingScript);
        }
      };
    } catch (error) {
      console.error('Error managing structured data script:', error);
    }
  }, [structuredData, videoId]);
  
  // Função para lidar com erros de carregamento do iframe
  const handleIframeError = React.useCallback((e: React.SyntheticEvent<HTMLIFrameElement>) => {
    console.error('Error loading YouTube iframe:', e);
    setHasError(true);
  }, []);
  
  // Se houver erro, mostrar uma mensagem ou botão de recarregar
  if (hasError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
        <div className="text-center p-6">
          <div className="text-2xl font-semibold text-white mb-4">
            Ocorreu um erro ao carregar o vídeo
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-nexorange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div 
        className="relative w-full h-full"
        itemScope
        itemType="https://schema.org/VideoObject"
      >
        <meta itemProp="name" content={videoTitle} />
        <meta itemProp="description" content={videoDescription} />
        <meta itemProp="thumbnailUrl" content={thumbnailUrl} />
        <meta itemProp="uploadDate" content={new Date().toISOString()} />
        <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${videoId}`} />
        
        <AspectRatio ratio={16 / 9} className="w-full h-full">
          <div className="relative w-full h-full">
            <div id={playerId} className="w-full h-full">
              <iframe
                ref={playerRef}
                id={`${playerId}-iframe`}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${isClient ? window.location.origin : ''}&widgetid=1`}
                title={videoTitle}
                aria-label={`Vídeo: ${videoTitle}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
                onLoad={onLoad}
                onError={handleIframeError}
                itemProp="embedUrl"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer group"
                onClick={togglePlay}
                role="button"
                aria-label="Reproduzir vídeo"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && togglePlay()}
              >
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-nexorange flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                  aria-hidden="true"
                >
                  <Play size={32} className="text-white ml-1" aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
        </AspectRatio>
      </div>
    </>
  );
};

export default YouTube;