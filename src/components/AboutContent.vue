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
        I’m a back-End Developer and UI/UX Designer with strong leadership skills and a deep curiosity for technology. I enjoy solving complex problems by breaking them down like puzzles—an approach that keeps me constantly learning and improving.
I’ve led and collaborated on projects where I bridge technical logic with user-centered design, ensuring systems are not only functional but intuitive and efficient. My backend experience focuses on building scalable, reliable solutions, while my UI/UX background allows me to design clean interfaces that enhance user experience.
      </p>
      <p>
        I thrive in environments that challenge me to innovate, optimize, and turn ideas into practical digital solutions.
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
