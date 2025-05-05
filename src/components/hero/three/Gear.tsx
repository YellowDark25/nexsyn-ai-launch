
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Component for creating a gear with specified properties
const Gear = ({ 
  position, 
  rotation, 
  scale, 
  speed, 
  color = "#888888", 
  delay = 0 
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
  speed: number;
  color?: string;
  delay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation logic
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Simulate jamming or slipping gears
    if (speed < 0.2 && Math.sin(time * 2 + delay) > 0.7) {
      // Gear temporarily stops
      // No rotation update needed
    } else if (speed > 0.7 && Math.sin(time * 3 + delay) > 0.9) {
      // Gear occasionally jumps ahead
      meshRef.current.rotation.y += speed * 0.1;
    } else {
      // Normal rotation
      meshRef.current.rotation.y += speed * 0.01;
    }
  });

  const scaleArray = typeof scale === 'number' ? [scale, scale, scale] : scale;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Main gear body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Teeth */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        
        return (
          <mesh 
            key={i}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
            scale={[0.2, 0.25, 0.1]}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial 
              color={color} 
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Gear;
