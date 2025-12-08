<template>
  <footer class="footer">
    <p>&copy; {{ year }} Jong. All rights reserved.</p>
    <p>Designed & Built with <i class="fas fa-heart"></i> by Jong</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const year = computed(() => new Date().getFullYear());
</script>
