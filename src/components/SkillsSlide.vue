<template>
  <section class="slide">
    <div class="slide-content">
      <h2 class="section-title">My Skills</h2>
      <SkillsContent :skills="skills" :is-active="isActive" />
    </div>
  </section>
</template>

<script setup>
import SkillsContent from './SkillsContent.vue';

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
