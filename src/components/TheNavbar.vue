<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Moon, Sun, Globe, User, Code, Briefcase, Mail, Sparkles } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useLanguage } from '@/i18n'
import { useI18n } from 'vue-i18n'
import { useLenis } from '@/composables/useLenis'

const { theme, toggleTheme } = useTheme()
const { toggleLanguage, locale } = useLanguage()
const { t } = useI18n()
const { scrollTo } = useLenis()

const activeSection = ref('hero')

const scrollToSection = (id: string) => {
  scrollTo(`#${id}`, {
    offset: -80, // Offset for fixed navbar height
    duration: 1.2
  })
}

// Scroll spy to detect active section
const handleScroll = () => {
  const sections = ['about', 'skills', 'projects', 'contact']
  const scrollPosition = window.scrollY + 100

  // Check if at top (hero section)
  if (scrollPosition < 300) {
    activeSection.value = 'hero'
    return
  }

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = sectionId
        return
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isActive = (section: string) => activeSection.value === section
</script>

<template>
  <!-- Desktop Navbar (Top) -->
  <nav class="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border transition-theme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent pb-2">
          <Sparkles :size="24" class="text-lavender-500" />
          <span>Jihed</span>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-8">
          <button 
            @click="scrollToSection('about')" 
            class="relative py-2 transition-colors"
            :class="isActive('about') 
              ? 'text-lavender-600 dark:text-lavender-400 font-semibold' 
              : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400'"
          >
            {{ t('nav.about') }}
            <span 
              v-if="isActive('about')" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lavender-600 to-lavender-400"
            ></span>
          </button>
          <button 
            @click="scrollToSection('skills')" 
            class="relative py-2 transition-colors"
            :class="isActive('skills') 
              ? 'text-lavender-600 dark:text-lavender-400 font-semibold' 
              : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400'"
          >
            {{ t('nav.skills') }}
            <span 
              v-if="isActive('skills')" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lavender-600 to-lavender-400"
            ></span>
          </button>
          <button 
            @click="scrollToSection('projects')" 
            class="relative py-2 transition-colors"
            :class="isActive('projects') 
              ? 'text-lavender-600 dark:text-lavender-400 font-semibold' 
              : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400'"
          >
            {{ t('nav.projects') }}
            <span 
              v-if="isActive('projects')" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lavender-600 to-lavender-400"
            ></span>
          </button>
          <button 
            @click="scrollToSection('contact')" 
            class="relative py-2 transition-colors"
            :class="isActive('contact') 
              ? 'text-lavender-600 dark:text-lavender-400 font-semibold' 
              : 'text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400'"
          >
            {{ t('nav.contact') }}
            <span 
              v-if="isActive('contact')" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lavender-600 to-lavender-400"
            ></span>
          </button>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <!-- Language Toggle -->
          <button
            @click="toggleLanguage"
            class="p-2 rounded-lg hover:bg-lavender-100 dark:hover:bg-lavender-900/30 transition-colors"
            :aria-label="locale === 'en' ? 'Switch to Arabic' : 'Switch to English'"
          >
            <Globe :size="20" class="text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-lavender-100 dark:hover:bg-lavender-900/30 transition-colors"
            :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
          >
            <Moon v-if="theme === 'light'" :size="20" class="text-gray-700" />
            <Sun v-else :size="20" class="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Bottom Navigation (App-like) -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-lg border-t border-gray-200 dark:border-dark-border transition-theme shadow-lg">
    <div class="grid grid-cols-5 h-16">
      <!-- About -->
      <button
        @click="scrollToSection('about')"
        class="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
        :class="isActive('about') 
          ? 'text-lavender-600 dark:text-lavender-400' 
          : 'text-gray-600 dark:text-gray-400'"
      >
        <User :size="20" :stroke-width="isActive('about') ? 2.5 : 2" />
        <span class="text-xs font-medium" :class="isActive('about') ? 'font-bold' : ''">{{ t('nav.about') }}</span>
        <span v-if="isActive('about')" class="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-lavender-600 to-lavender-400 rounded-t-full"></span>
      </button>

      <!-- Skills -->
      <button
        @click="scrollToSection('skills')"
        class="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
        :class="isActive('skills') 
          ? 'text-lavender-600 dark:text-lavender-400' 
          : 'text-gray-600 dark:text-gray-400'"
      >
        <Code :size="20" :stroke-width="isActive('skills') ? 2.5 : 2" />
        <span class="text-xs font-medium" :class="isActive('skills') ? 'font-bold' : ''">{{ t('nav.skills') }}</span>
        <span v-if="isActive('skills')" class="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-lavender-600 to-lavender-400 rounded-t-full"></span>
      </button>

      <!-- Projects (Center - Highlighted) -->
      <button
        @click="scrollToSection('projects')"
        class="flex flex-col items-center justify-center gap-1 -mt-4"
      >
        <div 
          class="p-4 rounded-full shadow-lg transition-all"
          :class="isActive('projects') 
            ? 'bg-gradient-to-r from-lavender-600 to-lavender-500 shadow-lavender-500/50 scale-110' 
            : 'bg-gradient-to-r from-lavender-600 to-lavender-500 shadow-lavender-500/50 hover:scale-110'"
        >
          <Briefcase :size="24" class="text-white" />
        </div>
        <span class="text-xs font-medium text-lavender-600 dark:text-lavender-400" :class="isActive('projects') ? 'font-bold' : ''">{{ t('nav.projects') }}</span>
      </button>

      <!-- Contact -->
      <button
        @click="scrollToSection('contact')"
        class="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
        :class="isActive('contact') 
          ? 'text-lavender-600 dark:text-lavender-400' 
          : 'text-gray-600 dark:text-gray-400'"
      >
        <Mail :size="20" :stroke-width="isActive('contact') ? 2.5 : 2" />
        <span class="text-xs font-medium" :class="isActive('contact') ? 'font-bold' : ''">{{ t('nav.contact') }}</span>
        <span v-if="isActive('contact')" class="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-lavender-600 to-lavender-400 rounded-t-full"></span>
      </button>

      <!-- Settings (Theme) -->
      <button
        @click="toggleTheme"
        class="flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-400 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors active:scale-95"
      >
        <Moon v-if="theme === 'light'" :size="20" />
        <Sun v-else :size="20" />
        <span class="text-xs font-medium">Theme</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Top Bar (Minimal) -->
  <div class="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border transition-theme">
    <div class="flex justify-between items-center h-14 px-4">
      <div class="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent pb-2">
        <Sparkles :size="20" class="text-lavender-500" />
        <span>Jihed</span>
      </div>
      <button
        @click="toggleLanguage"
        class="p-2 rounded-lg hover:bg-lavender-100 dark:hover:bg-lavender-900/30 transition-colors"
      >
        <Globe :size="18" class="text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  </div>
</template>
