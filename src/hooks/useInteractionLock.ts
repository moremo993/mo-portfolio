import { useCallback, useEffect } from 'react';
import { useNarrativeStore } from '@/stores/narrativeStore';

export const useInteractionLock = (lockId: string, lockReason?: string) => {
  const addLock = useNarrativeStore((state) => state.addLock);
  const removeLock = useNarrativeStore((state) => state.removeLock);
  const isLocked = useNarrativeStore((state) => state.isLocked());

  const acquireLock = useCallback(() => {
    addLock(lockId, lockReason);
  }, [lockId, lockReason, addLock]);

  const releaseLock = useCallback(() => {
    removeLock(lockId);
  }, [lockId, removeLock]);

  useEffect(() => {
    return () => {
      releaseLock();
    };
  }, [releaseLock]);

  return {
    acquireLock,
    releaseLock,
    isLocked,
  };
};
