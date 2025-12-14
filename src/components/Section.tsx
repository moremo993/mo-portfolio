'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNarrativeStore } from '@/stores/narrativeStore';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  onEnter?: () => void;
  onExit?: () => void;
}

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  onEnter,
  onExit,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const setCurrentSection = useNarrativeStore((state) => state.setCurrentSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection({
            id,
            title: title || id,
            description: subtitle || '',
            order: 0,
          });
          onEnter?.();

          // Animate section in
          if (ref.current) {
            gsap.fromTo(
              ref.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
          }
        } else {
          onExit?.();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [id, title, subtitle, setCurrentSection, onEnter, onExit]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full py-20 px-6 sm:px-8 md:px-12 lg:px-20 ${className}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {title && (
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg md:text-xl text-gray-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};
