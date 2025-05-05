
import React, { useRef, useMemo } from "react";
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
  const teethCount = Math.floor(Math.random() * 8) + 8; // 8 to 16 teeth
  const innerRadius = 0.5;
  const outerRadius = 1;
  const thickness = 0.2;
  
  // Create gear geometry
  const gearGeometry = useMemo(() => {
    const baseGeometry = new THREE.CylinderGeometry(innerRadius, innerRadius, thickness, 32);
    
    // Create arrays to store vertex data
    const positions: number[] = [...baseGeometry.attributes.position.array];
    const normals: number[] = [...baseGeometry.attributes.normal.array];
    const indices: number[] = [...baseGeometry.index!.array];
    
    let vertexOffset = positions.length / 3;
    
    // Add teeth
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2;
      const toothGeometry = new THREE.BoxGeometry(0.2, thickness + 0.05, 0.3);
      
      // Position and rotate the tooth
      const matrix = new THREE.Matrix4();
      matrix.makeRotationY(angle);
      matrix.setPosition(
        Math.cos(angle) * outerRadius,
        0,
        Math.sin(angle) * outerRadius
      );
      
      // Apply transform to tooth geometry
      toothGeometry.applyMatrix4(matrix);
      
      // Add tooth vertices
      positions.push(...Array.from(toothGeometry.attributes.position.array));
      normals.push(...Array.from(toothGeometry.attributes.normal.array));
      
      // Add tooth indices (adjusted for offset)
      const toothIndices = Array.from(toothGeometry.index!.array).map(idx => idx + vertexOffset);
      indices.push(...toothIndices);
      
      vertexOffset += toothGeometry.attributes.position.count;
    }
    
    // Create new geometry from merged data
    const mergedGeometry = new THREE.BufferGeometry();
    mergedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    mergedGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    mergedGeometry.setIndex(indices);
    
    return mergedGeometry;
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
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      castShadow
      receiveShadow
    >
      <primitive object={gearGeometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default Gear;
