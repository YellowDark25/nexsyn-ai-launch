
import { useEffect, useState } from "react";

const ParticleBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const heroSection = document.getElementById("hero-background");
    if (!heroSection) return;

    // Clean up existing particles
    const existingParticles = heroSection.querySelectorAll(".particle, .geometric-shape");
    existingParticles.forEach(p => p.remove());

    // Adiciona listener para o movimento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    // Create particles with improved animation
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
        particle.style.background = "linear-gradient(135deg, rgba(201, 217, 33, 0.2), rgba(255, 111, 0, 0.2))";
      }

      // Add to container
      heroSection.appendChild(particle);

      // Animação aprimorada
      animateParticle(particle, i);
    }
    
    // Add geometric elements
    addGeometricElements(heroSection, 4);
    
    window.addEventListener('mousemove', handleMouseMove);

    function animateParticle(particle: HTMLElement, index: number) {
      // Calcular movimento baseado em parte na posição do mouse
      const xMove = Math.random() * 8 - 4; 
      const yMove = Math.random() * 8 - 4;
      const rotation = Math.random() * 360;
      const duration = Math.random() * 30000 + 20000; // Longer duration for smoother effect
      
      const updateParticlePosition = () => {
        // Influência sutil do mouse na animação
        const mouseInfluence = 5;
        const mouseX = (mousePosition.x - 0.5) * mouseInfluence;
        const mouseY = (mousePosition.y - 0.5) * mouseInfluence;
        
        const animation = particle.animate([
          {
            transform: "translate(0, 0) rotate(0deg)",
            opacity: particle.style.opacity
          }, 
          {
            transform: `translate(${xMove * 8 + mouseX}px, ${yMove * 8 + mouseY}px) rotate(${rotation}deg)`,
            opacity: (parseFloat(particle.style.opacity) * 0.7).toString()
          }
        ], {
          duration,
          iterations: 1,
          easing: "ease-in-out",
          fill: "forwards"
        });
        
        animation.onfinish = () => {
          updateParticlePosition();
        };
      };
      
      // Iniciar com atraso escalonado
      setTimeout(() => {
        updateParticlePosition();
      }, index * 100);
    }
    
    return () => {
      // Clean up particles when component unmounts
      const particles = document.querySelectorAll(".particle, .geometric-shape");
      particles.forEach(p => p.remove());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);
  
  return <div id="hero-background" className="absolute inset-0 particle-container z-0"></div>;
};

// Helper function to add geometric elements with mouse interaction
function addGeometricElements(container: HTMLElement, count: number) {
  const shapes = [
    { type: 'triangle', color: 'rgba(201, 217, 33, 0.12)' },
    { type: 'square', color: 'rgba(255, 111, 0, 0.12)' },
    { type: 'circle', color: 'rgba(255, 255, 255, 0.08)' },
    { type: 'polygon', color: 'rgba(201, 217, 33, 0.10)' }
  ];
  
  // Create geometric shapes with enhanced interaction
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
    
    shape.style.opacity = '0.1';
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
    shape.style.transition = 'transform 3s ease-out, opacity 2s ease';
    
    // Adicionando interação sutil com o mouse
    shape.addEventListener('mousemove', (e) => {
      const rect = shape.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      shape.style.transform = `rotate(${Math.random() * 360}deg) translate(${moveX}px, ${moveY}px)`;
      shape.style.opacity = '0.2';
    });
    
    // Reset ao remover mouse
    shape.addEventListener('mouseleave', () => {
      shape.style.transform = `rotate(${Math.random() * 360}deg) translate(0px, 0px)`;
      shape.style.opacity = '0.1';
    });
    
    // Animação constante e lenta
    const animateShape = () => {
      const animation = shape.animate([
        { transform: `rotate(0deg) translate(0, 0) scale(1)` },
        { transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(${0.92 + Math.random() * 0.16})` }
      ], {
        duration: 40000 + Math.random() * 20000,
        iterations: 1,
        easing: 'ease-in-out',
        fill: 'forwards'
      });
      
      animation.onfinish = animateShape;
    };
    
    animateShape();
    container.appendChild(shape);
  }
}

export default ParticleBackground;
