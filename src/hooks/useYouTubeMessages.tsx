
import { useEffect } from "react";
import { YouTubePlayerMessageData } from "@/types/youtubePlayer";

interface UseYouTubeMessagesProps {
  playerRef: React.RefObject<HTMLIFrameElement>;
  onStateChange?: (stateCode: number) => void;
  onDurationReceived?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
  onReady?: () => void;
}

/**
 * Hook to handle YouTube postMessage events
 */
const useYouTubeMessages = ({
  playerRef,
  onStateChange,
  onDurationReceived,
  onTimeUpdate,
  onReady,
}: UseYouTubeMessagesProps) => {
  
  // Handle YouTube messages
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          let data: YouTubePlayerMessageData;
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            // Ignore non-JSON messages
            return;
          }
          
          console.log("YouTube message received:", data.event);
          
          // Handle player state changes
          if (data.event === 'onStateChange' && onStateChange) {
            onStateChange(data.info);
          }
          
          // Handle duration info
          if (data.event === 'getDuration' && onDurationReceived) {
            onDurationReceived(data.info || 0);
          }
          
          // Handle current time info
          if (data.event === 'getCurrentTime' && onTimeUpdate) {
            onTimeUpdate(data.info || 0);
          }

          // Handle player ready
          if (data.event === 'onReady' && onReady) {
            onReady();
          }
        }
      } catch (error) {
        console.error("Error handling YouTube message:", error);
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    
    return () => {
      window.removeEventListener('message', handleYouTubeMessage);
    };
  }, [onStateChange, onDurationReceived, onTimeUpdate, onReady]);

  // Function to send commands to YouTube player
  const sendPlayerCommand = (func: string, args: any = "") => {
    if (playerRef.current && playerRef.current.contentWindow) {
      const message = JSON.stringify({
        event: "command",
        func: func,
        args: args
      });
      
      playerRef.current.contentWindow.postMessage(message, '*');
    }
  };

  return { sendPlayerCommand };
};

export default useYouTubeMessages;
