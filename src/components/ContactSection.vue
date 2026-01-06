<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Github, Linkedin, Send, MessageCircle } from 'lucide-vue-next'
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/constants'
import { useAnimation } from '@/composables/useAnimation'

const { t } = useI18n()
const { animatedUnderline } = useAnimation()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

// Form state
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')


const GOOGLE_SHEET_URL: string = import.meta.env.VITE_GOOGLE_SHEET_URL || ''

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'
  
  try {
    // Check if Google Sheets is configured
    if (GOOGLE_SHEET_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
      console.warn('⚠️ Google Sheets not configured yet. Please update GOOGLE_SHEET_URL in ContactSection.vue')
      // Simulate success for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500))
      submitStatus.value = 'success'
      formData.value = { name: '', email: '', message: '' }
    } else {
      // Send data to Google Sheets
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.value.name,
          email: formData.value.email,
          message: formData.value.message,
          timestamp: new Date().toISOString(),
          source: 'Portfolio Contact Form'
        })
      })

      // Note: With 'no-cors', we can't read the response
      // But if no error is thrown, it means the request was sent successfully
      console.log('✅ Data sent to Google Sheets successfully')
      submitStatus.value = 'success'
      formData.value = { name: '', email: '', message: '' }
    }
    
    // Reset status after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } catch (error) {
    console.error('❌ Failed to send data to Google Sheets:', error)
    submitStatus.value = 'error'
    
    // Reset error status after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (!sectionRef.value) return
  
  // Animate header
  // Animate header and content with robust triggers
  // Animate header and content with robust triggers
  /*
  const options = {
    duration: 0.8,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  }
  */



  // Animate underline
  if (titleRef.value) {
    animatedUnderline(titleRef.value)
  }

  // Animate header
  // scrollReveal('.contact-title-wrapper', options)
  // scrollReveal('.contact-description', { ...options, delay: 0.1 })
  
  // Animate form and contact cards
  // scrollReveal('.contact-form', { ...options, delay: 0.1 })
  // scrollReveal('.contact-info', { ...options, delay: 0.2 })
})
</script>

<template>
  <section id="contact" ref="sectionRef" class="pt-20 transition-theme">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="contact-title-wrapper text-center mb-16">
        <h2 
          ref="titleRef" 
          class="contact-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent inline-block pb-2"
        >
          {{ t('contact.title') }}
        </h2>
        <p class="contact-description text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ t('contact.description') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Contact Form -->
        <div class="contact-form order-2 md:order-1">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-gray-100 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-500/20 outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-gray-100 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-500/20 outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <!-- Message Textarea -->
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="5"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-gray-100 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-500/20 outline-none transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-lavender-600 to-lavender-500 hover:from-lavender-700 hover:to-lavender-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-lavender-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send :size="20" :class="{ 'animate-pulse': isSubmitting }" />
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>

            <!-- Status Messages -->
            <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
              ✓ Message sent successfully!
            </div>
            <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              ✗ Failed to send message. Please try again.
            </div>
          </form>
        </div>

        <!-- Contact Info & Social Links -->
        <div class="contact-info order-1 md:order-2 space-y-8">
          <!-- Direct Contact -->
          <div class="bg-gradient-to-br from-lavender-50 to-white dark:from-dark-surface dark:to-dark-bg p-8 rounded-2xl border border-lavender-100 dark:border-dark-border">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Direct Contact
            </h3>
            
            <div class="space-y-4">
              <a
                :href="`mailto:${PERSONAL_INFO.email}`"
                class="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors group"
              >
                <div class="p-2 bg-lavender-100 dark:bg-lavender-900/30 rounded-lg group-hover:bg-lavender-200 dark:group-hover:bg-lavender-800/40 transition-colors">
                  <Mail :size="20" class="text-lavender-600 dark:text-lavender-400" />
                </div>
                <span class="font-medium">{{ PERSONAL_INFO.email }}</span>
              </a>

              <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div class="p-2 bg-lavender-100 dark:bg-lavender-900/30 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-lavender-600 dark:text-lavender-400">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span class="font-medium">{{ PERSONAL_INFO.location }}</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-gradient-to-br from-lavender-50 to-white dark:from-dark-surface dark:to-dark-bg p-8 rounded-2xl border border-lavender-100 dark:border-dark-border">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Follow Me
            </h3>
            
            <div class="flex flex-wrap gap-4">
              <a
                :href="SOCIAL_LINKS.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg border-2 border-lavender-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-lavender-500 hover:text-lavender-600 dark:hover:text-lavender-400 rounded-lg transition-all hover:scale-105"
              >
                <Github :size="18" />
                <span class="font-medium">GitHub</span>
              </a>

              <a
                :href="SOCIAL_LINKS.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg border-2 border-lavender-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-lavender-500 hover:text-lavender-600 dark:hover:text-lavender-400 rounded-lg transition-all hover:scale-105"
              >
                <Linkedin :size="18" />
                <span class="font-medium">LinkedIn</span>
              </a>

              <a
                href="https://wa.me/201033671306"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg border-2 border-lavender-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-lavender-500 hover:text-lavender-600 dark:hover:text-lavender-400 rounded-lg transition-all hover:scale-105"
              >
                <MessageCircle :size="18" />
                <span class="font-medium">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>
