/**
 * useGsap Hook
 *
 * Custom React hook for managing GSAP animations with ScrollTrigger.
 * Provides setup, cleanup, and reveal functionality for scroll-based animations.
 */

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================================
   Type Definitions
   ============================================================================ */

/**
 * Animation function signature
 */
export type AnimationFunction = (
  element: Element | string,
  options?: any
) => gsap.core.Timeline | gsap.core.Tween;

/**
 * Reveal animation configuration
 */
export interface RevealConfig {
  /**
   * Animation function to use (e.g., fadeInUp, slideInLeft)
   */
  animation?: AnimationFunction;

  /**
   * Animation options passed to the animation function
   */
  animationOptions?: Record<string, unknown>;

  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: false | ScrollTrigger.Vars;

  /**
   * Start position for ScrollTrigger
   * @default "top 85%"
   */
  start?: string;

  /**
   * End position for ScrollTrigger
   */
  end?: string;

  /**
   * Toggle actions for ScrollTrigger
   * @default "play none none reverse"
   */
  toggleActions?: string;

  /**
   * Enable/disable scrub
   */
  scrub?: boolean | number;

  /**
   * Whether the animation should run immediately or wait for scroll
   * @default false
   */
  immediate?: boolean;
}

/**
 * GSAP context configuration
 */
export interface GsapConfig {
  /**
   * Refresh ScrollTrigger on window resize
   * @default true
   */
  refreshOnResize?: boolean;

  /**
   * Refresh ScrollTrigger on route changes
   * @default true
   */
  refreshOnRouteChange?: boolean;

  /**
   * Debug mode - logs animation events
   * @default false
   */
  debug?: boolean;

  /**
   * Default ScrollTrigger configuration
   */
  defaults?: ScrollTrigger.Vars;
}

/**
 * UseGsap return value
 */
export interface UseGsapReturn {
  /**
   * Refresh all ScrollTrigger instances
   */
  refresh: () => void;

  /**
   * Kill all animations and ScrollTriggers
   */
  kill: () => void;

  /**
   * Get all active ScrollTrigger instances
   */
  getScrollTriggers: () => ScrollTrigger[];

  /**
   * Scroll to a specific position
   */
  scrollTo: (y: number, smooth?: boolean) => void;

  /**
   * Scroll to an element
   */
  scrollToElement: (
    selector: string | Element,
    offset?: number,
    smooth?: boolean
  ) => void;
}

/* ============================================================================
   Hook Implementation
   ============================================================================ */

/**
 * useGsap - Main GSAP hook
 *
 * Provides GSAP functionality with automatic cleanup.
 *
 * @param config - Configuration options
 * @returns GSAP utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { refresh, kill } = useGsap({
 *     refreshOnResize: true,
 *     debug: false
 *   });
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useGsap(config: GsapConfig = {}): UseGsapReturn {
  const {
    refreshOnResize = true,
    debug = false,
  } = config;

  // Refresh ScrollTrigger
  const refresh = useCallback(() => {
    ScrollTrigger.refresh();
    if (debug) {
      console.log('[useGsap] ScrollTrigger refreshed');
    }
  }, [debug]);

  // Kill all animations
  const kill = useCallback(() => {
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    if (debug) {
      console.log('[useGsap] All animations killed');
    }
  }, [debug]);

  // Get all ScrollTriggers
  const getScrollTriggers = useCallback(() => {
    return ScrollTrigger.getAll();
  }, []);

  // Scroll to position
  const scrollTo = useCallback((y: number, smooth = true) => {
    window.scrollTo({
      top: y,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Scroll to element
  const scrollToElement = useCallback(
    (selector: string | Element, offset = 0, smooth = true) => {
      const element =
        typeof selector === 'string'
          ? document.querySelector(selector)
          : selector;

      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY + offset;
        scrollTo(y, smooth);
      } else if (debug) {
        console.warn(`[useGsap] Element not found: ${selector}`);
      }
    },
    [scrollTo, debug]
  );

  // Handle resize
  useEffect(() => {
    if (!refreshOnResize) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [refreshOnResize, refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill animations created in this component scope
      // Note: We don't kill all animations globally as other components might be using them
    };
  }, []);

  return {
    refresh,
    kill,
    getScrollTriggers,
    scrollTo,
    scrollToElement,
  };
}

/* ============================================================================
   useScrollReveal Hook
   ============================================================================ */

/**
 * useScrollReveal - Animate elements when they enter viewport
 *
 * @param selector - CSS selector or ref callback
 * @param config - Animation configuration
 * @returns Ref callback to attach to element
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const revealRef = useScrollReveal('fadeInUp', {
 *     y: 50,
 *     duration: 0.8
 *   });
 *
 *   return <div ref={revealRef}>Reveals on scroll</div>;
 * }
 * ```
 */
export function useScrollReveal(
  config: RevealConfig = {}
): (element: HTMLElement | null) => void {
  const {
    animation,
    animationOptions = {},
    scrollTrigger = {},
    start = 'top 85%',
    end = 'bottom 15%',
    toggleActions = 'play none none reverse',
    scrub = false,
    immediate = false,
  } = config;

  const elementRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  const refCallback = useCallback((element: HTMLElement | null) => {
    // Clean up previous animation
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Clean up previous ScrollTrigger
    if (elementRef.current) {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === elementRef.current) {
          st.kill();
        }
      });
    }

    elementRef.current = element;

    if (!element) return;

    // Default animation if none provided
    const defaultAnimation = (
      el: Element | string,
      opts: Record<string, unknown> = {}
    ) => {
      const { y = 50, opacity = 0, duration = 0.8, ease = 'power3.out' } = opts;
      return gsap.fromTo(
        el,
        { y: y as number, opacity: opacity as number },
        { y: 0, opacity: 1, duration: duration as number, ease: ease as string }
      );
    };

    const animationFn = animation || defaultAnimation;

    // Build ScrollTrigger config
    const stConfig: ScrollTrigger.Vars = {
      trigger: element,
      start,
      end,
      toggleActions,
      scrub,
      ...scrollTrigger,
    };

    // Apply animation
    if (immediate) {
      animationRef.current = animationFn(element, {
        ...animationOptions,
      }) as gsap.core.Timeline;
    } else {
      animationRef.current = animationFn(element, {
        ...animationOptions,
        scrollTrigger: stConfig,
      }) as gsap.core.Timeline;
    }
  }, [animation, animationOptions, scrollTrigger, start, end, toggleActions, scrub, immediate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (elementRef.current) {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === elementRef.current) {
            st.kill();
          }
        });
      }
    };
  }, []);

  return refCallback;
}

/* ============================================================================
   useGsapTimeline Hook
   ============================================================================ */

/**
 * Timeline options
 */
export interface TimelineOptions {
  /**
   * Auto-play timeline on mount
   * @default true
   */
  autoplay?: boolean;

  /**
   * Timeline defaults
   */
  defaults?: gsap.TimelineVars;

  /**
   * On complete callback
   */
  onComplete?: () => void;

  /**
   * On update callback
   */
  onUpdate?: () => void;

  /**
   * Dependencies to recreate timeline
   */
  deps?: unknown[];
}

/**
 * useGsapTimeline - Create and manage a GSAP timeline
 *
 * @param options - Timeline options
 * @returns Timeline object with controls
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { timeline, play, pause, reverse } = useGsapTimeline({
 *     autoplay: false
 *   });
 *
 *   useEffect(() => {
 *     if (timeline) {
 *       timeline.to('.box', { x: 100 })
 *              .to('.box', { y: 100 });
 *     }
 *   }, [timeline]);
 *
 *   return (
 *     <div>
 *       <button onClick={play}>Play</button>
 *       <button onClick={pause}>Pause</button>
 *       <button onClick={reverse}>Reverse</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useGsapTimeline(options: TimelineOptions = {}) {
  const {
    autoplay = true,
    defaults,
    onComplete,
    onUpdate,
    deps = [],
  } = options;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Create timeline
  useEffect(() => {
    const tl = gsap.timeline({
      defaults,
      onComplete,
      onUpdate,
      paused: !autoplay,
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  const play = useCallback(() => {
    timelineRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    timelineRef.current?.pause();
  }, []);

  const reverse = useCallback(() => {
    timelineRef.current?.reverse();
  }, []);

  const restart = useCallback(() => {
    timelineRef.current?.restart();
  }, []);

  const kill = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  return {
    timeline: timelineRef.current,
    play,
    pause,
    reverse,
    restart,
    kill,
    progress: useCallback((value: number) => {
      if (timelineRef.current) {
        timelineRef.current.progress(value);
      }
    }, []),
    time: useCallback((value: number) => {
      if (timelineRef.current) {
        timelineRef.current.time(value);
      }
    }, []),
  };
}

/* ============================================================================
   useGsapContext Hook
   ============================================================================ */

/**
 * useGsapContext - Create a scoped GSAP context for automatic cleanup
 *
 * This hook creates a GSAP context that automatically cleans up all
 * animations created within it when the component unmounts.
 *
 * @param callback - Function that creates animations
 * @param deps - Dependencies to recreate animations
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const scopeRef = useRef<HTMLDivElement>(null);
 *
 *   useGsapContext(() => {
 *     if (!scopeRef.current) return;
 *
 *     gsap.to('.box', { x: 100, duration: 1 });
 *     gsap.from('.text', { opacity: 0, y: 20 });
 *   }, [scopeRef]);
 *
 *   return <div ref={scopeRef}>...</div>;
 * }
 * ```
 */
export function useGsapContext(
  callback: () => void | (() => void),
  deps: unknown[] = []
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      const cleanup = callback();
      return cleanup;
    });

    return () => {
      contextRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}

/* ============================================================================
   useParallax Hook
   ============================================================================ */

/**
 * Parallax options
 */
export interface ParallaxOptions {
  /**
   * Parallax speed multiplier
   * @default 0.5
   */
  speed?: number;

  /**
   * Use scrub for smooth parallax
   * @default true
   */
  scrub?: boolean | number;

  /**
   * Direction of parallax
   * @default 'y'
   */
  direction?: 'x' | 'y';

  /**
   * Start position
   * @default 'top bottom'
   */
  start?: string;

  /**
   * End position
   * @default 'bottom top'
   */
  end?: string;
}

/**
 * useParallax - Apply parallax effect to an element
 *
 * @param options - Parallax configuration
 * @returns Ref callback to attach to element
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const parallaxRef = useParallax({
 *     speed: 0.5,
 *     scrub: true
 *   });
 *
 *   return (
 *     <div ref={parallaxRef} className="parallax-bg">
 *       Parallax content
 *     </div>
 *   );
 * }
 * ```
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    scrub = true,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const refCallback = useCallback((element: HTMLElement | null) => {
    // Clean up previous
    if (triggerRef.current) {
      triggerRef.current.kill();
      triggerRef.current = null;
    }

    elementRef.current = element;

    if (!element) return;

    const motionValue = direction === 'y' ? 'yPercent' : 'xPercent';

    triggerRef.current = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        gsap.set(element, {
          [motionValue]: self.progress * -50 * speed,
        });
      },
    });
  }, [speed, scrub, direction, start, end]);

  // Cleanup
  useEffect(() => {
    return () => {
      triggerRef.current?.kill();
    };
  }, []);

  return refCallback;
}

/* ============================================================================
   useTextReveal Hook
   ============================================================================ */

/**
 * Text reveal options
 */
export interface TextRevealOptions {
  /**
   * How to split text
   * @default 'words'
   */
  type?: 'chars' | 'words';

  /**
   * Stagger delay between segments
   * @default 0.05
   */
  stagger?: number;

  /**
   * Animation duration
   * @default 0.5
   */
  duration?: number;

  /**
   * Starting Y position
   * @default 50
   */
  y?: number;

  /**
   * Starting opacity
   * @default 0
   */
  opacity?: number;

  /**
   * Easing function
   * @default 'power2.out'
   */
  ease?: string;

  /**
   * Scroll trigger options
   */
  scrollTrigger?: false | ScrollTrigger.Vars;

  /**
   * Start position for scroll trigger
   * @default 'top 85%'
   */
  start?: string;
}

/**
 * useTextReveal - Reveal text character by character or word by word
 *
 * @param options - Text reveal configuration
 * @returns Ref callback to attach to text element
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const textRef = useTextReveal({
 *     type: 'chars',
 *     stagger: 0.05
 *   });
 *
 *   return <h1 ref={textRef}>Animated Text</h1>;
 * }
 * ```
 */
export function useTextReveal(options: TextRevealOptions = {}) {
  const {
    type = 'words',
    stagger = 0.05,
    duration = 0.5,
    y = 50,
    opacity = 0,
    ease = 'power2.out',
    scrollTrigger = {},
    start = 'top 85%',
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  const refCallback = useCallback((element: HTMLElement | null) => {
    // Clean up
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (elementRef.current) {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === elementRef.current) {
          st.kill();
        }
      });
    }

    elementRef.current = element;

    if (!element) return;

    const text = element.textContent || '';
    const segments: HTMLElement[] = [];

    // Clear and recreate content
    element.innerHTML = '';

    if (type === 'chars') {
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.className = 'char-reveal';
        element.appendChild(span);
        segments.push(span);
      });
    } else {
      // words
      text.split(/\s+/).forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.className = 'word-reveal';
        element.appendChild(span);
        segments.push(span);

        // Add space after word (except last)
        if (i < text.split(/\s+/).length - 1) {
          const space = document.createElement('span');
          space.textContent = ' ';
          space.style.display = 'inline-block';
          element.appendChild(space);
        }
      });
    }

    // Animate
    animationRef.current = gsap.to(segments, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        ...scrollTrigger,
      },
    });
  }, [type, stagger, duration, y, opacity, ease, scrollTrigger, start]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return refCallback;
}

export default useGsap;
