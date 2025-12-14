import { create } from 'zustand';

export interface SegmentConfig {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  separationDistance: number;
  active: boolean;
  animationOffset: number;
}

export interface LightingConfig {
  keyLightIntensity: number;
  rimLightIntensity: number;
  ambientIntensity: number;
  keyLightColor: string;
  rimLightColor: string;
  ambientColor: string;
}

export interface StoryEngineState {
  // Core geometry props
  coreRing: {
    radius: number;
    thickness: number;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  };
  
  // Segment configurations
  segments: SegmentConfig[];
  
  // Lighting configuration
  lighting: LightingConfig;
  
  // Animation and interaction state
  animationState: {
    isAnimating: boolean;
    animationSpeed: number;
    autoRotate: boolean;
    currentActiveSegment: string | null;
  };
  
  // Scene configuration
  sceneConfig: {
    separationDistance: number;
    ringSpacing: number;
    segmentSpacing: number;
  };
  
  // Actions
  setCoreRingProps: (props: Partial<StoryEngineState['coreRing']>) => void;
  setSegmentProps: (segmentId: string, props: Partial<SegmentConfig>) => void;
  setLightingProps: (props: Partial<LightingConfig>) => void;
  setAnimationState: (props: Partial<StoryEngineState['animationState']>) => void;
  setSceneConfig: (props: Partial<StoryEngineState['sceneConfig']>) => void;
  activateSegment: (segmentId: string) => void;
  resetToDefault: () => void;
}

const createDefaultSegments = (): SegmentConfig[] => [
  {
    id: 'strategy',
    name: 'Strategy',
    position: [2, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    separationDistance: 2,
    active: false,
    animationOffset: 0,
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    position: [0.618, 1.902, 0], // Golden angle placement
    rotation: [0, 0, 0],
    scale: 1,
    separationDistance: 2,
    active: false,
    animationOffset: 0.5,
  },
  {
    id: 'content',
    name: 'Content',
    position: [-1.618, 1.175, 0], // Golden angle placement
    rotation: [0, 0, 0],
    scale: 1,
    separationDistance: 2,
    active: false,
    animationOffset: 1.0,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    position: [-1.618, -1.175, 0], // Golden angle placement
    rotation: [0, 0, 0],
    scale: 1,
    separationDistance: 2,
    active: false,
    animationOffset: 1.5,
  },
  {
    id: 'community',
    name: 'Community',
    position: [0.618, -1.902, 0], // Golden angle placement
    rotation: [0, 0, 0],
    scale: 1,
    separationDistance: 2,
    active: false,
    animationOffset: 2.0,
  },
];

const defaultState = {
  coreRing: {
    radius: 1.5,
    thickness: 0.2,
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
  },
  segments: createDefaultSegments(),
  lighting: {
    keyLightIntensity: 0.8,
    rimLightIntensity: 0.6,
    ambientIntensity: 0.3,
    keyLightColor: '#ffffff',
    rimLightColor: '#4f9eff',
    ambientColor: '#404040',
  },
  animationState: {
    isAnimating: false,
    animationSpeed: 1,
    autoRotate: true,
    currentActiveSegment: null,
  },
  sceneConfig: {
    separationDistance: 2,
    ringSpacing: 0.5,
    segmentSpacing: 0.3,
  },
};

export const useStoryEngineStore = create<StoryEngineState>((set, get) => ({
  ...defaultState,
  
  setCoreRingProps: (props) =>
    set((state) => ({
      coreRing: { ...state.coreRing, ...props },
    })),
    
  setSegmentProps: (segmentId, props) =>
    set((state) => ({
      segments: state.segments.map((segment) =>
        segment.id === segmentId ? { ...segment, ...props } : segment
      ),
    })),
    
  setLightingProps: (props) =>
    set((state) => ({
      lighting: { ...state.lighting, ...props },
    })),
    
  setAnimationState: (props) =>
    set((state) => ({
      animationState: { ...state.animationState, ...props },
    })),
    
  setSceneConfig: (props) =>
    set((state) => ({
      sceneConfig: { ...state.sceneConfig, ...props },
    })),
    
  activateSegment: (segmentId) =>
    set((state) => ({
      segments: state.segments.map((segment) => ({
        ...segment,
        active: segment.id === segmentId,
      })),
      animationState: {
        ...state.animationState,
        currentActiveSegment: segmentId,
      },
    })),
    
  resetToDefault: () =>
    set(() => ({
      ...defaultState,
    })),
}));