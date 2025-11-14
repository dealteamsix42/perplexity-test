# Tailark Pro - Grid Customers Design System

> **Enterprise-grade design system** for customer testimonials and case studies with full Figma integration.

Complete design system implementation from `design.json` and `social-media-visual-guide.json`, including CSS/SCSS stylesheets, React components, Figma plugin, and automated social media asset generation.

## ✨ Features

- ✅ **Complete CSS/SCSS Token System** - Colors, typography, spacing, shadows, animations
- ✅ **React Component Library** - 15+ production-ready components with TypeScript
- ✅ **Figma Integration** - Plugin + auto-generated variables
- ✅ **Social Media Templates** - LinkedIn, Twitter, Instagram, Facebook, Stories
- ✅ **Automated Asset Generation** - Batch create social media posts from data
- ✅ **Full Documentation** - Usage guides, API references, visual style guide

## 📁 Project Structure

```
.
├── styles/                    # SCSS Stylesheets
│   ├── tokens/               # Design tokens (_colors, _typography, _spacing, etc.)
│   ├── components/           # Component styles (_card-dark, _card-light, etc.)
│   ├── utilities/            # Utility classes
│   └── main.scss             # Master stylesheet
│
├── components/                # React Components
│   ├── ui/                   # Base components (Container, CardDark, Button, etc.)
│   ├── sections/             # Composite components (HeroSection, TestimonialsGrid, etc.)
│   └── index.ts              # Main exports
│
├── src/                       # TypeScript modules
│   ├── design-tokens.ts
│   ├── social-media-generator.ts
│   └── ...
│
├── figma-plugin/             # Figma Plugin
│   ├── code.js
│   ├── ui.html
│   └── manifest.json
│
├── figma-templates/          # Template definitions (JSON)
│   ├── testimonial-card-template.json
│   ├── metric-card-template.json
│   └── carousel-slide-template.json
│
├── figma/                    # Figma assets
│   ├── figma-variables.json
│   └── export-presets.json
│
├── scripts/                  # Automation scripts
│   ├── convert-to-figma-variables.js
│   ├── sync-to-figma.js
│   ├── generate-social-assets.js
│   └── generate-docs.js
│
├── design.json               # Design system specification
└── social-media-visual-guide.json
```

## 🚀 Quick Start

### 1. Convert Design Tokens

Convert your `design.json` to Figma Variables format:

```bash
npm run convert
```

This generates `figma/figma-variables.json` with all your tokens in Figma-compatible format.

### 2. Install Figma Plugin

1. Open Figma Desktop app
2. Go to **Plugins** > **Development** > **Import plugin from manifest...**
3. Select the `figma-plugin` folder in this project
4. The plugin will appear in your plugins list

### 3. Sync Tokens to Figma

1. Open your Figma file: [Perplexiy Design](https://www.figma.com/design/0PUzFU9NQvB2jKzC832NY4/Perplexiy)
2. Run the **Design Token Sync** plugin
3. Click "Select JSON file" and choose `figma/figma-variables.json`
4. Click "Sync to Figma"
5. Your tokens will be created as Figma Variables!

## 📊 What Gets Synced

### Colors
- Neutral palette (50-900)
- Semantic colors (background, foreground, muted, border)
- Brand colors (primary, accent)

### Spacing
- Layout spacing values
- Padding and margin tokens

### Typography
- Font sizes
- Font weights
- Line heights

### Border Radius
- All radius values (sm, md, lg, xl)

## 🔄 Workflow

1. **Update tokens in Cursor**: Edit `design.json` with your design tokens
2. **Convert to Figma format**: Run `npm run convert`
3. **Sync to Figma**: Use the Figma plugin to import tokens
4. **Use in designs**: Apply Figma Variables in your designs

## 🛠️ Scripts

- `npm run convert` - Convert design.json to Figma Variables format
- `npm run sync` - Validate tokens against Figma API
- `npm run build` - Run both convert and sync

## 📝 Token Format

The conversion script transforms your `design.json` structure into Figma Variables:

```json
{
  "variables": {
    "color": [
      {
        "name": "brand/primary_blue",
        "value": { "r": 0.145, "g": 0.388, "b": 0.922 },
        "type": "COLOR",
        "description": "Brand color: primary_blue"
      }
    ],
    "spacing": [
      {
        "name": "spacing/section_padding_x",
        "value": 1.5,
        "unit": "PIXELS",
        "type": "FLOAT"
      }
    ]
  }
}
```

## 🔐 API Configuration

The Figma API key is configured in the MCP server. To update it:

1. Get your token from [Figma Settings](https://www.figma.com/developers/api#access-tokens)
2. Ensure it has these scopes:
   - `file_content:read`
   - `library_content:read`
   - `file_variables:read`
   - `file_variables:write` (for plugin sync)

## 🎨 Figma File

Current Figma file: [0PUzFU9NQvB2jKzC832NY4](https://www.figma.com/design/0PUzFU9NQvB2jKzC832NY4/Perplexiy)

## 📚 Resources

- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Design Tokens Community Group](https://www.designtokens.org/)

## 🤝 Contributing

1. Update `design.json` with new tokens
2. Run `npm run convert` to regenerate Figma format
3. Test sync with Figma plugin
4. Commit changes

## 📄 License

MIT

