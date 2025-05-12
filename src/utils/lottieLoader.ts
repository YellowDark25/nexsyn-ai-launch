
export {};

declare global {
  interface Window {
    lottie: any;
  }
}

export const ensureLottiePlayerLoaded = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.lottie) {
      resolve();
      return;
    }

    try {
      // Use dynamic import for lottie-web (smaller bundle)
      import('lottie-web').then(module => {
        window.lottie = module.default;
        resolve();
      }).catch(error => {
        console.error('Failed to load lottie-web dynamically:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error loading lottie-web:', error);
      reject(error);
    }
  });
};

/**
 * Creates a lottie player element with animation data
 */
export const createLottiePlayerElement = (
  animationData: any, 
  options: {
    width?: string;
    height?: string;
    loop?: boolean;
    autoplay?: boolean;
    speed?: string;
  }
) => {
  // Create container element
  const container = document.createElement('div');
  container.style.width = options.width || '100%';
  container.style.height = options.height || '100%';
  
  try {
    if (!window.lottie) {
      console.error('Lottie is not loaded yet. Call ensureLottiePlayerLoaded first.');
      return container;
    }

    // Load the animation
    window.lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: options.loop !== undefined ? options.loop : true,
      autoplay: options.autoplay !== undefined ? options.autoplay : true,
      animationData: animationData,
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: 'xMidYMid slice'
      }
    });
    
    // Set animation speed if provided
    if (options.speed) {
      const speed = parseFloat(options.speed);
      if (!isNaN(speed)) {
        window.lottie.setSpeed(speed);
      }
    }
  } catch (error) {
    console.error('Error creating Lottie player:', error);
  }
  
  return container;
};
