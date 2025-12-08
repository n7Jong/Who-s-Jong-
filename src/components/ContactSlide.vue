<template>
  <section class="slide">
    <div class="slide-content">
      <h2 class="section-title">Get In Touch</h2>
      <ContactContent 
        :contact-details="contactDetails" 
        :social-links="socialLinks" 
      />
      <Footer />
    </div>
  </section>
</template>

<script setup>
import ContactContent from './ContactContent.vue';
import Footer from './Footer.vue';

defineProps({
  contactDetails: {
    type: Array,
    required: true
  },
  socialLinks: {
    type: Array,
    required: true
  }
});
</script>
