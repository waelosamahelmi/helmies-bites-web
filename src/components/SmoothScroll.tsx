/**
 * SmoothScroll Component
 *
 * Provides smooth scrolling using Lenis with GSAP ScrollTrigger integration.
 * Simplified version that works directly with document body.
 */

import { useEffect, useRef, useCallback } from 'react';
import { createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================================
   Type Definitions
   ============================================================================ */

export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  multiplier?: number;
  infinite?: boolean;
}

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
}

interface ScrollToOptions {
  offset?: number;
  lerp?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

/* ============================================================================
   Context
   ============================================================================ */

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}

/* ============================================================================
   Component Props
   ============================================================================ */

interface SmoothScrollProps {
  children: React.ReactNode;
  options?: SmoothScrollOptions;
  onScroll?: (data: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => void;
}

/* ============================================================================
   Component Implementation
   ============================================================================ */

export function SmoothScroll({
  children,
  options = {},
  onScroll,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
    infinite = false,
  } = options;

  // ScrollTo function
  const scrollTo = useCallback(
    (target: number | string | HTMLElement, scrollToOptions: ScrollToOptions = {}) => {
      if (!lenisRef.current) return;

      const { offset = 0, lerp, duration: scrollDuration, immediate, lock, onComplete } = scrollToOptions;

      lenisRef.current.scrollTo(target, {
        offset,
        lerp,
        duration: scrollDuration,
        immediate,
        lock,
        onComplete,
      });
    },
    []
  );

  // Initialize Lenis
  useEffect(() => {
    // Create Lenis instance - use document.documentElement as wrapper
    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      infinite,
      autoResize: true,
      // Don't set content/wrapper - let Lenis use document
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
    };
  }, [duration, easing, smoothWheel, infinite]);

  // Handle scroll callback
  useEffect(() => {
    if (!lenisRef.current || !onScroll) return;

    const handleScroll = (data: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => {
      onScroll(data);
    };

    lenisRef.current.on('scroll', handleScroll);

    return () => {
      lenisRef.current?.off('scroll', handleScroll);
    };
  }, [onScroll]);

  // Refresh ScrollTrigger when children change
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [children]);

  const contextValue: SmoothScrollContextValue = {
    lenis: lenisRef.current,
    scrollTo,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/* ============================================================================
   Utility Components
   ============================================================================ */

interface SmoothScrollAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  offset?: number;
}

export function SmoothScrollAnchor({
  href = '#',
  offset = 0,
  onClick,
  children,
  ...props
}: SmoothScrollAnchorProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      scrollTo(targetElement as HTMLElement, { offset });
    }

    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function useSmoothScrollAnchor() {
  const { scrollTo } = useSmoothScroll();

  const scrollToSelector = useCallback(
    (selector: string, options: ScrollToOptions = {}) => {
      const targetElement =
        selector.startsWith('#')
          ? document.getElementById(selector.slice(1))
          : document.querySelector(selector);

      if (targetElement) {
        scrollTo(targetElement as HTMLElement, options);
      }
    },
    [scrollTo]
  );

  return scrollToSelector;
}

export default SmoothScroll;
