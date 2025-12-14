import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { CoreRing } from './CoreRing';
import { RadialSegments } from './RadialSegments';
import { LightingSystem } from './LightingSystem';
import { useStoryEngineStore } from '../../store/storyEngineStore';

interface StoryEngineProps {
  className?: string;
  enableControls?: boolean;
  enableEnvironment?: boolean;
  showContactShadows?: boolean;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export const StoryEngine: React.FC<StoryEngineProps> = ({
  className,
  enableControls = true,
  enableEnvironment = true,
  showContactShadows = true,
  cameraPosition = [5, 3, 5],
  cameraFov = 50,
}) => {
  const { animationState } = useStoryEngineStore();
  
  // Memoize camera settings for performance
  const cameraSettings = useMemo(() => ({
    position: cameraPosition,
    fov: cameraFov,
    near: 0.1,
    far: 100,
  }), [cameraPosition, cameraFov]);

  // Loading fallback component
  const LoadingFallback = () => (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#404040" />
    </mesh>
  );

  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={cameraSettings}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Single scene root - all Story Engine components */}
        <Suspense fallback={<LoadingFallback />}>
          <LightingSystem />
          
          {/* Main Story Engine Group */}
          <group>
            <CoreRing />
            <RadialSegments />
          </group>
          
          {/* Environment and post-processing */}
          {enableEnvironment && (
            <Environment preset="city" environmentIntensity={0.3} />
          )}
          
          {showContactShadows && (
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
              far={4}
            />
          )}
          
          {/* Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={15}
              maxPolarAngle={Math.PI * 0.8}
              autoRotate={animationState.autoRotate}
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* HUD overlay for debugging (optional) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          borderRadius: '5px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 1000,
        }}>
          <div>Story Engine Status:</div>
          <div>Animating: {animationState.isAnimating ? 'Yes' : 'No'}</div>
          <div>Auto Rotate: {animationState.autoRotate ? 'Yes' : 'No'}</div>
          <div>Active Segment: {animationState.currentActiveSegment || 'None'}</div>
        </div>
      )}
    </div>
  );
};

export default StoryEngine;