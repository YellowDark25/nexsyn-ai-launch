
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

// Process item that flows through the pipeline
const ProcessItem = ({ 
  position, 
  stage, 
  delay = 0
}: { 
  position: [number, number, number]; 
  stage: number;
  delay?: number;
}) => {
  const itemRef = useRef<THREE.Group>(null);
  const startTime = useRef<number>(Date.now() + delay * 1000);
  
  // Animation for the process item
  useFrame(({ clock }) => {
    if (!itemRef.current) return;
    
    const elapsed = (Date.now() - startTime.current) / 1000;
    const cyclePosition = (elapsed % 10) / 10; // 10 second cycle
    
    // Move along the pipeline
    itemRef.current.position.x = THREE.MathUtils.lerp(-3, 3, cyclePosition);
    
    // Transform at specific points in the pipeline
    if (cyclePosition < 0.33) {
      // Paper stage
      itemRef.current.scale.set(0.4, 0.6, 0.02); // Flat like paper
    } else if (cyclePosition < 0.66) {
      // Data cube stage
      itemRef.current.scale.set(0.3, 0.3, 0.3); // Cube-like
    } else {
      // Automation/action stage
      const pulse = Math.sin(elapsed * 8) * 0.05 + 1;
      itemRef.current.scale.set(0.3 * pulse, 0.3 * pulse, 0.3 * pulse);
    }
    
    // Rotate when transforming
    itemRef.current.rotation.y += 0.01;
    if (cyclePosition > 0.32 && cyclePosition < 0.34) {
      itemRef.current.rotation.y += 0.1; // Fast spin during first transformation
    }
    if (cyclePosition > 0.65 && cyclePosition < 0.67) {
      itemRef.current.rotation.y += 0.1; // Fast spin during second transformation
    }
  });
  
  return (
    <group ref={itemRef} position={position}>
      {/* The object changes shape throughout the pipeline */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={stage === 0 ? "#FFFFFF" : stage === 1 ? "#C9D921" : "#FF6F00"}
          metalness={stage === 0 ? 0.1 : stage === 1 ? 0.5 : 0.7}
          roughness={stage === 0 ? 0.8 : stage === 1 ? 0.4 : 0.2}
          emissive={stage === 0 ? "#FFFFFF" : stage === 1 ? "#C9D921" : "#FF6F00"}
          emissiveIntensity={stage === 0 ? 0.1 : stage === 1 ? 0.3 : 0.5}
        />
      </mesh>
    </group>
  );
};

// Connection line between stages
const ConnectionFlow = ({ 
  start = [-2, 0, 0], 
  end = [2, 0, 0], 
  color = "#FF6F00" 
}: { 
  start?: [number, number, number]; 
  end?: [number, number, number]; 
  color?: string;
}) => {
  const lineRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    
    // Animate the flow texture
    if (lineRef.current.material instanceof THREE.MeshStandardMaterial) {
      lineRef.current.material.emissiveIntensity = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 0.3;
    }
  });
  
  // Calculate direction vector
  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  );
  const length = direction.length();
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ];
  
  // Rotate to align with direction
  const arrowHelper = new THREE.ArrowHelper(
    direction.normalize(),
    new THREE.Vector3(...start),
    length
  );
  const rotation = new THREE.Euler().setFromQuaternion(arrowHelper.quaternion);
  
  return (
    <mesh 
      ref={lineRef} 
      position={midpoint} 
      rotation={rotation}
    >
      <cylinderGeometry args={[0.03, 0.03, length, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

// Label for each stage
const StageLabel = ({ 
  text, 
  position, 
  color = "#FFFFFF" 
}: {
  text: string;
  position: [number, number, number];
  color?: string;
}) => {
  return (
    <Text
      position={position}
      color={color}
      fontSize={0.15}
      maxWidth={1}
      textAlign="center"
      anchorY="top"
    >
      {text}
    </Text>
  );
};

// Main transformation pipeline component
const TransformationPipeline: React.FC = () => {
  // Define the stages in the pipeline
  const stages = [
    { position: [-2, 0, 0], label: "Papel" },
    { position: [0, 0, 0], label: "Dados" },
    { position: [2, 0, 0], label: "Automação" }
  ];
  
  return (
    <group position={[0, 0, 0]}>
      {/* Stage labels */}
      {stages.map((stage, index) => (
        <StageLabel 
          key={`label-${index}`}
          text={stage.label}
          position={[stage.position[0], stage.position[1] - 0.5, stage.position[2]]}
          color={index === 0 ? "#FFFFFF" : index === 1 ? "#C9D921" : "#FF6F00"}
        />
      ))}
      
      {/* Connection flows between stages */}
      <ConnectionFlow 
        start={[-2, 0, 0]} 
        end={[0, 0, 0]} 
        color="#C9D921" 
      />
      <ConnectionFlow 
        start={[0, 0, 0]} 
        end={[2, 0, 0]} 
        color="#FF6F00" 
      />
      
      {/* Process items flowing through the pipeline */}
      <ProcessItem position={[-2, 0, 0]} stage={0} delay={0} />
      <ProcessItem position={[-2, 0, 0]} stage={0} delay={3.3} />
      <ProcessItem position={[-2, 0, 0]} stage={0} delay={6.6} />
    </group>
  );
};

export default TransformationPipeline;
