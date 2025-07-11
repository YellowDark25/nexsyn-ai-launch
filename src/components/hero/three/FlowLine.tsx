
import React, { useRef } from "react";
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
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const bottleneckRef = useRef<THREE.Mesh>(null);
  const bottleneckMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const dataPointRef = useRef<THREE.Mesh>(null);
  
  // Create points for the curve
  const startPoint = new THREE.Vector3(start[0], start[1], start[2]);
  const endPoint = new THREE.Vector3(end[0], end[1], end[2]);
  
  // Calculate midpoint with some randomization for a more natural curve
  const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
  midPoint.y += (Math.random() - 0.5) * 0.7;
  midPoint.z += (Math.random() - 0.5) * 0.3;
  
  // Create the curve
  const curvePoints = [startPoint, midPoint, endPoint];
  
  // Calculate bottleneck position (60% along the curve)
  const bottleneckPosition = new THREE.Vector3().lerpVectors(
    startPoint, 
    endPoint, 
    0.6
  );
  
  // Animation for data packets
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate the tube material
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(time * pulseSpeed) * 0.2;
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(time * pulseSpeed * 0.8) * 0.3;
    }
    
    // Animate bottleneck
    if (hasBottleneck && bottleneckRef.current && bottleneckMatRef.current) {
      bottleneckRef.current.scale.setScalar(0.1 + Math.sin(time * 3) * 0.03);
      bottleneckMatRef.current.opacity = 0.7 + Math.sin(time * 4) * 0.3;
      bottleneckMatRef.current.emissiveIntensity = 0.6 + Math.sin(time * 4) * 0.4;
    }
    
    // Animate data point traveling along the path
    if (dataPointRef.current) {
      // Create a curve for animation
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      
      // Calculate position along curve based on time
      const position = curve.getPoint((time * 0.2 * pulseSpeed) % 1);
      dataPointRef.current.position.set(position.x, position.y, position.z);
      
      // Scale pulse effect
      const scale = 0.05 + Math.sin(time * 8) * 0.02;
      dataPointRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      {/* The flow tube */}
      <mesh>
        <tubeGeometry 
          args={[
            new THREE.CatmullRomCurve3(curvePoints),
            20, // tubular segments
            0.025, // radius
            8, // radial segments
            false // closed
          ]} 
        />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          transparent={true}
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Data point traveling along the tube */}
      <mesh ref={dataPointRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Optional bottleneck indicator */}
      {hasBottleneck && (
        <mesh
          ref={bottleneckRef}
          position={[bottleneckPosition.x, bottleneckPosition.y, bottleneckPosition.z]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            ref={bottleneckMatRef}
            color="#ff3333"
            emissive="#ff0000"
            emissiveIntensity={1}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      )}
    </>
  );
};

export default FlowLine;
