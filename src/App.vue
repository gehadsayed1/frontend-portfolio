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
import { useLanguage } from './i18n'

const { initLanguage } = useLanguage()

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
  </div>
</template>
