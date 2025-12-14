import { useEffect } from 'react';
import { useStoryEngineStore } from '../store/storyEngineStore';

export const useStoryEngine = () => {
  const store = useStoryEngineStore();

  // Animation control helpers
  const startAnimation = () => {
    store.setAnimationState({ isAnimating: true });
  };

  const stopAnimation = () => {
    store.setAnimationState({ isAnimating: false });
  };

  const setAnimationSpeed = (speed: number) => {
    store.setAnimationState({ animationSpeed: Math.max(0.1, Math.min(3, speed)) });
  };

  // Segment control helpers
  const activateSegment = (segmentId: string) => {
    store.activateSegment(segmentId);
  };

  const setSegmentActive = (segmentId: string, active: boolean) => {
    store.setSegmentProps(segmentId, { active });
  };

  // Lighting control helpers
  const setLightingPreset = (preset: 'default' | 'dramatic' | 'subtle' | 'bright') => {
    const presets = {
      default: {
        keyLightIntensity: 0.8,
        rimLightIntensity: 0.6,
        ambientIntensity: 0.3,
        keyLightColor: '#ffffff',
        rimLightColor: '#4f9eff',
        ambientColor: '#404040',
      },
      dramatic: {
        keyLightIntensity: 1.2,
        rimLightIntensity: 1.0,
        ambientIntensity: 0.2,
        keyLightColor: '#ffffff',
        rimLightColor: '#ff6b6b',
        ambientColor: '#202020',
      },
      subtle: {
        keyLightIntensity: 0.6,
        rimLightIntensity: 0.4,
        ambientIntensity: 0.4,
        keyLightColor: '#ffffff',
        rimLightColor: '#9eff4f',
        ambientColor: '#505050',
      },
      bright: {
        keyLightIntensity: 1.0,
        rimLightIntensity: 0.8,
        ambientIntensity: 0.6,
        keyLightColor: '#ffffff',
        rimLightColor: '#4f9eff',
        ambientColor: '#606060',
      },
    };

    store.setLightingProps(presets[preset]);
  };

  // Scene configuration helpers
  const setSeparationDistance = (distance: number) => {
    store.setSceneConfig({ separationDistance: Math.max(1, Math.min(5, distance)) });
  };

  const setRingSpacing = (spacing: number) => {
    store.setSceneConfig({ ringSpacing: Math.max(0.1, Math.min(2, spacing)) });
  };

  // Keyboard controls for interaction
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          const newState = !store.animationState.isAnimating;
          store.setAnimationState({ isAnimating: newState });
          break;
        case 'r':
          store.setAnimationState({ autoRotate: !store.animationState.autoRotate });
          break;
        case '1':
          store.activateSegment('strategy');
          break;
        case '2':
          store.activateSegment('storytelling');
          break;
        case '3':
          store.activateSegment('content');
          break;
        case '4':
          store.activateSegment('analytics');
          break;
        case '5':
          store.activateSegment('community');
          break;
        case 'escape':
          store.setAnimationState({ currentActiveSegment: null });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [store]);

  return {
    // State
    ...store,
    
    // Animation controls
    startAnimation,
    stopAnimation,
    setAnimationSpeed,
    
    // Segment controls
    activateSegment,
    setSegmentActive,
    
    // Lighting controls
    setLightingPreset,
    
    // Scene configuration
    setSeparationDistance,
    setRingSpacing,
    
    // Utility
    reset: store.resetToDefault,
  };
};