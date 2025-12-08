<template>
  <div class="about-content">
    <div class="about-image">
      <div class="profile-placeholder">
        <i class="fas fa-user"></i>
      </div>
    </div>
    <div class="about-text">
      <h3>Hello! I'm Jong</h3>
      <p>
        DES
      </p>
      <p>
        DES
      </p>
      <div class="about-stats">
        <div class="stat" v-for="stat in stats" :key="stat.label">
          <h4>{{ stat.value }}</h4>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>
