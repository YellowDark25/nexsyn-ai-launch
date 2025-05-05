
import { useEffect } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Clean up existing particles
    const existingParticles = heroSection.querySelectorAll(".particle, .geometric-shape");
    existingParticles.forEach(p => p.remove());

    // Create more particles (increased from 60 to 75)
    for (let i = 0; i < 75; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Variable size for more dynamism
      const size = Math.random() * 18 + 2; // Further increased max size
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;

      // Variable opacity
      particle.style.opacity = (Math.random() * 0.7 + 0.15).toString();
      
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

      // Enhanced colors with more vibrant gradients
      if (i % 4 === 0) {
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.8), rgba(201, 217, 33, 0.4))";
      } else if (i % 4 === 1) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 111, 0, 0.8), rgba(255, 111, 0, 0.4))";
      } else if (i % 4 === 2) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))";
      } else {
        // New gradient for more variety
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.3), rgba(255, 111, 0, 0.3))";
      }

      // Add to container
      heroSection.appendChild(particle);

      // Enhanced animation
      animateParticle(particle);
    }
    
    // Add larger floating geometric elements
    addGeometricElements(heroSection);
    
    function animateParticle(particle: HTMLElement) {
      // More organic and fluid movement
      const xMove = Math.random() * 15 - 7.5; // Increased movement range
      const yMove = Math.random() * 15 - 7.5;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 20000 + 10000; // Longer animation duration
      
      const animation = particle.animate([
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: particle.style.opacity
        }, 
        {
          transform: `translate(${xMove * 100}px, ${yMove * 100}px) rotate(${rotation}deg)`,
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
function addGeometricElements(container: HTMLElement) {
  const shapes = [
    { type: 'triangle', color: 'rgba(201, 217, 33, 0.25)' },
    { type: 'square', color: 'rgba(255, 111, 0, 0.25)' },
    { type: 'circle', color: 'rgba(255, 255, 255, 0.18)' },
    { type: 'polygon', color: 'rgba(201, 217, 33, 0.2)' },
    { type: 'diamond', color: 'rgba(255, 111, 0, 0.2)' } // New shape
  ];
  
  // Create more geometric shapes (increased from 8 to 10)
  for (let i = 0; i < 10; i++) {
    const shape = document.createElement('div');
    const shapeType = shapes[i % shapes.length];
    
    shape.classList.add('geometric-shape');
    shape.style.position = 'absolute';
    
    // Create larger shapes
    const size = Math.random() * 120 + 40; // Increased size
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    
    shape.style.left = `${Math.random() * 90 + 5}%`;
    shape.style.top = `${Math.random() * 90 + 5}%`;
    
    shape.style.opacity = '0.2';
    shape.style.background = shapeType.color;
    
    if (shapeType.type === 'triangle') {
      shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (shapeType.type === 'square') {
      shape.style.borderRadius = '15%';
    } else if (shapeType.type === 'polygon') {
      shape.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
    } else if (shapeType.type === 'diamond') {
      shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    } else {
      shape.style.borderRadius = '50%';
    }
    
    shape.style.zIndex = '0';
    shape.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Add more complex animation
    const animation = shape.animate([
      { transform: `rotate(0deg) translate(0, 0) scale(1)` },
      { transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(${0.9 + Math.random() * 0.3})` }
    ], {
      duration: 20000 + Math.random() * 15000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
    
    container.appendChild(shape);
  }
}

export default ParticleBackground;
