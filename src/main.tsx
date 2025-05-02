
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ensureLottiePlayerLoaded } from './utils/lottieLoader'

// Initialize lottie-player before rendering the app
ensureLottiePlayerLoaded().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
