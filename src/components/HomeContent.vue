<template>
  <div class="hero-content">
    <h1 class="hero-title">
      Hi, I'm <span class="highlight">Al John Edejer Orpilla</span>
    </h1>
    <p class="hero-subtitle">.</p>
    <p class="hero-description">
      .
    </p>
    <div class="hero-buttons">
      <button class="btn btn-primary" @click="$emit('navigate', 3)">View My Work</button>
      <button class="btn btn-secondary" @click="$emit('navigate', 4)">Get In Touch</button>
    </div>
  </div>
  <div class="hero-image">
    <div class="hero-illustration">
      <i class="fas fa-code"></i>
    </div>
  </div>
</template>

<script setup>
defineEmits(['navigate']);
</script>
