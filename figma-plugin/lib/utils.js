/**
 * Shared utility functions for Figma plugin
 */

/**
 * Convert hex color to RGB (0-1 range for Figma)
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

/**
 * Parse size value (rem/px) to number
 */
export function parseSize(value) {
  if (typeof value === 'string') {
    const match = value.match(/([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }
  return value;
}

/**
 * Parse CSS shadow string to Figma Effect object
 * Example: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" → DROP_SHADOW effect
 */
export function parseShadow(shadowString) {
  // Match: offsetX offsetY blurRadius spreadRadius color
  const regex = /(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+rgba?\(([^)]+)\)/;
  const match = shadowString.match(regex);
  
  if (!match) {
    // Try without spread: offsetX offsetY blurRadius color
    const regex2 = /(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+rgba?\(([^)]+)\)/;
    const match2 = shadowString.match(regex2);
    if (match2) {
      const [, x, y, blur, colorStr] = match2;
      const color = parseRgba(colorStr);
      return {
        type: 'DROP_SHADOW',
        visible: true,
        color: color,
        offset: { x: parseFloat(x), y: parseFloat(y) },
        radius: parseFloat(blur),
        spread: 0
      };
    }
    return null;
  }
  
  const [, x, y, blur, spread, colorStr] = match;
  const color = parseRgba(colorStr);
  
  return {
    type: 'DROP_SHADOW',
    visible: true,
    color: color,
    offset: { x: parseFloat(x), y: parseFloat(y) },
    radius: parseFloat(blur),
    spread: parseFloat(spread)
  };
}

/**
 * Parse rgba/rgb color string to Figma color object
 */
function parseRgba(colorStr) {
  const parts = colorStr.split(',').map(s => s.trim());
  const r = parseInt(parts[0]) / 255;
  const g = parseInt(parts[1]) / 255;
  const b = parseInt(parts[2]) / 255;
  const a = parts[3] ? parseFloat(parts[3]) : 1;
  
  return { r, g, b, a };
}

/**
 * Parse gradient angle (deg) to Figma gradient transform matrix
 * Figma uses a 2x3 transform matrix for gradients
 */
export function parseGradientAngle(angle) {
  // Convert deg to radians
  const deg = parseFloat(angle) || 0;
  const radians = (deg * Math.PI) / 180;
  
  // Calculate transform matrix for linear gradient
  // Default is 0deg (left to right), which is [[1, 0, 0], [0, 1, 0]]
  // 135deg means diagonal from top-left to bottom-right
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  
  // Figma gradient transform: [[a, b, c], [d, e, f]]
  // For linear gradients, this represents the direction
  return [
    [cos, -sin, 0.5],
    [sin, cos, 0.5]
  ];
}

/**
 * Convert rem to pixels (assuming 16px base)
 */
export function remToPx(rem) {
  return parseSize(rem) * 16;
}

/**
 * Find or create a variable collection
 */
export function getOrCreateCollection(name) {
  const existing = figma.variables.getLocalVariableCollections().find(
    c => c.name === name
  );
  
  if (existing) {
    return existing;
  }
  
  return figma.variables.createVariableCollection(name);
}

/**
 * Find existing variable by name and type
 */
export function findVariable(name, type) {
  return figma.variables.getLocalVariables().find(
    v => v.name === name && v.resolvedType === type
  );
}

/**
 * Find existing style by name
 */
export function findTextStyle(name) {
  return figma.getLocalTextStyles().find(s => s.name === name);
}

/**
 * Find existing effect style by name
 */
export function findEffectStyle(name) {
  return figma.getLocalEffectStyles().find(s => s.name === name);
}

/**
 * Find existing paint style by name
 */
export function findPaintStyle(name) {
  return figma.getLocalPaintStyles().find(s => s.name === name);
}

