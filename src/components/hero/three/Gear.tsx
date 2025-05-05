
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";

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
  const teethCount = Math.floor(Math.random() * 8) + 8; // 8 to 16 teeth
  const innerRadius = 0.5;
  const outerRadius = 1;
  const thickness = 0.2;
  
  // Create gear geometry
  const gearGeometry = useMemo(() => {
    const baseGeometry = new THREE.CylinderGeometry(innerRadius, innerRadius, thickness, 32);
    
    // Create geometries array for merging
    const geometries: THREE.BufferGeometry[] = [baseGeometry];
    
    // Add teeth
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2;
      const toothGeometry = new THREE.BoxGeometry(0.2, thickness + 0.05, 0.3);
      
      // Create matrix to transform the tooth geometry
      const matrix = new THREE.Matrix4();
      
      // Position and rotate the tooth
      matrix.makeRotationY(angle);
      matrix.setPosition(
        Math.cos(angle) * outerRadius,
        0,
        Math.sin(angle) * outerRadius
      );
      
      // Apply the transform matrix
      const transformedGeometry = toothGeometry.clone().applyMatrix4(matrix);
      geometries.push(transformedGeometry);
    }
    
    // Use the properly imported mergeGeometries function
    return BufferGeometryUtils.mergeGeometries(geometries);
  }, [teethCount]);

  // Define material properties
  const material = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.8,
      roughness: 0.2,
    })
  , [color]);

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

  return (
    <mesh 
      ref={meshRef} 
      geometry={gearGeometry} 
      material={material}
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      castShadow
      receiveShadow
    />
  );
};

export default Gear;
