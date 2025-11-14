#!/usr/bin/env node

/**
 * Converts design.json tokens to Figma Variables format
 * This script creates a JSON structure that can be used with Figma Variables API
 * or imported via a Figma plugin
 */

const fs = require('fs');
const path = require('path');

// Read design.json
const designJsonPath = path.join(__dirname, '..', 'design.json');
const designData = JSON.parse(fs.readFileSync(designJsonPath, 'utf8'));

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

/**
 * Convert rem/px to number
 */
function parseSize(value) {
  if (typeof value === 'string') {
    const match = value.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }
  return value;
}

/**
 * Build Figma Variables structure
 */
function buildFigmaVariables() {
  const variables = {
    colors: [],
    spacing: [],
    typography: [],
    shadows: [],
    borderRadius: [],
    animations: []
  };

  // Convert color palette
  if (designData.color_system?.palette) {
    const { neutral, semantic, brand } = designData.color_system.palette;

    // Neutral colors
    if (neutral) {
      Object.entries(neutral).forEach(([key, value]) => {
        const rgb = hexToRgb(value);
        if (rgb) {
          variables.colors.push({
            name: `neutral/${key}`,
            value: rgb,
            description: `Neutral color ${key} from design system`,
            type: 'COLOR'
          });
        }
      });
    }

    // Semantic colors
    if (semantic) {
      Object.entries(semantic).forEach(([key, value]) => {
        const rgb = hexToRgb(value);
        if (rgb) {
          variables.colors.push({
            name: `semantic/${key}`,
            value: rgb,
            description: `Semantic color: ${key}`,
            type: 'COLOR'
          });
        }
      });
    }

    // Brand colors
    if (brand) {
      Object.entries(brand).forEach(([key, value]) => {
        const rgb = hexToRgb(value);
        if (rgb) {
          variables.colors.push({
            name: `brand/${key}`,
            value: rgb,
            description: `Brand color: ${key}`,
            type: 'COLOR'
          });
        }
      });
    }
  }

  // Convert spacing
  if (designData.spacing) {
    const { base_unit, layout_spacing } = designData.spacing;
    
    if (layout_spacing) {
      Object.entries(layout_spacing).forEach(([key, value]) => {
        const size = parseSize(value);
        if (size > 0) {
          variables.spacing.push({
            name: `spacing/${key}`,
            value: size,
            unit: 'PIXELS',
            description: `Spacing: ${key}`,
            type: 'FLOAT'
          });
        }
      });
    }
  }

  // Convert typography scales
  if (designData.typography?.scales) {
    Object.entries(designData.typography.scales).forEach(([key, scale]) => {
      const size = parseSize(scale.size);
      if (size > 0) {
        variables.typography.push({
          name: `typography/${key}/size`,
          value: size,
          unit: 'PIXELS',
          description: `Font size for ${key}`,
          type: 'FLOAT'
        });
      }

      if (scale.weight) {
        variables.typography.push({
          name: `typography/${key}/weight`,
          value: scale.weight,
          description: `Font weight for ${key}`,
          type: 'FLOAT'
        });
      }

      if (scale.line_height) {
        variables.typography.push({
          name: `typography/${key}/lineHeight`,
          value: scale.line_height,
          description: `Line height for ${key}`,
          type: 'FLOAT'
        });
      }
    });
  }

  // Convert border radius
  if (designData.border_radius) {
    Object.entries(designData.border_radius).forEach(([key, value]) => {
      const size = parseSize(value);
      if (size > 0) {
        variables.borderRadius.push({
          name: `radius/${key}`,
          value: size,
          unit: 'PIXELS',
          description: `Border radius: ${key}`,
          type: 'FLOAT'
        });
      }
    });
  }

  // Convert shadows (as strings for now, Figma handles shadows differently)
  if (designData.shadows) {
    Object.entries(designData.shadows).forEach(([key, value]) => {
      if (key !== 'usage' && typeof value === 'string') {
        variables.shadows.push({
          name: `shadow/${key}`,
          value: value,
          description: `Shadow: ${key}`,
          type: 'STRING'
        });
      }
    });
  }

  return variables;
}

/**
 * Generate Figma plugin compatible format
 */
function generateFigmaPluginFormat(variables) {
  const output = {
    version: '1.0.0',
    metadata: {
      name: designData.metadata?.name || 'Design System Tokens',
      version: designData.metadata?.version || '1.0.0',
      description: designData.metadata?.description || 'Design tokens from design.json',
      fontFamily: designData.typography?.font_stack || 'Inter'
    },
    variables: {
      color: variables.colors,
      spacing: variables.spacing,
      typography: variables.typography,
      borderRadius: variables.borderRadius,
      shadows: variables.shadows
    },
    gradients: designData.color_system?.gradients || {},
    components: designData.components || {}
  };

  // Include export presets if available
  const exportPresetsPath = path.join(__dirname, '..', 'figma', 'export-presets.json');
  if (fs.existsSync(exportPresetsPath)) {
    try {
      output.exportPresets = JSON.parse(fs.readFileSync(exportPresetsPath, 'utf8'));
    } catch (error) {
      console.warn('Could not read export-presets.json:', error.message);
    }
  }

  // Include templates if available
  const templatesDir = path.join(__dirname, '..', 'figma-templates');
  if (fs.existsSync(templatesDir)) {
    try {
      const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));
      const templates = {};
      for (const file of templateFiles) {
        const templatePath = path.join(templatesDir, file);
        const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
        const templateName = file.replace('.json', '').replace('-template', '');
        templates[templateName] = templateData;
      }
      if (Object.keys(templates).length > 0) {
        output.templates = templates;
      }
    } catch (error) {
      console.warn('Could not read templates:', error.message);
    }
  }

  return output;
}

// Main execution
try {
  const variables = buildFigmaVariables();
  const figmaFormat = generateFigmaPluginFormat(variables);

  // Write output files
  const outputDir = path.join(__dirname, '..', 'figma');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write Figma Variables format
  const variablesPath = path.join(outputDir, 'figma-variables.json');
  fs.writeFileSync(variablesPath, JSON.stringify(figmaFormat, null, 2));
  console.log(`✅ Generated Figma Variables: ${variablesPath}`);

  // Write summary
  const summary = {
    total: {
      colors: variables.colors.length,
      spacing: variables.spacing.length,
      typography: variables.typography.length,
      borderRadius: variables.borderRadius.length,
      shadows: variables.shadows.length
    },
    generated: new Date().toISOString()
  };

  const summaryPath = path.join(outputDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`✅ Generated summary: ${summaryPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Colors: ${summary.total.colors}`);
  console.log(`   Spacing: ${summary.total.spacing}`);
  console.log(`   Typography: ${summary.total.typography}`);
  console.log(`   Border Radius: ${summary.total.borderRadius}`);
  console.log(`   Shadows: ${summary.total.shadows}`);

} catch (error) {
  console.error('❌ Error converting tokens:', error);
  process.exit(1);
}

