<template>
  <div class="skills-grid">
    <div class="skill-card" v-for="skill in skills" :key="skill.name">
      <div class="skill-icon">
        <i :class="skill.icon"></i>
      </div>
      <h3>{{ skill.name }}</h3>
      <div class="skill-bar">
        <div class="skill-progress" :style="{ width: isActive ? skill.progress : '0' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});
</script>
