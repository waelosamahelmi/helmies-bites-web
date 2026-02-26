/**
 * SmoothScroll Component
 *
 * Wraps the application with Lenis smooth scrolling and integrates with GSAP ScrollTrigger.
 * Provides buttery smooth scrolling with configurable options.
 */

import { useEffect, useRef, useCallback } from 'react';
import { createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================================
   Type Definitions
   ============================================================================ */

/**
 * Lenis configuration options
 */
export interface SmoothScrollOptions {
  /**
   * Duration of smooth scroll in seconds
   * @default 1.2
   */
  duration?: number;

  /**
   * Easing function
   * @default (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
   */
  easing?: (t: number) => number;

  /**
   * Direction of scroll
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Smooth scroll behavior for mouse wheel
   * @default true
   */
  smoothWheel?: boolean;

  /**
   * Smooth scroll behavior for touch
   * @default true
   */
  smoothTouch?: boolean;

  /**
   * Multiplier for scroll speed
   * @default 1
   */
  multiplier?: number;

  /**
   * Enable infinite scrolling
   * @default false
   */
  infinite?: boolean;

  /**
   * Enable event listeners
   * @default true
   */
  eventListener?: boolean;

  /**
   * Content wrapper CSS class
   * @default 'lenis-content'
   */
  contentClass?: string;

  /**
   * Wrapper CSS class
   * @default 'lenis-wrapper'
   */
  wrapperClass?: string;

  /**
   * Auto resize on window resize
   * @default true
   */
  autoResize?: boolean;

  /**
   * Sync with GSAP ScrollTrigger
   * @default true
   */
  syncScrollTrigger?: boolean;
}

/**
 * Smooth scroll context value
 */
interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: ScrollToOptions) => void;
  raf: ReturnType<typeof requestAnimationFrame> | null;
}

/**
 * ScrollTo options for Lenis
 */
interface ScrollToOptions {
  offset?: number;
  lerp?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}

/* ============================================================================
   Context
   ============================================================================ */

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  raf: null,
});

/**
 * useSmoothScroll - Access the Lenis instance
 *
 * @returns Lenis instance and scroll controls
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { lenis, scrollTo } = useSmoothScroll();
 *
 *   const handleClick = () => {
 *     scrollTo('#section-id', { offset: 100 });
 *   };
 *
 *   return <button onClick={handleClick}>Scroll to section</button>;
 * }
 * ```
 */
export function useSmoothScroll(): SmoothScrollContextValue {
  return useContext(SmoothScrollContext);
}

/* ============================================================================
   Component Props
   ============================================================================ */

interface SmoothScrollProps {
  /**
   * Child components
   */
  children: React.ReactNode;

  /**
   * Lenis configuration options
   */
  options?: SmoothScrollOptions;

  /**
   * Callback when scroll position changes
   */
  onScroll?: ({ scroll, limit, velocity, direction, progress }: {
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    progress: number;
  }) => void;
}

/* ============================================================================
   Component Implementation
   ============================================================================ */

/**
 * SmoothScroll - Lenis smooth scroll wrapper component
 *
 * Wraps your app with smooth scrolling using Lenis and integrates with GSAP ScrollTrigger.
 *
 * @example
 * ```tsx
 * // In your App.tsx or main entry
 * function App() {
 *   return (
 *     <SmoothScroll options={{ duration: 1.5, multiplier: 0.8 }}>
 *       <YourContent />
 *     </SmoothScroll>
 *   );
 * }
 * ```
 */
export function SmoothScroll({
  children,
  options = {},
  onScroll,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
    infinite = false,
    contentClass = 'lenis-content',
    wrapperClass = 'lenis-wrapper',
    autoResize = true,
    syncScrollTrigger = true,
  } = options;

  // ScrollTo function
  const scrollTo = useCallback(
    (target: number | string | HTMLElement, scrollToOptions: ScrollToOptions = {}) => {
      if (!lenisRef.current) return;

      const { offset = 0, lerp, duration: scrollDuration, immediate, lock, force, onComplete } =
        scrollToOptions;

      lenisRef.current.scrollTo(target, {
        offset,
        lerp,
        duration: scrollDuration,
        immediate,
        lock,
        force,
        onComplete,
      });
    },
    []
  );

  // Initialize Lenis
  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Create Lenis instance
    const lenis = new Lenis({
      duration,
      easing,
      smoothWheel,
      infinite,
      content: contentRef.current,
      wrapper: wrapperRef.current,
      autoResize,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    if (syncScrollTrigger) {
      // Create a proxy for the scroll position
      lenis.on('scroll', ScrollTrigger.update);

      // Add ScrollTrigger's scroll position getter
      gsap.registerPlugin(ScrollTrigger);

      // Override ScrollTrigger's scroller proxy
      ScrollTrigger.scrollerProxy(wrapperRef.current, {
        scrollTop(value?: number) {
          if (typeof value !== 'undefined') {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
          };
        },
        pinType: wrapperRef.current.style.transform ? ('fixed' as const) : undefined,
      });
    }

    // Animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      if (syncScrollTrigger) {
        ScrollTrigger.update();
      }
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      if (syncScrollTrigger && wrapperRef.current) {
        ScrollTrigger.scrollerProxy(wrapperRef.current, undefined);
      }
    };
  }, [
    duration,
    easing,
    smoothWheel,
    infinite,
    autoResize,
    syncScrollTrigger,
  ]);

  // Handle scroll callback
  useEffect(() => {
    if (!lenisRef.current || !onScroll) return;

    const handleScroll = ({ scroll, limit, velocity, direction, progress }: {
      scroll: number;
      limit: number;
      velocity: number;
      direction: number;
      progress: number;
    }) => {
      onScroll({ scroll, limit, velocity, direction, progress });
    };

    lenisRef.current.on('scroll', handleScroll);

    return () => {
      lenisRef.current?.off('scroll', handleScroll);
    };
  }, [onScroll]);

  // Refresh ScrollTrigger when children change
  useEffect(() => {
    if (syncScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }, [children, syncScrollTrigger]);

  const contextValue: SmoothScrollContextValue = {
    lenis: lenisRef.current,
    scrollTo,
    raf: rafRef.current,
  };

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <div ref={wrapperRef} className={wrapperClass} data-lenis-wrapper>
        <div ref={contentRef} className={contentClass} data-lenis-content>
          {children}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
}

/* ============================================================================
   Utility Components
   ============================================================================ */

/**
 * SmoothScrollAnchor - Anchor link that works with Lenis
 *
 * @example
 * ```tsx
 * <SmoothScrollAnchor href="#section">
 *   Scroll to section
 * </SmoothScrollAnchor>
 * ```
 */
interface SmoothScrollAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Offset from target
   */
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

/**
 * useSmoothScrollAnchor - Hook for smooth scrolling to elements
 *
 * @returns Function to scroll to element
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const scrollToSelector = useSmoothScrollAnchor();
 *
 *   return (
 *     <button onClick={() => scrollToSelector('#section', { offset: 100 })}>
 *       Scroll
 *     </button>
 *   );
 * }
 * ```
 */
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

/* ============================================================================
   Export
   ============================================================================ */

export default SmoothScroll;
