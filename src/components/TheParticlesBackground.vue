<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnimation } from '@/composables/useAnimation'

const { gsap, prefersReducedMotion } = useAnimation()
const containerRef = ref<HTMLElement | null>(null)

const codeSnippets = [
  '<>', '</', '{}', '()', '[]',
  'const', 'let', 'function',
  'useState', 'computed', 'ref',
  'Vue', 'React', 'Nuxt', 'Next',
  'Pinia', 'Redux', 'i18n',
  'Socket.io', 'GSAP', 'Tailwind',
  '=>', '...', 'async', 'await',
  'import', 'export', 'default',
  'interface', 'type', 'enum'
]

const generateCodeParticles = () => {
  if (!containerRef.value || prefersReducedMotion) return
  
  const container = containerRef.value
  const isMobile = window.innerWidth < 768
  const particleCount = isMobile ? 25 : 60 // Increased for global coverage
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'code-particle'
    particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    
    // Set initial position above screen
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = '-50px'
    
    // Random size and opacity
    const size = Math.random() * 0.4 + 0.6 // 0.6 to 1rem
    particle.style.fontSize = `${size}rem`
    particle.style.opacity = `${Math.random() * 0.3 + 0.1}` // 0.1 to 0.4
    
    container.appendChild(particle)
    
    // Animate falling down with GSAP
    const duration = Math.random() * 10 + 10 // 10-20 seconds (slow fall)
    const viewHeight = window.innerHeight
    
    gsap.to(particle, {
      y: viewHeight + 100, // Move to just below screen
      duration: duration,
      repeat: -1, // Infinite loop
      ease: 'none', // Linear constant speed
      delay: -Math.random() * 20, // Negative delay to start mid-animation (populates screen immediately)
    })
  }
}

onMounted(async () => {
  // Wait for next tick/DOM
  await new Promise(resolve => setTimeout(resolve, 100))
  generateCodeParticles()
})
</script>

<template>
  <div 
    ref="containerRef" 
    class="fixed inset-0 pointer-events-none overflow-hidden z-0"
    aria-hidden="true"
  ></div>
</template>
