
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ensureLottiePlayerLoaded } from './utils/lottieLoader'

// Initialize lottie-player before rendering the app
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Try to load Lottie before rendering the app, but render anyway after a timeout
// This prevents waiting forever if there's an issue with lottie loading
const renderApp = () => {
  root.render(<App />);
};

// Try to load lottie first
ensureLottiePlayerLoaded()
  .then(() => {
    renderApp();
  })
  .catch(error => {
    console.error("Failed to load lottie-player:", error);
    // Render the app anyway
    renderApp();
  });

// Fallback render in case lottie takes too long
setTimeout(() => {
  if (!document.getElementById("root")?.hasChildNodes()) {
    console.warn("Lottie loader took too long, rendering app without waiting");
    renderApp();
  }
}, 2000);
