
import React, { useRef } from "react";
import { Grid, PerspectiveCamera, useFrame } from "@react-three/drei";
import * as THREE from "three";
import ProcessIcon from "./ProcessIcon";
import TransformationPipeline from "./TransformationPipeline";

// Main scene component
const ProcessScene = () => {
  const sceneRef = useRef<THREE.Group>(null);
  
  // Apply subtle scene movement for parallax effect
  useFrame(({ clock, mouse }) => {
    if (!sceneRef.current) return;
    
    // Subtle rotation based on mouse position for parallax effect
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      (mouse.x * 0.1),
      0.05
    );
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      (mouse.y * 0.05),
      0.05
    );
    
    // Subtle floating animation
    sceneRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
  });

  return (
    <>
      {/* Scene background */}
      <color attach="background" args={["#1A1F2C"]} />
      
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 1.8, 4.5]} fov={45} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[0, -3, 0]} intensity={0.2} color="#C9D921" />
      <pointLight position={[2, 1, 1]} intensity={0.3} color="#FF6F00" />
      
      {/* Holographic grid for futuristic backdrop */}
      <Grid 
        infiniteGrid 
        cellSize={0.6}
        cellThickness={0.3}
        sectionSize={2.5}
        sectionThickness={0.5}
        fadeDistance={15}
        fadeStrength={2}
        cellColor="#C9D92120"
        sectionColor="#FF6F0015"
      />
      
      {/* Main scene group with parallax effect */}
      <group ref={sceneRef}>
        {/* Transformation pipeline from left to right */}
        <TransformationPipeline />
        
        {/* Floating icons */}
        <ProcessIcon type="gear" position={[-2.5, 1.2, -0.5]} scale={0.25} color="#C9D921" rotationSpeed={0.8} />
        <ProcessIcon type="check" position={[0, 1.4, -0.3]} scale={0.2} color="#FFFFFF" rotationSpeed={0.3} />
        <ProcessIcon type="robot" position={[1.8, 1.5, -0.4]} scale={0.22} color="#FF6F00" rotationSpeed={0.5} />
        <ProcessIcon type="time" position={[2.5, 0.8, -0.2]} scale={0.18} color="#C9D921" rotationSpeed={0.6} />
        <ProcessIcon type="chat" position={[-1.2, 0.7, -0.3]} scale={0.2} color="#FFFFFF" rotationSpeed={0.4} />
        
        {/* Final message glow */}
        <mesh position={[0, -1.5, -1]} rotation={[0, 0, 0]}>
          <planeGeometry args={[4, 0.6]} />
          <meshBasicMaterial 
            color="#FFFFFF"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
          <mesh position={[0, 0, 0.01]}>
            <textGeometry args={["IA integrada ao seu processo", { size: 0.2, height: 0.01 }]} />
            <meshStandardMaterial 
              color="#FFFFFF"
              emissive="#C9D921"
              emissiveIntensity={0.5}
            />
          </mesh>
        </mesh>
      </group>
    </>
  );
};

export default ProcessScene;
