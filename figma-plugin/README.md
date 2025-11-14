# Figma Design System Import Plugin

This plugin imports your complete design system into Figma, including:
- Variables (Colors, Spacing, Typography, Border Radius, Shadows)
- Text Styles
- Effect Styles (Shadows)
- Gradient Paint Styles
- Components (Cards, Buttons, Layout)
- Social Media Templates

## Setup

1. Open Figma Desktop
2. Go to Plugins > Development > Import plugin from manifest...
3. Select the `figma-plugin` folder
4. The plugin will appear in your Plugins menu

## Usage

1. Run the plugin from Plugins menu
2. Click "Select JSON file" and choose `figma/figma-variables.json`
3. Select which parts of the design system to import (checkboxes)
4. Click "Import to Figma"
5. Wait for the import to complete

## Building

The plugin uses ES6 modules. To use it in Figma, you need to bundle the code:

```bash
# Using webpack or similar bundler
npm install --save-dev webpack webpack-cli
npx webpack --mode production figma-plugin/code.js -o figma-plugin/dist/
```

Or use a simple bundler script to combine all modules into a single file.

## File Structure

- `code.js` - Main plugin entry point (uses ES6 imports - needs bundling)
- `ui.html` - Plugin UI
- `manifest.json` - Plugin manifest
- `lib/` - Module files (utilities, variables, text-styles, effects, gradients, components, templates)

## Note

Figma plugins don't support ES6 imports directly. You'll need to either:
1. Bundle the modules using a bundler (webpack, rollup, etc.)
2. Or manually combine all modules into code.js

For development, you can use a bundler watch mode to automatically rebuild on changes.

