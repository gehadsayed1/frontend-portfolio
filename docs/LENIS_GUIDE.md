# دليل استخدام Lenis للسكرول السلس

## نظرة عامة

تم دمج مكتبة **Lenis** في المشروع لتوفير تجربة سكرول سلسة وناعمة جداً. Lenis يعمل بشكل متكامل مع GSAP ScrollTrigger لتوفير أفضل تجربة للمستخدم.

## المميزات

- ✨ سكرول سلس وناعم للغاية
- 🎯 تكامل كامل مع GSAP ScrollTrigger
- ♿ دعم accessibility (prefers-reduced-motion)
- 📱 يعمل على جميع الأجهزة (Desktop, Mobile, Tablet)
- 🎨 قابل للتخصيص بالكامل

## الملفات المضافة/المعدلة

### 1. `src/composables/useLenis.ts` (جديد)

Composable رئيسي لإدارة Lenis مع الميزات التالية:

- تهيئة تلقائية عند mount
- تنظيف تلقائي عند unmount
- دعم accessibility
- تكامل مع ScrollTrigger
- دوال مساعدة للتحكم في السكرول

### 2. `src/App.vue` (معدل)

تم إضافة استيراد واستخدام `useLenis`:

```vue
import { useLenis } from './composables/useLenis' const { scrollTo } =
useLenis()
```

### 3. `src/style.css` (معدل)

تم إضافة أنماط CSS الخاصة بـ Lenis

### 4. `src/composables/useAnimation.ts` (معدل)

تم تحديث إعدادات GSAP لتعمل بشكل أفضل مع Lenis

## كيفية الاستخدام

### 1. الاستخدام الأساسي (تلقائي)

Lenis يعمل تلقائياً في كل صفحات المشروع بمجرد تشغيل التطبيق. لا حاجة لأي إعداد إضافي!

### 2. السكرول إلى عنصر معين

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { scrollTo } = useLenis();

// السكرول إلى عنصر باستخدام selector
const scrollToSection = () => {
  scrollTo("#about", {
    offset: -100, // offset من الأعلى
    duration: 1.5, // مدة الأنيميشن بالثواني
  });
};

// السكرول إلى موضع معين (pixels)
const scrollToTop = () => {
  scrollTo(0, { immediate: false });
};

// السكرول إلى عنصر HTML مباشرة
const scrollToElement = (element: HTMLElement) => {
  scrollTo(element);
};
</script>
```

### 3. إيقاف/تشغيل السكرول

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { stop, start } = useLenis();

// إيقاف السكرول (مفيد عند فتح modal)
const openModal = () => {
  stop();
};

// تشغيل السكرول مرة أخرى
const closeModal = () => {
  start();
};
</script>
```

### 4. معرفة حالة السكرول

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { isScrolling } = useLenis();

// استخدام في template
</script>

<template>
  <div :class="{ 'is-scrolling': isScrolling }">المحتوى</div>
</template>
```

### 5. منع السكرول على عنصر معين

أضف الخاصية `data-lenis-prevent` لأي عنصر تريد منع السكرول السلس عليه:

```vue
<template>
  <!-- السكرول العادي داخل هذا العنصر -->
  <div data-lenis-prevent class="overflow-auto">محتوى قابل للسكرول</div>
</template>
```

## إعدادات Lenis الحالية

```typescript
{
  duration: 1.2,        // مدة السكرول (بالثواني)
  easing: (t) => ...,   // دالة easing مخصصة
  orientation: 'vertical',
  smoothWheel: true,    // سكرول سلس للماوس
  wheelMultiplier: 1,   // سرعة السكرول بالماوس
  touchMultiplier: 2,   // سرعة السكرول باللمس
  infinite: false       // تعطيل السكرول اللانهائي
}
```

## تخصيص الإعدادات

لتخصيص إعدادات Lenis، عدّل ملف `src/composables/useLenis.ts`:

```typescript
lenisInstance.value = new Lenis({
  duration: 1.5, // زيادة المدة لسكرول أبطأ
  wheelMultiplier: 0.8, // تقليل السرعة
  // ... إعدادات أخرى
});
```

## التكامل مع GSAP ScrollTrigger

Lenis يعمل تلقائياً مع جميع ScrollTrigger animations في المشروع. لا حاجة لأي تعديل!

```vue
<script setup>
import { useAnimation } from "@/composables/useAnimation";

const { scrollReveal } = useAnimation();

onMounted(() => {
  // هذا سيعمل تلقائياً مع Lenis
  scrollReveal(".my-element");
});
</script>
```

## Accessibility

Lenis يحترم تفضيلات المستخدم:

- إذا كان المستخدم يفضل `prefers-reduced-motion`، سيتم تعطيل السكرول السلس تلقائياً
- السكرول العادي سيعمل بشكل طبيعي

## نصائح للأداء

1. **استخدم `will-change` بحذر**: Lenis يضيف `will-change: transform` تلقائياً
2. **تجنب السكرول المتداخل**: استخدم `data-lenis-prevent` للعناصر ذات السكرول الداخلي
3. **اختبر على الأجهزة المختلفة**: السكرول السلس يختلف بين Desktop و Mobile

## أمثلة عملية

### مثال 1: زر "العودة للأعلى"

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { scrollTo } = useLenis();

const scrollToTop = () => {
  scrollTo(0, { duration: 1 });
};
</script>

<template>
  <button @click="scrollToTop">↑ العودة للأعلى</button>
</template>
```

### مثال 2: Navigation مع سكرول سلس

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { scrollTo } = useLenis();

const navigateToSection = (sectionId: string) => {
  scrollTo(`#${sectionId}`, {
    offset: -80, // ارتفاع الـ navbar
    duration: 1.2,
  });
};
</script>

<template>
  <nav>
    <a @click.prevent="navigateToSection('about')">About</a>
    <a @click.prevent="navigateToSection('skills')">Skills</a>
    <a @click.prevent="navigateToSection('projects')">Projects</a>
  </nav>
</template>
```

### مثال 3: Modal مع إيقاف السكرول

```vue
<script setup>
import { ref } from "vue";
import { useLenis } from "@/composables/useLenis";

const { stop, start } = useLenis();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
  stop(); // إيقاف السكرول
};

const closeModal = () => {
  isModalOpen.value = false;
  start(); // تشغيل السكرول
};
</script>
```

## استكشاف الأخطاء

### المشكلة: السكرول لا يعمل

**الحل**: تأكد من أن Lenis تم تهيئته في `App.vue`

### المشكلة: ScrollTrigger لا يعمل بشكل صحيح

**الحل**: تأكد من استدعاء `ScrollTrigger.refresh()` بعد تحميل المحتوى

### المشكلة: السكرول بطيء جداً

**الحل**: قلل قيمة `duration` في إعدادات Lenis

## الموارد

- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [GitHub Repository](https://github.com/studio-freight/lenis)

---

تم إنشاء هذا الدليل بواسطة Antigravity 🚀
