# AGENTS.md - AI Agent Guide for CV Generator

## Project Overview

**CV Generator** is a bilingual (English/Spanish) CV generator application built with Vue 3 and Vite. It provides real-time CV preview and PDF export capabilities using Gotenberg for PDF generation.

The application uses a component-based architecture with JSON data files for CV content, making it easy to customize and maintain.

## 🤖 AI Agent Capabilities

The codebase is designed to be AI-agent friendly. Agents can perform the following tasks effectively:

- **Component Development**: Create and modify Vue components with consistent styling and patterns
- **Data Structure Updates**: Modify JSON data files to add/update CV content
- **Styling Updates**: Apply design changes using CSS and scoped styles
- **PDF Export Integration**: Modify PDF generation logic and Gotenberg integration
- **Testing**: Debug and fix issues with the development workflow
- **Localization**: Add new languages or update existing translations

## Architecture Overview

The project follows **Vue 3** conventions with a component-based architecture.

### Core Architecture Patterns

- **Component-First**: Reusable Vue components with clear responsibilities
- **Composition API**: Modern Vue 3 patterns with `<script setup>` syntax
- **Scoped Styles**: Component-specific styling to prevent conflicts
- **JSON-Based Data**: CV content stored in JSON files for easy editing
- **Bilingual Support**: Language switching with reactive data updates

### Module Relationships

- **App.vue**: Main application component managing state and language switching
- **Components**: Reusable CV sections (Header, Section, Skills, Additional, Footer)
- **Data**: JSON files containing CV content for English and Spanish
- **Utils**: Helper functions for PDF generation
- **Assets**: Static assets and global styles

## Technology Stack

### Core Framework & Runtime

- **Runtime**: Node.js (>=18.0.0)
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite with Rolldown
- **Package Manager**: Bun

### PDF Generation

- **Service**: Gotenberg (Docker-based)
- **Image**: gotenberg/gotenberg:8.30.1
- **Port**: 7777 (external), 3000 (internal)

### Development Tools

- **IDE Support**: VS Code with Vue extensions
- **Type Checking**: TypeScript support
- **Dev Tools**: Vite DevTools integration

## 📋 Agent Workflows

### 1. Adding a New CV Section

1. **Create Component**: Add a new Vue component in `src/components/` following naming pattern `CV*.vue`
2. **Define Props**: Add props for data that needs to be passed from parent
3. **Add to App.vue**: Import and use the component in `App.vue`
4. **Update Data Structure**: If needed, update JSON files to include new data fields
5. **Add Styling**: Apply consistent styling with scoped styles

### 2. Modifying CV Data

1. **Edit JSON Files**: Modify `src/data/cvDataEnglish.json` or `src/data/cvDataSpanish.json`
2. **Validate JSON**: Ensure JSON syntax is correct
3. **Test Changes**: Reload the application to see changes in real-time
4. **Update Both Languages**: Keep both language files in sync

### 3. Adding a New Language

1. **Create Data File**: Add `cvData[Language].json` in `src/data/`
2. **Import in App.vue**: Import the new data file
3. **Add Language Button**: Add a button in the language switcher
4. **Update Switch Logic**: Modify `switchLanguage` function to handle new language
5. **Update Footer**: Ensure footer displays correct language

### 4. Modifying PDF Export

1. **Edit Gotenberg Generator**: Modify `src/utils/gotenberg-generator.ts`
2. **Update Filename Format**: Change filename generation logic if needed
3. **Test Export**: Ensure Docker container is running before testing
4. **Handle Errors**: Add proper error handling for PDF generation failures

## Module Structure

The `src/` directory is organized into the following key directories:

### `src/components/`

Contains all reusable Vue components.

- **`CVHeader.vue`**: Displays personal information header
- **`CVSection.vue`**: Reusable section component for experience, education, and projects
- **`CVSkills.vue`**: Displays technical skills and languages
- **`CVAdditional.vue`**: Displays certificates and additional information (two-column layout)
- **`CVFooter.vue`**: CV footer with signature and location

### `src/data/`

Contains CV data files (committed as mock data).

- **`cvDataEnglish.json`**: English CV data
- **`cvDataSpanish.json`**: Spanish CV data

### `src/utils/`

Contains utility functions.

- **`gotenberg-generator.ts`**: PDF generation logic using Gotenberg API

### `src/assets/`

Contains static assets and global styles.

- **`index.css`**: Global styles for CV content
- **`style.css`**: Application-wide styles

## Component Patterns

### `CVSection.vue` (Reusable Component)

The most important reusable component for CV sections.

**Props:**
- `title`: Section title (e.g., "WORK EXPERIENCE")
- `items`: Array of items to display
- `type`: Section type ('experience', 'education', 'projects')

**Features:**
- Dynamic rendering based on type
- Consistent styling across sections
- Supports description arrays for items

### `CVAdditional.vue` (Two-Column Layout)

Displays certificates and additional information.

**Props:**
- `certificates`: Array of certificate strings
- `additional`: Array of additional information strings

**Features:**
- Two-column grid layout for certificates
- Single column for additional info
- Responsive design

## Development Guidelines

### Coding Standards

- **Language**: JavaScript/TypeScript with Vue 3 Composition API
- **Script Setup**: Use `<script setup>` syntax
- **Style**: Follow existing CSS patterns
- **Naming**: PascalCase for components, camelCase for methods/variables

### Component Structure

```vue
<script setup>
// Props definition
// Reactive state with ref/reactive
// Methods and functions
</script>

<template>
  <!-- Template with semantic HTML -->
</template>

<style scoped>
/* Component-specific styles */
</style>
```

### Data Structure Standards

- **JSON Format**: Use valid JSON with proper indentation
- **Arrays**: Use arrays for lists (experience, education, projects)
- **Consistency**: Maintain consistent field names across language files
- **Validation**: Ensure required fields are present

## PDF Generation

### Gotenberg Integration

The application uses Gotenberg for PDF generation:

**Base URL:** `http://localhost:7777`

**Endpoint:** `/forms/chromium/convert/html`

**Process:**
1. Capture HTML content from `cv-content` div
2. Send to Gotenberg API
3. Generate PDF with custom filename
4. Download PDF to user's device

**Error Handling:**
- Check if Docker container is running
- Validate HTML content
- Handle network errors
- Provide user feedback

## Docker Integration

### Gotenberg Service

```yaml
services:
  gotenberg:
    image: gotenberg/gotenberg:8.30.1
    container_name: gotenberg-pdf
    ports:
      - "7777:3000"
    environment:
      - GOTENBERG_DISABLE_ROUTES=health,version
      - GOTENBERG_CHROMIUM_IGNORE_CERTIFICATE_ERRORS=true
      - GOTENBERG_CHROMIUM_ALLOW_INSECURE_LOCALHOST=true
```

### Starting the Service

```bash
docker-compose up -d
```

### Troubleshooting

**Container not running:**
```bash
docker-compose up -d
```

**Port conflict:**
- Check if port 7777 is already in use
- Modify port in `docker-compose.yml`

**PDF generation fails:**
- Ensure Gotenberg container is running
- Restart Vite dev server after starting Gotenberg
- Check browser console for errors

## Styling Guidelines

### CSS Custom Properties

The application uses CSS custom properties for consistent styling:

- Primary colors for buttons and accents
- Spacing units for consistent margins/padding
- Font sizes for hierarchy

### Responsive Design

- Use relative units (rem, em, %) for scalability
- Test on different screen sizes
- Ensure PDF output looks correct

## Privacy & Security

### Data Privacy

- **Mock Data**: `src/data/` contains example/mock data committed to the repository for demonstration purposes
- **Replace with Real Data**: For production use, replace the mock data with your personal information
- **No Sensitive Data in Repo**: The committed data is fictional/example data only

### API Security

- **Local Only**: Gotenberg runs locally, no external API calls
- **No Authentication**: PDF generation doesn't require authentication (local use)
- **Error Messages**: Don't expose sensitive information in error messages

## Testing

### Manual Testing Workflow

1. **Data Changes**: Edit JSON files and verify real-time updates
2. **Language Switching**: Test language switching functionality
3. **PDF Export**: Test PDF generation with different content
4. **Responsive Design**: Test on different screen sizes
5. **Cross-Browser**: Test in different browsers

### Common Issues

**PDF not generating:**
- Check if Gotenberg container is running
- Restart Vite dev server
- Check browser console for errors

**Styles not applying:**
- Check if styles are scoped correctly
- Verify CSS custom properties
- Check for style conflicts

**Data not updating:**
- Verify JSON syntax is correct
- Check if file is saved
- Reload the application

## Deployment

### Production Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

### Environment Configuration

No environment variables required for basic functionality. Gotenberg must be running for PDF export.

## Contributing

1. Follow existing code patterns
2. Use scoped styles for components
3. Maintain consistency with existing components
4. Test changes thoroughly
5. Update documentation if needed

## Troubleshooting

### Common Issues

**Build Errors:**
- Check Vue component syntax
- Verify imports are correct
- Ensure all dependencies are installed

**Runtime Errors:**
- Check browser console for errors
- Verify data structure matches component expectations
- Check for missing required fields

**PDF Export Issues:**
- Ensure Gotenberg container is running
- Restart Vite dev server
- Check network connectivity to localhost:7777

### Debug Tools

- **Vue DevTools**: Component inspection and state debugging
- **Browser Console**: Error logging and debugging
- **Network Tab**: API request monitoring
- **Docker Logs**: Gotenberg container logs

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Gotenberg Documentation](https://gotenberg.dev/)
- [Bun Documentation](https://bun.sh/)
