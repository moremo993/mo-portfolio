'use client';

import React from 'react';

interface HTMLOverlayProps {
  children?: React.ReactNode;
  className?: string;
}

export const HTMLOverlay: React.FC<HTMLOverlayProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`html-overlay ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
};
