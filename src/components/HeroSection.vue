<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAnimation } from "@/composables/useAnimation";
import { PERSONAL_INFO, RESUME_LINK } from "@/data/constants";

const { t } = useI18n();
const { gsap, prefersReducedMotion, magneticHover, staggerWords } =
  useAnimation();

const heroRef = ref<HTMLElement | null>(null);
const greetingRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const roleRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);

let cleanupMagnetic: (() => void) | undefined;

onMounted(() => {
  if (!heroRef.value) return;

  // CINEMATIC TIMELINE SEQUENCE
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (!prefersReducedMotion) {
    // 1. Background orbs - animate in first with scale + opacity
    tl.from(
      ".floating-orb",
      {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      0.5
    );

    // 2. Greeting - subtle fade from top
    tl.from(
      greetingRef.value,
      {
        opacity: 0,
        y: -30,
        duration: 0.8,
      },
      0.8
    );

    // 3. Name - scale from larger with overshoot (SIGNATURE MOVE)
    tl.from(
      nameRef.value,
      {
        scale: 1.15,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      1.2
    );

    // 4. Role - slide in with back.out overshoot easing (CONFIDENT)
    tl.from(
      roleRef.value,
      {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      1.6
    );

    // 5. Tagline - staggered word reveal (PREMIUM TOUCH)
    if (taglineRef.value) {
      staggerWords(taglineRef.value, {
        delay: 2.2,
        stagger: 0.08,
        duration: 0.6,
      });
    }

    // 6. CTA - pop in with bounce
    tl.from(
      ctaRef.value,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
      },
      2.6
    );

    // Add glow animation to CTA
    tl.to(
      ctaRef.value,
      {
        boxShadow: "0 0 30px rgba(128, 90, 213, 0.6)",
        duration: 0.6,
        yoyo: true,
        repeat: 1,
      },
      3.2
    );

    // Continuous floating orbs animation
    const orbs = heroRef.value.querySelectorAll(".floating-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.7,
      });
    });

    // Magnetic hover effect on CTA button
    if (ctaRef.value) {
      cleanupMagnetic = magneticHover(ctaRef.value as HTMLElement, 0.4);
    }
  }
});

onUnmounted(() => {
  if (cleanupMagnetic) {
    cleanupMagnetic();
  }
});

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-theme"
  >
    <!-- SVG Blob Background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute inset-0 w-full h-full bg-center bg-cover opacity-30 dark:opacity-40 transition-all duration-300 bg-white dark:bg-[#0f0a1e]"
        style="
          background-image: url('/blob-scene-transparent.svg');
          background-size: cover;
          background-position: center;
        "
      ></div>
    </div>

    <!-- Floating Background Orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="floating-orb absolute top-1/4 left-1/4 w-72 h-72 bg-lavender-400/20 dark:bg-lavender-600/20 rounded-full blur-3xl"
      ></div>
      <div
        class="floating-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender-300/15 dark:bg-lavender-500/15 rounded-full blur-3xl"
      ></div>
      <div
        class="floating-orb absolute top-1/2 left-1/2 w-56 h-56 bg-lavender-500/10 dark:bg-lavender-400/10 rounded-full blur-2xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Greeting -->
        <p
          ref="greetingRef"
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 font-medium"
        >
          {{ t("hero.greeting") }}
        </p>

        <!-- Name -->
        <h1
          ref="nameRef"
          class="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          {{ PERSONAL_INFO.name }}
        </h1>

        <!-- Role -->
        <h2
          ref="roleRef"
          class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-lavender-600 to-lavender-400 bg-clip-text text-transparent"
        >
          {{ t("hero.role") }}
        </h2>

        <!-- Tagline -->
        <p
          ref="taglineRef"
          class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {{ t("hero.tagline") }}
        </p>

        <!-- CTA Button with Magnetic Hover -->
        <div ref="ctaRef" class="inline-block">
          <button
            @click="scrollToSection('projects')"
            class="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lavender-600 to-lavender-500 hover:from-lavender-700 hover:to-lavender-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-lavender-500/30 hover:shadow-lavender-500/50"
          >
            <span class="relative z-10">{{ t("hero.cta") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform transition-transform group-hover:translate-x-1 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>

            <!-- Animated underline glow -->
            <span
              class="absolute inset-0 rounded-full bg-gradient-to-r from-lavender-400 to-lavender-300 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
            ></span>
          </button>

          <!-- Download CV Button -->
          <a
            :href="RESUME_LINK"
            download="Jihad_Sayed_CV.pdf"
            class="group relative inline-flex items-center gap-2 px-8 py-4 ml-4 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:border-lavender-500 hover:text-lavender-600 dark:hover:text-lavender-400"
          >
            <span class="relative z-10">Download CV</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transform transition-transform group-hover:translate-y-1 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-lavender-600 dark:text-lavender-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </section>
</template>
