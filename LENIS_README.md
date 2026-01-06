# 🎯 Lenis Smooth Scroll - Quick Start

## ✅ تم التثبيت بنجاح!

تم دمج **Lenis** في مشروعك بنجاح. السكرول السلس يعمل الآن تلقائياً في جميع صفحات البورتفوليو! 🎉

## 📦 ما تم إضافته:

### 1. الملفات الجديدة:

- ✨ `src/composables/useLenis.ts` - Composable رئيسي لإدارة Lenis
- 🔝 `src/components/ScrollToTop.vue` - زر العودة للأعلى
- 📚 `docs/LENIS_GUIDE.md` - دليل شامل بالعربية

### 2. الملفات المعدلة:

- 🎨 `src/style.css` - أنماط Lenis
- 🧭 `src/components/TheNavbar.vue` - سكرول سلس في Navigation
- 📱 `src/App.vue` - تهيئة Lenis
- ⚡ `src/composables/useAnimation.ts` - تكامل مع GSAP

## 🚀 الاستخدام السريع:

### في أي Component:

```vue
<script setup>
import { useLenis } from "@/composables/useLenis";

const { scrollTo } = useLenis();

// السكرول إلى قسم معين
const goToAbout = () => {
  scrollTo("#about", {
    offset: -80,
    duration: 1.2,
  });
};

// السكرول للأعلى
const goToTop = () => {
  scrollTo(0);
};
</script>
```

## 🎨 المميزات:

✅ سكرول سلس وناعم جداً  
✅ تكامل كامل مع GSAP ScrollTrigger  
✅ دعم Accessibility (prefers-reduced-motion)  
✅ يعمل على جميع الأجهزة  
✅ زر "العودة للأعلى" تلقائي  
✅ Navigation مع سكرول سلس

## 📖 للمزيد:

اقرأ الدليل الشامل في: `docs/LENIS_GUIDE.md`

---

**استمتعي بتجربة السكرول السلسة! 🚀✨**
