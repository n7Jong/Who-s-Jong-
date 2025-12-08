<template>
  <div class="projects-grid">
    <div class="project-card" v-for="project in projects" :key="project.title">
      <div class="project-image">
        <i :class="project.icon"></i>
      </div>
      <div class="project-content">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-tags">
          <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <a href="#" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true
  }
});
</script>
