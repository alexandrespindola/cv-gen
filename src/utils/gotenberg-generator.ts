interface CVData {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    address: string;
  };
  experience: Array<{
    period: string;
    title: string;
    company: string;
    description: string[];
  }>;
  education: Array<{
    period: string;
    degree: string;
    institution: string;
    description: string;
  }>;
  skills: {
    technical: Record<string, string>;
    languages: Array<{
      name: string;
      level: string;
      description: string;
    }>;
  };
  certificates: string[];
  additional: string[];
  projects: Array<{
    name: string;
    description: string[];
  }>;
}

class GotenbergPDFGenerator {
  /**
   * Convert images to base64 for Gotenberg compatibility
   */
  private async convertImagesToBase64(html: string): Promise<string> {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const images = tempDiv.querySelectorAll("img");

    for (const img of images) {
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const reader = new FileReader();

        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
          };
        });

        reader.readAsDataURL(blob);
        img.src = await base64Promise;
      } catch (error) {
        console.warn("Failed to convert image to base64:", error);
        // Keep original src if conversion fails
      }
    }

    return tempDiv.innerHTML;
  }

  /**
   * Get rendered HTML from the DOM and prepare for Gotenberg
   */
  async getRenderedHTML(elementId: string = "cv-content"): Promise<string> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element not found: ${elementId}`);
    }

    // Get the actual rendered HTML
    let html = element.outerHTML;

    // Convert images to base64 for Gotenberg compatibility
    html = await this.convertImagesToBase64(html);

    // Get all stylesheets and inline them
    const styles = Array.from(document.styleSheets);
    let css = "";

    // Add the main CSS styles directly (from index.css)
    css += `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #374151;
            background-color: #f9fafb;
            font-size: 10pt;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0;
        }
        
        .cv-content {
            background: white;
            border-radius: 0.75rem;
            padding: 0.75rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            border: none;
            max-width: 210mm;
            margin: 0;
        }
        
        .personal-header {
            border-bottom: 4px solid #2563eb;
            padding-bottom: 0.75rem;
            margin-bottom: 1rem;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            width: 100%;
            flex-wrap: nowrap !important;
            gap: 1rem;
        }
        
        .personal-info {
            flex: 1;
            min-width: 0;
        }
        
        .personal-photo {
            flex-shrink: 0 !important;
            width: 100px;
            height: 100px;
            margin-left: auto;
            text-align: right !important;
        }
        
        .personal-info h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 0.25rem;
        }
        
        .personal-info p {
            margin-bottom: 0.15rem;
            color: #374151;
        }
        
        .personal-info .highlight {
            color: #2563eb;
            font-weight: 600;
        }
        
        .personal-photo {
            text-align: right;
        }
        
        .personal-photo img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #2563eb;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: block;
        }
        
        .section {
            margin-bottom: 1rem;
        }
        
        .section-title {
            font-size: 1rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 0.5rem;
            border-bottom: 2px solid #60a5fa;
            padding-bottom: 0.25rem;
            display: flex;
            align-items: center;
            page-break-after: avoid;
        }
        
        .section-title::before {
            content: '';
            width: 6px;
            height: 20px;
            background-color: #2563eb;
            margin-right: 0.5rem;
            border-radius: 2px;
        }
        
        .experience-card, .education-card {
            background-color: #f8fafc;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border-left: 3px solid #2563eb;
            margin-bottom: 0.75rem;
            page-break-inside: avoid;
        }
        
        .experience-header, .education-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.25rem;
            gap: 1rem;
        }
        
        .experience-info {
            flex: 1;
            min-width: 0;
        }
        
        .experience-title, .education-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1e3a8a;
            line-height: 1.3;
            margin-bottom: 0.05rem;
        }
        
        .experience-company, .education-institution {
            color: #1d4ed8;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .period-badge {
            background-color: #2563eb;
            color: white;
            padding: 0.15rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
            flex-shrink: 0;
        }
        
        .experience-list, .project-list {
            list-style: disc;
            padding-left: 1.25rem;
            color: #374151;
            font-size: 0.9rem;
        }
        
        .experience-list li, .project-list li {
            margin-bottom: 0.1rem;
        }
        
        .sidebar-card {
            background-color: #f8fafc;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            margin-bottom: 0.75rem;
            page-break-inside: avoid;
        }
        
        .skill-category-row {
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
        }
        
        .skill-label {
            color: #1e3a8a;
            font-weight: 600;
        }
        
        .skill-value {
            color: #374151;
        }
        
        .languages-grid {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
            page-break-inside: avoid;
        }
        
        .language-item {
            font-size: 0.75rem;
            white-space: nowrap;
            flex: none;
            text-align: left;
        }
        
        .language-name {
            font-weight: 600;
            color: #1e3a8a;
        }
        
        .language-level {
            color: #6b7280;
            font-size: 0.85rem;
            margin-left: 0.25rem;
        }
        
        .qualifications-list {
            list-style: none;
            padding: 0;
            page-break-inside: avoid;
        }
        
        .qualifications-list li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.15rem;
            font-size: 0.9rem;
            color: #374151;
        }
        
        .qualifications-list li::before {
            content: '•';
            color: #2563eb;
            margin-right: 0.5rem;
            font-weight: bold;
        }
        
        .project-card {
            background-color: white;
            padding: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            margin-bottom: 0.75rem;
            page-break-inside: avoid;
        }
        
        .project-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1e3a8a;
            margin-bottom: 0.25rem;
        }
        
        .cv-footer {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 2px solid #2563eb;
            text-align: center;
            font-size: 0.85rem;
            color: #6b7280;
            background: linear-gradient(to right, #f0f9ff, #ffffff);
            padding: 1rem 2rem;
            border-radius: 0 0 0.75rem 0.75rem;
            page-break-inside: avoid;
        }
        
        .footer-line {
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 0.1rem;
        }
        
        /* Fix for images in Gotenberg */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
    `;

    try {
      for (const sheet of styles) {
        try {
          for (const rule of sheet.cssRules) {
            css += rule.cssText + "\n";
          }
        } catch (e) {
          // Handle cross-origin stylesheets
          console.warn("Could not access stylesheet:", e);
        }
      }
    } catch (e) {
      console.warn("Error reading stylesheets:", e);
    }

    // Add print styles
    const printStyles = `
        @media print {
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: 100% !important;
            }
            .header { display: none !important; }
            .container { 
                padding: 0 !important; 
                margin: 0 !important; 
                max-width: none !important; 
                width: 100% !important;
            }
            .cv-content { 
                box-shadow: none !important; 
                border: none !important; 
                border-radius: 0 !important; 
                margin: 0 !important; 
                padding: 0 !important; /* Managed by @page margins */
                background: white !important; 
                max-width: none !important; 
                width: 100% !important;
            }
            .cv-footer { 
                background: white !important; 
                margin: 0 !important; 
                padding: 0.5rem 0 !important; 
                border-radius: 0 !important; 
            }
            section { page-break-inside: avoid; }
            h3 { page-break-after: avoid; }
            .experience-card, .education-card, .project-card, .sidebar-card, .languages-grid { page-break-inside: avoid; }
            
            /* Moderate spacing for 2-page layout */
            .section { margin-bottom: 1rem !important; }
            .personal-header { 
                margin-bottom: 1.25rem !important; 
                padding-bottom: 0.75rem !important; 
                display: flex !important; 
                flex-direction: row !important; 
                justify-content: space-between !important; 
            }
            .experience-card, .education-card, .project-card, .sidebar-card { margin-bottom: 0.75rem !important; }
            .section-title { margin-bottom: 0.5rem !important; }
            .experience-list li, .project-list li { margin-bottom: 0.15rem !important; }
            .qualifications-list li { margin-bottom: 0.15rem !important; }
            
            /* Typography adjustments */
            p { margin-bottom: 0.15rem !important; }
            .experience-title, .education-title { margin-bottom: 0.15rem !important; }
        }
        
        /* Ensure Gotenberg respects the A4 size and margins */
        @page {
            margin: 7mm 0mm;
            size: A4;
        }
    `;

    // Create full HTML document with inlined CSS
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV</title>
    <style>
        ${css}
        ${printStyles}
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
  }

  /**
   * Send HTML to Gotenberg for PDF generation
   * Following official documentation: POST /forms/chromium/convert/html with 'files' field
   */
  async generatePDF(
    elementId: string = "cv-content",
    gotenbergUrl: string = "http://localhost:7777",
    customFilename?: string,
  ): Promise<Blob | null> {
    try {
      const filename =
        customFilename || `CV-${new Date().toISOString().split("T")[0]}.pdf`;

      // Get the actual rendered HTML from DOM
      const html = await this.getRenderedHTML(elementId);

      // According to Gotenberg docs: use 'files' field with index.html
      const formData = new FormData();
      const htmlBlob = new Blob([html], { type: "text/html" });
      formData.append("files", htmlBlob, "index.html");
      formData.append("fileName", filename);

      const response = await fetch(
        `${gotenbergUrl}/forms/chromium/convert/html`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gotenberg response error:", errorText);
        throw new Error(
          `Gotenberg error: ${response.status} ${response.statusText}`,
        );
      }

      return await response.blob();
    } catch (error) {
      console.error("Gotenberg PDF generation error:", error);
      return null;
    }
  }

  /**
   * Download PDF blob
   */
  downloadPDF(pdfBlob: Blob, filename: string): void {
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Singleton instance
export const gotenbergGenerator = new GotenbergPDFGenerator();

// Export functions
export const generateCVPDFWithGotenberg = async (
  elementId: string = "cv-content",
  gotenbergUrl?: string,
  filename?: string,
): Promise<boolean> => {
  const pdfBlob = await gotenbergGenerator.generatePDF(
    elementId,
    gotenbergUrl,
    filename,
  );
  if (pdfBlob) {
    const finalFilename =
      filename ||
      `CV-Alexandre-Spindola-${new Date().toISOString().split("T")[0]}.pdf`;
    gotenbergGenerator.downloadPDF(pdfBlob, finalFilename);
    return true;
  }
  return false;
};

export const getHTMLForGotenberg = async (
  elementId: string = "cv-content",
): Promise<string> => {
  return await gotenbergGenerator.getRenderedHTML(elementId);
};

export default GotenbergPDFGenerator;
export type { CVData };
