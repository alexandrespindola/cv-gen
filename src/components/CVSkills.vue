<script setup>
defineProps({
  skills: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- SKILLS -->
  <section class="section">
    <h3 class="section-title">
      <span>SKILLS</span>
    </h3>
    <div class="sidebar-card">
      <div v-for="(desc, category) in skills.technical" :key="category" class="skill-category-row">
        <strong class="skill-label">{{ category }}:</strong> <span class="skill-value">{{ desc }}</span>
      </div>
    </div>
  </section>

  <!-- LANGUAGES -->
  <section class="section">
    <h3 class="section-title">
      <span>LANGUAGES</span>
    </h3>
    <div class="languages-grid">
      <div v-for="(lang, index) in skills.languages" :key="index" class="language-item">
        <span class="language-name">{{ lang.name }}</span> <span class="language-level">{{ lang.level }}</span>
        <span v-if="lang.description" class="language-description">- {{ lang.description }}</span>
      </div>
    </div>
  </section>
</template>
