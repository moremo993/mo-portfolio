import { useEffect } from 'react';
import { useNarrativeStore } from '@/stores/narrativeStore';

interface UseSectionOptions {
  onEnter?: () => void;
  onExit?: () => void;
}

export const useSection = (sectionId: string, options?: UseSectionOptions) => {
  const currentSection = useNarrativeStore((state) => state.currentSection);
  const setCurrentSection = useNarrativeStore((state) => state.setCurrentSection);

  useEffect(() => {
    if (currentSection?.id === sectionId) {
      options?.onEnter?.();
    } else {
      options?.onExit?.();
    }
  }, [currentSection?.id, sectionId, options]);

  const isActive = currentSection?.id === sectionId;

  return {
    isActive,
    setCurrentSection,
  };
};
