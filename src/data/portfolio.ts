export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  category: "vue" | "react" | "nuxt";
  image?: string;
  link?: string;
  scale: {
    components?: number;
    pages?: number;
    stores?: number;
  };
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "perfacto",
    name: "Perfacto E-Commerce",
    description: "A modern e-commerce store built with React, featuring a user-friendly interface, secure payments, and efficient product browsing.",
    techStack: ["React", "Redux", "Payment Integration"],
    features: [
      "User-friendly interface",
      "Secure payment processing",
      "Efficient product browsing",
      "Responsive design"
    ],
    category: "react",
    image: "/image1.png",
    link: "https://perfacto.netlify.app/",
    scale: {},
    highlights: ["E-commerce functionality", "Secure payments"]
  },
  {
    id: "robyana",
    name: "Robyana AI Store",
    description: "Online clothing store with a sophisticated AI recommendation system to personalize the shopping experience.",
    techStack: ["Vue", "AI Integration", "Tailwind CSS"],
    features: [
      "AI-powered recommendations",
      "Modern UI/UX design",
      "Dynamic product filtering"
    ],
    category: "vue",
    image: "/image15.png",
    link: "https://robyana-team.web.app/",
    scale: {},
    highlights: ["AI Integration", "Personalized experience"]
  },
  {
    id: "expense-management",
    name: "Expense Management System",
    description: "A comprehensive system for managing expenses, basic and additional salaries, designed for efficiency and accuracy.",
    techStack: ["React", "Firebase", "Bootstrap"],
    features: [
      "Expense tracking",
      "Salary management",
      "Data visualization"
    ],
    category: "react",
    image: "/image14.png",
    link: "https://expense-management-8d0ef.web.app/",
    scale: {},
    highlights: ["Data management", "Financial tracking"]
  },
  {
    id: "exam-brooklyn",
    name: "Courses Management System",
    description: "A robust system for a courses company combining employee management and student administration in one platform.",
    techStack: ["Vue", "Node.js", "Express"],
    features: [
      "Employee management",
      "Student administration",
      "Course scheduling"
    ],
    category: "vue",
    image: "/image13.png",
    link: "https://exam-brooklyn.onrender.com/",
    scale: {},
    highlights: ["Complex system architecture", "User management"]
  },
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "An organized, fully responsive dashboard containing all necessary administrative tools and visualizations.",
    techStack: ["HTML", "CSS", "JavaScript"],
    features: [
      "Responsive layout",
      "Data charts",
      "Admin tools"
    ],
    category: "react", // Categorizing as react/generic for cleaner filter
    image: "/image6.png",
    link: "https://gehadsayed1.github.io/Dashbord/",
    scale: {},
    highlights: ["Responsive design", "Admin tools"]
  },
  {
    id: "absherbelkhair",
    name: "Absherbelkhair Landing Page",
    description: "A professional landing page designed for clearing travel papers in Dubai, focusing on clear communication and conversion.",
    techStack: ["HTML", "CSS", "Bootstrap"],
    features: [
      "High conversion design",
      "Responsive layout",
      "Clear call-to-actions"
    ],
    category: "vue", // Categorizing as vue/generic
    image: "/image16.png",
    link: "https://absherbelkhair.com/",
    scale: {},
    highlights: ["Landing page design", "International client"]
  },
  {
    id: "smart-goeic",
    name: "SmartGOEIC",
    description: "Developed a production-ready AI-powered chat widget for a governmental authority using Vue 3 and Pinia. The system supports Arabic conversational flows, session-based AI interactions, complaint inquiries, and hybrid rule-based + AI responses. Designed with scalability, UX reliability, and real-world government constraints in mind.",
    techStack: ["Vue 3", "Pinia", "AI Integration", "Arabic NLP"],
    features: [
      "Arabic conversational flows",
      "Session-based AI interactions",
      "Hybrid rule-based + AI responses",
      "Scalable architecture"
    ],
    category: "vue",
    image: "/chat2.png",
    link: "#",
    scale: {},
    highlights: ["Governmental AI project", "Production-ready widget"]
  },
  {
    id: "ai-brooklyn",
    name: "AI Brooklyn Management",
    description: "A comprehensive management platform featuring multiple specialized modules for administrative efficiency. Designed to handle complex management workflows with a focus on usability and scalability.",
    techStack: ["Vue 3", "AI Integration", "Tailwind CSS"],
    features: [
      "Multiple management modules",
      "Specialized admin tools",
      "AI-driven insights",
      "Scalable architecture"
    ],
    category: "vue",
    image: "/aiportal.png",
    link: "https://www.aibrooklyn.net/",
    scale: {},
    highlights: ["Management specialization", "AI features"]
  },
  {
    id: "enterra-ai",
    name: "ENTERRA AI",
    description: "Advanced AI chat system capable of analyzing multiple data sources including PDFs, Word documents, databases, and file paths. Features custom AI model integration for precise, context-aware responses.",
    techStack: ["Vue 3", "Custom AI Models", "PDF/Word Processing", "Vector DB"],
    features: [
      "Multi-format document support (PDF, DOCX)",
      "Database & File Path integration",
      "Custom AI model fine-tuning",
      "Context-aware Question Answering"
    ],
    category: "vue",
    image: "/ENTERRA.png",
    link: "#",
    scale: {},
    highlights: ["Document AI analysis", "Custom Model Integration"]
  },
  {
    id: "ako-sayara",
    name: "Ako Sayara (Concept)",
    description:
      "A comprehensive car rental platform featuring a consumer-facing web app and powerful admin dashboard. Built with bleeding-edge Nuxt 4, this dual-app ecosystem showcases modern Vue architecture at scale.",
    techStack: [
      "Nuxt 4",
      "Vue 3.5",
      "Pinia",
      "Tailwind v4",
      "i18n",
      "Google Maps",
    ],
    features: [
      "Bilingual support (Arabic/English) with RTL",
      "Google Maps integration for location services",
      "Complex state management with Pinia stores",
      "Admin panel with 40+ custom components",
      "Responsive design with Tailwind v4",
    ],
    category: "nuxt",
    image: "/ako.png",
    scale: {
      components: 40,
      pages: 20,
      stores: 5,
    },
    highlights: [
      "Bleeding-edge Nuxt 4 implementation",
      "Production-scale architecture",
      "Full i18n with RTL support",
    ],
  },
  {
    id: "beharf",
    name: "Beharf Game Platform (Concept)",
    description:
      "An immersive real-time multiplayer game platform powered by WebSocket technology. Featuring dynamic game rooms, live gameplay synchronization, and sophisticated state management.",
    techStack: [
      "Next.js 16",
      "React 19",
      "Socket.io",
      "Zustand",
      "Radix UI",
      "TanStack Query",
    ],
    features: [
      "Real-time WebSocket communication",
      "Custom socket manager with reconnection logic",
      "Dynamic routing for game rooms",
      "Server state management with TanStack Query",
      "Modern React 19 server components",
    ],
    category: "react",
    image: "/beharf.png",
    scale: {
      components: 30,
    },
    highlights: [
      "Complex real-time state synchronization",
      "React 19 + Next.js 16",
      "Production-ready socket architecture",
    ],
  },
  {
    id: "rustrent",
    name: "Rustrent POS Dashboard",
    description:
      "A production-ready enterprise POS system with seamless hardware integration. From thermal printer control to comprehensive data visualization.",
    techStack: [
      "React 18",
      "Vite",
      "Redux Toolkit",
      "Mantine",
      "QZ Tray",
      "ApexCharts",
    ],
    features: [
      "QZ Tray thermal printer integration",
      "ESC/POS command generation",
      "Redux architecture for complex state",
      "Data visualization with ApexCharts",
      "Multi-language support with i18next",
    ],
    category: "react",
    link: "https://test.rowaduae.com/",
    image: "/res.png",
    scale: {
      components: 222,
      pages: 90,
    },
    highlights: [
      "Hardware integration expertise",
      "Enterprise-scale codebase",
      "Production POS system",
    ],
  },
  // {
  //   id: "neon-dreams",
  //   name: "Neon Dreams (Concept)",
  //   description:
  //     "A futuristic web experience showcasing neon aesthetics and smooth animations. This immersive project demonstrates advanced animation techniques and creative visual design.",
  //   techStack: ["Nuxt", "GSAP", "WebGL"],
  //   features: [
  //     "Immersive neon-themed visual design",
  //     "Smooth GSAP animations throughout",
  //     "WebGL integration for 3D effects",
  //     "Optimized performance for complex animations",
  //     "Creative interactive elements",
  //   ],
  //   category: "vue",
  //   image: "/project-placeholder.png",
  //   scale: {},
  //   highlights: [
  //     "Advanced GSAP animation techniques",
  //     "WebGL 3D integration",
  //     "Creative visual storytelling",
  //   ],
  // },
  // {
  //   id: "future-finance",
  //   name: "Future Finance (Concept)",
  //   description:
  //     "A modern fintech dashboard with real-time data visualization and secure transactions. Features comprehensive charts and analytics for financial data management.",
  //   techStack: ["React", "D3.js", "Tailwind"],
  //   features: [
  //     "Real-time data visualization with D3.js",
  //     "Secure transaction handling",
  //     "Interactive financial charts",
  //     "Responsive dashboard layout",
  //     "Modern Tailwind CSS styling",
  //   ],
  //   category: "react",
  //   image: "/project-placeholder.png",
  //   scale: {},
  //   highlights: [
  //     "Complex data visualization",
  //     "Real-time updates",
  //     "Fintech security standards",
  //   ],
  // },
  // {
  //   id: "space-tourism",
  //   name: "Space Tourism (Concept)",
  //   description:
  //     "An immersive landing page for space travel booking with stunning 3D elements. Combines Three.js for 3D graphics with smooth scrolling animations.",
  //   techStack: ["Vue", "Three.js", "Lenis"],
  //   features: [
  //     "3D space elements with Three.js",
  //     "Smooth scroll animations with Lenis",
  //     "Immersive booking experience",
  //     "Interactive 3D models",
  //     "Optimized 3D performance",
  //   ],
  //   category: "vue",
  //   image: "/project-placeholder.png",
  //   scale: {},
  //   highlights: [
  //     "Three.js 3D integration",
  //     "Smooth scroll experience",
  //     "Creative space theme",
  //   ],
  // }
];

export interface Skill {
  name: string;
  level: "Advanced" | "Intermediate";
  value: number; // Added value for new data
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Vue.js", level: "Advanced", value: 90 },
      { name: "Nuxt 4", level: "Advanced", value: 90 },
      { name: "React.js", level: "Intermediate", value: 70 },
      { name: "Next.js 16", level: "Advanced", value: 85 },
      { name: "Bootstrap", level: "Advanced", value: 80 },
      { name: "Tailwind CSS", level: "Advanced", value: 85 },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "Pinia", level: "Advanced", value: 85 },
      { name: "Vuex", level: "Intermediate", value: 70 },
      { name: "Redux Toolkit", level: "Intermediate", value: 70 },
      { name: "TanStack Query", level: "Intermediate", value: 75 },
    ],
  },
  {
    title: "Languages & Tools",
    skills: [
      { name: "HTML", level: "Advanced", value: 90 },
      { name: "CSS", level: "Advanced", value: 85 },
      { name: "JavaScript", level: "Advanced", value: 80 },
      { name: "TypeScript", level: "Advanced", value: 85 },
      { name: "Git", level: "Intermediate", value: 60 },
      { name: "jQuery", level: "Intermediate", value: 60 },
    ],
  },
  {
    title: "Advanced Features",
    skills: [
      { name: "Socket.io", level: "Advanced", value: 80 },
      { name: "i18n", level: "Advanced", value: 85 },
      { name: "GSAP", level: "Advanced", value: 80 },
      { name: "WebGL", level: "Intermediate", value: 60 },
    ],
  },
];
