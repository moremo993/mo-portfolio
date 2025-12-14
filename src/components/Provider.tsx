'use client';

import React, { useEffect } from 'react';
import { initLenis, startLenis, destroyLenis } from '@/utils/lenis';

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();
    startLenis();

    // Handle window resize
    const handleResize = () => {
      lenis?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
};
