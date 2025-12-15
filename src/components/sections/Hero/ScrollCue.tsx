import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollCueProps {
  timeline: gsap.core.Timeline | null;
  isComplete: boolean;
  reducedMotion: boolean;
}

export const ScrollCue: React.FC<ScrollCueProps> = ({ timeline, isComplete, reducedMotion }) => {
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cueRef.current || !timeline) return;

    // Appear after resolve phase completes
    timeline.fromTo(
      cueRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      3.8
    );
  }, [timeline]);

  useEffect(() => {
    if (!cueRef.current || !isComplete || reducedMotion) return;

    // Gentle bounce animation - only after timeline completes, not infinite
    const bounce = gsap.to(cueRef.current, {
      y: 10,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 3, // Limited repeats instead of infinite
    });

    return () => {
      bounce.kill();
    };
  }, [isComplete, reducedMotion]);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={cueRef} className="scroll-cue" onClick={handleClick}>
      <div className="scroll-cue-text">Scroll to explore</div>
      <div className="scroll-cue-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
