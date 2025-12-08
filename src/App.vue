<template>
  <div id="app">
    <!-- Navigation -->
    <Navbar 
      :nav-items="navItems"
      :current-slide="currentSlide"
      :mobile-menu-open="mobileMenuOpen"
      @navigate="navigateToSlide"
      @toggle-menu="handleToggleMenu"
    />

    <!-- Slides Container -->
    <div class="slides-container">
      <HomeSlide :class="getSlideClass(0)" @navigate="navigateToSlide" />
      <AboutSlide :class="getSlideClass(1)" :stats="stats" />
      <SkillsSlide :class="getSlideClass(2)" :skills="skills" :is-active="currentSlide === 2" />
      <ProjectsSlide :class="getSlideClass(3)" :projects="projects" />
      <ContactSlide :class="getSlideClass(4)" 
                    :contact-details="contactDetails" 
                    :social-links="socialLinks" />
    </div>

    <!-- Navigation Arrows -->
    <NavigationArrows 
      :is-first-slide="currentSlide === 0"
      :is-last-slide="currentSlide === totalSlides - 1"
      @prev="prevSlide"
      @next="nextSlide"
    />

    <!-- Slide Indicators -->
    <div class="slide-indicators">
      <span v-for="index in totalSlides" 
            :key="index"
            class="indicator" 
            :class="{ active: currentSlide === index - 1 }"
            @click="navigateToSlide(index - 1)">
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import NavigationArrows from './components/NavigationArrows.vue';
import HomeSlide from './components/HomeSlide.vue';
import AboutSlide from './components/AboutSlide.vue';
import SkillsSlide from './components/SkillsSlide.vue';
import ProjectsSlide from './components/ProjectsSlide.vue';
import ContactSlide from './components/ContactSlide.vue';

// Reactive state
const currentSlide = ref(0);
const totalSlides = ref(5);
const isAnimating = ref(false);
const mobileMenuOpen = ref(false);

// Navigation items
const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

// Stats data
const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' }
];

// Skills data
const skills = [
  { name: 'HTML5', icon: 'fab fa-html5', progress: '95%' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', progress: '90%' },
  { name: 'JavaScript', icon: 'fab fa-js', progress: '85%' },
  { name: 'React', icon: 'fab fa-react', progress: '80%' },
  { name: 'Node.js', icon: 'fab fa-node', progress: '75%' },
  { name: 'Databases', icon: 'fas fa-database', progress: '70%' },
  { name: 'UI/UX Design', icon: 'fab fa-figma', progress: '85%' },
  { name: 'Git & GitHub', icon: 'fab fa-git-alt', progress: '80%' }
];

// Projects data
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with payment integration and admin dashboard.',
    icon: 'fas fa-shopping-cart',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with interactive charts and reports.',
    icon: 'fas fa-chart-line',
    tags: ['Vue.js', 'D3.js', 'Firebase']
  },
  {
    title: 'Mobile App Design',
    description: 'Modern and intuitive mobile app design with seamless user experience.',
    icon: 'fas fa-mobile-alt',
    tags: ['Figma', 'UI/UX', 'Prototype']
  },
  {
    title: 'Personal Blog',
    description: 'A responsive blog platform with markdown support and comment system.',
    icon: 'fas fa-blog',
    tags: ['Next.js', 'Tailwind', 'PostgreSQL']
  },
  {
    title: 'Event Manager',
    description: 'Comprehensive event management system with booking and notification features.',
    icon: 'fas fa-calendar-alt',
    tags: ['Angular', 'Express', 'MySQL']
  },
  {
    title: 'Portfolio Website',
    description: 'Creative portfolio website for a photographer with image gallery and booking form.',
    icon: 'fas fa-camera',
    tags: ['HTML', 'CSS', 'JavaScript']
  }
];

// Contact details
const contactDetails = [
  { type: 'Email', icon: 'fas fa-envelope', value: 'aljohnorpilla7777@gmail.com' },
  { type: 'Phone', icon: 'fas fa-phone', value: '+639 76-109-3559' },
  { type: 'Location', icon: 'fas fa-map-marker-alt', value: 'Baguio City, 2600, Philippines' }
];

// Social links
const socialLinks = [
  { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/n7Jong' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/n7Jong' },
  { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://www.facebook.com/n7.jxng' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/j.1100001001/' }
];

// Methods
const getSlideClass = (slideIndex) => {
  const classes = ['slide'];
  if (currentSlide.value === slideIndex) classes.push('active');
  else if (slideIndex < currentSlide.value) classes.push('prev');
  else if (slideIndex > currentSlide.value) classes.push('next');
  return classes.join(' ');
};

const navigateToSlide = (slideIndex) => {
  if (isAnimating.value || slideIndex < 0 || slideIndex >= totalSlides.value) return;
  
  isAnimating.value = true;
  currentSlide.value = slideIndex;
  
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  }
  
  setTimeout(() => {
    isAnimating.value = false;
  }, 800);
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    navigateToSlide(currentSlide.value - 1);
  }
};

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    navigateToSlide(currentSlide.value + 1);
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleToggleMenu = (isOpen) => {
  mobileMenuOpen.value = isOpen;
};

// Keyboard navigation
const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
};

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
  
  console.log('%c Welcome to Jong\'s Portfolio! ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
  console.log('%c Navigate with arrow keys, swipe, or click navigation! ', 'color: #6366f1; font-size: 14px;');
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style>
@import './assets/styles.css';
</style>
