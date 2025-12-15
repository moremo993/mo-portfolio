import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStoryEngineStore } from '../../store/storyEngineStore';
import { STORY_ENGINE_MATERIALS, createSharedGeometries } from './materials';
import * as THREE from 'three';

interface RadialSegmentProps {
  config: {
    id: string;
    name: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    separationDistance: number;
    active: boolean;
    animationOffset: number;
  };
}

const RadialSegment: React.FC<RadialSegmentProps> = ({ config }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { lighting, animationState, setSegmentProps } = useStoryEngineStore();
  const { active, animationOffset } = config;

  // Create shared geometries for efficiency
  const geometries = useMemo(() => createSharedGeometries(), []);
  
  // Dynamic materials based on active state and lighting
  const materials = useMemo(() => {
    const { keyLightIntensity, ambientIntensity } = lighting;
    const baseIntensity = (keyLightIntensity + ambientIntensity) / 2;
    const intensity = active ? baseIntensity * 1.5 : baseIntensity * 0.7;
    
    return STORY_ENGINE_MATERIALS.createDynamicMaterials(intensity);
  }, [lighting, active]);

  // Animation logic
  useFrame((state) => {
    if (animationState.isAnimating && groupRef.current) {
      const time = state.clock.getElapsedTime() * animationState.animationSpeed;
      
      // Pulsing animation for active segments
      if (active) {
        const pulse = 1 + Math.sin(time * 2 + animationOffset) * 0.1;
        groupRef.current.scale.setScalar(pulse);
      }
      
      // Subtle hover animation
      const hover = Math.sin(time * 0.5 + animationOffset) * 0.02;
      groupRef.current.position.y = hover;
    }
  });

  // Calculate final position based on separation distance
  const finalPosition: [number, number, number] = useMemo(() => {
    const [x, y, z] = config.position;
    const distance = config.separationDistance;
    const direction = new THREE.Vector3(x, y, z).normalize();
    const targetPos = direction.multiplyScalar(distance);
    
    return [targetPos.x, targetPos.y, targetPos.z];
  }, [config.position, config.separationDistance]);

  return (
    <group
      ref={groupRef}
      position={finalPosition}
      rotation={config.rotation}
      scale={config.scale}
    >
      {/* Main segment geometry */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.15, 16]} />
        <primitive 
          object={materials.satinMetal} 
          attach="material" 
        />
      </mesh>
      
      {/* Emissive accent ring */}
      <mesh position={[0, 0.08, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <primitive 
          object={materials.emissiveSeams} 
          attach="material" 
        />
      </mesh>
      
      {/* Inner detail ring */}
      <mesh position={[0, 0.09, 0]}>
        <ringGeometry args={[0.3, 0.45, 16]} />
        <primitive 
          object={materials.neutralDark} 
          attach="material" 
        />
      </mesh>
      
      {/* Connection points to core (showing intentional negative space) */}
      {Array.from({ length: 3 }, (_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        const radius = 0.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh
            key={`connector-${i}`}
            position={[x, 0, z]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
            <primitive 
              object={materials.emissiveSeams} 
              attach="material" 
            />
          </mesh>
        );
      })}
      
      {/* Label placeholder (for future text integration) */}
      <mesh position={[0, -0.15, 0]} visible={false}>
        <planeGeometry args={[0.8, 0.3]} />
        <primitive 
          object={materials.neutralDark} 
          attach="material" 
        />
      </mesh>
    </group>
  );
};

interface RadialSegmentsProps {
  className?: string;
}

export const RadialSegments: React.FC<RadialSegmentsProps> = ({ className }) => {
  const { segments, sceneConfig } = useStoryEngineStore();
  
  // Update separation distance from scene config
  const segmentsWithDistance = useMemo(() => 
    segments.map(segment => ({
      ...segment,
      separationDistance: sceneConfig.separationDistance
    }))
  , [segments, sceneConfig.separationDistance]);

  return (
    <group>
      {segmentsWithDistance.map((segment) => (
        <RadialSegment key={segment.id} config={segment} />
      ))}
    </group>
  );
};

export default RadialSegments;