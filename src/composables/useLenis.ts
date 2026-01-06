import { onMounted, onUnmounted, ref } from 'vue'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable for smooth scrolling using Lenis
 * Integrates seamlessly with GSAP ScrollTrigger
 */
export function useLenis() {
  const lenisInstance = ref<Lenis | null>(null)
  const isScrolling = ref(false)

  /**
   * Initialize Lenis smooth scroll
   */
  const initLenis = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      console.log('Lenis: Reduced motion preference detected, skipping smooth scroll')
      return
    }

    // Create Lenis instance with custom options
    lenisInstance.value = new Lenis({
      duration: 1.2, // Duration of smooth scroll animation (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical', // Scroll direction
      gestureOrientation: 'vertical', // Gesture direction
      smoothWheel: true, // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1, // Wheel scroll speed multiplier
      touchMultiplier: 2, // Touch scroll speed multiplier
      infinite: false, // Disable infinite scroll
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.value.on('scroll', ScrollTrigger.update)

    // Update ScrollTrigger when Lenis scrolls
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (lenisInstance.value) {
          if (arguments.length) {
            lenisInstance.value.scrollTo(value as number, { immediate: true })
          }
          return lenisInstance.value.scroll
        }
        return 0
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    })

    // Track scrolling state
    lenisInstance.value.on('scroll', ({ velocity }) => {
      isScrolling.value = Math.abs(velocity) > 0.1
    })

    // Animation frame loop
    function raf(time: number) {
      lenisInstance.value?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Refresh ScrollTrigger after initialization
    ScrollTrigger.refresh()
  }

  /**
   * Scroll to a specific target
   */
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      easing?: (t: number) => number
      immediate?: boolean
    }
  ) => {
    if (!lenisInstance.value) return

    lenisInstance.value.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration,
      easing: options?.easing,
      immediate: options?.immediate || false
    })
  }

  /**
   * Stop smooth scrolling
   */
  const stop = () => {
    lenisInstance.value?.stop()
  }

  /**
   * Start smooth scrolling
   */
  const start = () => {
    lenisInstance.value?.start()
  }

  /**
   * Destroy Lenis instance
   */
  const destroy = () => {
    if (lenisInstance.value) {
      lenisInstance.value.destroy()
      lenisInstance.value = null
    }
  }

  // Initialize on mount
  onMounted(() => {
    initLenis()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    destroy()
  })

  return {
    lenis: lenisInstance,
    isScrolling,
    scrollTo,
    stop,
    start,
    destroy
  }
}
