// social-media-generator.ts
/**
 * Social Media Asset Generator
 * Programmatically generates social media templates for all platforms
 * Based on social-media-visual-guide.json specifications
 */

import { colors, typography, spacing, shadows, radius } from './design-tokens';

// ---- TYPES ----

export type Platform = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'instagram-story' | 'email';

export interface PlatformDimensions {
  width: number;
  height: number;
  format: 'PNG' | 'JPG' | 'SVG';
  scale: 1 | 2 | 3;
}

export interface TestimonialCardData {
  companyLogo: string;
  companyName: string;
  metric: {
    value: string;
    label: string;
  };
  quote: string;
  author: string;
  authorTitle: string;
}

export interface MetricHighlightData {
  metric: string;
  context: string;
  brandLogo?: string;
}

export interface CaseStudySlideData {
  slide1: {
    challenge: string;
    companyName: string;
  };
  slide2: {
    solution: string;
    beforeAfter?: { before: string; after: string };
  };
  slide3: {
    result: string;
    metric: string;
    ctaUrl: string;
  };
}

// ---- PLATFORM SPECIFICATIONS ----

export const PLATFORM_SPECS: Record<Platform, PlatformDimensions> = {
  linkedin: { width: 1200, height: 627, format: 'PNG', scale: 2 },
  twitter: { width: 1024, height: 512, format: 'PNG', scale: 2 },
  instagram: { width: 1080, height: 1080, format: 'PNG', scale: 2 },
  facebook: { width: 1200, height: 628, format: 'PNG', scale: 2 },
  'instagram-story': { width: 1080, height: 1920, format: 'PNG', scale: 2 },
  email: { width: 600, height: 800, format: 'PNG', scale: 2 },
};

// ---- TEMPLATE GENERATORS ----

/**
 * Generate Testimonial Card for Social Media
 * Uses dark premium gradient background with company logo, metric, and quote
 */
export function generateTestimonialCard(
  platform: Platform,
  data: TestimonialCardData
): object {
  const dims = PLATFORM_SPECS[platform];
  
  return {
    type: 'FRAME',
    name: `${platform}-testimonial-${data.companyName}`,
    width: dims.width,
    height: dims.height,
    background: {
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { color: { r: 0, g: 0.1, b: 0.2 }, position: 0 },
        { color: { r: 0.118, g: 0.106, b: 0.294 }, position: 0.5 },
        { color: { r: 0.176, g: 0.106, b: 0.412 }, position: 1 },
      ],
      angle: 135,
    },
    children: [
      // Company Logo
      {
        type: 'IMAGE',
        name: 'company-logo',
        x: 60,
        y: 60,
        width: 160,
        height: 80,
        src: data.companyLogo,
        filters: { brightness: 0, invert: 1 }, // Make white
      },
      // Metric Highlight
      {
        type: 'TEXT',
        name: 'metric-value',
        x: 60,
        y: 200,
        fontSize: platform === 'instagram-story' ? 80 : 60,
        fontWeight: 700,
        color: '#14B8A6', // accent-teal
        text: data.metric.value,
      },
      {
        type: 'TEXT',
        name: 'metric-label',
        x: 60,
        y: platform === 'instagram-story' ? 300 : 280,
        fontSize: 14,
        fontWeight: 500,
        color: 'rgba(255,255,255,0.8)',
        text: data.metric.label.toUpperCase(),
        letterSpacing: 0.05,
      },
      // Quote
      {
        type: 'TEXT',
        name: 'quote',
        x: 60,
        y: platform === 'instagram-story' ? 400 : 360,
        width: dims.width - 120,
        fontSize: platform === 'instagram-story' ? 20 : 18,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.9)',
        text: `"${data.quote}"`,
      },
      // Author
      {
        type: 'TEXT',
        name: 'author',
        x: 60,
        y: dims.height - 100,
        fontSize: 14,
        fontWeight: 600,
        color: 'white',
        text: `${data.author}, ${data.authorTitle}`,
      },
    ],
  };
}

/**
 * Generate Metric Highlight Card
 * Bold single metric with supporting context
 */
export function generateMetricHighlight(
  platform: Platform,
  data: MetricHighlightData
): object {
  const dims = PLATFORM_SPECS[platform];
  const isSquare = platform === 'instagram';
  
  return {
    type: 'FRAME',
    name: `${platform}-metric-${data.metric}`,
    width: dims.width,
    height: dims.height,
    background: {
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { color: { r: 0.051, g: 0.227, b: 0.227 }, position: 0 },
        { color: { r: 0.118, g: 0.227, b: 0.227 }, position: 0.5 },
        { color: { r: 0.118, g: 0.161, b: 0.231 }, position: 1 },
      ],
      angle: 135,
    },
    children: [
      // Large Metric
      {
        type: 'TEXT',
        name: 'metric',
        x: dims.width / 2,
        y: dims.height / 2 - 60,
        fontSize: isSquare ? 120 : 100,
        fontWeight: 700,
        color: '#A855F7', // accent-purple
        text: data.metric,
        textAlign: 'center',
      },
      // Context
      {
        type: 'TEXT',
        name: 'context',
        x: dims.width / 2,
        y: dims.height / 2 + 80,
        width: dims.width - 120,
        fontSize: isSquare ? 24 : 20,
        lineHeight: 1.5,
        color: 'rgba(255,255,255,0.9)',
        text: data.context,
        textAlign: 'center',
      },
      // Brand Logo (top-right)
      data.brandLogo
        ? {
            type: 'IMAGE',
            name: 'brand-logo',
            x: dims.width - 100,
            y: 40,
            width: 60,
            height: 30,
            src: data.brandLogo,
          }
        : null,
    ].filter(Boolean),
  };
}

/**
 * Generate Carousel Slides for Case Study
 * 3-slide format: Challenge → Solution → Result
 */
export function generateCaseStudyCarousel(
  platform: Platform,
  data: CaseStudySlideData
): object[] {
  const dims = PLATFORM_SPECS[platform];
  
  return [
    // Slide 1: Challenge
    {
      type: 'FRAME',
      name: `${platform}-carousel-slide-1`,
      width: dims.width,
      height: dims.height,
      background: { type: 'SOLID', color: { r: 0, g: 0.1, b: 0.2 } },
      children: [
        {
          type: 'TEXT',
          name: 'slide-number',
          x: 40,
          y: 40,
          fontSize: 14,
          color: 'rgba(255,255,255,0.6)',
          text: '1/3',
        },
        {
          type: 'TEXT',
          name: 'challenge-heading',
          x: 60,
          y: dims.height / 3,
          fontSize: 32,
          fontWeight: 600,
          color: 'white',
          text: 'The Challenge',
        },
        {
          type: 'TEXT',
          name: 'challenge-text',
          x: 60,
          y: dims.height / 3 + 80,
          width: dims.width - 120,
          fontSize: 18,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.9)',
          text: data.slide1.challenge,
        },
      ],
    },
    // Slide 2: Solution
    {
      type: 'FRAME',
      name: `${platform}-carousel-slide-2`,
      width: dims.width,
      height: dims.height,
      background: { type: 'SOLID', color: { r: 0.118, g: 0.161, b: 0.231 } },
      children: [
        {
          type: 'TEXT',
          name: 'slide-number',
          x: 40,
          y: 40,
          fontSize: 14,
          color: 'rgba(255,255,255,0.6)',
          text: '2/3',
        },
        {
          type: 'TEXT',
          name: 'solution-heading',
          x: 60,
          y: dims.height / 3,
          fontSize: 32,
          fontWeight: 600,
          color: 'white',
          text: 'The Solution',
        },
        {
          type: 'TEXT',
          name: 'solution-text',
          x: 60,
          y: dims.height / 3 + 80,
          width: dims.width - 120,
          fontSize: 18,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.9)',
          text: data.slide2.solution,
        },
      ],
    },
    // Slide 3: Result
    {
      type: 'FRAME',
      name: `${platform}-carousel-slide-3`,
      width: dims.width,
      height: dims.height,
      background: {
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          { color: { r: 0.118, g: 0.106, b: 0.294 }, position: 0 },
          { color: { r: 0.176, g: 0.106, b: 0.412 }, position: 1 },
        ],
        angle: 135,
      },
      children: [
        {
          type: 'TEXT',
          name: 'slide-number',
          x: 40,
          y: 40,
          fontSize: 14,
          color: 'rgba(255,255,255,0.6)',
          text: '3/3',
        },
        {
          type: 'TEXT',
          name: 'result-heading',
          x: 60,
          y: dims.height / 3,
          fontSize: 32,
          fontWeight: 600,
          color: 'white',
          text: 'The Result',
        },
        {
          type: 'TEXT',
          name: 'metric-result',
          x: 60,
          y: dims.height / 3 + 80,
          fontSize: 64,
          fontWeight: 700,
          color: '#14B8A6',
          text: data.slide3.metric,
        },
        {
          type: 'TEXT',
          name: 'result-text',
          x: 60,
          y: dims.height / 3 + 180,
          width: dims.width - 120,
          fontSize: 18,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.9)',
          text: data.slide3.result,
        },
        {
          type: 'TEXT',
          name: 'cta',
          x: 60,
          y: dims.height - 100,
          fontSize: 16,
          fontWeight: 600,
          color: '#14B8A6',
          text: 'Read full story →',
        },
      ],
    },
  ];
}

/**
 * Feature Highlight Generator
 * Icon + metric + description layout
 */
export function generateFeatureHighlight(
  platform: Platform,
  feature: {
    icon: string;
    metric: string;
    label: string;
    description?: string;
  }
): object {
  const dims = PLATFORM_SPECS[platform];
  
  return {
    type: 'FRAME',
    name: `${platform}-feature-${feature.label.toLowerCase()}`,
    width: dims.width,
    height: dims.height,
    background: { type: 'SOLID', color: { r: 0.976, g: 0.98, b: 0.988 } }, // neutral-50
    children: [
      // Icon
      {
        type: 'ICON',
        name: 'feature-icon',
        x: dims.width / 2 - 32,
        y: dims.height / 3,
        width: 64,
        height: 64,
        src: feature.icon,
        color: '#2563EB', // primary
      },
      // Metric
      {
        type: 'TEXT',
        name: 'metric',
        x: dims.width / 2,
        y: dims.height / 3 + 100,
        fontSize: 48,
        fontWeight: 600,
        color: '#0F172A', // fg
        text: feature.metric,
        textAlign: 'center',
      },
      // Label
      {
        type: 'TEXT',
        name: 'label',
        x: dims.width / 2,
        y: dims.height / 3 + 170,
        fontSize: 14,
        fontWeight: 500,
        color: '#64748B', // muted
        text: feature.label.toUpperCase(),
        textAlign: 'center',
        letterSpacing: 0.05,
      },
      // Description
      feature.description
        ? {
            type: 'TEXT',
            name: 'description',
            x: dims.width / 2,
            y: dims.height / 3 + 220,
            width: dims.width - 120,
            fontSize: 16,
            lineHeight: 1.5,
            color: '#64748B',
            text: feature.description,
            textAlign: 'center',
          }
        : null,
    ].filter(Boolean),
  };
}

// ---- BATCH GENERATION ----

/**
 * Generate complete social media asset set for a customer testimonial
 */
export function generateFullAssetSet(data: {
  testimonial: TestimonialCardData;
  metric: MetricHighlightData;
  caseStudy: CaseStudySlideData;
}): Record<Platform, object[]> {
  const platforms: Platform[] = ['linkedin', 'twitter', 'instagram', 'facebook', 'instagram-story'];
  
  const assets: Record<Platform, object[]> = {} as any;
  
  for (const platform of platforms) {
    assets[platform] = [
      generateTestimonialCard(platform, data.testimonial),
      generateMetricHighlight(platform, data.metric),
      ...generateCaseStudyCarousel(platform, data.caseStudy),
    ];
  }
  
  return assets;
}

export default {
  generateTestimonialCard,
  generateMetricHighlight,
  generateCaseStudyCarousel,
  generateFeatureHighlight,
  generateFullAssetSet,
  PLATFORM_SPECS,
};
