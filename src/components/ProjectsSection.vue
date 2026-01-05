<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { projects } from '@/data/portfolio'
import { ExternalLink } from 'lucide-vue-next'
import { useAnimation } from '@/composables/useAnimation'

const { t } = useI18n()
const { scrollReveal, gsap, prefersReducedMotion, cursorTilt, animatedUnderline } = useAnimation()

const selectedCategory = ref<'all' | 'vue' | 'react' | 'nuxt'>('all')
const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

// Pagination State
const currentPage = ref(1)
const itemsPerPage = 6

const cleanupFunctions: Array<() => void> = []



const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Optional: Scroll to top of grid
    const grid = document.querySelector('.projects-grid')
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}



onMounted(() => {
  if (!sectionRef.value) return
  

  
  // Animate underline
  if (titleRef.value) {
    animatedUnderline(titleRef.value)
  }
  
  // Animate title
  scrollReveal('.projects-title-wrapper', { duration: 0.8 })
  
  // Animate filter tabs
  gsap.from('.filter-tab', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.filter-tabs',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Strong stagger animate project cards with depth
  const cards = document.querySelectorAll('.project-card')
  gsap.from(cards, {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Add 3D tilt and enhanced hover effects
  if (!prefersReducedMotion) {
    cards.forEach((card) => {
      const element = card as HTMLElement
      
      // Add cursor tilt effect
      const cleanup = cursorTilt(element, 3)
      if (cleanup) cleanupFunctions.push(cleanup)
      
      // Enhanced shadow and glow on hover
      const handleMouseEnter = () => {
        gsap.to(element, {
          boxShadow: '0 20px 60px rgba(128, 90, 213, 0.25), 0 0 0 1px rgba(128, 90, 213, 0.3)',
          duration: 0.4,
          ease: 'power2.out'
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(element, {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          duration: 0.4,
          ease: 'power2.out'
        })
      }
      
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
      
      cleanupFunctions.push(() => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    })
  }
})

// Smooth filter transition animations
watch(selectedCategory, () => {
  currentPage.value = 1 // Reset to first page
  const cards = document.querySelectorAll('.project-card')
  
  // Animate out
  gsap.to(cards, {
    opacity: 0,
    y: 20,
    scale: 0.95,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      // Animate in after filter change
      setTimeout(() => {
        const newCards = document.querySelectorAll('.project-card')
        gsap.fromTo(newCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
          }
        )
      }, 50)
    }
  })
})

onUnmounted(() => {
  cleanupFunctions.forEach(cleanup => cleanup())
})
</script>

<template>
  <section id="projects" ref="sectionRef" class="relative py-20 bg-gray-50/50 dark:bg-dark-surface/50 transition-theme overflow-hidden">


    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="projects-title-wrapper text-center">
        <h2 
          ref="titleRef" 
          class="projects-title text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent inline-block pb-2"
        >
          {{ t('projects.title') }}
        </h2>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs flex justify-center gap-4 mb-12 flex-wrap">
        <button
          @click="selectedCategory = 'all'"
          class="filter-tab px-6 py-2 rounded-full font-medium transition-all duration-300"
          :class="selectedCategory === 'all' 
            ? 'bg-lavender-600 text-white shadow-lg shadow-lavender-500/30 scale-105' 
            : 'bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-lavender-900/30 hover:scale-105'"
        >
          All Projects
        </button>
        <button
          @click="selectedCategory = 'vue'"
          class="filter-tab px-6 py-2 rounded-full font-medium transition-all duration-300"
          :class="selectedCategory === 'vue' 
            ? 'bg-lavender-600 text-white shadow-lg shadow-lavender-500/30 scale-105' 
            : 'bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-lavender-900/30 hover:scale-105'"
        >
          Vue / Nuxt
        </button>
        <button
          @click="selectedCategory = 'react'"
          class="filter-tab px-6 py-2 rounded-full font-medium transition-all duration-300"
          :class="selectedCategory === 'react' 
            ? 'bg-lavender-600 text-white shadow-lg shadow-lavender-500/30 scale-105' 
            : 'bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-lavender-100 dark:hover:bg-lavender-900/30 hover:scale-105'"
        >
          React / Next.js
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in paginatedProjects"
          :key="project.id"
          class="project-card bg-white dark:bg-dark-bg rounded-2xl shadow-sm transition-all duration-300 overflow-hidden border border-gray-200 dark:border-dark-border group will-change-transform"
          style="transform-style: preserve-3d;"
        >
          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden border-b border-gray-100 dark:border-dark-border">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.name" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <!-- Project Header -->
          <div class="p-6 border-b border-gray-100 dark:border-dark-border">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-lavender-600 dark:group-hover:text-lavender-400 transition-colors">
                {{ project.name }}
              </h3>
              <a 
                v-if="project.link" 
                :href="project.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1"
                :aria-label="`Visit ${project.name}`"
              >
                <ExternalLink :size="20" class="text-lavender-600 dark:text-lavender-400 hover:text-lavender-700 dark:hover:text-lavender-300" />
              </a>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div class="p-6 border-b border-gray-100 dark:border-dark-border">
            <h4 class="text-sm font-semibold text-lavender-600 dark:text-lavender-400 mb-3">
              {{ t('projects.techStack') }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="px-3 py-1 bg-lavender-50 dark:bg-lavender-900/20 text-lavender-700 dark:text-lavender-300 text-xs font-medium rounded-full hover:bg-lavender-100 dark:hover:bg-lavender-900/30 transition-colors"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Features -->
          <div class="p-6">
            <h4 class="text-sm font-semibold text-lavender-600 dark:text-lavender-400 mb-3">
              {{ t('projects.features') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(feature, idx) in project.features.slice(0, 3)"
                :key="idx"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span class="text-lavender-600 dark:text-lavender-400 mt-1">•</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Scale Stats -->
          <div v-if="project.scale && (project.scale.components || project.scale.pages || project.scale.stores)" class="px-6 pb-6">
            <div class="flex gap-4 text-center">
              <div v-if="project.scale.components" class="flex-1">
                <div class="text-lg font-bold text-lavender-600 dark:text-lavender-400">
                  {{ project.scale.components }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500">Components</div>
              </div>
              <div v-if="project.scale.pages" class="flex-1">
                <div class="text-lg font-bold text-lavender-600 dark:text-lavender-400">
                  {{ project.scale.pages }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500">Pages</div>
              </div>
              <div v-if="project.scale.stores" class="flex-1">
                <div class="text-lg font-bold text-lavender-600 dark:text-lavender-400">
                  {{ project.scale.stores }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-500">Stores</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="mt-16 flex justify-center items-center gap-4">
        <!-- Previous Button -->
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          :class="currentPage === 1 
            ? 'bg-gray-100 dark:bg-dark-surface text-gray-400 cursor-not-allowed' 
            : 'bg-white dark:bg-dark-bg text-lavender-600 hover:bg-lavender-50 dark:hover:bg-lavender-900/20 hover:scale-105 border border-lavender-200 dark:border-lavender-800'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="w-10 h-10 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
            :class="currentPage === page 
              ? 'bg-lavender-600 text-white shadow-lg shadow-lavender-500/30 scale-110' 
              : 'bg-white dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-lavender-50 dark:hover:bg-lavender-900/20 border border-transparent hover:border-lavender-200'"
          >
            {{ page }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          :class="currentPage === totalPages 
            ? 'bg-gray-100 dark:bg-dark-surface text-gray-400 cursor-not-allowed' 
            : 'bg-white dark:bg-dark-bg text-lavender-600 hover:bg-lavender-50 dark:hover:bg-lavender-900/20 hover:scale-105 border border-lavender-200 dark:border-lavender-800'"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
