/**
 * Gradient paint style creation
 * Creates Figma Paint Styles from gradient definitions
 */

import { findPaintStyle, hexToRgb, parseGradientAngle } from './utils.js';

/**
 * Parse gradient definitions and create paint styles
 */
export async function createGradients(data, options = {}) {
  const { onProgress } = options;
  const gradients = data.gradients || {};
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  for (const [gradientName, gradientDef] of Object.entries(gradients)) {
    try {
      if (onProgress) onProgress(`Creating gradient: ${gradientName}...`);
      
      const stops = gradientDef.stops || [];
      const angle = gradientDef.angle || '0deg';
      
      // Convert hex stops to RGB gradient stops
      const gradientStops = stops.map((stop, index) => {
        const rgb = hexToRgb(stop);
        if (!rgb) {
          throw new Error(`Invalid color: ${stop}`);
        }
        return {
          position: index / (stops.length - 1),
          color: { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 }
        };
      });
      
      // Parse angle to transform matrix
      const gradientTransform = parseGradientAngle(angle);
      
      // Create gradient paint
      const paint = {
        type: 'GRADIENT_LINEAR',
        gradientTransform: gradientTransform,
        gradientStops: gradientStops
      };
      
      // Format style name
      const styleName = `Gradient / ${formatGradientName(gradientName)}`;
      
      // Check if style already exists
      const existingStyle = findPaintStyle(styleName);
      
      if (existingStyle) {
        // Update existing style
        existingStyle.paints = [paint];
        results.updated++;
      } else {
        // Create new style
        const paintStyle = figma.createPaintStyle();
        paintStyle.name = styleName;
        paintStyle.paints = [paint];
        if (gradientDef.description) {
          paintStyle.description = gradientDef.description;
        }
        results.created++;
      }
    } catch (error) {
      results.errors.push(`Gradient ${gradientName}: ${error.message}`);
    }
  }

  return results;
}

/**
 * Format gradient name for display
 */
function formatGradientName(name) {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

