
import React from "react";
import { OrbitControls } from "@react-three/drei";
import Gear from "./Gear";
import FlowLine from "./FlowLine";

// Main scene component
const ProcessScene = () => {
  // Define gear positions and properties
  const gears = [
    { position: [-1.5, 0, 0], rotation: [0, 0, 0], scale: 1, speed: 0.8, color: "#888888", delay: 0 },
    { position: [0, 0, 0], rotation: [0, 0, 0], scale: 0.8, speed: 0.5, color: "#999999", delay: 2 },
    { position: [1.5, 0, 0], rotation: [0, 0, 0], scale: 1.2, speed: 0.2, color: "#777777", delay: 1 },
  ];
  
  // Define flow connections
  const flows = [
    { start: [-1.5, 0, 0], end: [0, 0, 0], color: "#FF6F00", pulseSpeed: 1.5, hasBottleneck: false },
    { start: [0, 0, 0], end: [1.5, 0, 0], color: "#C9D921", pulseSpeed: 0.8, hasBottleneck: true },
  ];

  return (
    <>
      <color attach="background" args={["#1A1F2C"]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, -5]} intensity={1} />
      
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
      
      {/* Add limited orbit controls */}
      <OrbitControls 
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </>
  );
};

export default ProcessScene;
