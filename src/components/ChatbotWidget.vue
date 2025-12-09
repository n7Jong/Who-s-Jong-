<template>
  <div class="chatbot-widget">
    <!-- Chatbot Toggle Button -->
    <button 
      v-if="!isOpen" 
      class="chatbot-toggle"
      @click="toggleChat"
      aria-label="Open chat"
    >
      <i class="fas fa-comments"></i>
    </button>

    <!-- Chatbot Window -->
    <div v-if="isOpen" class="chatbot-window">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <i class="fas fa-robot"></i>
          <div>
            <h3>Portfolio Assistant</h3>
            <p>Ask me about Jong's skills & projects</p>
          </div>
        </div>
        <button class="chatbot-close" @click="toggleChat" aria-label="Close chat">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="chatbot-messages" ref="messagesContainer">
        <!-- Welcome Message -->
        <div class="message ai-message">
          <div class="message-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="message-content">
            <p>👋 Hi! I'm Jong's portfolio assistant. Feel free to ask me about his skills, projects, or experience!</p>
          </div>
        </div>

        <!-- Chat Messages -->
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          :class="['message', msg.role === 'user' ? 'user-message' : 'ai-message']"
        >
          <div v-if="msg.role === 'ai'" class="message-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="message-content">
            <p>{{ msg.text }}</p>
          </div>
          <div v-if="msg.role === 'user'" class="message-avatar">
            <i class="fas fa-user"></i>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="message ai-message">
          <div class="message-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="message error-message">
          <div class="message-content">
            <p><i class="fas fa-exclamation-circle"></i> {{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="chatbot-input">
        <input 
          v-model="userInput"
          type="text"
          placeholder="Ask about skills, projects, experience..."
          @keyup.enter="sendMessage"
          :disabled="isLoading"
          ref="inputField"
        />
        <button 
          @click="sendMessage"
          :disabled="!userInput.trim() || isLoading"
          aria-label="Send message"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import axios from 'axios';

// State
const isOpen = ref(false);
const messages = ref([]);
const userInput = ref('');
const isLoading = ref(false);
const error = ref('');
const messagesContainer = ref(null);
const inputField = ref(null);

// Backend API URL
const API_URL = 'http://localhost:3001/api/chat';

// Toggle chat window
const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      inputField.value?.focus();
    });
  }
};

// Scroll to bottom of messages
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Watch messages array for changes
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

watch(isLoading, () => {
  scrollToBottom();
});

// Send message to backend
const sendMessage = async () => {
  const message = userInput.value.trim();
  
  if (!message || isLoading.value) return;

  // Clear error
  error.value = '';

  // Add user message to chat
  messages.value.push({
    role: 'user',
    text: message
  });

  // Clear input
  userInput.value = '';
  isLoading.value = true;

  try {
    // Send complete history to backend
    const response = await axios.post(API_URL, {
      history: messages.value,
      message: message
    });

    // Add AI response to chat
    messages.value.push({
      role: 'ai',
      text: response.data.response
    });

  } catch (err) {
    console.error('Chat error:', err);
    error.value = err.response?.data?.error || 'Failed to connect to chatbot. Please try again.';
    
    // Remove user message if request failed
    messages.value.pop();
    
    // Restore user input
    userInput.value = message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Chatbot Toggle Button */
.chatbot-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-dark);
  color: var(--bg-primary);
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 999;
}

.chatbot-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(84, 111, 117, 0.4);
}

/* Chatbot Window */
.chatbot-window {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 380px;
  height: 550px;
  background: var(--bg-primary);
  border: 2px solid var(--color-3);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  z-index: 999;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.chatbot-header {
  background: var(--gradient-dark);
  color: var(--bg-primary);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-3);
}

.chatbot-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chatbot-header-content i {
  font-size: 1.5rem;
}

.chatbot-header h3 {
  margin: 0;
  font-size: 1rem;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chatbot-header p {
  margin: 0;
  font-size: 0.7rem;
  opacity: 0.9;
}

.chatbot-close {
  background: transparent;
  border: none;
  color: var(--bg-primary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: transform 0.2s ease;
}

.chatbot-close:hover {
  transform: rotate(90deg);
}

/* Messages Area */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: var(--color-2);
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: 3px;
}

/* Message Styles */
.message {
  display: flex;
  gap: 0.75rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: var(--gradient-dark);
}

.message-avatar i {
  font-size: 0.9rem;
  color: var(--bg-primary);
}

.message-content {
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.ai-message .message-content {
  background: var(--bg-primary);
  border: 1px solid var(--color-3);
  color: var(--text-primary);
}

.user-message .message-content {
  background: var(--gradient-dark);
  color: var(--bg-primary);
}

.message-content p {
  margin: 0;
  word-wrap: break-word;
}

/* Error Message */
.error-message .message-content {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #dc2626;
  max-width: 100%;
}

.error-message i {
  margin-right: 0.5rem;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 0.25rem;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* Input Area */
.chatbot-input {
  padding: 1rem;
  background: var(--bg-primary);
  border-top: 2px solid var(--color-3);
  display: flex;
  gap: 0.5rem;
}

.chatbot-input input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--color-3);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: 'Rajdhani', sans-serif;
  transition: all 0.3s ease;
}

.chatbot-input input:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.chatbot-input input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chatbot-input button {
  padding: 0.75rem 1rem;
  background: var(--gradient-dark);
  color: var(--bg-primary);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.chatbot-input button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.chatbot-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 480px) {
  .chatbot-window {
    width: calc(100vw - 2rem);
    height: calc(100vh - 4rem);
    bottom: 1rem;
    right: 1rem;
  }

  .chatbot-toggle {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
