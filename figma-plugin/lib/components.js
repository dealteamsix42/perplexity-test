/**
 * Component creation from React component definitions
 * Generates Figma components from design system component specs
 */

import { findVariable, findTextStyle, findPaintStyle, findEffectStyle, remToPx } from './utils.js';

/**
 * Create component library from design system
 */
export async function createComponents(data, options = {}) {
  const { onProgress } = options;
  const components = data.components || {};
  const results = {
    created: 0,
    updated: 0,
    errors: []
  };

  // Get or create Component Library page
  let libraryPage = figma.root.children.find(page => page.type === 'PAGE' && page.name === 'Component Library');
  if (!libraryPage) {
    libraryPage = figma.createPage();
    libraryPage.name = 'Component Library';
  }

  // Create component groups
  const layoutGroup = createGroup(libraryPage, 'Layout');
  const cardsGroup = createGroup(libraryPage, 'Cards');
  const buttonsGroup = createGroup(libraryPage, 'Buttons');

  try {
    // Create Container component
    if (components.Container) {
      if (onProgress) onProgress('Creating Container component...');
      await createContainerComponent(layoutGroup, components.Container, data);
      results.created++;
    }

    // Create CardDark component
    if (components.CardDarkPremium) {
      if (onProgress) onProgress('Creating CardDark component...');
      await createCardDarkComponent(cardsGroup, components.CardDarkPremium, data);
      results.created++;
    }

    // Create CardLight component
    if (components.CardLightTestimonial) {
      if (onProgress) onProgress('Creating CardLight component...');
      await createCardLightComponent(cardsGroup, components.CardLightTestimonial, data);
      results.created++;
    }

    // Create Button component
    if (onProgress) onProgress('Creating Button component...');
    await createButtonComponent(buttonsGroup, data);
    results.created++;

  } catch (error) {
    results.errors.push(`Components: ${error.message}`);
  }

  return results;
}

/**
 * Create a group frame
 */
function createGroup(parent, name) {
  let group = parent.children.find(child => child.name === name && child.type === 'FRAME');
  if (!group) {
    group = figma.createFrame();
    group.name = name;
    parent.appendChild(group);
    group.layoutMode = 'VERTICAL';
    group.paddingLeft = 40;
    group.paddingRight = 40;
    group.paddingTop = 40;
    group.paddingBottom = 40;
    group.itemSpacing = 40;
    group.resize(800, 600);
  }
  return group;
}

/**
 * Create Container component
 */
async function createContainerComponent(parent, containerSpec, data) {
  const component = figma.createComponent();
  component.name = 'Container';
  component.resize(1280, 200); // Default max-width
  
  // Set max-width constraint
  component.constraints = {
    horizontal: 'CENTER',
    vertical: 'MIN'
  };

  // Apply padding from spacing variables
  const paddingX = findVariable('spacing/section_padding_x', 'FLOAT');
  if (paddingX) {
    const paddingValue = paddingX.valuesByMode[paddingX.variableCollectionId + ':0'] * 16; // Convert rem to px
    component.paddingLeft = paddingValue;
    component.paddingRight = paddingValue;
  }

  parent.appendChild(component);
  return component;
}

/**
 * Create CardDark component with variants
 */
async function createCardDarkComponent(parent, cardSpec, data) {
  // Create base component
  const component = figma.createComponent();
  component.name = 'CardDark';
  component.resize(600, 400);
  
  // Apply gradient background
  const gradientStyle = findPaintStyle('Gradient / Dark Purple Blue');
  if (gradientStyle) {
    component.fills = gradientStyle.paints;
  } else {
    // Fallback gradient
    component.fills = [{
      type: 'GRADIENT_LINEAR',
      gradientTransform: [[0.707, -0.707, 0.5], [0.707, 0.707, 0.5]],
      gradientStops: [
        { position: 0, color: { r: 0, g: 0.1, b: 0.2, a: 1 } },
        { position: 0.5, color: { r: 0.118, g: 0.106, b: 0.294, a: 1 } },
        { position: 1, color: { r: 0.176, g: 0.106, b: 0.412, a: 1 } }
      ]
    }];
  }

  // Apply border radius
  const radiusVar = findVariable('radius/xl', 'FLOAT');
  if (radiusVar) {
    const radiusValue = radiusVar.valuesByMode[radiusVar.variableCollectionId + ':0'] * 16;
    component.cornerRadius = radiusValue;
  } else {
    component.cornerRadius = 16;
  }

  // Apply shadow
  const shadowStyle = findEffectStyle('Shadow / xl');
  if (shadowStyle) {
    component.effects = shadowStyle.effects;
  }

  // Add padding
  const paddingVar = findVariable('spacing/card_padding', 'FLOAT');
  if (paddingVar) {
    const paddingValue = paddingVar.valuesByMode[paddingVar.variableCollectionId + ':0'] * 16;
    component.paddingLeft = paddingValue;
    component.paddingRight = paddingValue;
    component.paddingTop = paddingValue;
    component.paddingBottom = paddingValue;
  }

  // Set up auto-layout
  component.layoutMode = 'VERTICAL';
  component.itemSpacing = 24;

  // Add placeholder content
  const logoFrame = figma.createFrame();
  logoFrame.name = 'Logo';
  logoFrame.resize(144, 32);
  logoFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0.2 } }];
  component.appendChild(logoFrame);

  const titleText = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  titleText.characters = 'Case Study Title';
  titleText.fontSize = 24;
  titleText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 0.9 } }];
  component.appendChild(titleText);

  // Add variant property for gradient
  component.addComponentProperty('gradient', 'VARIANT', {
    'purple-blue': 'Purple Blue',
    'teal-navy': 'Teal Navy'
  });

  parent.appendChild(component);
  return component;
}

/**
 * Create CardLight component
 */
async function createCardLightComponent(parent, cardSpec, data) {
  const component = figma.createComponent();
  component.name = 'CardLight';
  component.resize(600, 300);
  
  // White background
  const bgColor = findVariable('semantic/background', 'COLOR');
  if (bgColor) {
    const color = bgColor.valuesByMode[bgColor.variableCollectionId + ':0'];
    component.fills = [{ type: 'SOLID', color: color }];
  } else {
    component.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }];
  }

  // Border
  const borderColor = findVariable('semantic/border', 'COLOR');
  if (borderColor) {
    const color = borderColor.valuesByMode[borderColor.variableCollectionId + ':0'];
    component.strokes = [{ type: 'SOLID', color: color }];
    component.strokeWeight = 1;
  }

  // Border radius
  const radiusVar = findVariable('radius/xl', 'FLOAT');
  if (radiusVar) {
    const radiusValue = radiusVar.valuesByMode[radiusVar.variableCollectionId + ':0'] * 16;
    component.cornerRadius = radiusValue;
  } else {
    component.cornerRadius = 16;
  }

  // Shadow
  const shadowStyle = findEffectStyle('Shadow / md');
  if (shadowStyle) {
    component.effects = shadowStyle.effects;
  }

  // Padding
  const paddingVar = findVariable('spacing/card_padding', 'FLOAT');
  if (paddingVar) {
    const paddingValue = paddingVar.valuesByMode[paddingVar.variableCollectionId + ':0'] * 16;
    component.paddingLeft = paddingValue;
    component.paddingRight = paddingValue;
    component.paddingTop = paddingValue;
    component.paddingBottom = paddingValue;
  }

  // Auto-layout
  component.layoutMode = 'VERTICAL';
  component.itemSpacing = 16;

  // Add placeholder content
  const quoteText = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  quoteText.characters = '"This is a testimonial quote from a satisfied customer."';
  quoteText.fontSize = 16;
  const foregroundColor = findVariable('semantic/foreground', 'COLOR');
  if (foregroundColor) {
    const color = foregroundColor.valuesByMode[foregroundColor.variableCollectionId + ':0'];
    quoteText.fills = [{ type: 'SOLID', color: color }];
  }
  component.appendChild(quoteText);

  const authorText = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
  authorText.characters = 'John Doe, CTO';
  authorText.fontSize = 14;
  if (foregroundColor) {
    const color = foregroundColor.valuesByMode[foregroundColor.variableCollectionId + ':0'];
    authorText.fills = [{ type: 'SOLID', color: color }];
  }
  component.appendChild(authorText);

  parent.appendChild(component);
  return component;
}

/**
 * Create Button component with variants
 */
async function createButtonComponent(parent, data) {
  const component = figma.createComponent();
  component.name = 'Button';
  component.resize(120, 40);
  
  // Primary variant background
  const primaryColor = findVariable('brand/primary_blue', 'COLOR');
  if (primaryColor) {
    const color = primaryColor.valuesByMode[primaryColor.variableCollectionId + ':0'];
    component.fills = [{ type: 'SOLID', color: color }];
  } else {
    component.fills = [{ type: 'SOLID', color: { r: 0.145, g: 0.388, b: 0.922, a: 1 } }];
  }

  // Border radius
  const radiusVar = findVariable('radius/md', 'FLOAT');
  if (radiusVar) {
    const radiusValue = radiusVar.valuesByMode[radiusVar.variableCollectionId + ':0'] * 16;
    component.cornerRadius = radiusValue;
  } else {
    component.cornerRadius = 8;
  }

  // Padding
  component.paddingLeft = 16;
  component.paddingRight = 16;
  component.paddingTop = 10;
  component.paddingBottom = 10;

  // Text
  const buttonText = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  buttonText.characters = 'Button';
  buttonText.fontSize = 14;
  buttonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }];
  component.appendChild(buttonText);

  // Auto-layout
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisAlignItems = 'CENTER';
  component.counterAxisAlignItems = 'CENTER';

  // Add variant properties
  component.addComponentProperty('variant', 'VARIANT', {
    'primary': 'Primary',
    'secondary': 'Secondary',
    'accent': 'Accent',
    'ghost': 'Ghost'
  });

  component.addComponentProperty('size', 'VARIANT', {
    'sm': 'Small',
    'base': 'Base',
    'lg': 'Large'
  });

  parent.appendChild(component);
  return component;
}

