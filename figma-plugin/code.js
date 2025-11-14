/**
 * Figma Plugin: Design Token Sync
 * Enhanced version with full design system import capabilities
 */

// Import modules
import { syncVariables } from './lib/variables.js';
import { createTextStyles } from './lib/text-styles.js';
import { createEffects } from './lib/effects.js';
import { createGradients } from './lib/gradients.js';
import { createComponents } from './lib/components.js';
import { createTemplates } from './lib/templates.js';

// Show the plugin UI
figma.showUI(__html__, { width: 450, height: 700 });

// Handle messages from UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'load-tokens') {
    await handleImport(msg.tokens, msg.options);
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

/**
 * Main import handler
 */
async function handleImport(tokenData, options = {}) {
  const {
    importVariables = true,
    importTextStyles = true,
    importEffects = true,
    importGradients = true,
    importComponents = true,
    importTemplates = true
  } = options;

  const results = {
    variables: { created: 0, updated: 0, errors: [] },
    textStyles: { created: 0, updated: 0, errors: [] },
    effects: { created: 0, updated: 0, errors: [] },
    gradients: { created: 0, updated: 0, errors: [] },
    components: { created: 0, updated: 0, errors: [] },
    templates: { created: 0, updated: 0, errors: [] }
  };

  try {
    // Progress callback
    const onProgress = (message) => {
      figma.ui.postMessage({
        type: 'progress',
        message: message
      });
    };

    // Import Variables
    if (importVariables) {
      figma.ui.postMessage({ type: 'progress', message: 'Importing variables...' });
      results.variables = await syncVariables(tokenData, { onProgress });
    }

    // Import Text Styles
    if (importTextStyles) {
      figma.ui.postMessage({ type: 'progress', message: 'Creating text styles...' });
      results.textStyles = await createTextStyles(tokenData, { onProgress });
    }

    // Import Effects
    if (importEffects) {
      figma.ui.postMessage({ type: 'progress', message: 'Creating effect styles...' });
      results.effects = await createEffects(tokenData, { onProgress });
    }

    // Import Gradients
    if (importGradients) {
      figma.ui.postMessage({ type: 'progress', message: 'Creating gradient styles...' });
      results.gradients = await createGradients(tokenData, { onProgress });
    }

    // Import Components
    if (importComponents) {
      figma.ui.postMessage({ type: 'progress', message: 'Creating components...' });
      results.components = await createComponents(tokenData, { onProgress });
    }

    // Import Templates
    if (importTemplates && tokenData.templates) {
      figma.ui.postMessage({ type: 'progress', message: 'Creating templates...' });
      const exportPresets = tokenData.exportPresets || {};
      results.templates = await createTemplates(tokenData.templates, exportPresets, { onProgress });
    }

    // Calculate totals
    const totalCreated = Object.values(results).reduce((sum, r) => sum + r.created, 0);
    const totalUpdated = Object.values(results).reduce((sum, r) => sum + r.updated, 0);
    const allErrors = Object.values(results).flatMap(r => r.errors);

    // Send completion message
    figma.ui.postMessage({
      type: 'sync-complete',
      results: results,
      created: totalCreated,
      updated: totalUpdated,
      errors: allErrors
    });

  } catch (error) {
    figma.ui.postMessage({
      type: 'sync-error',
      error: error.message
    });
  }
}
