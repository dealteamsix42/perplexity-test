// social-templates.ts
// Social media templates for content generation

export interface SocialTemplate {
  title: string;
  body: string;
  imageUrl?: string;
  callToAction?: string;
  tags?: string[];
  layoutVariant?: 'standard' | 'image_focus' | 'cta_bold';
  aspectRatio?: string;
}

export const linkedinTemplate: SocialTemplate = {
  title: 'LinkedIn Success Story',
  body: 'Discover how our solution drives business growth through intelligent design systems and seamless integrations.',
  imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
  callToAction: 'Learn More',
  tags: ['DesignSystem', 'Innovation', 'B2B', 'SaaS'],
  layoutVariant: 'standard',
};

export const twitterTemplate: SocialTemplate = {
  title: 'Design Innovation',
  body: 'Real-time design system orchestration for modern teams. Seamlessly manage components, tokens, and layouts across platforms.',
  tags: ['Design', 'DevTools', 'Engineering'],
  layoutVariant: 'image_focus',
};

export const instagramTemplate: SocialTemplate = {
  title: 'Creative Excellence',
  body: 'Transforming design workflows. Join the community of designers and developers revolutionizing digital experiences.',
  callToAction: 'Follow Us',
  tags: ['Design', 'Creative', 'Digital', 'Community', 'UX'],
  layoutVariant: 'image_focus',
};

export const tiktokTemplate: SocialTemplate = {
  title: '#DesignTalk',
  body: 'Behind the scenes: How we orchestrate design tokens in real-time',
  tags: ['DesignTok', 'BehindTheScenes', 'Tech'],
  layoutVariant: 'standard',
};

export const emailTemplate: SocialTemplate = {
  title: 'Design System Update',
  body: 'Excited to announce the latest features in our design orchestrator platform.',
  callToAction: 'View Updates',
  tags: [],
  layoutVariant: 'cta_bold',
};

export const generateTemplate = (platform: string, customizations?: Partial<SocialTemplate>): SocialTemplate => {
  const templates: Record<string, SocialTemplate> = {
    linkedin: linkedinTemplate,
    twitter: twitterTemplate,
    instagram: instagramTemplate,
    tiktok: tiktokTemplate,
    email: emailTemplate,
  };
  return { ...templates[platform], ...customizations };
};
