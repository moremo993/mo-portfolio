import { useNarrativeStore, type InteractionMode } from '@/stores/narrativeStore';

export const useInteractionMode = () => {
  const interactionMode = useNarrativeStore((state) => state.interactionMode);
  const setInteractionMode = useNarrativeStore((state) => state.setInteractionMode);

  const setMode = (mode: InteractionMode) => {
    setInteractionMode(mode);
  };

  const isMode = (mode: InteractionMode) => {
    return interactionMode === mode;
  };

  return {
    mode: interactionMode,
    setMode,
    isMode,
    isIdle: interactionMode === 'idle',
    isExploring: interactionMode === 'exploring',
    isFocused: interactionMode === 'focused',
    isTransitioning: interactionMode === 'transitioning',
  };
};
