import * as THREE from 'three';

// Three required materials: satin metal, emissive seams, neutral dark
export const STORY_ENGINE_MATERIALS = {
  satinMetal: new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1,
  }),
  
  emissiveSeams: new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    emissive: '#4f9eff',
    emissiveIntensity: 0.8,
    metalness: 0.8,
    roughness: 0.2,
  }),
  
  neutralDark: new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    metalness: 0.7,
    roughness: 0.8,
  }),
  
  // Dynamic materials that can be updated based on state
  createDynamicMaterials: (intensity: number = 1) => ({
    satinMetal: new THREE.MeshStandardMaterial({
      color: '#c0c0c0',
      metalness: 0.9,
      roughness: 0.1 + (1 - intensity) * 0.3, // Increase roughness when less active
      envMapIntensity: intensity,
    }),
    
    emissiveSeams: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      emissive: '#4f9eff',
      emissiveIntensity: 0.5 + intensity * 0.6, // Scale emissive with activity
      metalness: 0.8,
      roughness: 0.2,
    }),
    
    neutralDark: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      metalness: 0.7,
      roughness: 0.8,
    }),
  }),
};

// Utility function to create shared geometry instances for efficiency
export const createSharedGeometries = () => ({
  coreRing: new THREE.TorusGeometry(1.5, 0.2, 16, 32),
  segmentOuter: new THREE.RingGeometry(0.8, 1.2, 32),
  segmentInner: new THREE.RingGeometry(0.3, 0.5, 32),
  seamDetail: new THREE.BoxGeometry(0.1, 0.1, 0.05),
});

// Utility function to create efficient instanced meshes
export const createSegmentInstancedGeometry = (count: number) => {
  // Base geometry for segments that will be instanced
  return {
    geometry: new THREE.CylinderGeometry(1, 1, 0.1, 8),
    count,
  };
};