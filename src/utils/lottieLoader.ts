
/**
 * This file ensures that the lottie-player web component is properly loaded
 * before it's used in the React components.
 */

// Function to ensure Lottie Player is loaded
export const ensureLottiePlayerLoaded = async (): Promise<void> => {
  // Check if the custom element is already defined
  if (!customElements.get('lottie-player')) {
    // Dynamically import the lottie player component
    await import('@lottiefiles/lottie-player');
  }
};
