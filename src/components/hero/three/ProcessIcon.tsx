
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Types of icons available
type IconType = "gear" | "robot" | "check" | "chat" | "time";

interface ProcessIconProps {
  type: IconType;
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed?: number;
}

// Simple 3D representations of icons
const ProcessIcon: React.FC<ProcessIconProps> = ({ 
  type, 
  position, 
  scale, 
  color, 
  rotationSpeed = 0.5 
}) => {
  const iconRef = useRef<THREE.Mesh>(null);
  
  // Animation for the icon
  useFrame(({ clock }) => {
    if (!iconRef.current) return;
    
    // Rotate the icon
    iconRef.current.rotation.y += 0.01 * rotationSpeed;
    
    // Make the icon float up and down slightly
    iconRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * rotationSpeed) * 0.1;
  });
  
  // Generate geometry based on icon type
  const getIconGeometry = () => {
    switch (type) {
      case "gear":
        return <cylinderGeometry args={[0.5, 0.5, 0.1, 12, 1, false]} />;
      case "robot":
        return <boxGeometry args={[0.5, 0.7, 0.2]} />;
      case "check":
        return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
      case "chat":
        return <sphereGeometry args={[0.4, 16, 16]} />;
      case "time":
        return <ringGeometry args={[0.3, 0.5, 32]} />;
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />;
    }
  };
  
  return (
    <mesh 
      ref={iconRef} 
      position={position}
      scale={scale} 
      castShadow
    >
      {getIconGeometry()}
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
};

export default ProcessIcon;
