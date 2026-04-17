<script setup>
import { ref } from 'vue'
import CVAdditional from './components/CVAdditional.vue'
import CVFooter from './components/CVFooter.vue'
import CVHeader from './components/CVHeader.vue'
import CVSection from './components/CVSection.vue'
import CVSkills from './components/CVSkills.vue'
import cvDataEnglish from './data/cvDataEnglish.json'
import cvDataSpanish from './data/cvDataSpanish.json'
import { generateCVPDFWithGotenberg } from './utils/gotenberg-generator.ts'

const currentLanguage = ref('english')
const cvData = ref(currentLanguage.value === 'english' ? cvDataEnglish : cvDataSpanish)

const switchLanguage = (lang) => {
  currentLanguage.value = lang
  cvData.value = lang === 'english' ? cvDataEnglish : cvDataSpanish
}



const exportToPDFWithGotenberg = async () => {
  try {
    console.log('Generating PDF with Gotenberg...')

    // Fixed title as requested
    const fixedTitle = 'Full-Stack-Developer-Node'
    
    // Format date as DD-MM-YYYY
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`
    
    // Create filename with hyphens only, language prefix, name in uppercase, fixed title and date
    const languagePrefix = currentLanguage.value === 'english' ? 'EN' : 'ES'
    const cleanName = cvData.value.personalInfo.name.replace(/\s+/g, '-').toUpperCase()
    const filename = `CV-${languagePrefix}-${cleanName}-${fixedTitle}-${formattedDate}.pdf`

    const success = await generateCVPDFWithGotenberg(
      'cv-content',
      '/gotenberg',
      filename
    )
    if (!success) {
      alert('Failed to generate PDF with Gotenberg. Check console for details.')
    }
  } catch (error) {
    console.error('Gotenberg PDF generation error:', error)
    alert(`Error: ${error.message}. Make sure Docker container is running on port 7777 and Vite server is restarted.`)
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>CV Generator - Professional Format</h1>
      <div class="header-actions">
        <div class="language-switcher">
          <button @click="switchLanguage('english')"
            :class="['btn', currentLanguage === 'english' ? 'btn-blue' : 'btn-gray']">
            English
          </button>
          <button @click="switchLanguage('spanish')"
            :class="['btn', currentLanguage === 'spanish' ? 'btn-blue' : 'btn-gray']">
            Español
          </button>
        </div>
        <div class="export-buttons">
          <button @click="exportToPDFWithGotenberg" class="btn btn-green">
            Export PDF
          </button>
        </div>
      </div>
    </div>

    <div id="cv-content" class="cv-content">
      <CVHeader :personal-info="cvData.personalInfo" location="Madrid" />
      <CVSection title="WORK EXPERIENCE" :items="cvData.experience" type="experience" />
      <CVSection title="EDUCATION" :items="cvData.education" type="education" />
      <CVSkills :skills="cvData.skills" />
      <CVAdditional :certificates="cvData.certificates" :additional="cvData.additional" />
      <CVSection title="PROJECTS" :items="cvData.projects" type="projects" />
      <CVFooter :name="cvData.personalInfo.name" :location="cvData.personalInfo.location" :language="currentLanguage" />
    </div>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 8px;
  margin-right: 16px;
}

.export-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-gray {
  background-color: #6b7280;
  color: white;
}

.btn-gray:hover {
  background-color: #4b5563;
}

.btn-blue {
  background-color: #2563eb;
  color: white;
}

.btn-blue:hover {
  background-color: #1d4ed8;
}

.btn-orange {
  background-color: #f97316;
  color: white;
}

.btn-orange:hover {
  background-color: #ea580c;
}

.btn-green {
  background-color: #10b981;
  color: white;
}

.btn-green:hover {
  background-color: #059669;
}

.btn-purple {
  background-color: #8b5cf6;
  color: white;
}

.btn-purple:hover {
  background-color: #7c3aed;
}
</style>
