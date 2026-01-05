<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { skillCategories } from '@/data/portfolio'
import { useAnimation } from '@/composables/useAnimation'
import { Code2, Database, Palette, Zap, Wrench } from 'lucide-vue-next'

const { t } = useI18n()
const { scrollReveal, gsap, animatedUnderline } = useAnimation()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

// Map category titles to icons
const categoryIcons: Record<string, any> = {
  'Frameworks & Libraries': Code2,
  'State Management': Database,
   'Tooling & Architecture': Wrench,
  'Styling & UI': Palette,
  'Advanced Features': Zap,
 
}

onMounted(() => {
  if (!sectionRef.value) return
  
  // Animate title with underline drawing effect
  if (titleRef.value) {
    scrollReveal('.skills-title-wrapper', { duration: 0.8 })
    animatedUnderline(titleRef.value)
  }
  
  // Stagger animate skill chips
  const chips = document.querySelectorAll('.skill-chip')
  gsap.from(chips, {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.skills-matrix',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="py-20 transition-theme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="skills-title-wrapper text-center mb-16">
        <h2 
          ref="titleRef" 
          class="skills-title text-4xl md:text-5xl font-bold bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent inline-block"
        >
          {{ t('skills.title') }}
        </h2>
      </div>

      <div class="skills-matrix grid md:grid-cols-2 gap-8 md:gap-12">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          class="skill-category"
          :class="{ 'md:col-span-2': category.skills.length > 8 }"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-lavender-50 dark:bg-lavender-900/20 text-lavender-600 dark:text-lavender-400">
              <component 
                :is="categoryIcons[category.title]" 
                :size="24" 
              />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
              {{ category.title }}
            </h3>
          </div>

          <!-- Skill Pills -->
          <div class="flex flex-wrap gap-3">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-chip px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default border border-transparent"
              :class="
                skill.level === 'Advanced'
                  ? 'bg-lavender-600 text-white shadow-lg shadow-lavender-500/30 hover:shadow-lavender-500/50 hover:scale-105'
                  : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-lavender-300 dark:hover:border-lavender-700 hover:scale-105'
              "
              :title="`${skill.name} - ${skill.level}`"
            >
              {{ skill.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
