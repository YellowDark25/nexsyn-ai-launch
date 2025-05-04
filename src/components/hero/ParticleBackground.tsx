
import { useEffect } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Clean up existing particles
    const existingParticles = heroSection.querySelectorAll(".particle, .geometric-shape");
    existingParticles.forEach(p => p.remove());

    // Create particles
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Variable size for more dynamism
      const size = Math.random() * 12 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;

      // Variable opacity
      particle.style.opacity = (Math.random() * 0.6 + 0.1).toString();
      
      // Variable shape (circle or rounded square)
      const borderRadius = Math.random() > 0.5 ? '50%' : '30%';
      particle.style.borderRadius = borderRadius;

      // Enhanced colors with subtle gradients
      if (i % 3 === 0) {
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.4), rgba(201, 217, 33, 0.2))";
      } else if (i % 3 === 1) {
        particle.style.background = "linear-gradient(135deg, rgba(255, 111, 0, 0.4), rgba(255, 111, 0, 0.2))";
      } else {
        particle.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))";
      }

      // Add to container
      heroSection.appendChild(particle);

      // Enhanced animation
      animateParticle(particle);
    }
    
    // Add floating geometric elements
    addGeometricElements(heroSection);
    
    function animateParticle(particle: HTMLElement) {
      // More organic and fluid movement
      const xMove = Math.random() * 8 - 4;
      const yMove = Math.random() * 8 - 4;
      const rotation = Math.random() * 180;
      const duration = Math.random() * 15000 + 10000;
      
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
    { type: 'triangle', color: 'rgba(201, 217, 33, 0.15)' },
    { type: 'square', color: 'rgba(255, 111, 0, 0.15)' },
    { type: 'circle', color: 'rgba(255, 255, 255, 0.1)' }
  ];
  
  for (let i = 0; i < 6; i++) {
    const shape = document.createElement('div');
    const shapeType = shapes[i % shapes.length];
    
    shape.classList.add('geometric-shape');
    shape.style.position = 'absolute';
    
    const size = Math.random() * 80 + 40;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    
    shape.style.left = `${Math.random() * 80 + 10}%`;
    shape.style.top = `${Math.random() * 80 + 10}%`;
    
    shape.style.opacity = '0.15';
    shape.style.background = shapeType.color;
    
    if (shapeType.type === 'triangle') {
      shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (shapeType.type === 'square') {
      shape.style.borderRadius = '15%';
    } else {
      shape.style.borderRadius = '50%';
    }
    
    shape.style.zIndex = '0';
    shape.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Add animation
    const animation = shape.animate([
      { transform: `rotate(0deg) translate(0, 0)` },
      { transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)` }
    ], {
      duration: 15000 + Math.random() * 10000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
    
    container.appendChild(shape);
  }
}

export default ParticleBackground;
