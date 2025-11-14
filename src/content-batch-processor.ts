// content-batch-processor.ts
import { linkedinAdapter, twitterAdapter, instagramAdapter, tiktokAdapter, emailAdapter } from './platform-adapters';
import { generateTemplate } from './social-templates';

export interface CustomerData {
  id: string;
  name: string;
  company?: string;
  socials?: { linkedin?: string; twitter?: string; instagram?: string; tiktok?: string; email?: string };
}

export interface Asset {
  platform: string;
  html?: string;
  svg?: string;
  json: any;
  exportSpec: { format: string; dpi?: number; maxFileSizeMB?: number };
}

export class ContentBatchProcessor {
  async generateForAllPlatforms(customer: CustomerData): Promise<Record<string, Asset>> {
    const adapters: Record<string, any> = {
      linkedin: linkedinAdapter,
      twitter: twitterAdapter,
      instagram: instagramAdapter,
      tiktok: tiktokAdapter,
      email: emailAdapter,
    };

    const baseTemplate = generateTemplate('linkedin');
    const assets: Record<string, Asset> = {};

    for (const [platform, adapter] of Object.entries(adapters)) {
      const template = generateTemplate(platform);
      const adapted = adapter(template);
      assets[platform] = {
        platform,
        html: `<div>${adapted.transformedTemplate.title}</div>`,
        svg: `<svg>${adapted.transformedTemplate.title}</svg>`,
        json: adapted,
        exportSpec: adapted.exportSpec,
      };
    }
    return assets;
  }

  async batchGenerateFromSource(customers: CustomerData[]): Promise<Asset[]> {
    const allAssets: Asset[] = [];
    for (const customer of customers) {
      const assets = await this.generateForAllPlatforms(customer);
      allAssets.push(...Object.values(assets));
    }
    return allAssets;
  }
}
