<template>
  <section class="slide">
    <div class="slide-content">
      <h2 class="section-title">My Projects</h2>
      <ProjectsContent :projects="projects" />
    </div>
  </section>
</template>

<script setup>
import ProjectsContent from './ProjectsContent.vue';

defineProps({
  projects: {
    type: Array,
    required: true
  }
});
</script>
