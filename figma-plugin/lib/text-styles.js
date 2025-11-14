/**
 * Text style creation from typography tokens
 * Creates Figma Text Styles from typography scale definitions
 */

import { findTextStyle, remToPx } from './utils.js';

/**
 * Parse typography tokens and create text styles
 */
export async function createTextStyles(data, options = {}) {
  const { onProgress } = options;
  const variables = data.variables || {};
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  // Get font family from metadata or default to Inter
  // Extract from font_stack if it's a string like "Inter, -apple-system..."
  let fontFamily = 'Inter';
  if (data.metadata?.fontFamily) {
    fontFamily = data.metadata.fontFamily;
  } else if (data.typography?.font_stack) {
    // Extract first font from font stack
    const fontStack = data.typography.font_stack;
    const match = fontStack.match(/^([^,]+)/);
    if (match) {
      fontFamily = match[1].trim();
    }
  }
  
  // Group typography tokens by scale
  const typographyTokens = variables.typography || [];
  const scales = {};
  
  for (const token of typographyTokens) {
    const match = token.name.match(/^typography\/([^/]+)\/(.+)$/);
    if (match) {
      const [, scale, property] = match;
      if (!scales[scale]) {
        scales[scale] = {};
      }
      scales[scale][property] = token.value;
    }
  }

  // Create text styles for each scale
  for (const [scale, props] of Object.entries(scales)) {
    try {
      if (onProgress) onProgress(`Creating text style: ${scale}...`);
      
      const size = props.size ? remToPx(props.size) : 16;
      const weight = props.weight || 400;
      const lineHeight = props.lineHeight ? { value: props.lineHeight * 100, unit: 'PERCENT' } : { value: 100, unit: 'PERCENT' };
      
      // Determine if it's a heading or body text
      const isHeading = ['xl', '2xl', '3xl', '5xl', '6xl'].includes(scale);
      const category = isHeading ? 'Headings' : 'Body';
      const styleName = `${category} / ${scale}`;
      
      // Check if style already exists
      const existingStyle = findTextStyle(styleName);
      
      if (existingStyle) {
        // Update existing style
        existingStyle.fontSize = size;
        existingStyle.fontName = { family: fontFamily, style: getFontStyle(weight) };
        existingStyle.lineHeight = lineHeight;
        results.updated++;
      } else {
        // Create new style
        const textStyle = figma.createTextStyle();
        textStyle.name = styleName;
        textStyle.fontSize = size;
        textStyle.fontName = { family: fontFamily, style: getFontStyle(weight) };
        textStyle.lineHeight = lineHeight;
        textStyle.letterSpacing = { value: 0, unit: 'PIXELS' };
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Text Style ${scale}: ${error.message}`);
    }
  }

  return results;
}

/**
 * Get font style name from weight
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

