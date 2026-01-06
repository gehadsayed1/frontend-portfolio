<script setup lang="ts">
import { onMounted } from 'vue'
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
import TheParticlesBackground from './components/TheParticlesBackground.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import { useLanguage } from './i18n'
import { useLenis } from './composables/useLenis'

const { initLanguage } = useLanguage()

// Initialize Lenis smooth scroll
const { scrollTo } = useLenis()

// Expose scrollTo for potential use in child components
defineExpose({ scrollTo })

onMounted(() => {
  initLanguage()
})
</script>

<template>
  <div class="min-h-screen relative bg-white dark:bg-dark-bg transition-theme">
    <TheParticlesBackground />
    
    <div class="relative z-10">
      <TheNavbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <TheFooter />
    </div>
    
    <!-- Scroll to Top Button -->
    <ScrollToTop />
  </div>
</template>
