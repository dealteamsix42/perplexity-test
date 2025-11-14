#!/usr/bin/env node
/**
 * Social Media Asset Generator
 * Batch generates social media assets from customer testimonial data
 * 
 * Usage:
 *   node scripts/generate-social-assets.js --input=data/customers.json --output=output/social-media/
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PLATFORMS = ['linkedin', 'twitter', 'instagram', 'facebook', 'instagram-story'];

const PLATFORM_SPECS = {
  linkedin: { width: 1200, height: 627, format: 'PNG' },
  twitter: { width: 1024, height: 512, format: 'PNG' },
  instagram: { width: 1080, height: 1080, format: 'PNG' },
  facebook: { width: 1200, height: 628, format: 'PNG' },
  'instagram-story': { width: 1080, height: 1920, format: 'PNG' },
};

// Parse command line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.split('=');
    args[key.replace('--', '')] = value;
  });
  return args;
}

// Load customer data
function loadCustomerData(inputPath) {
  try {
    const data = fs.readFileSync(inputPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error loading customer data from ${inputPath}:`, error.message);
    process.exit(1);
  }
}

// Create output directory structure
function setupOutputDirectories(outputPath) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  PLATFORMS.forEach(platform => {
    const platformDir = path.join(outputPath, platform);
    if (!fs.existsSync(platformDir)) {
      fs.mkdirSync(platformDir, { recursive: true });
    }
  });
  
  console.log(`✅ Output directories created at: ${outputPath}`);
}

// Generate testimonial card config for platform
function generateTestimonialCard(platform, customer) {
  const spec = PLATFORM_SPECS[platform];
  
  return {
    type: 'testimonial-card',
    platform,
    dimensions: { width: spec.width, height: spec.height },
    customer: customer.name,
    config: {
      logo: customer.logo,
      metric: customer.metric,
      quote: customer.quote,
      author: customer.author,
      gradient: customer.gradient || 'purple-blue',
    },
    outputPath: `${platform}/${customer.slug}-testimonial.${spec.format.toLowerCase()}`,
  };
}

// Generate metric highlight config
function generateMetricHighlight(platform, customer) {
  const spec = PLATFORM_SPECS[platform];
  
  return {
    type: 'metric-highlight',
    platform,
    dimensions: { width: spec.width, height: spec.height },
    customer: customer.name,
    config: {
      metric: customer.metric.value,
      context: customer.metric.context,
      brandLogo: customer.brandLogo,
    },
    outputPath: `${platform}/${customer.slug}-metric.${spec.format.toLowerCase()}`,
  };
}

// Generate carousel slides config
function generateCarouselSlides(platform, customer) {
  const spec = PLATFORM_SPECS[platform];
  
  if (!customer.caseStudy) return null;
  
  return {
    type: 'carousel',
    platform,
    dimensions: { width: spec.width, height: spec.height },
    customer: customer.name,
    slides: [
      {
        slide: 1,
        type: 'challenge',
        content: customer.caseStudy.challenge,
      },
      {
        slide: 2,
        type: 'solution',
        content: customer.caseStudy.solution,
      },
      {
        slide: 3,
        type: 'result',
        metric: customer.caseStudy.result.metric,
        content: customer.caseStudy.result.description,
        cta: customer.caseStudy.ctaUrl,
      },
    ],
    outputPath: `${platform}/${customer.slug}-carousel-{slide}.${spec.format.toLowerCase()}`,
  };
}

// Generate all assets for a customer
function generateCustomerAssets(customer, outputPath) {
  const assets = [];
  
  PLATFORMS.forEach(platform => {
    // Testimonial card
    assets.push(generateTestimonialCard(platform, customer));
    
    // Metric highlight
    if (customer.metric) {
      assets.push(generateMetricHighlight(platform, customer));
    }
    
    // Carousel slides (if case study data exists)
    if (customer.caseStudy && (platform === 'linkedin' || platform === 'instagram')) {
      const carousel = generateCarouselSlides(platform, customer);
      if (carousel) assets.push(carousel);
    }
  });
  
  return assets;
}

// Write asset configurations to JSON
function writeAssetConfigs(assets, outputPath) {
  const configPath = path.join(outputPath, 'asset-configs.json');
  
  const config = {
    generatedAt: new Date().toISOString(),
    totalAssets: assets.length,
    assets,
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Asset configurations written to: ${configPath}`);
  
  return configPath;
}

// Generate summary report
function generateSummary(customers, assets, outputPath) {
  const summary = {
    generatedAt: new Date().toISOString(),
    customersProcessed: customers.length,
    totalAssets: assets.length,
    assetsByType: {},
    assetsByPlatform: {},
  };
  
  assets.forEach(asset => {
    // Count by type
    summary.assetsByType[asset.type] = (summary.assetsByType[asset.type] || 0) + 1;
    
    // Count by platform
    summary.assetsByPlatform[asset.platform] = (summary.assetsByPlatform[asset.platform] || 0) + 1;
  });
  
  const summaryPath = path.join(outputPath, 'generation-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  return summary;
}

// Main execution
function main() {
  console.log('🚀 Social Media Asset Generator\n');
  
  const args = parseArgs();
  const inputPath = args.input || './data/customers.json';
  const outputPath = args.output || './output/social-media/';
  
  console.log(`📂 Input: ${inputPath}`);
  console.log(`📂 Output: ${outputPath}\n`);
  
  // Load customer data
  const customers = loadCustomerData(inputPath);
  console.log(`✅ Loaded ${customers.length} customer(s)\n`);
  
  // Setup output directories
  setupOutputDirectories(outputPath);
  
  // Generate assets for all customers
  console.log('🎨 Generating asset configurations...\n');
  const allAssets = [];
  
  customers.forEach((customer, index) => {
    console.log(`  ${index + 1}. ${customer.name}`);
    const assets = generateCustomerAssets(customer, outputPath);
    allAssets.push(...assets);
    console.log(`     → Generated ${assets.length} asset configs`);
  });
  
  // Write configurations
  console.log('\n📝 Writing configurations...');
  writeAssetConfigs(allAssets, outputPath);
  
  // Generate summary
  const summary = generateSummary(customers, allAssets, outputPath);
  
  console.log('\n✨ Generation Complete!\n');
  console.log('Summary:');
  console.log(`  Customers processed: ${summary.customersProcessed}`);
  console.log(`  Total assets: ${summary.totalAssets}`);
  console.log('\n  Assets by type:');
  Object.entries(summary.assetsByType).forEach(([type, count]) => {
    console.log(`    ${type}: ${count}`);
  });
  console.log('\n  Assets by platform:');
  Object.entries(summary.assetsByPlatform).forEach(([platform, count]) => {
    console.log(`    ${platform}: ${count}`);
  });
  
  console.log('\n📋 Next steps:');
  console.log('  1. Review asset-configs.json');
  console.log('  2. Open Figma and run the plugin');
  console.log('  3. Load asset-configs.json in the plugin');
  console.log('  4. Generate and export assets\n');
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  generateCustomerAssets,
  generateTestimonialCard,
  generateMetricHighlight,
  generateCarouselSlides,
};
