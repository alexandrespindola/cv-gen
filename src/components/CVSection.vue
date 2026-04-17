<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'experience' // experience, education, projects
  }
})
</script>

<template>
  <section class="section">
    <h3 class="section-title">
      <span>{{ title }}</span>
    </h3>
    <!-- Experience -->
    <div v-if="type === 'experience'" key="experience" v-for="(item, index) in items" :key="index"
      class="experience-card">
      <div class="experience-header">
        <div class="experience-info">
          <h4 class="experience-title">{{ item.title }}</h4>
          <p class="experience-company">{{ item.company }}</p>
        </div>
        <span class="period-badge">{{ item.period }}</span>
      </div>
      <ul class="experience-list">
        <li v-for="(desc, idx) in item.description" :key="idx">{{ desc }}</li>
      </ul>
    </div>
    <!-- Education -->
    <div v-else-if="type === 'education'" key="education" v-for="(item, index) in items" :key="index"
      class="education-card">
      <div class="experience-header">
        <div>
          <h4 class="education-title">{{ item.degree }}</h4>
          <p class="education-institution">{{ item.institution }}</p>
          <p class="education-description">{{ item.description }}</p>
        </div>
        <span class="period-badge">{{ item.period }}</span>
      </div>
    </div>
    <!-- Projects -->
    <div v-else-if="type === 'projects'" key="projects" v-for="(item, index) in items" :key="index"
      class="project-card">
      <h4 class="project-title">{{ item.name }}</h4>
      <ul class="project-list">
        <li v-for="(desc, idx) in item.description" :key="idx">{{ desc }}</li>
      </ul>
    </div>
  </section>
</template>
