import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStoryEngineStore } from '../../store/storyEngineStore';
import { STORY_ENGINE_MATERIALS, createSharedGeometries } from './materials';
import * as THREE from 'three';

interface CoreRingProps {
  className?: string;
}

export const CoreRing: React.FC<CoreRingProps> = ({ className }) => {
  const { 
    coreRing, 
    lighting, 
    animationState,
    setCoreRingProps 
  } = useStoryEngineStore();

  // Create shared geometries for efficiency
  const geometries = useMemo(() => createSharedGeometries(), []);
  
  // Update material properties based on lighting state
  const dynamicMaterials = useMemo(() => {
    const { keyLightIntensity, ambientIntensity } = lighting;
    const activeIntensity = (keyLightIntensity + ambientIntensity) / 2;
    
    return {
      main: STORY_ENGINE_MATERIALS.createDynamicMaterials(activeIntensity).satinMetal,
      seam: STORY_ENGINE_MATERIALS.createDynamicMaterials(activeIntensity).emissiveSeams,
      dark: STORY_ENGINE_MATERIALS.neutralDark,
    };
  }, [lighting]);

  // Animation logic
  useFrame((state) => {
    if (!animationState.autoRotate) return;
    
    const time = state.clock.getElapsedTime() * animationState.animationSpeed * 0.1;
    
    // Subtle rotation animation
    setCoreRingProps({
      rotation: [0, time * 0.5, 0]
    });
  });

  // Create torus segments for engineered topology
  const ringSegments = useMemo(() => {
    const segments = [];
    const segmentCount = 8;
    
    for (let i = 0; i < segmentCount; i++) {
      const angle = (i / segmentCount) * Math.PI * 2;
      const x = Math.cos(angle) * coreRing.radius;
      const z = Math.sin(angle) * coreRing.radius;
      
      segments.push({
        position: [x, 0, z] as [number, number, number],
        rotation: [0, angle + Math.PI / 2, 0] as [number, number, number],
        index: i,
      });
    }
    
    return segments;
  }, [coreRing.radius]);

  return (
    <group 
      position={coreRing.position}
      rotation={coreRing.rotation}
      scale={coreRing.scale}
      className={className}
    >
      {/* Main core ring */}
      <mesh 
        geometry={geometries.coreRing}
        material={dynamicMaterials.main}
        castShadow
        receiveShadow
      />
      
      {/* Emissive seams for engineered topology */}
      {ringSegments.map((segment, index) => (
        <mesh
          key={`seam-${segment.index}`}
          position={segment.position}
          rotation={segment.rotation}
          geometry={geometries.seamDetail}
          material={dynamicMaterials.seam}
          castShadow
        />
      ))}
      
      {/* Strategic negative space indicators */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = coreRing.radius * 1.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh
            key={`negative-space-${i}`}
            position={[x, 0, z]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <primitive object={dynamicMaterials.dark} attach="material" />
          </mesh>
        );
      })}
      
      {/* Central hub */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
        <primitive object={dynamicMaterials.dark} attach="material" />
      </mesh>
    </group>
  );
};

export default CoreRing;