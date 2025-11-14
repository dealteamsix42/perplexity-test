# Next Steps: Using Your Design Tokens in Figma

## ✅ What You've Accomplished

- ✅ Design tokens synced from `design.json` to Figma Variables
- ✅ 21 colors, 5 spacing values, 27 typography tokens, 4 border radius values
- ✅ All tokens are now available as Figma Variables

## 🎨 Using Variables in Your Designs

### 1. Apply Color Variables

1. Select any shape, frame, or text
2. In the right sidebar, click the fill/stroke color
3. Click the "Variables" icon (looks like `{x}`)
4. Browse your color variables:
   - `neutral/50` through `neutral/900`
   - `semantic/background`, `semantic/foreground`, etc.
   - `brand/primary_blue`, `brand/accent_teal`, etc.

### 2. Use Spacing Variables

1. Select any frame or component
2. In the right sidebar, find padding/margin fields
3. Click the variable icon next to the value
4. Select spacing variables like:
   - `spacing/section_padding_x`
   - `spacing/section_padding_y`
   - `spacing/grid_gap`
   - `spacing/card_padding`

### 3. Apply Typography Variables

1. Select text layers
2. For font size, weight, or line height:
   - Click the variable icon
   - Select typography variables like:
     - `typography/base/size`
     - `typography/base/weight`
     - `typography/2xl/size` (for headings)

### 4. Use Border Radius Variables

1. Select any shape or frame
2. In the right sidebar, find "Corner radius"
3. Click the variable icon
4. Select radius variables:
   - `radius/sm`
   - `radius/md`
   - `radius/lg`
   - `radius/xl`

## 🎯 Create Text Styles from Variables

1. Select a text layer with your desired typography
2. In the right sidebar, click the text style dropdown (usually shows "None")
3. Click the "+" icon to create a new style
4. Name it (e.g., "Heading / 2xl")
5. Apply typography variables to size, weight, and line height
6. Save the style

Now you can reuse this style across your designs!

## 🎨 Create Color Styles (Optional)

While Variables are powerful, you can also create Color Styles:

1. Select a shape with a color variable applied
2. In the right sidebar, click the fill color
3. Click the "Style" icon (looks like a paintbrush)
4. Click "+" to create a new color style
5. Name it (e.g., "Brand / Primary Blue")
6. The style will reference your variable

## 🔄 Updating Tokens in the Future

### Workflow for Token Updates

1. **Edit tokens in Cursor:**
   ```bash
   # Edit design.json with your changes
   ```

2. **Regenerate Figma format:**
   ```bash
   npm run convert
   ```

3. **Sync to Figma:**
   - Run the "Design Token Sync" plugin again
   - Load the updated `figma/figma-variables.json`
   - Click "Sync to Figma"
   - Existing variables will be updated automatically!

### What Gets Updated?

- ✅ Existing variables are updated with new values
- ✅ New variables are created
- ✅ Variables used in your designs automatically reflect changes
- ✅ Styles using variables will update automatically

## 🏗️ Building Components with Tokens

### Example: Create a Card Component

1. Create a frame (F)
2. Apply variables:
   - Fill: `semantic/background` or `brand/primary_blue`
   - Padding: `spacing/card_padding`
   - Corner radius: `radius/lg`
   - Shadow: Use your shadow values
3. Add text with typography variables
4. Convert to Component (Cmd+Option+K / Ctrl+Alt+K)
5. Use throughout your designs!

### Example: Create a Button Component

1. Create a frame with text
2. Apply:
   - Background: `brand/primary_blue`
   - Text color: `semantic/background` (white)
   - Padding: `spacing/card_padding`
   - Border radius: `radius/md`
   - Typography: `typography/base/size` and `typography/base/weight`
3. Create variants for hover states
4. Convert to Component

## 📊 Organizing Your Variables

### Create Variable Collections (Already Done!)

Your variables are organized in collections:
- **Design Tokens - Colors**: All color variables
- **Design Tokens - Spacing**: All spacing values
- **Design Tokens - Typography**: All typography tokens
- **Design Tokens - Border Radius**: All radius values

### Add Modes (Optional)

You can add modes to your collections for:
- Light/Dark themes
- Different brands
- Different platforms

1. Open Variables panel
2. Click on a collection
3. Click "+" next to "Modes"
4. Add a new mode (e.g., "Dark")
5. Set different values for each mode

## 🚀 Pro Tips

1. **Use Variables Everywhere**: Always use variables instead of hardcoded values
2. **Create Component Libraries**: Build reusable components using your tokens
3. **Document Your System**: Add descriptions to variables (already done!)
4. **Version Control**: Keep `design.json` in git to track token changes
5. **Team Collaboration**: Share the Figma file so your team uses the same tokens

## 🔗 Quick Reference

- **Variables Panel**: Right sidebar → Variables icon
- **Apply Variable**: Click variable icon `{x}` next to any property
- **Update Tokens**: Edit `design.json` → `npm run convert` → Run plugin
- **Figma File**: https://www.figma.com/design/0PUzFU9NQvB2jKzC832NY4/Perplexiy

## 📝 Next Actions

- [ ] Apply color variables to existing designs
- [ ] Create text styles using typography variables
- [ ] Build a button component with tokens
- [ ] Create a card component with tokens
- [ ] Set up a workflow for your team
- [ ] Document your design system in Figma

---

**Need help?** Check the main README.md or run `npm run convert` anytime to regenerate tokens!

