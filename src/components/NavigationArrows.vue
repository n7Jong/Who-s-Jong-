<template>
  <div class="navigation-arrows">
    <!-- Previous Slide Arrow -->
    <button 
      class="slide-arrow slide-arrow-left" 
      @click="$emit('prev')" 
      :disabled="isFirstSlide"
      aria-label="Previous slide">
      <i class="fas fa-chevron-left"></i>
    </button>
    
    <!-- Next Slide Arrow -->
    <button 
      class="slide-arrow slide-arrow-right" 
      @click="$emit('next')"
      :disabled="isLastSlide"
      aria-label="Next slide">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
defineProps({
  isFirstSlide: {
    type: Boolean,
    required: true
  },
  isLastSlide: {
    type: Boolean,
    required: true
  }
});

defineEmits(['prev', 'next']);
</script>
