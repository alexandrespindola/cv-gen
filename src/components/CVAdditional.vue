<script setup>
defineProps({
  certificates: {
    type: Array,
    default: () => []
  },
  additional: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <!-- CERTIFICATES -->
  <section class="section">
    <h3 class="section-title">
      <span>CERTIFICATES</span>
    </h3>
    <div class="certificates-grid">
      <ul class="qualifications-list">
        <li v-for="(cert, index) in certificates.slice(0, Math.ceil(certificates.length / 2))" :key="index">{{ cert }}
        </li>
      </ul>
      <ul class="qualifications-list">
        <li v-for="(cert, index) in certificates.slice(Math.ceil(certificates.length / 2))" :key="index">{{ cert }}</li>
      </ul>
    </div>
  </section>

  <!-- ADDITIONAL -->
  <section class="section">
    <h3 class="section-title">
      <span>ADDITIONAL</span>
    </h3>
    <ul class="qualifications-list">
      <li v-for="(item, index) in additional" :key="index">{{ item }}</li>
    </ul>
  </section>
</template>

<style scoped>
.certificates-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
