<script setup lang="ts">
import { PERSONAL_INFO } from '@/data/constants'
</script>

<template>
  <footer class="mt-20 relative z-10 bg-gradient-to-r from-lavender-100 to-white dark:from-dark-surface dark:to-dark-bg border-t border-lavender-200 dark:border-dark-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent mb-2 pb-2">
            {{ PERSONAL_INFO.name }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
            Crafting exceptional digital experiences with modern web technologies.
          </p>
        </div>

        <div class="flex flex-col items-center md:items-end gap-2">
          <p class="text-gray-500 dark:text-gray-500 text-sm">
            © {{ new Date().getFullYear() }} All rights reserved.
          </p>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
            Made with <span class="text-red-500 animate-pulse">❤</span> by <span class="text-lavender-600 dark:text-lavender-400">{{ PERSONAL_INFO.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
