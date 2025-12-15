import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroTypographyProps {
  headline: string;
  subline: string;
  timeline: gsap.core.Timeline | null;
  reducedMotion: boolean;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({
  headline,
  subline,
  timeline,
  reducedMotion,
}) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!headlineRef.current || !timeline) return;

    // Split headline into characters
    const chars = headline.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'hero-char';
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      return span;
    });

    charsRef.current = chars;
    headlineRef.current.innerHTML = '';
    chars.forEach((char) => headlineRef.current?.appendChild(char));

    if (reducedMotion) {
      // Simple fade for reduced motion
      timeline.to(chars, { opacity: 1, duration: 0.5 }, 0);
      timeline.to(sublineRef.current, { opacity: 1, duration: 0.5 }, 0);
    } else {
      // Phase 1: Assembly (0-2s) - Staggered character reveal
      timeline.to(
        chars,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: {
            amount: 1.2,
            from: 'start',
            ease: 'power2.out',
          },
          ease: 'back.out(1.7)',
        },
        0
      );

      // Phase 2: Disruption (2-3s) - Slight shake
      timeline.to(
        chars,
        {
          y: '+=5',
          duration: 0.15,
          stagger: 0.02,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        },
        2
      );

      // Phase 3: Resolve (3-4s) - Settle into place
      timeline.to(
        chars,
        {
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'elastic.out(1, 0.3)',
        },
        3
      );

      // Subline appears during resolve
      timeline.fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        3.2
      );
    }
  }, [headline, timeline, reducedMotion]);

  return (
    <div className="hero-typography">
      <h1 ref={headlineRef} className="hero-headline">
        {headline}
      </h1>
      <p ref={sublineRef} className="hero-subline" style={{ opacity: 0 }}>
        {subline}
      </p>
    </div>
  );
};
