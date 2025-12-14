import Lenis from 'lenis';

let lenis: Lenis | null = null;
let animationFrameId: number | null = null;

export const initLenis = (): Lenis => {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => {
        // Custom easing function
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
    });
  }

  return lenis;
};

export const startLenis = (): void => {
  if (!lenis) {
    initLenis();
  }

  const animate = (time: number) => {
    lenis?.raf(time);
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);
};

export const stopLenis = (): void => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

export const getLenis = (): Lenis | null => {
  return lenis;
};

export const destroyLenis = (): void => {
  stopLenis();
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

export const scrollToElement = (selector: string, options?: { offset?: number }): void => {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement && lenis) {
    lenis.scrollTo(element, {
      offset: options?.offset || 0,
    });
  }
};

export const scrollToPosition = (position: number): void => {
  if (lenis) {
    lenis.scrollTo(position);
  }
};
