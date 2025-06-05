
/**
 * Utility for loading the YouTube IFrame API
 */

// Track if the API is already loaded
let youtubeApiLoaded = false;
let youtubeApiLoading = false;
const youtubeApiListeners: Array<() => void> = [];

// Função para notificar todos os ouvintes quando a API estiver pronta
const notifyYouTubeApiReady = () => {
  youtubeApiLoaded = true;
  youtubeApiLoading = false;
  console.log("YouTube API loaded and notifying listeners");
  
  // Notificar todos os ouvintes
  youtubeApiListeners.forEach(listener => listener());
  youtubeApiListeners.length = 0; // Limpar a lista de ouvintes
};

/**
 * Loads the YouTube IFrame API if not already loaded
 * @returns A promise that resolves when the API is ready
 */
export const loadYouTubeApi = (): Promise<void> => {
  return new Promise((resolve) => {
    // If API is already loaded, resolve immediately
    if (youtubeApiLoaded) {
      console.log("YouTube API already loaded, resolving immediately");
      resolve();
      return;
    }

    // If API is already loading, just add to the listeners
    if (youtubeApiLoading) {
      console.log("YouTube API is already loading, adding to listeners");
      youtubeApiListeners.push(resolve);
      return;
    }

    console.log("Starting to load YouTube API");
    youtubeApiLoading = true;

    // Store the original callback if it exists
    const originalOnYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady;
    
    // Define our callback for API ready
    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
      
      // Call the original callback if it exists
      if (typeof originalOnYouTubeIframeAPIReady === 'function') {
        console.log("Calling original onYouTubeIframeAPIReady");
        originalOnYouTubeIframeAPIReady();
      }
      
      // Notify all listeners that the API is ready
      notifyYouTubeApiReady();
    };

    // Add YouTube API script if not already loaded
    if (!document.getElementById('youtube-iframe-api')) {
      console.log("Adding YouTube API script");
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      tag.defer = true;
      
      tag.onerror = (error) => {
        console.error("Error loading YouTube API:", error);
        youtubeApiLoading = false;
        youtubeApiListeners.length = 0; // Clear listeners on error
      };
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag?.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else {
      console.log("YouTube API script already exists");
    }

    // Add to listeners to be notified when the API is ready
    youtubeApiListeners.push(resolve);
  });
};

// Força a recarga da API do YouTube se necessário
export const reloadYouTubeApi = (): Promise<void> => {
  youtubeApiLoaded = false;
  youtubeApiLoading = false;
  return loadYouTubeApi();
};
