<script setup>
defineProps({
  personalInfo: {
    type: Object,
    required: true
  },
  location: {
    type: String,
    default: 'Madrid'
  }
})
</script>

<template>
  <header class="personal-header">
    <div class="personal-info">
      <h2>{{ personalInfo.name }}</h2>
      <p>{{ personalInfo.address }} | <span class="highlight">Date of Birth:</span> {{
        personalInfo.birthDate }}</p>
      <p>
        <span class="highlight">Mobile:</span> {{ personalInfo.phone }} |
        <span class="highlight">Email:</span> {{ personalInfo.email }}
      </p>
      <p>
        <span class="highlight">Nationality:</span> {{ personalInfo.nationality }} |
        <span class="highlight">Availability:</span> {{ personalInfo.availability }} |
        <span class="highlight">Portfolio:</span> <a :href="personalInfo.portfolio" target="_blank"
          class="link">{{ personalInfo.portfolio }}</a>
      </p>
      <p>
        <span class="highlight">LinkedIn:</span> <a :href="'https://' + personalInfo.linkedin"
          target="_blank" class="link">{{ personalInfo.linkedin }}</a> |
        <span class="highlight">GitHub:</span> <a :href="'https://' + personalInfo.github" target="_blank"
          class="link">{{ personalInfo.github }}</a>
      </p>
    </div>
    <div class="personal-photo">
      <img src="/foto.png" alt="Alexandre Borges Spindola" />
    </div>
  </header>
</template>
