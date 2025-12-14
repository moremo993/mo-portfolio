'use client';

import { useEffect, useRef } from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNarrativeStore } from '@/stores/narrativeStore';

interface CanvasProps {
  children?: React.ReactNode;
}

export const Canvas: React.FC<CanvasProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionMode = useNarrativeStore((state) => state.interactionMode);

  useEffect(() => {
    // Disable default canvas interaction during transitions
    if (interactionMode === 'transitioning') {
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.pointerEvents = 'none';
      }
    }
  }, [interactionMode]);

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <ThreeCanvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <OrbitControls
          enabled={interactionMode === 'exploring'}
          autoRotate={interactionMode === 'idle'}
          autoRotateSpeed={2}
          enableZoom={false}
          enablePan={false}
        />

        {/* Default scene content */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {children}
      </ThreeCanvas>
    </div>
  );
};
