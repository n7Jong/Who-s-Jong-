<template>
  <div class="contact-content">
    <div class="contact-info">
      <h3>Let's Work Together</h3>
      <p>
        I'm always open to discussing new projects, creative ideas, or opportunities 
        to be part of your visions.
      </p>
      <div class="contact-details">
        <div class="contact-item" v-for="contact in contactDetails" :key="contact.type">
          <i :class="contact.icon"></i>
          <div>
            <h4>{{ contact.type }}</h4>
            <p>{{ contact.value }}</p>
          </div>
        </div>
      </div>
      <div class="social-links">
        <a v-for="social in socialLinks" 
           :key="social.name"
           :href="social.url" 
           :aria-label="social.name"
           target="_blank"
           rel="noopener noreferrer">
          <i :class="social.icon"></i>
        </a>
      </div>
    </div>
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Your Email</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="formData.subject" required>
      </div>
      <div class="form-group">
        <label for="message">Your Message</label>
        <textarea id="message" v-model="formData.message" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  alert(`Thank you, ${formData.value.name}! Your message has been sent. I'll get back to you soon.`);
  
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>
