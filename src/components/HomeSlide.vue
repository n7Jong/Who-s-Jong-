<template>
  <section class="slide">
    <div class="slide-content">
      <HomeContent @navigate="$emit('navigate', $event)" />
    </div>
  </section>
</template>

<script setup>
import HomeContent from './HomeContent.vue';

defineEmits(['navigate']);
</script>
