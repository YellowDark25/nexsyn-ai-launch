
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
// Import BufferGeometryUtils correctly
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Component for creating a gear with specified properties
const Gear = ({ position, rotation, scale, speed, color = "#888888", delay = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const teethCount = Math.floor(Math.random() * 8) + 8; // 8 to 16 teeth
  const innerRadius = 0.5;
  const outerRadius = 1;
  const thickness = 0.2;
  
  // Create gear geometry
  const gearGeometry = useMemo(() => {
    const baseGeometry = new THREE.CylinderGeometry(innerRadius, innerRadius, thickness, 32);
    
    // Create geometries array for merging
    const geometries = [baseGeometry];
    
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
    // Cast all geometries to BufferGeometry to satisfy TypeScript
    return mergeGeometries(
      geometries.map(geo => geo instanceof THREE.BufferGeometry ? geo : geo.clone())
    );
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
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={typeof scale === 'number' ? new THREE.Vector3(scale, scale, scale) : new THREE.Vector3(...scale)}
      castShadow
      receiveShadow
    />
  );
};

// Component for flow lines between gears
const FlowLine = ({ start, end, color, pulseSpeed = 1, hasBottleneck = false }) => {
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

// Main scene component
const ProcessScene = () => {
  // Define gear positions and properties
  const gears = [
    { position: [-1.5, 0, 0], rotation: [0, 0, 0], scale: 1, speed: 0.8, color: "#888888", delay: 0 },
    { position: [0, 0, 0], rotation: [0, 0, 0], scale: 0.8, speed: 0.5, color: "#999999", delay: 2 },
    { position: [1.5, 0, 0], rotation: [0, 0, 0], scale: 1.2, speed: 0.2, color: "#777777", delay: 1 },
    { position: [-1, 1.2, 0.5], rotation: [Math.PI/2, 0, 0], scale: 0.7, speed: 0.9, color: "#888888", delay: 3 },
    { position: [0.8, -1, -0.3], rotation: [Math.PI/4, 0, Math.PI/4], scale: 0.9, speed: 0.1, color: "#999999", delay: 2 },
  ];
  
  // Define flow connections
  const flows = [
    { start: [-1.5, 0, 0], end: [0, 0, 0], color: "#FF6F00", pulseSpeed: 1.5, hasBottleneck: false },
    { start: [0, 0, 0], end: [1.5, 0, 0], color: "#C9D921", pulseSpeed: 0.8, hasBottleneck: true },
    { start: [-1.5, 0, 0], end: [-1, 1.2, 0.5], color: "#FF6F00", pulseSpeed: 2, hasBottleneck: false },
    { start: [-1, 1.2, 0.5], end: [0.8, -1, -0.3], color: "#C9D921", pulseSpeed: 1.2, hasBottleneck: true },
    { start: [0.8, -1, -0.3], end: [1.5, 0, 0], color: "#FF6F00", pulseSpeed: 0.7, hasBottleneck: false },
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
          position={gear.position}
          rotation={gear.rotation}
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
          start={flow.start}
          end={flow.end}
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
      
      {/* Post processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
};

// Main component to be exported
const ThreeScene = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div 
      className={`w-full h-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: "400px" }}
    >
      <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }}>
        <ProcessScene />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
