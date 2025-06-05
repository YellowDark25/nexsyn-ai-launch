
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Importações de CSS na ordem correta
import './styles/variables.css' // 1. Variáveis CSS primeiro
import './index.css' // 2. Estilos base do Tailwind
import './styles/globals.css' // 3. Estilos globais personalizados

import { ensureLottiePlayerLoaded } from './utils/lottieLoader'

// Initialize lottie-player before rendering the app
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Render the app immediately to avoid blank screen
// We'll handle Lottie loading in the components
root.render(<App />);

// Pre-load Lottie in the background after app render
ensureLottiePlayerLoaded()
  .then(() => {
    console.log("Lottie player preloaded successfully");
  })
  .catch(error => {
    console.error("Failed to preload lottie-player:", error);
  });
