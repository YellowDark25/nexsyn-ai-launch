
/**
 * This file ensures that the lottie-player web component is properly loaded
 * before it's used in the React components.
 */

let lottieLoaded = false;
let lottieLoadPromise: Promise<void> | null = null;

// Function to ensure Lottie Player is loaded
export const ensureLottiePlayerLoaded = async (): Promise<void> => {
  if (lottieLoaded) return Promise.resolve();
  
  // Only create one promise to avoid multiple parallel loads
  if (!lottieLoadPromise) {
    lottieLoadPromise = new Promise<void>(async (resolve, reject) => {
      try {
        // Check if the custom element is already defined
        if (!customElements.get('lottie-player')) {
          console.log('Loading lottie-player...');
          // Dynamically import the lottie player component
          await import('@lottiefiles/lottie-player');
          console.log('Lottie player successfully loaded');
        }
        lottieLoaded = true;
        resolve();
      } catch (error) {
        console.error('Failed to load lottie player:', error);
        reject(error);
      }
    });
  }
  
  return lottieLoadPromise;
};

export const createLottiePlayerElement = (
  animationData: any, 
  options: {
    width?: string;
    height?: string;
    loop?: boolean;
    autoplay?: boolean;
    speed?: string;
  } = {}
): HTMLElement => {
  const player = document.createElement('lottie-player');
  
  // Set the animation data
  player.setAttribute('src', JSON.stringify(animationData));
  
  // Set default options
  player.setAttribute('background', 'transparent');
  player.setAttribute('speed', options.speed || '1');
  
  if (options.width) player.style.width = options.width;
  if (options.height) player.style.height = options.height;
  
  if (options.loop !== false) player.setAttribute('loop', '');
  if (options.autoplay !== false) player.setAttribute('autoplay', '');
  
  return player;
};
