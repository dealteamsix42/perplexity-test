/**
 * Template import functionality
 * Imports social media template JSON files as Figma components with platform variants
 */

import { hexToRgb, findPaintStyle, findEffectStyle } from './utils.js';

/**
 * Create templates from template definitions
 * Note: This function expects template data to be passed in, not read from files
 * (Figma plugins can't read local files directly)
 */
export async function createTemplates(templateData, exportPresets, options = {}) {
  const { onProgress } = options;
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  // Get or create Templates page
  let templatesPage = figma.root.children.find(page => page.type === 'PAGE' && page.name === 'Social Media Templates');
  if (!templatesPage) {
    templatesPage = figma.createPage();
    templatesPage.name = 'Social Media Templates';
  }

  // Process each template
  for (const [templateName, templateDef] of Object.entries(templateData)) {
    try {
      if (onProgress) onProgress(`Creating template: ${templateName}...`);
      
      await createTemplateComponent(templatesPage, templateName, templateDef, exportPresets);
      results.created++;
    } catch (error) {
      results.errors.push(`Template ${templateName}: ${error.message}`);
    }
  }

  return results;
}

/**
 * Create a template component from definition
 */
async function createTemplateComponent(parent, templateName, templateDef, exportPresets) {
  const variants = templateDef.variants || {};
  const structure = templateDef.structure || {};
  const autoLayout = templateDef.autoLayout || {};

  // Get platform dimensions from export presets
  const platforms = variants.platform || ['linkedin'];
  const dimensions = getPlatformDimensions(platforms, exportPresets);

  // Create component set if multiple variants
  let componentSet = null;
  if (Object.keys(variants).length > 0) {
    // Create first variant to establish component set
    const firstPlatform = platforms[0];
    const firstDim = dimensions[firstPlatform];
    const firstComponent = await createTemplateVariant(
      templateName,
      templateDef,
      firstPlatform,
      firstDim,
      autoLayout
    );
    
    // Convert to component set
    componentSet = figma.combineAsVariants([firstComponent], parent);
    componentSet.name = templateName;

    // Add variant properties
    if (variants.platform) {
      firstComponent.addComponentProperty('platform', 'VARIANT', 
        createVariantOptions(variants.platform));
    }
    if (variants.gradient) {
      firstComponent.addComponentProperty('gradient', 'VARIANT',
        createVariantOptions(variants.gradient));
    }

    // Create remaining variants
    for (let i = 1; i < platforms.length; i++) {
      const platform = platforms[i];
      const dim = dimensions[platform];
      const variant = await createTemplateVariant(
        templateName,
        templateDef,
        platform,
        dim,
        autoLayout
      );
      
      // Add to component set
      parent.appendChild(variant);
      figma.combineAsVariants([variant], parent);
      
      // Set variant properties
      variant.addComponentProperty('platform', 'VARIANT',
        createVariantOptions(variants.platform));
      if (variants.gradient) {
        variant.addComponentProperty('gradient', 'VARIANT',
          createVariantOptions(variants.gradient));
      }
    }
  } else {
    // Single component (no variants)
    const defaultDim = dimensions[Object.keys(dimensions)[0]] || { width: 1200, height: 630 };
    const component = await createTemplateVariant(
      templateName,
      templateDef,
      'default',
      defaultDim,
      autoLayout
    );
    parent.appendChild(component);
  }

  return componentSet || parent.children[parent.children.length - 1];
}

/**
 * Create a single template variant
 */
async function createTemplateVariant(templateName, templateDef, platform, dimensions, autoLayout) {
  const component = figma.createComponent();
  component.name = `${templateName} / ${platform}`;
  component.resize(dimensions.width, dimensions.height);

  // Apply auto-layout if specified
  if (autoLayout.mode) {
    component.layoutMode = autoLayout.mode.toUpperCase();
    if (autoLayout.paddingLeft) component.paddingLeft = autoLayout.paddingLeft;
    if (autoLayout.paddingRight) component.paddingRight = autoLayout.paddingRight;
    if (autoLayout.paddingTop) component.paddingTop = autoLayout.paddingTop;
    if (autoLayout.paddingBottom) component.paddingBottom = autoLayout.paddingBottom;
    if (autoLayout.itemSpacing) component.itemSpacing = autoLayout.itemSpacing;
  }

  // Build structure from layers
  const structure = templateDef.structure || {};
  const layers = structure.layers || [];

  for (const layerDef of layers) {
    const layer = await createLayer(layerDef, dimensions);
    if (layer) {
      component.appendChild(layer);
    }
  }

  // Apply export settings
  if (dimensions.exportSettings) {
    component.exportSettings = dimensions.exportSettings;
  }

  return component;
}

/**
 * Create a layer from definition
 */
async function createLayer(layerDef, dimensions) {
  let layer = null;

  switch (layerDef.type) {
    case 'RECTANGLE':
      layer = figma.createRectangle();
      break;
    case 'FRAME':
      layer = figma.createFrame();
      break;
    case 'TEXT':
      layer = figma.createText();
      break;
    case 'IMAGE':
      layer = figma.createRectangle(); // Placeholder for image
      layer.name = layerDef.name;
      break;
    default:
      return null;
  }

  layer.name = layerDef.name;

  // Set dimensions
  if (layerDef.width) {
    const width = parseDimension(layerDef.width, dimensions.width);
    layer.resize(width, layer.height || 100);
  }
  if (layerDef.height) {
    const height = parseDimension(layerDef.height, dimensions.height);
    layer.resize(layer.width || 100, height);
  }

  // Set position
  if (layerDef.x !== undefined) {
    layer.x = parseDimension(layerDef.x, dimensions.width);
  }
  if (layerDef.y !== undefined) {
    layer.y = parseDimension(layerDef.y, dimensions.height);
  }

  // Apply fills
  if (layerDef.fills) {
    layer.fills = await parseFills(layerDef.fills);
  }

  // Apply strokes
  if (layerDef.strokes) {
    layer.strokes = await parseFills(layerDef.strokes);
    if (layerDef.strokeWeight) {
      layer.strokeWeight = layerDef.strokeWeight;
    }
  }

  // Apply effects
  if (layerDef.effects) {
    layer.effects = layerDef.effects;
  }

  // Apply corner radius
  if (layerDef.cornerRadius) {
    layer.cornerRadius = layerDef.cornerRadius;
  }

  // Text-specific properties
  if (layerDef.type === 'TEXT') {
    await applyTextProperties(layer, layerDef);
  }

  // Frame-specific properties
  if (layerDef.type === 'FRAME') {
    if (layerDef.layoutMode) {
      layer.layoutMode = layerDef.layoutMode.toUpperCase();
    }
    if (layerDef.itemSpacing) {
      layer.itemSpacing = layerDef.itemSpacing;
    }
    if (layerDef.primaryAxisAlignItems) {
      layer.primaryAxisAlignItems = layerDef.primaryAxisAlignItems.toUpperCase();
    }
    if (layerDef.counterAxisAlignItems) {
      layer.counterAxisAlignItems = layerDef.counterAxisAlignItems.toUpperCase();
    }

    // Create children
    if (layerDef.children) {
      for (const childDef of layerDef.children) {
        const child = await createLayer(childDef, dimensions);
        if (child) {
          layer.appendChild(child);
        }
      }
    }
  }

  // Constraints
  if (layerDef.constraints) {
    layer.constraints = {
      horizontal: layerDef.constraints.horizontal.toUpperCase(),
      vertical: layerDef.constraints.vertical.toUpperCase()
    };
  }

  return layer;
}

/**
 * Apply text properties to a text node
 */
async function applyTextProperties(textNode, textDef) {
  try {
    // Load font
    const fontSize = textDef.fontSize || 16;
    const fontWeight = textDef.fontWeight || 400;
    const fontStyle = getFontStyle(fontWeight);
    
    await figma.loadFontAsync({ family: 'Inter', style: fontStyle });

    // Set text content
    if (textDef.characters) {
      textNode.characters = textDef.characters;
    }

    // Set font properties
    textNode.fontSize = fontSize;
    textNode.fontName = { family: 'Inter', style: fontStyle };

    // Line height
    if (textDef.lineHeight) {
      if (typeof textDef.lineHeight === 'object') {
        textNode.lineHeight = textDef.lineHeight;
      } else {
        textNode.lineHeight = { value: textDef.lineHeight * 100, unit: 'PERCENT' };
      }
    }

    // Letter spacing
    if (textDef.letterSpacing) {
      textNode.letterSpacing = textDef.letterSpacing;
    }

    // Text align
    if (textDef.textAlignHorizontal) {
      textNode.textAlignHorizontal = textDef.textAlignHorizontal.toUpperCase();
    }

    // Text case
    if (textDef.textCase) {
      textNode.textCase = textDef.textCase.toUpperCase();
    }
  } catch (error) {
    console.warn(`Could not apply text properties: ${error.message}`);
  }
}

/**
 * Parse fills (colors, gradients)
 */
async function parseFills(fills) {
  return fills.map(fill => {
    if (fill.type === 'SOLID') {
      return fill;
    } else if (fill.type === 'GRADIENT_LINEAR') {
      return fill;
    }
    return fill;
  });
}

/**
 * Parse dimension value (can be number or template string like "{{PLATFORM_WIDTH - 120}}")
 */
function parseDimension(value, baseValue) {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    // Handle template strings
    const match = value.match(/\{\{PLATFORM_WIDTH\s*([+\-])\s*(\d+)\}\}/);
    if (match) {
      const [, op, num] = match;
      return op === '+' ? baseValue + parseInt(num) : baseValue - parseInt(num);
    }
    const match2 = value.match(/\{\{PLATFORM_HEIGHT\s*([+\-])\s*(\d+)\}\}/);
    if (match2) {
      const [, op, num] = match2;
      return op === '+' ? baseValue + parseInt(num) : baseValue - parseInt(num);
    }
    // Try to parse as number
    const parsed = parseFloat(value);
    return isNaN(parsed) ? baseValue : parsed;
  }
  return baseValue;
}

/**
 * Get platform dimensions from export presets
 */
function getPlatformDimensions(platforms, exportPresets) {
  const dimensions = {};
  const presets = exportPresets?.presets || {};

  for (const platform of platforms) {
    const preset = presets[platform] || presets['linkedin'];
    if (preset && preset.dimensions) {
      dimensions[platform] = {
        width: preset.dimensions.width,
        height: preset.dimensions.height,
        exportSettings: [{
          format: preset.format || 'PNG',
          suffix: preset.suffix || '',
          constraint: {
            type: 'SCALE',
            value: preset.scale || 2
          }
        }]
      };
    } else {
      // Default dimensions
      dimensions[platform] = {
        width: 1200,
        height: 630,
        exportSettings: [{
          format: 'PNG',
          suffix: '',
          constraint: { type: 'SCALE', value: 2 }
        }]
      };
    }
  }

  return dimensions;
}

/**
 * Create variant options object
 */
function createVariantOptions(values) {
  const options = {};
  for (const value of values) {
    const label = value.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');
    options[value] = label;
  }
  return options;
}

/**
 * Get font style from weight
 */
function getFontStyle(weight) {
  const weightMap = {
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold'
  };
  return weightMap[weight] || 'Regular';
}

