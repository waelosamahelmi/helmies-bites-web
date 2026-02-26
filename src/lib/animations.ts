/**
 * GSAP Animation Utilities
 *
 * A comprehensive set of reusable animation functions using GSAP and ScrollTrigger.
 * All animations return GSAP timelines that can be chained, reversed, or controlled.
 */

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
 * Animation direction options
 */
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Base animation configuration options
 */
export interface BaseAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: gsap.EaseFunction | string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

/**
 * Stagger animation options
 */
export interface StaggerAnimationOptions extends BaseAnimationOptions {
  stagger?: number | StaggerValue;
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  scrollTrigger?: boolean | ScrollTrigger.Vars;
}

/**
 * Stagger value configuration
 */
export interface StaggerValue {
  amount?: number;
  from?: number | 'start' | 'end' | 'center' | 'edges' | 'random';
  grid?: 'auto' | [number, number];
  axis?: 'x' | 'y';
  ease?: string;
}

/**
 * ScrollTrigger animation options
 */
export interface ScrollAnimationOptions extends BaseAnimationOptions {
  scrollTrigger?: boolean | ScrollTrigger.Vars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
  anticipatePin?: number;
  x?: number;
  y?: number;
  opacity?: number;
  scale?: number;
}

/**
 * Parallax animation options
 */
export interface ParallaxOptions {
  speed?: number;
  target?: Element | string;
  scrub?: boolean | number;
  ease?: string;
}

/**
 * Text reveal animation options
 */
export interface TextRevealOptions extends BaseAnimationOptions {
  stagger?: number;
  charClass?: string;
  wordClass?: string;
  lineClass?: string;
  revealType?: 'chars' | 'words' | 'lines';
  y?: number;
  opacity?: number;
  scrollTrigger?: boolean | ScrollTrigger.Vars;
}

/* ============================================================================
   Basic Animations
   ============================================================================ */

/**
 * fadeInUp - Fade in with upward movement
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * fadeInUp('.my-element', { duration: 0.8, y: 50 });
 * ```
 */
export function fadeInUp(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    y = 50,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * fadeIn - Simple fade in animation
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * fadeIn('.my-element', { duration: 0.6 });
 * ```
 */
export function fadeIn(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { opacity },
    {
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * fadeOut - Simple fade out animation
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 */
export function fadeOut(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    stagger = 0,
  } = options;

  return gsap.to(target, {
    opacity: 0,
    duration,
    delay,
    ease,
    stagger,
  });
}

/**
 * scaleIn - Scale from 0 to 1 with fade in
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * scaleIn('.my-element', { duration: 0.5, scale: 0.8 });
 * ```
 */
export function scaleIn(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'back.out(1.7)',
    scale = 0,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { scale, opacity },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * scaleOut - Scale from 1 to 0 with fade out
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 */
export function scaleOut(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.5,
    delay = 0,
    ease = 'back.in(1.7)',
    scale = 0,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.to(target, {
    scale,
    opacity,
    duration,
    delay,
    ease,
    stagger,
  });
}

/* ============================================================================
   Slide Animations
   ============================================================================ */

/**
 * slideInLeft - Slide in from left side
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * slideInLeft('.my-element', { duration: 0.8, x: -100 });
 * ```
 */
export function slideInLeft(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    x = -100,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { x, opacity },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * slideInRight - Slide in from right side
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * slideInRight('.my-element', { duration: 0.8, x: 100 });
 * ```
 */
export function slideInRight(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    x = 100,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { x, opacity },
    {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * slideInUp - Slide in from bottom
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 */
export function slideInUp(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    y = 100,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/**
 * slideInDown - Slide in from top
 *
 * @param target - Element(s) to animate
 * @param options - Animation configuration
 * @returns GSAP timeline
 */
export function slideInDown(
  target: gsap.TweenTarget,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    y = -100,
    opacity = 0,
    stagger = 0,
  } = options;

  return gsap.fromTo(
    target,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
    }
  );
}

/* ============================================================================
   Scroll-Triggered Animations
   ============================================================================ */

/**
 * fadeInUpScroll - Fade in with upward movement on scroll
 *
 * @param target - Element(s) to animate
 * @param options - Scroll animation configuration
 * @returns GSAP timeline with ScrollTrigger
 *
 * @example
 * ```tsx
 * fadeInUpScroll('.my-element', {
 *   start: 'top 80%',
 *   toggleActions: 'play none none reverse'
 * });
 * ```
 */
export function fadeInUpScroll(
  target: gsap.TweenTarget,
  options: ScrollAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    ease = 'power3.out',
    y = 60,
    opacity = 0,
    start = 'top 85%',
    end = 'bottom 15%',
    scrub = false,
    toggleActions = 'play none none reverse',
    scrollTrigger: customScrollTrigger = true,
  } = options;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    start,
    end,
    scrub,
    toggleActions,
    ...(typeof customScrollTrigger === 'object' ? customScrollTrigger : {}),
  };

  return gsap.fromTo(
    target,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

/**
 * scaleInScroll - Scale in on scroll
 *
 * @param target - Element(s) to animate
 * @param options - Scroll animation configuration
 * @returns GSAP timeline with ScrollTrigger
 */
export function scaleInScroll(
  target: gsap.TweenTarget,
  options: ScrollAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.6,
    ease = 'back.out(1.7)',
    scale = 0.8,
    opacity = 0,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
    scrollTrigger: customScrollTrigger = true,
  } = options;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    start,
    toggleActions,
    ...(typeof customScrollTrigger === 'object' ? customScrollTrigger : {}),
  };

  return gsap.fromTo(
    target,
    { scale, opacity },
    {
      scale: 1,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

/**
 * slideInLeftScroll - Slide from left on scroll
 *
 * @param target - Element(s) to animate
 * @param options - Scroll animation configuration
 * @returns GSAP timeline with ScrollTrigger
 */
export function slideInLeftScroll(
  target: gsap.TweenTarget,
  options: ScrollAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    ease = 'power3.out',
    x = -100,
    opacity = 0,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
    scrollTrigger: customScrollTrigger = true,
  } = options;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    start,
    toggleActions,
    ...(typeof customScrollTrigger === 'object' ? customScrollTrigger : {}),
  };

  return gsap.fromTo(
    target,
    { x, opacity },
    {
      x: 0,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

/**
 * slideInRightScroll - Slide from right on scroll
 *
 * @param target - Element(s) to animate
 * @param options - Scroll animation configuration
 * @returns GSAP timeline with ScrollTrigger
 */
export function slideInRightScroll(
  target: gsap.TweenTarget,
  options: ScrollAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.8,
    ease = 'power3.out',
    x = 100,
    opacity = 0,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
    scrollTrigger: customScrollTrigger = true,
  } = options;

  const scrollTriggerConfig: ScrollTrigger.Vars = {
    start,
    toggleActions,
    ...(typeof customScrollTrigger === 'object' ? customScrollTrigger : {}),
  };

  return gsap.fromTo(
    target,
    { x, opacity },
    {
      x: 0,
      opacity: 1,
      duration,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

/**
 * parallax - Parallax scrolling effect
 *
 * Creates a parallax effect where elements move at different speeds
 * relative to scroll position.
 *
 * @param target - Element(s) to animate
 * @param options - Parallax configuration
 * @returns GSAP timeline with ScrollTrigger
 *
 * @example
 * ```tsx
 * parallax('.parallax-bg', { speed: 0.5, scrub: true });
 * ```
 */
export function parallax(
  target: gsap.TweenTarget,
  options: ParallaxOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const { speed = 0.5, scrub = true, ease = 'none' } = options;

  return gsap.to(target, {
    yPercent: -50 * speed,
    ease,
    scrollTrigger: {
      trigger: target as any,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  });
}

/**
 * parallaxContainer - Parallax effect with separate container and target
 *
 * @param trigger - Element that triggers the animation
 * @param target - Element(s) to animate
 * @param options - Parallax configuration
 * @returns GSAP timeline with ScrollTrigger
 *
 * @example
 * ```tsx
 * parallaxContainer('.container', '.parallax-element', { speed: 0.3 });
 * ```
 */
export function parallaxContainer(
  trigger: string | Element,
  target: gsap.TweenTarget,
  options: ParallaxOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const { speed = 0.5, scrub = true, ease = 'none' } = options;

  return gsap.to(target, {
    yPercent: -50 * speed,
    ease,
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  });
}

/**
 * horizontalScroll - Horizontal scroll section
 *
 * Converts vertical scroll to horizontal movement for a container.
 *
 * @param sections - Container element with horizontal sections
 * @param options - ScrollTrigger configuration
 * @returns GSAP timeline with ScrollTrigger
 *
 * @example
 * ```tsx
 * horizontalScroll('.horizontal-container', {
 *   sectionSelector: '.section'
 * });
 * ```
 */
export function horizontalScroll(
  sections: string | Element,
  options: {
    sectionSelector?: string;
    pin?: boolean;
    scrub?: boolean | number;
    end?: string;
  } = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    sectionSelector = 'section',
    pin = true,
    scrub = 1,
    end = '+=3000',
  } = options;

  const element = typeof sections === 'string'
    ? document.querySelector(sections)
    : sections;

  if (!element) {
    console.warn('horizontalScroll: element not found');
    return gsap.timeline();
  }

  const panels = gsap.utils.toArray<Element>(sectionSelector, element);

  return gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      pin,
      scrub,
      end,
      // @ts-ignore - GSAP internal property
      snap: 1 / (panels.length - 1),
    },
  });
}

/* ============================================================================
   Text Animations
   ============================================================================ */

/**
 * Split text into elements for animation
 */
interface SplitTextResult {
  chars: Element[];
  words: Element[];
  lines: Element[];
  original: Element;
}

/**
 * splitText - Split text into animatable parts
 *
 * Splits text content into characters, words, or lines wrapped in spans.
 *
 * @param element - Element containing text to split
 * @param type - What to split into
 * @returns Object containing split elements
 *
 * @example
 * ```tsx
 * const { chars } = splitText(elementRef.current, 'chars');
 * gsap.from(chars, { opacity: 0, stagger: 0.02 });
 * ```
 */
export function splitText(
  element: Element,
  type: 'chars' | 'words' | 'lines' | 'all' = 'all'
): SplitTextResult {
  const text = element.textContent || '';
  const chars: Element[] = [];
  const words: Element[] = [];
  const lines: Element[] = [];

  // Helper to create span elements
  const createSpan = (content: string, className = '') => {
    const span = document.createElement('span');
    span.textContent = content;
    if (className) span.className = className;
    return span;
  };

  if (type === 'chars' || type === 'all') {
    element.innerHTML = '';
    text.split('').forEach((char) => {
      const span = createSpan(char, 'char');
      element.appendChild(span);
      chars.push(span);
    });
  }

  if (type === 'words' || type === 'all') {
    element.innerHTML = '';
    text.split(/\s+/).forEach((word) => {
      const span = createSpan(word + ' ', 'word');
      element.appendChild(span);
      words.push(span);
    });
  }

  return {
    chars,
    words,
    lines,
    original: element,
  };
}

/**
 * textReveal - Text character/word reveal animation
 *
 * Animates text appearing character by character or word by word.
 *
 * @param target - Element(s) containing text
 * @param options - Text reveal configuration
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * textReveal('.reveal-text', {
 *   revealType: 'chars',
 *   stagger: 0.05,
 *   duration: 0.6
 * });
 * ```
 */
export function textReveal(
  target: gsap.TweenTarget,
  options: TextRevealOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    revealType = 'chars',
    stagger = 0.05,
    duration = 0.5,
    delay = 0,
    ease = 'power2.out',
    y = 50,
    opacity = 0,
    charClass = 'char',
    wordClass = 'word',
    scrollTrigger: scrollTriggerOption,
  } = options;

  const targets = gsap.utils.toArray<Element>(target);
  const allElements: Element[] = [];

  targets.forEach((element) => {
    const text = element.textContent || '';

    if (revealType === 'chars') {
      element.innerHTML = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = charClass;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        element.appendChild(span);
        allElements.push(span);
      });
    } else if (revealType === 'words') {
      element.innerHTML = '';
      const words = text.split(/\s+/);
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = wordClass;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        element.appendChild(span);
        allElements.push(span);

        // Add space after word (except last)
        if (i < words.length - 1) {
          const space = document.createElement('span');
          space.textContent = ' ';
          space.style.display = 'inline-block';
          element.appendChild(space);
        }
      });
    }
  });

  const animationConfig: gsap.TweenVars = {
    y: 0,
    opacity: 1,
    duration,
    delay,
    ease,
    stagger,
  };

  if (scrollTriggerOption) {
    animationConfig.scrollTrigger =
      typeof scrollTriggerOption === 'object'
        ? scrollTriggerOption
        : { start: 'top 85%' };
  }

  return gsap.fromTo(allElements, { y, opacity }, animationConfig);
}

/**
 * textRevealScroll - Text reveal triggered by scroll
 *
 * @param target - Element(s) containing text
 * @param options - Text reveal configuration
 * @returns GSAP timeline with ScrollTrigger
 */
export function textRevealScroll(
  target: gsap.TweenTarget,
  options: TextRevealOptions & ScrollAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const { start = 'top 85%', toggleActions = 'play none none reverse' } =
    options;

  return textReveal(target, {
    ...options,
    scrollTrigger: {
      start,
      toggleActions,
      ...(typeof options.scrollTrigger === 'object' ? options.scrollTrigger : {}),
    },
  });
}

/* ============================================================================
   Utility Functions
   ============================================================================ */

/**
 * createTimeline - Create a new GSAP timeline with defaults
 *
 * @param options - Timeline configuration
 * @returns GSAP timeline
 */
export function createTimeline(options?: gsap.TimelineVars): gsap.core.Timeline | gsap.core.Tween {
  return gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: 0.6,
    },
    ...options,
  });
}

/**
 * matchMedia - Create responsive animations
 *
 * @param config - Object with breakpoint keys and animation functions
 * @returns MatchMedia object that can be reverted
 *
 * @example
 * ```tsx
 * const mm = matchMedia({
 *   isDesktop: '(min-width: 768px)',
 *   isMobile: '(max-width: 767px)'
 * }, (context) => {
 *   const { isDesktop } = context.conditions;
 *   if (isDesktop) {
 *     gsap.to('.element', { x: 100 });
 *   } else {
 *     gsap.to('.element', { x: 50 });
 *   }
 * });
 *
 * // Cleanup
 * mm.revert();
 * ```
 */
export function matchMedia(
  breakpoints: Record<string, string>,
  callback: (context: {
    conditions: Record<string, boolean>;
    media: gsap.MatchMedia;
  }) => void
): gsap.MatchMedia {
  const mm = gsap.matchMedia();

  const conditions: Record<string, boolean> = {};

  mm.add(breakpoints, (context) => {
    Object.keys(breakpoints).forEach((key) => {
      conditions[key] = context.conditions?.[key] || false;
    });

    callback({ conditions, media: mm });
  });

  return mm;
}

/**
 * killAll - Kill all animations and ScrollTriggers
 *
 * Useful for cleanup on component unmount or route changes.
 *
 * @param refreshScrollTrigger - Whether to refresh ScrollTrigger after killing
 */
export function killAll(refreshScrollTrigger = true): void {
  gsap.globalTimeline.clear();
  ScrollTrigger.getAll().forEach((st) => st.kill());

  if (refreshScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

/**
 * refreshScrollTrigger - Refresh all ScrollTrigger instances
 *
 * Call this after DOM changes that affect scroll positions.
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

/* ============================================================================
   Preset Animations
   ============================================================================ */

/**
 * staggerGrid - Stagger animate grid items
 *
 * @param selector - Grid item selector
 * @param options - Animation options
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * staggerGrid('.grid-item', {
 *   from: 'center',
 *   stagger: { amount: 0.5, grid: 'auto' }
 * });
 * ```
 */
export function staggerGrid(
  selector: string,
  options: StaggerAnimationOptions = {}
): gsap.core.Timeline | gsap.core.Tween {
  const {
    duration = 0.6,
    ease = 'power3.out',
    y = 40,
    scale = 0.9,
    opacity = 0,
    stagger = 0.1,
  } = options;

  return gsap.fromTo(
    selector,
    { y, scale, opacity },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      stagger,
    }
  );
}

/**
 * pageTransition - Page transition animation
 *
 * @param options - Animation options
 * @returns GSAP timeline
 *
 * @example
 * ```tsx
 * const tl = pageTransition();
 * // Use for navigation transitions
 * ```
 */
export function pageTransition(
  options: {
    duration?: number;
    overlayColor?: string;
    ease?: string;
  } = {}
): gsap.core.Timeline | gsap.core.Tween {
  const { duration = 0.6, overlayColor = '#000', ease = 'power3.inOut' } =
    options;

  const tl = gsap.timeline();

  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.page-transition-overlay') as HTMLElement | null;
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: overlayColor,
      zIndex: '9999',
      transform: 'translateY(-100%)',
    });
    document.body.appendChild(overlay);
  }

  tl.to(overlay, {
    y: '0%',
    duration: duration / 2,
    ease,
  }).to(
    overlay,
    {
      y: '100%',
      duration: duration / 2,
      ease,
    },
    '+=0.1'
  );

  return tl;
}

/**
 * magneticButton - Magnetic button effect
 *
 * Creates a magnetic effect where button follows cursor slightly.
 *
 * @param button - Button element
 * @param strength - How strong the effect is (0-1)
 * @returns Cleanup function
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const cleanup = magneticButton(buttonRef.current, 0.5);
 *   return cleanup;
 * }, []);
 * ```
 */
export function magneticButton(
  button: HTMLElement | null,
  strength = 0.3
): () => void {
  if (!button) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)' as any,
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/* ============================================================================
   Export all as namespace
   ============================================================================ */

export const animations = {
  // Basic
  fadeInUp,
  fadeIn,
  fadeOut,
  scaleIn,
  scaleOut,

  // Slides
  slideInLeft,
  slideInRight,
  slideInUp,
  slideInDown,

  // Scroll
  fadeInUpScroll,
  scaleInScroll,
  slideInLeftScroll,
  slideInRightScroll,
  parallax,
  parallaxContainer,
  horizontalScroll,

  // Text
  textReveal,
  textRevealScroll,
  splitText,

  // Utility
  createTimeline,
  matchMedia,
  killAll,
  refreshScrollTrigger,

  // Presets
  staggerGrid,
  pageTransition,
  magneticButton,
};

export default animations;
