
/**
 * Utility for loading the YouTube IFrame API
 */

// Track if the API is already loaded
let youtubeApiLoaded = false;

/**
 * Loads the YouTube IFrame API if not already loaded
 * @returns A promise that resolves when the API is ready
 */
export const loadYouTubeApi = (): Promise<void> => {
  return new Promise((resolve) => {
    // If API is already loaded, resolve immediately
    if (youtubeApiLoaded) {
      resolve();
      return;
    }

    // If window.onYouTubeIframeAPIReady is already defined, store the original
    const originalCallback = window.onYouTubeIframeAPIReady;

    // Define callback for API ready
    window.onYouTubeIframeAPIReady = () => {
      youtubeApiLoaded = true;
      console.log("YouTube API loaded");
      
      // Call the original callback if it existed
      if (originalCallback) {
        originalCallback();
      }
      
      resolve();
    };

    // Add YouTube API script if not already loaded
    if (!document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }
  });
};
