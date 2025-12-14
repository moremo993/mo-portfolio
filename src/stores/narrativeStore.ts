import { create } from 'zustand';

export type InteractionMode = 'idle' | 'exploring' | 'focused' | 'transitioning';

export interface NarrativeSection {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface InteractionLock {
  locked: boolean;
  reason?: string;
  timestamp?: number;
}

interface NarrativeStore {
  // Narrative section state
  currentSection: NarrativeSection | null;
  previousSection: NarrativeSection | null;
  sections: NarrativeSection[];
  setSections: (sections: NarrativeSection[]) => void;
  setCurrentSection: (section: NarrativeSection | null) => void;

  // Interaction mode state
  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;

  // Interaction locks
  interactionLocks: Map<string, InteractionLock>;
  addLock: (lockId: string, reason?: string) => void;
  removeLock: (lockId: string) => void;
  isLocked: () => boolean;

  // Reset state
  reset: () => void;
}

const initialState = {
  currentSection: null,
  previousSection: null,
  sections: [],
  interactionMode: 'idle' as InteractionMode,
  interactionLocks: new Map<string, InteractionLock>(),
};

export const useNarrativeStore = create<NarrativeStore>((set, get) => ({
  ...initialState,

  setSections: (sections: NarrativeSection[]) => {
    set({ sections });
  },

  setCurrentSection: (section: NarrativeSection | null) => {
    const { currentSection } = get();
    set({
      previousSection: currentSection,
      currentSection: section,
    });
  },

  setInteractionMode: (mode: InteractionMode) => {
    set({ interactionMode: mode });
  },

  addLock: (lockId: string, reason?: string) => {
    set((state) => {
      const newLocks = new Map(state.interactionLocks);
      newLocks.set(lockId, {
        locked: true,
        reason,
        timestamp: Date.now(),
      });
      return { interactionLocks: newLocks };
    });
  },

  removeLock: (lockId: string) => {
    set((state) => {
      const newLocks = new Map(state.interactionLocks);
      newLocks.delete(lockId);
      return { interactionLocks: newLocks };
    });
  },

  isLocked: () => {
    const { interactionLocks } = get();
    return interactionLocks.size > 0;
  },

  reset: () => {
    set(initialState);
  },
}));
