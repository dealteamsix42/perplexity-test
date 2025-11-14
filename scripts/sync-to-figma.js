#!/usr/bin/env node

/**
 * Sync design tokens to Figma using the Figma API
 * This script reads figma-variables.json and attempts to sync via API
 * Note: Figma Variables API has limited write capabilities, so this is mainly
 * for reading and validation. Use the Figma plugin for full sync.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_FILE_KEY = '0PUzFU9NQvB2jKzC832NY4';

// Get API key from environment or config
// IMPORTANT: Never commit API keys to git. Use environment variables instead.
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
if (!FIGMA_API_KEY) {
  console.error('❌ FIGMA_API_KEY environment variable is required');
  console.error('   Set it with: export FIGMA_API_KEY=your_token_here');
  process.exit(1);
}

/**
 * Make API request to Figma
 */
function figmaRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, FIGMA_API_BASE);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'X-Figma-Token': FIGMA_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`API Error: ${parsed.err || body}`));
          }
        } catch (e) {
          reject(new Error(`Parse Error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Get file variables
 */
async function getFileVariables() {
  try {
    const response = await figmaRequest(`/files/${FIGMA_FILE_KEY}/variables/local`);
    return response.meta?.variables || [];
  } catch (error) {
    console.log('Note: Variables API may not be available:', error.message);
    return [];
  }
}

/**
 * Get file styles
 */
async function getFileStyles() {
  try {
    const response = await figmaRequest(`/files/${FIGMA_FILE_KEY}/styles`);
    return response.meta?.styles || [];
  } catch (error) {
    console.log('Note: Styles API response:', error.message);
    return [];
  }
}

/**
 * Validate tokens against Figma
 */
async function validateTokens() {
  const variablesPath = path.join(__dirname, '..', 'figma', 'figma-variables.json');
  
  if (!fs.existsSync(variablesPath)) {
    console.error('❌ figma-variables.json not found. Run convert-to-figma-variables.js first.');
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(variablesPath, 'utf8'));
  console.log('📊 Validating tokens against Figma file...\n');

  try {
    // Get existing variables and styles
    const [existingVariables, existingStyles] = await Promise.all([
      getFileVariables(),
      getFileStyles()
    ]);

    console.log(`✅ Found ${existingVariables.length} existing variables in Figma`);
    console.log(`✅ Found ${existingStyles.length} existing styles in Figma\n`);

    // Summary
    const tokenCounts = {
      colors: tokens.variables?.color?.length || 0,
      spacing: tokens.variables?.spacing?.length || 0,
      typography: tokens.variables?.typography?.length || 0,
      borderRadius: tokens.variables?.borderRadius?.length || 0
    };

    console.log('📦 Tokens ready to sync:');
    console.log(`   Colors: ${tokenCounts.colors}`);
    console.log(`   Spacing: ${tokenCounts.spacing}`);
    console.log(`   Typography: ${tokenCounts.typography}`);
    console.log(`   Border Radius: ${tokenCounts.borderRadius}\n`);

    console.log('💡 To sync tokens to Figma:');
    console.log('   1. Open Figma');
    console.log('   2. Go to Plugins > Development > Import plugin from manifest...');
    console.log('   3. Select the figma-plugin folder');
    console.log('   4. Run the plugin and load figma-variables.json\n');

    return { tokens, existingVariables, existingStyles };

  } catch (error) {
    console.error('❌ Error validating tokens:', error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  validateTokens().catch(console.error);
}

module.exports = { validateTokens, figmaRequest };

