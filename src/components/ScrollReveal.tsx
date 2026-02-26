/**
 * ScrollReveal Component
 *
 * Wraps children to animate them on scroll using GSAP and ScrollTrigger.
 * Supports multiple animation directions and customizable timing.
 */

import { forwardRef, useRef, useImperativeHandle, useEffect, useState, Children } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsap } from '../hooks/use-gsap';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================================
   Type Definitions
   ============================================================================ */

/**
 * Animation direction variants
 */
export type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'fade'
  | 'scale'
  | 'scale-up'
  | 'scale-down';

/**
 * Animation easing options
 */
export type RevealEase =
  | 'power1.out'
  | 'power2.out'
  | 'power3.out'
  | 'power4.out'
  | 'back.out'
  | 'elastic.out'
  | 'bounce.out'
  | 'none';

/**
 * ScrollReveal component props
 */
export interface ScrollRevealProps {
  /**
   * Child elements to animate
   */
  children: React.ReactNode;

  /**
   * Animation direction
   * @default 'up'
   */
  direction?: RevealDirection;

  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number;

  /**
   * Animation duration in seconds
   * @default 0.8
   */
  duration?: number;

  /**
   * Distance to move from (for directional animations)
   * @default 50
   */
  distance?: number;

  /**
   * Stagger delay for multiple child elements
   * @default 0
   */
  stagger?: number;

  /**
   * Easing function
   * @default 'power3.out'
   */
  ease?: RevealEase;

  /**
   * ScrollTrigger start position
   * @default 'top 85%'
   */
  start?: string;

  /**
   * ScrollTrigger end position
   */
  end?: string;

  /**
   * ScrollTrigger toggle actions
   * @default 'play none none reverse'
   */
  toggleActions?: string;

  /**
   * Enable scrub (animation tied to scroll position)
   */
  scrub?: boolean | number;

  /**
   * Enable/disable the animation
   * @default true
   */
  enabled?: boolean;

  /**
   * Only animate once
   * @default false
   */
  once?: boolean;

  /**
   * Additional CSS classes for the wrapper
   */
  className?: string;

  /**
   * Initial opacity value
   * @default 0
   */
  initialOpacity?: number;

  /**
   * Initial scale value (for scale animations)
   * @default 0.8
   */
  initialScale?: number;

  /**
   * Callback when animation starts
   */
  onStart?: () => void;

  /**
   * Callback when animation completes
   */
  onComplete?: () => void;

  /**
   * Reverse animation on scroll up
   * @default true
   */
  reverse?: boolean;

  /**
   * Threshold for intersection observer (alternative to ScrollTrigger)
   * @default null
   */
  threshold?: number | null;

  /**
   * Root margin for intersection observer
   * @default '0px'
   */
  rootMargin?: string;

  /**
   * Use intersection observer instead of ScrollTrigger
   * @default false
   */
  useIntersectionObserver?: boolean;

  /**
   * Whether to wrap each child separately
   * @default false
   */
  wrapChildren?: boolean;

  /**
   * CSS class added to wrapper when revealed
   */
  revealedClassName?: string;
}

/**
 * ScrollReveal ref methods
 */
export interface ScrollRevealRef {
  /**
   * Manually trigger the reveal animation
   */
  reveal: () => void;

  /**
   * Reset animation to initial state
   */
  reset: () => void;

  /**
   * Get current reveal state
   */
  isRevealed: () => boolean;

  /**
   * The DOM element
   */
  element: HTMLDivElement | null;
}

/* ============================================================================
   Direction Configuration
   ============================================================================ */

interface DirectionConfig {
  from: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
  to: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
}

const getDirectionConfig = (
  direction: RevealDirection,
  distance: number,
  initialOpacity: number,
  initialScale: number
): DirectionConfig => {
  const baseFrom = { opacity: initialOpacity };
  const baseTo = { opacity: 1, x: 0, y: 0, scale: 1 };

  switch (direction) {
    case 'up':
      return {
        from: { ...baseFrom, y: distance },
        to: { ...baseTo, y: 0 },
      };
    case 'down':
      return {
        from: { ...baseFrom, y: -distance },
        to: { ...baseTo, y: 0 },
      };
    case 'left':
      return {
        from: { ...baseFrom, x: distance },
        to: { ...baseTo, x: 0 },
      };
    case 'right':
      return {
        from: { ...baseFrom, x: -distance },
        to: { ...baseTo, x: 0 },
      };
    case 'fade':
      return {
        from: { opacity: initialOpacity },
        to: { opacity: 1 },
      };
    case 'scale':
    case 'scale-up':
      return {
        from: { opacity: initialOpacity, scale: initialScale },
        to: { opacity: 1, scale: 1 },
      };
    case 'scale-down':
      return {
        from: { opacity: initialOpacity, scale: 1 + initialScale },
        to: { opacity: 1, scale: 1 },
      };
    default:
      return {
        from: { ...baseFrom, y: distance },
        to: { ...baseTo },
      };
  }
};

/* ============================================================================
   Component Implementation
   ============================================================================ */

/**
 * ScrollReveal - Animate children on scroll
 *
 * Wraps content to animate it when entering the viewport using GSAP ScrollTrigger.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollReveal>
 *   <h1>This will fade in up on scroll</h1>
 * </ScrollReveal>
 *
 * // With custom direction
 * <ScrollReveal direction="left" delay={0.2}>
 *   <p>Slides in from left</p>
 * </ScrollReveal>
 *
 * // Stagger multiple children
 * <ScrollReveal stagger={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollReveal>
 *
 * // Scale animation
 * <ScrollReveal direction="scale" duration={0.5}>
 *   <img src="..." alt="Scales in" />
 * </ScrollReveal>
 * ```
 */
export const ScrollReveal = forwardRef<ScrollRevealRef, ScrollRevealProps>(
  (props, ref) => {
    const {
      children,
      direction = 'up',
      delay = 0,
      duration = 0.8,
      distance = 50,
      stagger = 0,
      ease = 'power3.out',
      start = 'top 85%',
      end,
      toggleActions,
      scrub = false,
      enabled = true,
      once = false,
      className = '',
      initialOpacity = 0,
      initialScale = 0.8,
      onStart,
      onComplete,
      reverse = true,
      threshold = null,
      rootMargin = '0px',
      useIntersectionObserver = false,
      wrapChildren = false,
      revealedClassName = '',
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const { refresh } = useGsap();

    // Get animation configuration based on direction
    const directionConfig = getDirectionConfig(
      direction,
      distance,
      initialOpacity,
      initialScale
    );

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      reveal: () => {
        if (animationRef.current) {
          animationRef.current.play();
        }
        setIsRevealed(true);
      },
      reset: () => {
        if (animationRef.current) {
          animationRef.current.restart();
          animationRef.current.pause();
        }
        setIsRevealed(false);
      },
      isRevealed: () => isRevealed,
      element: elementRef.current,
    }));

    // Setup animation
    useEffect(() => {
      if (!elementRef.current || !enabled) return;

      // Clean up any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Determine targets
      const targets = stagger > 0
        ? Array.from(elementRef.current?.children || []) // Direct children as array
        : elementRef.current; // Wrapper itself

      // Skip if no valid targets
      if (!targets || (Array.isArray(targets) && targets.length === 0)) {
        return;
      }

      const finalToggleActions = toggleActions || (once && !scrub
        ? 'play none none none'
        : reverse || scrub
          ? 'play none none reverse'
          : 'play none none none');

      // Create animation
      const animation = gsap.fromTo(
        targets,
        directionConfig.from,
        {
          ...directionConfig.to,
          duration,
          delay,
          ease,
          stagger,
          paused: true,
          onStart: () => {
            setIsRevealed(true);
            onStart?.();
          },
          onComplete: () => {
            onComplete?.();
          },
        }
      );

      animationRef.current = animation;

      // Use Intersection Observer if requested
      if (useIntersectionObserver || threshold !== null) {
        const observerThreshold = threshold ?? 0.1;
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !isRevealed) {
                animation.play();
                setIsRevealed(true);
                if (once) {
                  observerRef.current?.disconnect();
                }
              } else if (!once && reverse && !entry.isIntersecting && isRevealed) {
                animation.reverse();
                setIsRevealed(false);
              }
            });
          },
          {
            threshold: observerThreshold,
            rootMargin,
          }
        );

        observerRef.current.observe(elementRef.current);
      } else {
        // Use ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
          trigger: elementRef.current,
          start,
          end,
          toggleActions: finalToggleActions,
          scrub,
          onEnter: () => {
            animation.play();
          },
          onLeave: () => {
            if (reverse && !scrub) {
              animation.reverse();
            }
          },
          onEnterBack: () => {
            if (reverse && !scrub) {
              animation.play();
            }
          },
          onLeaveBack: () => {
            if (reverse && !scrub && !once) {
              animation.reverse();
            }
          },
        });

        scrollTriggerRef.current = scrollTrigger;
      }

      // Cleanup
      return () => {
        animation.kill();
        scrollTriggerRef.current?.kill();
        observerRef.current?.disconnect();
      };
      // Only re-run when these specific values change
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      direction,
      distance,
      duration,
      delay,
      stagger,
      ease,
      initialOpacity,
      initialScale,
      enabled,
      once,
      reverse,
      scrub,
      useIntersectionObserver,
      threshold,
      rootMargin,
    ]);

    // Refresh ScrollTrigger when children change
    useEffect(() => {
      if (!useIntersectionObserver) {
        refresh();
      }
    }, [children, refresh, useIntersectionObserver]);

    // Prepare content
    const content = wrapChildren && typeof children !== 'string'
      ? Children.toArray(children).map((child, i) => (
        <div key={i} className="scroll-reveal-item">
          {child}
        </div>
      ))
      : children;

    return (
      <div
        ref={elementRef}
        className={`scroll-reveal ${revealedClassName && isRevealed ? revealedClassName : ''} ${className}`}
        data-direction={direction}
        data-revealed={isRevealed}
      >
        {content}
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

/* ============================================================================
   Preset Variants
   ============================================================================ */

/**
 * ScrollRevealUp - Fade and slide up (default)
 */
export const ScrollRevealUp = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="up" {...props} />
);
ScrollRevealUp.displayName = 'ScrollRevealUp';

/**
 * ScrollRevealDown - Fade and slide down
 */
export const ScrollRevealDown = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="down" {...props} />
);
ScrollRevealDown.displayName = 'ScrollRevealDown';

/**
 * ScrollRevealLeft - Fade and slide from left
 */
export const ScrollRevealLeft = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="left" {...props} />
);
ScrollRevealLeft.displayName = 'ScrollRevealLeft';

/**
 * ScrollRevealRight - Fade and slide from right
 */
export const ScrollRevealRight = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="right" {...props} />
);
ScrollRevealRight.displayName = 'ScrollRevealRight';

/**
 * ScrollRevealFade - Simple fade in
 */
export const ScrollRevealFade = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction' | 'distance'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="fade" {...props} />
);
ScrollRevealFade.displayName = 'ScrollRevealFade';

/**
 * ScrollRevealScale - Scale in with fade
 */
export const ScrollRevealScale = forwardRef<ScrollRevealRef, Omit<ScrollRevealProps, 'direction' | 'distance'>>(
  (props, ref) => <ScrollReveal ref={ref} direction="scale" {...props} />
);
ScrollRevealScale.displayName = 'ScrollRevealScale';

/* ============================================================================
   Batch Component for Staggered Reveals
   ============================================================================ */

interface ScrollRevealBatchProps extends Omit<ScrollRevealProps, 'stagger' | 'children'> {
  /**
   * Items to reveal with stagger
   */
  children: React.ReactNode[];

  /**
   * Stagger delay between items
   * @default 0.1
   */
  stagger?: number;

  /**
   * Display wrapper as
   * @default 'block'
   */
  display?: 'block' | 'flex' | 'grid';

  /**
   * Grid columns (when display='grid')
   */
  gridCols?: number;

  /**
   * Gap between items
   * @default '1rem'
   */
  gap?: string;
}

/**
 * ScrollRevealBatch - Animate multiple items with stagger
 *
 * @example
 * ```tsx
 * <ScrollRevealBatch stagger={0.1} direction="left">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollRevealBatch>
 * ```
 */
export const ScrollRevealBatch = forwardRef<ScrollRevealRef, ScrollRevealBatchProps>(
  ({ children, stagger = 0.1, display = 'block', gridCols = 3, gap = '1rem', ...props }, ref) => {
    const style: React.CSSProperties = {
      display,
      gap,
      ...(display === 'grid' ? { gridTemplateColumns: `repeat(${gridCols}, 1fr)` } : {}),
    };

    return (
      <ScrollReveal
        ref={ref}
        stagger={stagger}
        wrapChildren={true}
        className="scroll-reveal-batch"
        {...props}
      >
        <div style={style} className="scroll-reveal-batch-inner">
          {Children.toArray(children).map((child, i) => (
            <div key={i} className="scroll-reveal-batch-item">
              {child}
            </div>
          ))}
        </div>
      </ScrollReveal>
    );
  }
);

ScrollRevealBatch.displayName = 'ScrollRevealBatch';

/* ============================================================================
   Section Component
   ============================================================================ */

interface ScrollRevealSectionProps extends ScrollRevealProps {
  /**
   * Section ID for navigation
   */
  id?: string;

  /**
   * Minimum height of section
   * @default 'auto'
   */
  minHeight?: string | number;

  /**
   * Padding
   */
  padding?: string;
}

/**
 * ScrollRevealSection - Full section wrapper with reveal
 *
 * @example
 * ```tsx
 * <ScrollRevealSection id="about" padding="4rem">
 *   <h2>About Us</h2>
 *   <p>Lorem ipsum...</p>
 * </ScrollRevealSection>
 * ```
 */
export const ScrollRevealSection = forwardRef<HTMLDivElement, ScrollRevealSectionProps>(
  ({ id, minHeight = 'auto', padding = '0', children, ...props }, ref) => {
    const style: React.CSSProperties = {
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
      padding,
    };

    return (
      <section
        ref={ref}
        id={id}
        className="scroll-reveal-section"
        style={style}
      >
        <ScrollReveal {...props}>{children}</ScrollReveal>
      </section>
    );
  }
);

ScrollRevealSection.displayName = 'ScrollRevealSection';

/* ============================================================================
   Export
   ============================================================================ */

export default ScrollReveal;
