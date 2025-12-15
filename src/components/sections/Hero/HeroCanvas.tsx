import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { scanlineVertexShader, scanlineFragmentShader } from './shaders';

interface HeroTextProps {
  text: string;
  timeline: gsap.core.Timeline | null;
  reducedMotion: boolean;
}

const HeroText3D: React.FC<HeroTextProps> = ({ text, timeline, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      jitterAmount: { value: 0 },
      scanlineIntensity: { value: 0 },
      textColor: { value: new THREE.Color('#ffffff') },
    }),
    []
  );

  useEffect(() => {
    if (!timeline || !meshRef.current || !materialRef.current) return;

    const mesh = meshRef.current;
    const material = materialRef.current;

    // Phase 1: Assembly (0-2s)
    timeline.fromTo(
      mesh.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power2.out' },
      0.3 // Start after typography begins
    );

    timeline.fromTo(
      mesh.rotation,
      { x: Math.PI / 4, y: Math.PI / 4 },
      { x: 0, y: 0, duration: 1.5, ease: 'power2.out' },
      0.3
    );

    // Phase 2: Disruption (2-3s)
    if (!reducedMotion) {
      timeline.to(
        uniforms.jitterAmount,
        { value: 0.02, duration: 0.5, ease: 'power2.in' },
        2
      );

      timeline.to(
        uniforms.scanlineIntensity,
        { value: 0.3, duration: 0.5, ease: 'power2.in' },
        2
      );
    }

    // Phase 3: Resolve (3-4s)
    timeline.to(
      uniforms.jitterAmount,
      { value: 0, duration: 1, ease: 'power2.out' },
      3
    );

    timeline.to(
      uniforms.scanlineIntensity,
      { value: 0, duration: 1, ease: 'power2.out' },
      3
    );

    timeline.to(
      mesh.position,
      { y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
      3
    );
  }, [timeline, uniforms, reducedMotion]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <Text
      ref={meshRef}
      fontSize={1.2}
      letterSpacing={0.02}
      position={[0, 0.1, 0]}
      anchorX="center"
      anchorY="middle"
    >
      {text}
      <shaderMaterial
        ref={materialRef}
        vertexShader={scanlineVertexShader}
        fragmentShader={scanlineFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </Text>
  );
};

interface HeroCanvasProps {
  headline: string;
  timeline: gsap.core.Timeline | null;
  reducedMotion: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ headline, timeline, reducedMotion }) => {
  return (
    <div className="hero-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <HeroText3D text={headline} timeline={timeline} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
