import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface HeroTimelineControls {
  timeline: gsap.core.Timeline | null;
  isComplete: boolean;
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (time: number) => void;
}

interface UseHeroTimelineOptions {
  autoPlay?: boolean;
  reducedMotion?: boolean;
  onComplete?: () => void;
}

export const useHeroTimeline = (options: UseHeroTimelineOptions = {}): HeroTimelineControls => {
  const { autoPlay = true, reducedMotion = false, onComplete } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Create the master timeline
    const tl = gsap.timeline({
      paused: !autoPlay,
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    timelineRef.current = tl;

    // If reduced motion, skip to end immediately
    if (reducedMotion && autoPlay) {
      setTimeout(() => {
        tl.progress(1);
        setIsComplete(true);
      }, 100);
    }

    return () => {
      tl.kill();
    };
  }, [autoPlay, reducedMotion, onComplete]);

  const play = () => {
    timelineRef.current?.play();
  };

  const pause = () => {
    timelineRef.current?.pause();
  };

  const restart = () => {
    setIsComplete(false);
    timelineRef.current?.restart();
  };

  const seek = (time: number) => {
    timelineRef.current?.seek(time);
  };

  return {
    timeline: timelineRef.current,
    isComplete,
    play,
    pause,
    restart,
    seek,
  };
};
