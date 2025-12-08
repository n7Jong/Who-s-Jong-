<template>
  <section class="slide">
    <div class="slide-content">
      <h2 class="section-title">About Me</h2>
      <AboutContent :stats="stats" />
    </div>
  </section>
</template>

<script setup>
import AboutContent from './AboutContent.vue';

defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>
