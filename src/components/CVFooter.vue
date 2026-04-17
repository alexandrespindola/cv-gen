<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Madrid'
  },
  language: {
    type: String,
    default: 'english'
  }
})
</script>

<template>
  <footer class="cv-footer">
    <div class="footer-info">
      {{ location }}, {{ new Date().toLocaleDateString(language === 'spanish' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) }}
    </div>
    <div class="footer-signature">
      <div class="footer-line">{{ name }}</div>
    </div>
  </footer>
</template>
