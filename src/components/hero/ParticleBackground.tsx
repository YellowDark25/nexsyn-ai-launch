
import { useEffect } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Clean up existing particles
    const existingParticles = heroSection.querySelectorAll(".particle, .geometric-shape");
    existingParticles.forEach(p => p.remove());

    // Create fewer particles for better focus on the main flow animation
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Smaller sizes for more subtle effect
      const size = Math.random() * 8 + 2; 
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;

      // Lower opacity for subtlety
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      
      // Variable shape (circle, rounded square, or triangle)
      const shapeType = Math.floor(Math.random() * 3);
      if (shapeType === 0) {
        // Circle
        particle.style.borderRadius = '50%';
      } else if (shapeType === 1) {
        // Rounded square
        particle.style.borderRadius = '30%';
      } else {
        // Triangle (using clip-path)
        particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        particle.style.borderRadius = '0';
      }

      // Enhanced colors with more vibrant gradients that match the brand
      if (i % 4 === 0) {
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.6), rgba(201, 217, 33, 0.3))";
      } else if (i % 4 === 1) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 111, 0, 0.6), rgba(255, 111, 0, 0.3))";
      } else if (i % 4 === 2) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))";
      } else {
        // New gradient for more variety
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.2), rgba(255, 111, 0, 0.2))";
      }

      // Add to container
      heroSection.appendChild(particle);

      // More subtle animation for better performance
      animateParticle(particle);
    }
    
    // Add fewer geometric elements
    addGeometricElements(heroSection, 4);
    
    function animateParticle(particle: HTMLElement) {
      // More subtle movement
      const xMove = Math.random() * 8 - 4; 
      const yMove = Math.random() * 8 - 4;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 30000 + 20000; // Longer duration for smoother effect
      
      const animation = particle.animate([
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: particle.style.opacity
        }, 
        {
          transform: `translate(${xMove * 8}px, ${yMove * 8}px) rotate(${rotation}deg)`,
          opacity: (parseFloat(particle.style.opacity) * 0.7).toString()
        }
      ], {
        duration,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
      });
    }
    
    return () => {
      // Clean up particles when component unmounts
      const particles = document.querySelectorAll(".particle, .geometric-shape");
      particles.forEach(p => p.remove());
    };
  }, []);
  
  return <div id="hero-background" className="absolute inset-0 particle-container z-0"></div>;
};

// Helper function to add geometric elements
function addGeometricElements(container: HTMLElement, count: number) {
  const shapes = [
    { type: 'triangle', color: 'rgba(201, 217, 33, 0.12)' },
    { type: 'square', color: 'rgba(255, 111, 0, 0.12)' },
    { type: 'circle', color: 'rgba(255, 255, 255, 0.08)' },
    { type: 'polygon', color: 'rgba(201, 217, 33, 0.10)' }
  ];
  
  // Create geometric shapes
  for (let i = 0; i < count; i++) {
    const shape = document.createElement('div');
    const shapeType = shapes[i % shapes.length];
    
    shape.classList.add('geometric-shape');
    shape.style.position = 'absolute';
    
    // Create larger but fewer shapes
    const size = Math.random() * 120 + 60;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    
    shape.style.left = `${Math.random() * 90 + 5}%`;
    shape.style.top = `${Math.random() * 90 + 5}%`;
    
    shape.style.opacity = '0.1';  // More subtle
    shape.style.background = shapeType.color;
    
    if (shapeType.type === 'triangle') {
      shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (shapeType.type === 'square') {
      shape.style.borderRadius = '15%';
    } else if (shapeType.type === 'polygon') {
      shape.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
    } else {
      shape.style.borderRadius = '50%';
    }
    
    shape.style.zIndex = '0';
    shape.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Smoother, slower animation
    const animation = shape.animate([
      { transform: `rotate(0deg) translate(0, 0) scale(1)` },
      { transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(${0.92 + Math.random() * 0.16})` }
    ], {
      duration: 40000 + Math.random() * 20000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
    
    container.appendChild(shape);
  }
}

export default ParticleBackground;
