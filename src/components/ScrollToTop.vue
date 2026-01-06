<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { useLenis } from '@/composables/useLenis'

const { scrollTo } = useLenis()
const isVisible = ref(false)
const scrollProgress = ref(0)

// حساب نسبة السكرول
const calculateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  
  // حساب النسبة المئوية للسكرول
  const totalScrollableHeight = documentHeight - windowHeight
  const currentProgress = (scrollTop / totalScrollableHeight) * 100
  
  scrollProgress.value = Math.min(Math.max(currentProgress, 0), 100)
}

const handleScroll = () => {
  // Show button when scrolled down 300px
  isVisible.value = window.scrollY > 300
  
  // Update progress
  calculateScrollProgress()
}

const scrollToTop = () => {
  scrollTo(0, {
    duration: 1.5,
    immediate: false
  })
}

// حساب قيمة الـ stroke-dashoffset للدائرة
// محيط الدائرة = 2 * π * r
// نصف قطر الدائرة = 22 (حجم الزر + padding)
const circleRadius = 22
const circumference = 2 * Math.PI * circleRadius

const strokeDashoffset = computed(() => {
  const progress = scrollProgress.value / 100
  return circumference - (progress * circumference)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-90"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40"
    >
      <!-- SVG Progress Circle -->
      <svg
        class="absolute inset-0 w-full h-full -rotate-90"
        width="56"
        height="56"
        viewBox="0 0 56 56"
      >
        <!-- Background Circle -->
        <circle
          cx="28"
          cy="28"
          :r="circleRadius"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          class="text-lavender-200 dark:text-lavender-900/30"
        />
        
        <!-- Progress Circle -->
        <circle
          cx="28"
          cy="28"
          :r="circleRadius"
          stroke="url(#gradient)"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-150 ease-out"
        />
        
        <!-- Gradient Definition -->
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#9f7aea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#805ad5;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
      
      <!-- Button -->
      <button
        @click="scrollToTop"
        class="relative p-3 md:p-4 rounded-full bg-gradient-to-r from-lavender-600 to-lavender-500 text-white shadow-lg shadow-lavender-500/30 hover:shadow-xl hover:shadow-lavender-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <ArrowUp 
          :size="20" 
          class="group-hover:-translate-y-1 transition-transform duration-300" 
        />
        
        <!-- Ripple effect on hover -->
        <span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></span>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* Ensure smooth animation for the progress circle */
circle {
  transition: stroke-dashoffset 0.15s ease-out;
}
</style>
