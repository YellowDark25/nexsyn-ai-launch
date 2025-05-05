
import React from "react";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";
import Gear from "./Gear";
import FlowLine from "./FlowLine";

// Main scene component
const ProcessScene = () => {
  // Define gear positions and properties
  const gears = [
    { position: [-1.5, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 1, speed: 0.8, color: "#C9D921", delay: 0 },
    { position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.8, speed: 0.5, color: "#FF6F00", delay: 2 },
    { position: [1.5, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 1.2, speed: 0.2, color: "#C9D921", delay: 1 },
  ];
  
  // Define flow connections
  const flows = [
    { start: [-1.5, 0, 0], end: [0, 0, 0], color: "#FF6F00", pulseSpeed: 1.5, hasBottleneck: false },
    { start: [0, 0, 0], end: [1.5, 0, 0], color: "#C9D921", pulseSpeed: 0.8, hasBottleneck: true },
  ];

  return (
    <>
      {/* Scene background */}
      <color attach="background" args={["#1A1F2C"]} />
      
      {/* Camera setup with better positioning */}
      <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={50} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, -3, 0]} intensity={0.2} color="#C9D921" />
      
      {/* Helper grid for development reference */}
      <Grid 
        infiniteGrid 
        cellSize={0.5} 
        cellThickness={0.5} 
        sectionSize={2} 
        sectionThickness={1} 
        fadeDistance={10}
        fadeStrength={1.5}
        cellColor="#C9D92130"
        sectionColor="#FF6F0030"
      />
      
      {/* Render all gears */}
      {gears.map((gear, index) => (
        <Gear 
          key={index}
          position={gear.position as [number, number, number]}
          rotation={gear.rotation as [number, number, number]}
          scale={gear.scale}
          speed={gear.speed}
          color={gear.color}
          delay={gear.delay}
        />
      ))}
      
      {/* Render all flow lines */}
      {flows.map((flow, index) => (
        <FlowLine 
          key={index}
          start={flow.start as [number, number, number]}
          end={flow.end as [number, number, number]}
          color={flow.color}
          pulseSpeed={flow.pulseSpeed}
          hasBottleneck={flow.hasBottleneck}
        />
      ))}
      
      {/* Add orbit controls with limitations */}
      <OrbitControls 
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        enablePan={false}
      />
    </>
  );
};

export default ProcessScene;
