
import React from "react";
import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";
import Gear from "./Gear";
import FlowLine from "./FlowLine";

// Main scene component
const ProcessScene = () => {
  // Define gear positions and properties
  const gears = [
    { position: [-1.8, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 1, speed: 0.8, color: "#C9D921", delay: 0 },
    { position: [0, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.8, speed: -0.6, color: "#FF6F00", delay: 2 },
    { position: [1.8, 0, 0], rotation: [Math.PI / 2, 0, 0], scale: 1.2, speed: 0.3, color: "#C9D921", delay: 1 },
    { position: [0, -1.5, 0], rotation: [Math.PI / 2, 0, 0], scale: 0.7, speed: 0.5, color: "#FF6F00", delay: 3 },
  ];
  
  // Define flow connections
  const flows = [
    { start: [-1.8, 0, 0], end: [0, 0, 0], color: "#FF6F00", pulseSpeed: 1.5, hasBottleneck: false },
    { start: [0, 0, 0], end: [1.8, 0, 0], color: "#C9D921", pulseSpeed: 0.8, hasBottleneck: true },
    { start: [0, 0, 0], end: [0, -1.5, 0], color: "#FF6F00", pulseSpeed: 1.2, hasBottleneck: false },
  ];

  return (
    <>
      {/* Scene background */}
      <color attach="background" args={["#1A1F2C"]} />
      
      {/* Camera setup with better positioning */}
      <PerspectiveCamera makeDefault position={[0, 2, 4.5]} fov={45} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, -3, 0]} intensity={0.2} color="#C9D921" />
      <pointLight position={[2, 1, 1]} intensity={0.3} color="#FF6F00" />
      
      {/* Helper grid for visual reference */}
      <Grid 
        infiniteGrid 
        cellSize={0.5} 
        cellThickness={0.5} 
        sectionSize={2} 
        sectionThickness={1} 
        fadeDistance={12}
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
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export default ProcessScene;
