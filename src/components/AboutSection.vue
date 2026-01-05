<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimation } from '@/composables/useAnimation'

const { t } = useI18n()
const { gsap, animatedUnderline } = useAnimation()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

// Animation options
const slideRight = {
  duration: 1,
  scrollTrigger: {
    trigger: '#about',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  x: -50,
  opacity: 0
}

const slideLeft = {
  duration: 1,
  delay: 0.2,
  scrollTrigger: {
    trigger: '#about',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  x: 50,
  opacity: 0
}

onMounted(() => {
  if (!sectionRef.value) return
  
  // Animate underline
  if (titleRef.value) {
    animatedUnderline(titleRef.value)
  }
  
  // Animate image from left
  gsap.from('.about-image-container', {
    ...slideRight,
    scale: 0.9
  })
  
  // Animate text content from right
  gsap.from('.about-content', slideLeft)
})
</script>

<template>
  <section id="about" ref="sectionRef" class="py-20 transition-theme overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-24">
        <!-- Left Column: Profile Image -->
        <div class="about-image-container flex justify-center md:justify-end">
          <div class="relative w-64 h-64 md:w-80 md:h-80 group">
            <!-- Decorative rings -->
            <div class="absolute inset-0 rounded-full border-2 border-lavender-200 dark:border-lavender-900/30 scale-110 group-hover:scale-105 transition-transform duration-700"></div>
            <div class="absolute inset-0 rounded-full border border-lavender-300 dark:border-lavender-800/40 scale-125 group-hover:scale-110 transition-transform duration-700 opacity-50"></div>
            
            <!-- Main Image -->
            <div class="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-dark-surface shadow-2xl shadow-lavender-500/20">
              <img 
                src="/profile-placeholder.png" 
                alt="Profile" 
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              <!-- Overlay/Gradient -->
              <div class="absolute inset-0 bg-lavender-900/10 dark:bg-lavender-500/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Content -->
        <div class="about-content text-center md:text-left">
          <h2 
            ref="titleRef" 
            class="about-title text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent inline-block"
          >
            {{ t('about.title') }}
          </h2>
          
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {{ t('about.description') }}
          </p>
          
          <div class="inline-block px-6 py-3 bg-lavender-50 dark:bg-lavender-900/20 rounded-xl border border-lavender-100 dark:border-lavender-900/30">
            <p class="text-sm md:text-base text-lavender-700 dark:text-lavender-300 font-medium">
              {{ t('about.subtitle') }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
