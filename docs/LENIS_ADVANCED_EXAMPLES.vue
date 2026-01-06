<!-- 
  مثال متقدم: كيفية استخدام Lenis في سيناريوهات مختلفة
  هذا الملف للتوثيق فقط - يمكنك نسخ الأمثلة منه
-->

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLenis } from '@/composables/useLenis'

// ============================================
// مثال 1: التحكم الأساسي في السكرول
// ============================================
const { scrollTo, stop, start, isScrolling } = useLenis()

// السكرول إلى قسم معين
const navigateToSection = (sectionId: string) => {
  scrollTo(`#${sectionId}`, {
    offset: -100, // مسافة من الأعلى
    duration: 1.5  // مدة الأنيميشن
  })
}

// السكرول إلى موضع محدد بالـ pixels
const scrollToPosition = (pixels: number) => {
  scrollTo(pixels, {
    duration: 1,
    immediate: false // false = مع أنيميشن، true = فوري
  })
}

// ============================================
// مثال 2: Modal مع إيقاف السكرول
// ============================================
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  stop() // إيقاف السكرول في الخلفية
}

const closeModal = () => {
  isModalOpen.value = false
  start() // إعادة تشغيل السكرول
}

// أو استخدام watch للتحكم التلقائي
watch(isModalOpen, (newValue) => {
  if (newValue) {
    stop()
  } else {
    start()
  }
})

// ============================================
// مثال 3: Infinite Scroll / Load More
// ============================================
const items = ref<any[]>([])
const isLoadingMore = ref(false)

const loadMoreItems = async () => {
  if (isLoadingMore.value) return
  
  isLoadingMore.value = true
  // محاكاة تحميل البيانات
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // إضافة عناصر جديدة
  items.value.push(...Array(10).fill({}))
  isLoadingMore.value = false
}

// مراقبة السكرول للتحميل التلقائي
watch(isScrolling, () => {
  const scrollPosition = window.scrollY + window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // إذا وصلنا لـ 80% من الصفحة
  if (scrollPosition > documentHeight * 0.8 && !isLoadingMore.value) {
    loadMoreItems()
  }
})

// ============================================
// مثال 4: Smooth Anchor Links
// ============================================
const handleAnchorClick = (event: MouseEvent) => {
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  
  if (href?.startsWith('#')) {
    event.preventDefault()
    scrollTo(href, {
      offset: -80,
      duration: 1.2
    })
  }
}

// ============================================
// مثال 5: Parallax Section
// ============================================
const parallaxSection = ref<HTMLElement | null>(null)

const createParallaxEffect = () => {
  if (!parallaxSection.value) return
  
  // استخدام Lenis مع GSAP للـ Parallax
  // (يتم التعامل معه تلقائياً في useAnimation)
}

// ============================================
// مثال 6: Progress Indicator
// ============================================
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (winScroll / height) * 100
}

// ============================================
// مثال 7: Section Navigation مع Active State
// ============================================
const sections = ['hero', 'about', 'skills', 'projects', 'contact']
const activeSection = ref('hero')

const updateActiveSection = () => {
  const scrollPosition = window.scrollY + 150
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (!element) continue
    
    const { offsetTop, offsetHeight } = element
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
      activeSection.value = sectionId
      break
    }
  }
}

// ============================================
// مثال 8: Scroll-based Animations
// ============================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0
    
    if (isVisible) {
      element.classList.add('is-visible')
    }
  })
}

// ============================================
// مثال 9: Scroll Snap Points
// ============================================
const scrollToNextSection = () => {
  const currentScroll = window.scrollY
  const sections = document.querySelectorAll('section')
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i] as HTMLElement
    if (section.offsetTop > currentScroll + 100) {
      scrollTo(section, {
        duration: 1.5
      })
      break
    }
  }
}

const scrollToPrevSection = () => {
  const currentScroll = window.scrollY
  const sections = Array.from(document.querySelectorAll('section')).reverse()
  
  for (const section of sections) {
    const sectionElement = section as HTMLElement
    if (sectionElement.offsetTop < currentScroll - 100) {
      scrollTo(sectionElement, {
        duration: 1.5
      })
      break
    }
  }
}

// ============================================
// مثال 10: Custom Easing Functions
// ============================================
const scrollWithCustomEasing = (target: string) => {
  // Ease In Out Cubic
  const easeInOutCubic = (t: number) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }
  
  // Ease Out Elastic
  const easeOutElastic = (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 
      ? 0 
      : t === 1 
      ? 1 
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  }
  
  scrollTo(target, {
    duration: 2,
    easing: easeOutElastic
  })
}
</script>

<template>
  <div class="examples-container">
    <!-- مثال 1: أزرار التنقل -->
    <nav class="navigation">
      <button @click="navigateToSection('about')">About</button>
      <button @click="navigateToSection('skills')">Skills</button>
      <button @click="navigateToSection('projects')">Projects</button>
    </nav>

    <!-- مثال 2: Modal -->
    <button @click="openModal">Open Modal</button>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>Modal content here...</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>

    <!-- مثال 3: Infinite Scroll -->
    <div class="items-list">
      <div v-for="(item, index) in items" :key="index" class="item">
        Item {{ index + 1 }}
      </div>
      <div v-if="isLoadingMore" class="loading">Loading...</div>
    </div>

    <!-- مثال 4: Anchor Links -->
    <div class="content">
      <a href="#section1" @click="handleAnchorClick">Go to Section 1</a>
      <a href="#section2" @click="handleAnchorClick">Go to Section 2</a>
    </div>

    <!-- مثال 6: Progress Bar -->
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <!-- مثال 7: Section Navigation -->
    <nav class="section-nav">
      <button 
        v-for="section in sections" 
        :key="section"
        :class="{ active: activeSection === section }"
        @click="navigateToSection(section)"
      >
        {{ section }}
      </button>
    </nav>

    <!-- مثال 9: Scroll Snap Controls -->
    <div class="scroll-controls">
      <button @click="scrollToPrevSection">↑ Previous</button>
      <button @click="scrollToNextSection">↓ Next</button>
    </div>

    <!-- مثال 8: Scroll Animations -->
    <div class="animate-on-scroll">
      This element will animate when scrolled into view
    </div>

    <!-- مثال 10: Custom Easing -->
    <button @click="scrollWithCustomEasing('#contact')">
      Scroll with Elastic Easing
    </button>
  </div>
</template>

<style scoped>
/* أمثلة الأنماط */
.navigation {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 500px;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e5e7eb;
  z-index: 100;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #9f7aea, #805ad5);
  transition: width 0.1s ease;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-nav button.active {
  color: #805ad5;
  font-weight: bold;
}
</style>
