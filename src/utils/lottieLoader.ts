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
