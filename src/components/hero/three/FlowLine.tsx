
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
  const curveRef = useRef<THREE.Mesh>(null);
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
    
    const curvePoints = new THREE.CatmullRomCurve3([
      startVector,
      midPoint,
      endVector
    ]);
    
    return curvePoints;
  }, [start, end]);
  
  // Create geometry for the curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
  }, [curve]);

  // Animation for the flow and bottleneck
  useFrame((state) => {
    if (!curveRef.current?.material) return;
    
    const time = state.clock.getElapsedTime();
    
    // Ensure material is of correct type for TypeScript
    const material = curveRef.current.material as THREE.MeshStandardMaterial;
    // Pulse effect on the tube
    material.opacity = 0.6 + Math.sin(time * pulseSpeed) * 0.2;
    
    // Animate bottleneck if it exists
    if (hasBottleneck && bottleneckRef.current) {
      bottleneckRef.current.scale.setScalar(0.8 + Math.sin(time * 3) * 0.2);
      
      // Ensure material is of correct type for TypeScript
      const bottleneckMaterial = bottleneckRef.current.material as THREE.MeshStandardMaterial;
      bottleneckMaterial.opacity = 0.7 + Math.sin(time * 4) * 0.3;
    }
  });

  return (
    <>
      <mesh ref={curveRef}>
        <primitive object={tubeGeometry} attach="geometry" />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
      
      {hasBottleneck && (
        <mesh 
          ref={bottleneckRef} 
          position={[
            curve.getPoint(0.6).x, 
            curve.getPoint(0.6).y, 
            curve.getPoint(0.6).z
          ]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ff3333"
            emissive="#ff0000"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </>
  );
};

export default FlowLine;
