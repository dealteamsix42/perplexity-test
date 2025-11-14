#!/usr/bin/env node
/**
 * Documentation Generator
 * Generates visual documentation for the design system
 * 
 * Outputs:
 *   - Component showcase HTML page
 *   - Color palette reference
 *   - Typography scale examples
 *   - Social media template previews
 * 
 * Usage:
 *   node scripts/generate-docs.js --output=docs/
 */

const fs = require('fs');
const path = require('path');

// Load design tokens
const designSystem = require('../design.json');

// Parse command line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    args[key.replace('--', '')] = value;
  });
  return args;
}

// Generate color palette documentation
function generateColorPaletteDocs() {
  const { color_system } = designSystem;
  
  let html = '<div class="section"><h2>Color Palette</h2>\n';
  
  // Neutral colors
  html += '<h3>Neutral Scale</h3><div class="color-grid">\n';
  Object.entries(color_system.palette.neutral).forEach(([shade, hex]) => {
    html += `
      <div class="color-swatch">
        <div class="color-box" style="background-color: ${hex}"></div>
        <div class="color-label">
          <strong>neutral-${shade}</strong>
          <span>${hex}</span>
        </div>
      </div>\n`;
  });
  html += '</div>\n';
  
  // Brand colors
  html += '<h3>Brand Colors</h3><div class="color-grid">\n';
  Object.entries(color_system.palette.brand).forEach(([name, hex]) => {
    html += `
      <div class="color-swatch">
        <div class="color-box" style="background-color: ${hex}"></div>
        <div class="color-label">
          <strong>${name}</strong>
          <span>${hex}</span>
        </div>
      </div>\n`;
  });
  html += '</div>\n';
  
  html += '</div>\n';
  return html;
}

// Generate typography documentation
function generateTypographyDocs() {
  const { typography } = designSystem;
  
  let html = '<div class="section"><h2>Typography</h2>\n';
  html += `<p class="subtitle">Font Family: ${typography.font_stack}</p>\n`;
  
  html += '<div class="typography-samples">\n';
  Object.entries(typography.scales).forEach(([scale, props]) => {
    html += `
      <div class="typography-sample">
        <div class="type-example" style="
          font-size: ${props.size};
          font-weight: ${props.weight};
          line-height: ${props.line_height};
          ${props.letter_spacing ? `letter-spacing: ${props.letter_spacing};` : ''}
        ">
          The quick brown fox jumps over the lazy dog
        </div>
        <div class="type-meta">
          <strong>${scale}</strong> - ${props.size} / ${props.weight} / ${props.use}
        </div>
      </div>\n`;
  });
  html += '</div></div>\n';
  
  return html;
}

// Generate component showcase
function generateComponentShowcase() {
  let html = '<div class="section"><h2>Components</h2>\n';
  
  const components = [
    { name: 'Container', description: 'Max-width wrapper with horizontal padding' },
    { name: 'Section', description: 'Full-width section with vertical spacing' },
    { name: 'CardDark', description: 'Premium dark gradient card for case studies' },
    { name: 'CardLight', description: 'Clean light testimonial card' },
    { name: 'GridLayout', description: 'Responsive grid system' },
    { name: 'Button', description: 'CTA buttons with variants' },
    { name: 'Heading', description: 'Semantic headings with responsive scales' },
    { name: 'Text', description: 'Body text with size variants' },
  ];
  
  html += '<div class="component-grid">\n';
  components.forEach(comp => {
    html += `
      <div class="component-card">
        <h3>${comp.name}</h3>
        <p>${comp.description}</p>
        <code>import { ${comp.name} } from './components';</code>
      </div>\n`;
  });
  html += '</div></div>\n';
  
  return html;
}

// Generate full HTML documentation
function generateHTMLDocs(outputPath) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${designSystem.metadata.name} - Design System Documentation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${designSystem.typography.font_stack};
      background: #FFFFFF;
      color: #0F172A;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #001A33 0%, #1E1B4B 50%, #2D1B69 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }
    .header h1 {
      font-size: 3rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .header p {
      font-size: 1.25rem;
      opacity: 0.9;
    }
    .container {
      max-width: 80rem;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .section {
      padding: 4rem 0;
      border-bottom: 1px solid #E2E8F0;
    }
    .section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 2rem 0 1rem;
    }
    .subtitle {
      color: #64748B;
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .color-swatch {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .color-box {
      width: 100%;
      height: 80px;
      border-radius: 0.75rem;
      border: 1px solid #E2E8F0;
    }
    .color-label {
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
    }
    .color-label strong {
      font-weight: 500;
    }
    .color-label span {
      color: #64748B;
    }
    .typography-samples {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin: 2rem 0;
    }
    .typography-sample {
      border: 1px solid #E2E8F0;
      border-radius: 0.75rem;
      padding: 2rem;
    }
    .type-example {
      margin-bottom: 1rem;
    }
    .type-meta {
      font-size: 0.875rem;
      color: #64748B;
    }
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .component-card {
      border: 1px solid #E2E8F0;
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .component-card h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    .component-card code {
      background: #F1F5F9;
      padding: 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      margin-top: auto;
    }
    .footer {
      background: #F9FAFB;
      padding: 2rem;
      text-align: center;
      color: #64748B;
      margin-top: 4rem;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${designSystem.metadata.name}</h1>
    <p>${designSystem.metadata.description}</p>
    <p style="margin-top: 1rem; font-size: 1rem;">Version ${designSystem.metadata.version}</p>
  </div>
  
  <div class="container">
    ${generateColorPaletteDocs()}
    ${generateTypographyDocs()}
    ${generateComponentShowcase()}
  </div>
  
  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString()} by Design System Documentation Generator</p>
    <p>Framework: ${designSystem.metadata.framework} | Styling: ${designSystem.metadata.styling}</p>
  </div>
</body>
</html>`;
  
  const docsPath = path.join(outputPath, 'index.html');
  fs.writeFileSync(docsPath, html);
  console.log(`✅ Documentation generated: ${docsPath}`);
  
  return docsPath;
}

// Main execution
function main() {
  console.log('📚 Design System Documentation Generator\n');
  
  const args = parseArgs();
  const outputPath = args.output || './docs/';
  
  // Create output directory
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  console.log(`📂 Output: ${outputPath}\n`);
  console.log('🎨 Generating documentation...\n');
  
  // Generate HTML docs
  const docsPath = generateHTMLDocs(outputPath);
  
  console.log('\n✨ Documentation complete!\n');
  console.log(`Open ${docsPath} in your browser to view.`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { generateHTMLDocs };
