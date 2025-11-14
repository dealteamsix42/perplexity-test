// platform-adapters.ts
/**
 * Social platform adapters for transforming generic templates into platform-specific formats.
 * Supports LinkedIn, Twitter, Instagram, TikTok, Email.
 */

export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'tiktok' | 'email';

export interface SocialTemplate {
  title: string;
  body: string;
  imageUrl?: string;
  callToAction?: string;
  tags?: string[];
  layoutVariant?: 'standard' | 'image_focus' | 'cta_bold';
  aspectRatio?: string;
}

export interface PlatformAdapter {
  platform: SocialPlatform;
  dimensions: { width: number; height: number; aspectRatio: string };
  layout: { layoutType: string; adjustments: Record<string, any> };
  exportSpec: { format: 'jpg' | 'png' | 'gif' | 'mp4' | 'html' | 'pdf' | 'svg'; maxFileSizeMB: number; dpi?: number };
  contentConstraints: { maxTextLength: number; imageRequired: boolean; supportedHashtags: boolean; ctaAllowed: boolean; captionLength?: number; linkAllowed: boolean };
  transformedTemplate: SocialTemplate;
}

export const linkedinAdapter = (template: SocialTemplate): PlatformAdapter => ({
  platform: 'linkedin',
  dimensions: { width: 1200, height: 627, aspectRatio: '1.91:1' },
  layout: { layoutType: template.layoutVariant || 'standard', adjustments: { logoPlacement: 'top-right', fontSize: '16px', safeZonePx: 32 } },
  exportSpec: { format: 'png', maxFileSizeMB: 5, dpi: 72 },
  contentConstraints: { maxTextLength: 1300, imageRequired: false, supportedHashtags: true, ctaAllowed: true, linkAllowed: true },
  transformedTemplate: { ...template, aspectRatio: '1.91:1', tags: template.tags?.slice(0, 10) },
});

export const twitterAdapter = (template: SocialTemplate): PlatformAdapter => ({
  platform: 'twitter',
  dimensions: { width: 1200, height: 675, aspectRatio: '16:9' },
  layout: { layoutType: template.layoutVariant || 'image_focus', adjustments: { textLimitPx: 254, imagePriority: true, hideLogo: true } },
  exportSpec: { format: 'jpg', maxFileSizeMB: 5, dpi: 72 },
  contentConstraints: { maxTextLength: 280, imageRequired: false, supportedHashtags: true, ctaAllowed: false, linkAllowed: true },
  transformedTemplate: { ...template, aspectRatio: '16:9', body: template.body.slice(0, 280), tags: template.tags?.slice(0, 5) },
});

export const instagramAdapter = (template: SocialTemplate): PlatformAdapter => ({
  platform: 'instagram',
  dimensions: { width: 1080, height: 1080, aspectRatio: '1:1' },
  layout: { layoutType: template.layoutVariant || 'image_focus', adjustments: { imageCentered: true, textOverlay: false, maxCaptionChars: 2200 } },
  exportSpec: { format: 'jpg', maxFileSizeMB: 8, dpi: 72 },
  contentConstraints: { maxTextLength: 2200, imageRequired: true, supportedHashtags: true, ctaAllowed: false, captionLength: 2200, linkAllowed: false },
  transformedTemplate: { ...template, aspectRatio: '1:1', tags: template.tags?.slice(0, 30), body: template.body.slice(0, 2200), imageUrl: template.imageUrl || 'https://placeholder.img/1080x1080' },
});

export const tiktokAdapter = (template: SocialTemplate): PlatformAdapter => ({
  platform: 'tiktok',
  dimensions: { width: 1080, height: 1920, aspectRatio: '9:16' },
  layout: { layoutType: template.layoutVariant || 'standard', adjustments: { verticalSafeZonePx: 160, audioOverlayAllowed: true, textPlacement: 'bottom' } },
  exportSpec: { format: 'mp4', maxFileSizeMB: 50 },
  contentConstraints: { maxTextLength: 150, imageRequired: false, supportedHashtags: true, ctaAllowed: false, linkAllowed: false },
  transformedTemplate: { ...template, aspectRatio: '9:16', body: template.body.slice(0, 150), tags: template.tags?.slice(0, 5) },
});

export const emailAdapter = (template: SocialTemplate): PlatformAdapter => ({
  platform: 'email',
  dimensions: { width: 600, height: 800, aspectRatio: '3:4' },
  layout: { layoutType: template.layoutVariant || 'standard', adjustments: { headerLogo: true, mobileResponsive: true, fontSize: '16px' } },
  exportSpec: { format: 'html', maxFileSizeMB: 1 },
  contentConstraints: { maxTextLength: 10000, imageRequired: false, supportedHashtags: false, ctaAllowed: true, linkAllowed: true },
  transformedTemplate: { ...template, aspectRatio: '3:4', body: template.body.slice(0, 10000), callToAction: template.callToAction, tags: [] },
});
