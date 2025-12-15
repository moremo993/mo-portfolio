import React, { useEffect, useState } from 'react';
import { HeroCanvas } from './HeroCanvas';
import { HeroTypography } from './HeroTypography';
import { ScrollCue } from './ScrollCue';
import { useHeroTimeline } from './useHeroTimeline';

export interface HeroProps {
  headline: string;
  subline: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subline,
  autoPlay = true,
  onComplete,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { timeline, isComplete, play, pause, restart } = useHeroTimeline({
    autoPlay,
    reducedMotion,
    onComplete,
  });

  return (
    <section className="hero-section">
      <div className="hero-background">
        <HeroCanvas headline={headline} timeline={timeline} reducedMotion={reducedMotion} />
      </div>
      
      <div className="hero-content">
        <HeroTypography
          headline={headline}
          subline={subline}
          timeline={timeline}
          reducedMotion={reducedMotion}
        />
        
        <ScrollCue timeline={timeline} isComplete={isComplete} reducedMotion={reducedMotion} />
      </div>

      {/* Debug controls (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="hero-debug-controls">
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
          <button onClick={restart}>Restart</button>
        </div>
      )}
    </section>
  );
};
