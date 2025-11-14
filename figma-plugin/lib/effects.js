/**
 * Effect style creation from shadow tokens
 * Creates Figma Effect Styles from shadow definitions
 */

import { findEffectStyle, parseShadow } from './utils.js';

/**
 * Parse shadow tokens and create effect styles
 */
export async function createEffects(data, options = {}) {
  const { onProgress } = options;
  const variables = data.variables || {};
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  const shadows = variables.shadows || [];
  
  for (const shadowToken of shadows) {
    try {
      if (onProgress) onProgress(`Creating effect style: ${shadowToken.name}...`);
      
      const shadowString = shadowToken.value;
      const effect = parseShadow(shadowString);
      
      if (!effect) {
        results.errors.push(`Shadow ${shadowToken.name}: Could not parse shadow string`);
        continue;
      }
      
      // Extract shadow name (e.g., "shadow/md" -> "md")
      const shadowName = shadowToken.name.replace('shadow/', '');
      const styleName = `Shadow / ${shadowName}`;
      
      // Check if style already exists
      const existingStyle = findEffectStyle(styleName);
      
      if (existingStyle) {
        // Update existing style
        existingStyle.effects = [effect];
        results.updated++;
      } else {
        // Create new style
        const effectStyle = figma.createEffectStyle();
        effectStyle.name = styleName;
        effectStyle.effects = [effect];
        if (shadowToken.description) {
          effectStyle.description = shadowToken.description;
        }
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Effect ${shadowToken.name}: ${error.message}`);
    }
  }

  return results;
}

