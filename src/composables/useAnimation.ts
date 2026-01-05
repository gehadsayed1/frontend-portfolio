import { onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Configure GSAP
gsap.config({
  force3D: true,
  nullTargetWarn: false
})

export interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  scrollTrigger?: boolean | object
}

export function useAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isRTL = document.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl'

  /**
   * Animate element with accessibility support
   */
  const animate = (
    target: gsap.TweenTarget,
    from: gsap.TweenVars,
    to?: gsap.TweenVars,
    options: AnimationOptions = {}
  ) => {
    if (prefersReducedMotion) {
      // Skip animation, just set final state
      gsap.set(target, to || from)
      return null
    }

    const defaults = {
      duration: options.duration || 0.8,
      delay: options.delay || 0,
      ease: options.ease || 'power2.out',
      stagger: options.stagger || 0
    }

    if (to) {
      return gsap.fromTo(target, from, { ...to, ...defaults })
    } else {
      return gsap.from(target, { ...from, ...defaults })
    }
  }

  /**
   * Fade in animation
   */
  const fadeIn = (target: gsap.TweenTarget, options: AnimationOptions = {}) => {
    return animate(target, { opacity: 0 }, { opacity: 1 }, options)
  }

  /**
   * Slide in from direction
   */
  const slideIn = (
    target: gsap.TweenTarget,
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    distance: number = 50,
    options: AnimationOptions = {}
  ) => {
    const from: gsap.TweenVars = { opacity: 0 }
    
    switch (direction) {
      case 'up':
        from.y = distance
        break
      case 'down':
        from.y = -distance
        break
      case 'left':
        from.x = isRTL ? -distance : distance
        break
      case 'right':
        from.x = isRTL ? distance : -distance
        break
    }

    return animate(target, from, { opacity: 1, x: 0, y: 0 }, options)
  }

  /**
   * Scale animation
   */
  const scaleIn = (target: gsap.TweenTarget, options: AnimationOptions = {}) => {
    return animate(
      target,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1 },
      options
    )
  }

  /**
   * Stagger reveal animation
   */
  const staggerReveal = (
    targets: gsap.TweenTarget,
    options: AnimationOptions = {}
  ) => {
    return animate(
      targets,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 },
      { ...options, stagger: options.stagger || 0.1 }
    )
  }

  /**
   * Scroll-triggered animation with depth (scale + y movement)
   */
  const scrollReveal = (
    target: gsap.DOMTarget,
    options: AnimationOptions = {}
  ) => {
    if (prefersReducedMotion) {
      gsap.set(target, { opacity: 1, y: 0, scale: 1 })
      return null
    }

    const scrollTriggerConfig = typeof options.scrollTrigger === 'object'
      ? options.scrollTrigger
      : {
        trigger: target,
        start: 'top 85%', // Trigger earlier to ensure visibility
        toggleActions: 'play none none none' // Play once, never reverse/hide
      }

    return gsap.from(target, {
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: options.duration || 0.8,
      ease: options.ease || 'power2.out',
      scrollTrigger: scrollTriggerConfig
    })
  }

  /**
   * Magnetic hover effect - element follows cursor within bounds
   */
  const magneticHover = (element: HTMLElement, strength: number = 0.3) => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  /**
   * Parallax scroll effect - element moves at different speed than scroll
   */
  const parallaxScroll = (
    element: HTMLElement,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
  ) => {
    if (prefersReducedMotion) return

    const prop = direction === 'vertical' ? 'y' : 'x'
    
    gsap.to(element, {
      [prop]: () => window.scrollY * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })
  }

  /**
   * Cursor tilt effect - card tilts toward cursor (3D effect)
   */
  const cursorTilt = (element: HTMLElement, maxTilt: number = 5) => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const percentX = (e.clientX - centerX) / (rect.width / 2)
      const percentY = (e.clientY - centerY) / (rect.height / 2)
      
      const rotateY = percentX * maxTilt
      const rotateX = -percentY * maxTilt

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  /**
   * Animated underline drawing effect
   */
  /**
   * Animated underline drawing effect
   */
  const animatedUnderline = (element: HTMLElement, color: string = '#805ad5') => {
    if (prefersReducedMotion) {
      element.style.setProperty('--underline-width', '100%')
      return
    }

    // Create underline element
    const underline = document.createElement('div')
    // Wavy SVG pattern - Thicker stroke (3.5) for bold effect
    const wavySvg = `url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q 6 12 12 6 T 24 6' stroke='${encodeURIComponent(color)}' stroke-width='3.5' fill='none' /%3E%3C/svg%3E")`
    
    underline.style.cssText = `
      position: absolute;
      bottom: -12px;
      left: 0;
      height: 12px;
      background-image: ${wavySvg};
      background-repeat: repeat-x;
      background-position: bottom;
      width: 0%;
    `
    
    element.style.position = 'relative'
    element.appendChild(underline)

    // Animate on scroll
    gsap.to(underline, {
      width: '100%', // Exact width of the text
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  }

  /**
   * Staggered word reveal (for taglines)
   */
  const staggerWords = (element: HTMLElement, options: AnimationOptions = {}) => {
    if (prefersReducedMotion) return

    const text = element.textContent || ''
    const words = text.split(' ')
    
    element.innerHTML = words
      .map(word => `<span style="display: inline-block; opacity: 0;">${word}</span>`)
      .join(' ')

    const wordElements = element.querySelectorAll('span')
    
    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.6,
      stagger: options.stagger || 0.08,
      ease: options.ease || 'power2.out',
      delay: options.delay || 0
    })
  }

  /**
   * Cleanup all ScrollTriggers on unmount
   */
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    gsap,
    ScrollTrigger,
    prefersReducedMotion,
    isRTL,
    animate,
    fadeIn,
    slideIn,
    scaleIn,
    staggerReveal,
    scrollReveal,
    magneticHover,
    parallaxScroll,
    cursorTilt,
    animatedUnderline,
    staggerWords,
    cleanup
  }
}
