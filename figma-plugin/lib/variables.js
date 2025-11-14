/**
 * Enhanced variable sync logic
 * Handles creation and updates of Figma Variables from design tokens
 */

import { getOrCreateCollection, findVariable } from './utils.js';

/**
 * Sync variables to Figma
 */
export async function syncVariables(data, options = {}) {
  const { onProgress } = options;
  const variables = data.variables || {};
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  // Get or create variable collections
  const colorCollection = getOrCreateCollection('Design Tokens - Colors');
  const spacingCollection = getOrCreateCollection('Design Tokens - Spacing');
  const typographyCollection = getOrCreateCollection('Design Tokens - Typography');
  const radiusCollection = getOrCreateCollection('Design Tokens - Border Radius');
  const shadowCollection = getOrCreateCollection('Design Tokens - Shadows');
  const animationCollection = getOrCreateCollection('Design Tokens - Animations');

  // Ensure collections have at least one mode (they should be created with one by default)
  // If a collection was found (not created), it should already have modes

  // Sync colors
  if (variables.color && Array.isArray(variables.color)) {
    if (onProgress) onProgress('Syncing colors...');
    for (const colorToken of variables.color) {
      try {
        const rgb = colorToken.value;
        const existingVar = findVariable(colorToken.name, 'COLOR');

        if (existingVar) {
          // Update existing variable
          const modeId = colorCollection.modes[0].modeId;
          existingVar.setValueForMode(modeId, rgb);
          results.updated++;
        } else {
          // Create new variable
          const variable = figma.variables.createVariable(colorToken.name, colorCollection, 'COLOR');
          const modeId = colorCollection.modes[0].modeId;
          variable.setValueForMode(modeId, rgb);
          if (colorToken.description) {
            variable.description = colorToken.description;
          }
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Color ${colorToken.name}: ${error.message}`);
      }
    }
  }

  // Sync spacing
  if (variables.spacing && Array.isArray(variables.spacing)) {
    if (onProgress) onProgress('Syncing spacing...');
    for (const spacingToken of variables.spacing) {
      try {
        const value = spacingToken.value;
        const existingVar = findVariable(spacingToken.name, 'FLOAT');

        if (existingVar) {
          const modeId = spacingCollection.modes[0].modeId;
          existingVar.setValueForMode(modeId, value);
          results.updated++;
        } else {
          const variable = figma.variables.createVariable(spacingToken.name, spacingCollection, 'FLOAT');
          const modeId = spacingCollection.modes[0].modeId;
          variable.setValueForMode(modeId, value);
          if (spacingToken.description) {
            variable.description = spacingToken.description;
          }
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Spacing ${spacingToken.name}: ${error.message}`);
      }
    }
  }

  // Sync typography
  if (variables.typography && Array.isArray(variables.typography)) {
    if (onProgress) onProgress('Syncing typography...');
    for (const typoToken of variables.typography) {
      try {
        const value = typoToken.value;
        const existingVar = findVariable(typoToken.name, 'FLOAT');

        if (existingVar) {
          const modeId = typographyCollection.modes[0].modeId;
          existingVar.setValueForMode(modeId, value);
          results.updated++;
        } else {
          const variable = figma.variables.createVariable(typoToken.name, typographyCollection, 'FLOAT');
          const modeId = typographyCollection.modes[0].modeId;
          variable.setValueForMode(modeId, value);
          if (typoToken.description) {
            variable.description = typoToken.description;
          }
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Typography ${typoToken.name}: ${error.message}`);
      }
    }
  }

  // Sync border radius
  if (variables.borderRadius && Array.isArray(variables.borderRadius)) {
    if (onProgress) onProgress('Syncing border radius...');
    for (const radiusToken of variables.borderRadius) {
      try {
        const value = radiusToken.value;
        const existingVar = findVariable(radiusToken.name, 'FLOAT');

        if (existingVar) {
          const modeId = radiusCollection.modes[0].modeId;
          existingVar.setValueForMode(modeId, value);
          results.updated++;
        } else {
          const variable = figma.variables.createVariable(radiusToken.name, radiusCollection, 'FLOAT');
          const modeId = radiusCollection.modes[0].modeId;
          variable.setValueForMode(modeId, value);
          if (radiusToken.description) {
            variable.description = radiusToken.description;
          }
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Border Radius ${radiusToken.name}: ${error.message}`);
      }
    }
  }

  // Sync shadows (as STRING variables since Figma doesn't support shadow variables directly)
  if (variables.shadows && Array.isArray(variables.shadows)) {
    if (onProgress) onProgress('Syncing shadows...');
    for (const shadowToken of variables.shadows) {
      try {
        const value = shadowToken.value;
        const existingVar = findVariable(shadowToken.name, 'STRING');

        if (existingVar) {
          const modeId = shadowCollection.modes[0].modeId;
          existingVar.setValueForMode(modeId, value);
          results.updated++;
        } else {
          const variable = figma.variables.createVariable(shadowToken.name, shadowCollection, 'STRING');
          const modeId = shadowCollection.modes[0].modeId;
          variable.setValueForMode(modeId, value);
          if (shadowToken.description) {
            variable.description = shadowToken.description;
          }
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Shadow ${shadowToken.name}: ${error.message}`);
      }
    }
  }

  return results;
}

