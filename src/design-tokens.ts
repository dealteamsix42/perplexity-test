// design-tokens.ts
/**
 * Design Tokens for Tailark Pro - Grid Customers Design System
 * Generated from design.json — CSS-variable ready and type-safe
 */

// 1. COLOR TOKENS
export type ColorPalette = 'neutral' | 'semantic' | 'brand';
export type NeutralColor = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type SemanticColor = 'background' | 'background_secondary' | 'foreground' | 'muted' | 'muted_lighter' | 'border' | 'border_dark';
export type BrandColor = 'primary_blue' | 'primary_hover' | 'accent_teal' | 'accent_purple';

export interface Colors {
  neutral: Record<NeutralColor, string>;
  semantic: Record<SemanticColor, string>;
  brand: Record<BrandColor, string>;
}

export const colors: Colors = {
  neutral: {
    50: 'var(--color-neutral-50, #F8FAFC)',
    100: 'var(--color-neutral-100, #F1F5F9)',
    200: 'var(--color-neutral-200, #E2E8F0)',
    300: 'var(--color-neutral-300, #CBD5E1)',
    400: 'var(--color-neutral-400, #94A3B8)',
    500: 'var(--color-neutral-500, #64748B)',
    600: 'var(--color-neutral-600, #475569)',
    700: 'var(--color-neutral-700, #334155)',
    800: 'var(--color-neutral-800, #1E293B)',
    900: 'var(--color-neutral-900, #0F172A)',
  },
  semantic: {
    background: 'var(--color-bg, #FFFFFF)',
    background_secondary: 'var(--color-bg-secondary, #F9FAFB)',
    foreground: 'var(--color-fg, #0F172A)',
    muted: 'var(--color-muted, #64748B)',
    muted_lighter: 'var(--color-muted-lighter, #94A3B8)',
    border: 'var(--color-border, #E2E8F0)',
    border_dark: 'var(--color-border-dark, #334155)',
  },
  brand: {
    primary_blue: 'var(--color-primary, #2563EB)',
    primary_hover: 'var(--color-primary-hover, #1D4ED8)',
    accent_teal: 'var(--color-accent-teal, #14B8A6)',
    accent_purple: 'var(--color-accent-purple, #A855F7)',
  },
};

// 2. TYPOGRAPHY TOKENS
export type TypographyScale = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | '6xl';
export type TypoWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyScaleDef {
  size: string;
  weight: number;
  line_height: number;
  letter_spacing?: string;
  use: string;
}

export interface Typography {
  scales: Record<TypographyScale, TypographyScaleDef>;
  weights: Record<TypoWeight, number>;
  fontStack: string;
  responsive?: string;
}

export const typography: Typography = {
  scales: {
    xs: { size: '0.75rem', weight: 500, line_height: 1.4, use: 'captions, badges' },
    sm: { size: '0.875rem', weight: 400, line_height: 1.5, use: 'secondary text' },
    base: { size: '1rem', weight: 400, line_height: 1.6, use: 'body text' },
    lg: { size: '1.125rem', weight: 400, line_height: 1.75, use: 'large body' },
    xl: { size: '1.25rem', weight: 500, line_height: 1.5, use: 'card titles' },
    '2xl': { size: '1.5rem', weight: 600, line_height: 1.4, use: 'headings' },
    '3xl': { size: '2rem', weight: 600, line_height: 1.3, use: 'large headings' },
    '5xl': { size: '3rem', weight: 600, line_height: 1.1, letter_spacing: '-0.02em', use: 'hero headings' },
    '6xl': { size: '3.75rem', weight: 700, line_height: 1, letter_spacing: '-0.03em', use: 'max impact' },
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontStack: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  responsive: 'Mobile uses smaller sizes, desktop uses larger. Hero: 2rem mobile → 3rem desktop',
};

// 3. SPACING TOKENS
export interface Spacing {
  base: string;
  layout: {
    section_padding_y: string;
    section_padding_x: string;
    container_max_width: string;
    grid_gap: string;
    card_padding: string;
  };
}

export const spacing: Spacing = {
  base: 'var(--space-base, 4px)',
  layout: {
    section_padding_y: 'var(--space-section-y, 6rem)',
    section_padding_x: 'var(--space-section-x, 1.5rem)',
    container_max_width: 'var(--container-max-width, 80rem)',
    grid_gap: 'var(--space-grid-gap, 2rem)',
    card_padding: 'var(--space-card-padding, 2rem)',
  },
};

// 4. SHADOW TOKENS
export type ShadowLevel = 'md' | 'lg' | 'xl' | '2xl';
export interface Shadows {
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export const shadows: Shadows = {
  md: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
  lg: 'var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
  xl: 'var(--shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.1))',
  '2xl': 'var(--shadow-2xl, 0 25px 50px -12px rgba(0,0,0,0.15))',
};

// 5. RADIUS/BORDER TOKENS
export type RadiusSize = 'sm' | 'md' | 'lg' | 'xl';
export interface Radius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export const radius: Radius = {
  sm: 'var(--radius-sm, 0.375rem)',
  md: 'var(--radius-md, 0.5rem)',
  lg: 'var(--radius-lg, 0.75rem)',
  xl: 'var(--radius-xl, 1rem)',
};

// 6. ANIMATION TOKENS
export type AnimationDuration = 'fast' | 'base' | 'slow';
export interface Animations {
  durations: Record<AnimationDuration, string>;
  easing: string;
  transitions: {
    card_hover: string;
    link_hover: string;
  };
}

export const animations: Animations = {
  durations: {
    fast: 'var(--anim-fast, 200ms)',
    base: 'var(--anim-base, 300ms)',
    slow: 'var(--anim-slow, 500ms)',
  },
  easing: 'var(--anim-easing, cubic-bezier(0.4, 0, 0.2, 1))',
  transitions: {
    card_hover: 'shadow var(--anim-fast, 200ms) var(--anim-easing, cubic-bezier(0.4,0,0.2,1)), transform var(--anim-fast, 200ms) var(--anim-easing, cubic-bezier(0.4,0,0.2,1))',
    link_hover: 'color var(--anim-fast, 200ms) var(--anim-easing, cubic-bezier(0.4,0,0.2,1))',
  },
};
