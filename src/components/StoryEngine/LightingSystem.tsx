import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStoryEngineStore } from '../../store/storyEngineStore';
import * as THREE from 'three';

interface LightingSystemProps {
  className?: string;
}

export const LightingSystem: React.FC<LightingSystemProps> = ({ className }) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  
  const { lighting, animationState, setLightingProps } = useStoryEngineStore();

  // Update lighting intensities based on animation state and active segments
  useFrame(() => {
    const { keyLightIntensity, rimLightIntensity, ambientIntensity } = lighting;
    
    // Dynamic intensity modulation based on animation
    if (animationState.isAnimating) {
      const time = performance.now() * 0.001 * animationState.animationSpeed;
      
      // Subtle breathing effect for ambient light
      const ambientModulation = 1 + Math.sin(time * 0.5) * 0.1;
      
      // Key light intensity varies slightly
      const keyModulation = 1 + Math.sin(time * 0.8) * 0.05;
      
      // Apply modulations
      if (keyLightRef.current) {
        keyLightRef.current.intensity = keyLightIntensity * keyModulation;
      }
      if (ambientLightRef.current) {
        ambientLightRef.current.intensity = ambientIntensity * ambientModulation;
      }
    } else {
      // Set static intensities when not animating
      if (keyLightRef.current) keyLightRef.current.intensity = keyLightIntensity;
      if (rimLightRef.current) rimLightRef.current.intensity = rimLightIntensity;
      if (ambientLightRef.current) ambientLightRef.current.intensity = ambientIntensity;
    }
  });

  // Calculate dynamic light positions based on scene state
  const lightPositions = {
    keyLight: { position: [5, 5, 5], target: [0, 0, 0] },
    rimLight: { position: [-5, 3, -3], target: [0, 0, 0] },
  };

  return (
    <group>
      {/* Soft Key Light - primary illumination */}
      <directionalLight
        ref={keyLightRef}
        position={lightPositions.keyLight.position as [number, number, number]}
        target-position={lightPositions.keyLight.target as [number, number, number]}
        color={lighting.keyLightColor}
        intensity={lighting.keyLightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Rim Light - creates depth and highlights edges */}
      <directionalLight
        ref={rimLightRef}
        position={lightPositions.rimLight.position as [number, number, number]}
        target-position={lightPositions.rimLight.target as [number, number, number]}
        color={lighting.rimLightColor}
        intensity={lighting.rimLightIntensity}
        castShadow={false}
      />
      
      {/* Ambient Light - base illumination */}
      <ambientLight
        ref={ambientLightRef}
        color={lighting.ambientColor}
        intensity={lighting.ambientIntensity}
      />
      
      {/* Optional: Additional fill light for softer shadows */}
      <directionalLight
        position={[0, 2, 5]}
        color={lighting.keyLightColor}
        intensity={lighting.keyLightIntensity * 0.3}
        castShadow={false}
      />
      
      {/* Lighting state indicator (for debugging, hidden by default) */}
      <group visible={false}>
        <mesh position={lightPositions.keyLight.position as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={lighting.keyLightColor} />
        </mesh>
        <mesh position={lightPositions.rimLight.position as [number, number, number]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={lighting.rimLightColor} />
        </mesh>
      </group>
    </group>
  );
};

export default LightingSystem;