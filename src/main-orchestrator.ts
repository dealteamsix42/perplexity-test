// main-orchestrator.ts
import { ContentBatchProcessor } from './content-batch-processor';
import { FigmaComponentLibrary } from './figma-component-library';
import { colors, typography, spacing, shadows, radius, animations } from './design-tokens';

export class DesignSystemOrchestrator {
  private batchProcessor: ContentBatchProcessor;
  private figmaLibrary: FigmaComponentLibrary;

  constructor(figmaToken: string) {
    this.batchProcessor = new ContentBatchProcessor();
    this.figmaLibrary = new FigmaComponentLibrary(figmaToken);
  }

  async orchestrate() {
    console.log('[Orchestrator] Starting design system orchestration...');
    
    try {
      // Initialize Figma component library
      console.log('[Orchestrator] Initializing Figma component library...');
      const designTokens = { colors, typography, spacing, shadows, radius, animations };
      await this.figmaLibrary.createComponentLibrary(designTokens);

      // Process batch content
      console.log('[Orchestrator] Processing batch content...');
      const testCustomers = [
        { id: '1', name: 'Acme Corp', company: 'Acme' },
        { id: '2', name: 'TechStart Inc', company: 'TechStart' },
      ];
      const assets = await this.batchProcessor.batchGenerateFromSource(testCustomers);
      
      console.log(`[Orchestrator] Generated ${assets.length} social media assets.`);
      console.log('[Orchestrator] Design system orchestration complete!');
      return assets;
    } catch (error) {
      console.error('[Orchestrator] Error:', error);
      throw error;
    }
  }
}

// Main execution
if (require.main === module) {
  const figmaToken = process.env.FIGMA_TOKEN || '';
  const orchestrator = new DesignSystemOrchestrator(figmaToken);
  orchestrator.orchestrate().catch(console.error);
}
