
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Component for flow lines between gears
const FlowLine = ({ 
  start, 
  end, 
  color, 
  pulseSpeed = 1, 
  hasBottleneck = false 
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  pulseSpeed?: number;
  hasBottleneck?: boolean;
}) => {
  const tubeRef = useRef<THREE.Mesh>(null);
  const bottleneckRef = useRef<THREE.Mesh>(null);
  
  // Create curve between points
  const curve = useMemo(() => {
    const startVector = new THREE.Vector3(start[0], start[1], start[2]);
    const endVector = new THREE.Vector3(end[0], end[1], end[2]);
    
    // Calculate midpoint with some offset for curve
    const midPoint = new THREE.Vector3()
      .addVectors(startVector, endVector)
      .multiplyScalar(0.5);
    
    // Add some random offset to make it more organic
    midPoint.y += (Math.random() - 0.5) * 0.5;
    
    return new THREE.CatmullRomCurve3([
      startVector,
      midPoint,
      endVector
    ]);
  }, [start, end]);
  
  // Create geometry for the curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
  }, [curve]);

  // Calculate bottleneck position
  const bottleneckPosition = useMemo(() => {
    if (hasBottleneck && curve) {
      return curve.getPoint(0.6);
    }
    return new THREE.Vector3(0, 0, 0);
  }, [curve, hasBottleneck]);

  // Material for tube
  const tubeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    transparent: true,
    opacity: 0.8,
    emissive: color,
    emissiveIntensity: 2,
  }), [color]);

  // Material for bottleneck
  const bottleneckMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#ff3333",
    emissive: "#ff0000",
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.8,
  }), []);

  // Animation for the flow and bottleneck
  useFrame((state) => {
    if (tubeRef.current && tubeMaterial) {
      const time = state.clock.getElapsedTime();
      // Pulse effect on the tube
      tubeMaterial.opacity = 0.6 + Math.sin(time * pulseSpeed) * 0.2;
    }
    
    // Animate bottleneck if it exists
    if (hasBottleneck && bottleneckRef.current && bottleneckMaterial) {
      const time = state.clock.getElapsedTime();
      bottleneckRef.current.scale.setScalar(0.8 + Math.sin(time * 3) * 0.2);
      bottleneckMaterial.opacity = 0.7 + Math.sin(time * 4) * 0.3;
    }
  });

  return (
    <>
      <mesh ref={tubeRef}>
        <primitive object={tubeGeometry} attach="geometry" />
        <primitive object={tubeMaterial} attach="material" />
      </mesh>
      
      {hasBottleneck && (
        <mesh 
          ref={bottleneckRef} 
          position={[bottleneckPosition.x, bottleneckPosition.y, bottleneckPosition.z]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <primitive object={bottleneckMaterial} attach="material" />
        </mesh>
      )}
    </>
  );
};

export default FlowLine;
