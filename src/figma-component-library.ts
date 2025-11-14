// figma-component-library.ts
/**
 * Figma Component Library Integration: Generates and syncs Figma components from design tokens
 * Uses Figma REST API (v1) - https://www.figma.com/developers/api
 * Production-ready code with error handling and explicit type definitions
 */

import axios, { AxiosInstance } from 'axios';

// ---- TYPE DEFINITIONS ----

// Design Tokens from previous task
import { colors, typography, spacing, shadows, radius, animations } from './design-tokens';

export type DesignTokens = typeof colors & typeof typography & typeof spacing & typeof shadows & typeof radius & typeof animations;

export interface Component {
  id?: string;
  name: string;
  type: 'FRAME' | 'COMPONENT' | 'GROUP';
  styleOverrides?: Record<string, any>;
  variantProps?: Record<string, any>;
  children?: Component[];
}

export interface FigmaFile {
  key: string;
  name: string;
  teamId: string;
  components?: Component[];
}

export interface FigmaTeam {
  id: string;
  name: string;
}

export interface FigmaAPIResponse<T = any> {
  status: number;
  data: T;
  error?: string;
}

export class FigmaComponentLibrary {
  private api: AxiosInstance;
  private fileKey: string | null = null;
  private teamId: string | null = null;

  constructor(private personalAccessToken: string) {
    this.api = axios.create({
      baseURL: 'https://api.figma.com/v1/',
      headers: {
        'X-Figma-Token': personalAccessToken,
      },
    });
  }

  /**
   * Creates a new component library frame in Figma from design tokens.
   */
  async createComponentLibrary(designTokens: DesignTokens): Promise<void> {
    try {
      // Step 1: Find/create file for the team
      const file = await this.ensureLibraryFile();
      this.fileKey = file.key;

      // Step 2: Build components from tokens
      const components: Component[] = this.tokensToComponents(designTokens);

      // Step 3: Create frames/components via API
      for (const comp of components) {
        await this.createFrame(comp, file.key);
      }
    } catch (error: any) {
      throw new Error(`Failed to create component library: ${error.message}`);
    }
  }

  /**
   * Applies design tokens to all components in the library file.
   */
  async applyTokensToComponents(components: Component[]): Promise<void> {
    try {
      if (!this.fileKey) throw new Error('No file specified.');
      for (const comp of components) {
        await this.updateComponentStyles(comp, this.fileKey!);
      }
    } catch (error: any) {
      throw new Error(`Failed to apply tokens: ${error.message}`);
    }
  }

  /**
   * Creates variants based on baseComponent and its variantProps.
   */
  async createVariants(baseComponent: Component): Promise<Component[]> {
    try {
      if (!baseComponent.variantProps) return [baseComponent];
      const variants: Component[] = [];
      for (const [variantName, variantValue] of Object.entries(baseComponent.variantProps)) {
        // Clone and modify variant
        const variant: Component = {
          ...baseComponent,
          name: `${baseComponent.name}/${variantName}`,
          styleOverrides: { ...baseComponent.styleOverrides, ...variantValue },
        };
        variants.push(variant);
        await this.createFrame(variant, this.fileKey!);
      }
      return variants;
    } catch (error: any) {
      throw new Error(`Failed to create variants: ${error.message}`);
    }
  }

  /**
   * Publishes the current library file to Figma Team.
   * Returns sharing link.
   */
  async publishToTeam(): Promise<string> {
    try {
      if (!this.teamId || !this.fileKey) throw new Error('Team or file missing.');
      // (Figma doesn't have public API for "publish", so we share the file to team.)
      await this.api.put(`files/${this.fileKey}/team/${this.teamId}`, { role: 'editor' });
      return `https://figma.com/file/${this.fileKey}`;
    } catch (error: any) {
      throw new Error(`Failed to publish: ${error.message}`);
    }
  }

  /**
   * Syncs new design tokens to all library components.
   */
  async syncDesignTokens(tokens: DesignTokens): Promise<void> {
    try {
      const file = await this.ensureLibraryFile();
      const components = await this.fetchLibraryComponents(file.key);
      await this.applyTokensToComponents(components);
    } catch (error: any) {
      throw new Error(`Sync failed: ${error.message}`);
    }
  }

  // ---- INTERNAL IMPLEMENTATION ----

  // Ensure target file ("Component Library") exists; create if missing.
  private async ensureLibraryFile(): Promise<FigmaFile> {
    if (!this.teamId) throw new Error('No Figma team ID provided.');
    const resp = await this.api.get<FigmaFile[]>(`teams/${this.teamId}/projects`);
    const file: FigmaFile = resp.data.find(f => f.name === 'Component Library') ?? (await this.createFile('Component Library'));
    return file;
  }

  // Creates a new Figma file in the team
  private async createFile(name: string): Promise<FigmaFile> {
    const resp = await this.api.post<FigmaFile>(`files`, { name, teamId: this.teamId });
    return resp.data;
  }

  // Converts design tokens to component stubs
  private tokensToComponents(tokens: DesignTokens): Component[] {
    return [
      { name: 'Color Palette', type: 'FRAME', styleOverrides: tokens.colors },
      { name: 'Typography', type: 'FRAME', styleOverrides: tokens.typography },
      { name: 'Spacing', type: 'FRAME', styleOverrides: tokens.spacing },
      { name: 'Shadows', type: 'FRAME', styleOverrides: tokens.shadows },
      { name: 'Radius', type: 'FRAME', styleOverrides: tokens.radius },
      { name: 'Animations', type: 'FRAME', styleOverrides: tokens.animations },
    ];
  }

  // Creates a Figma Frame/Component using REST API
  private async createFrame(component: Component, fileKey: string): Promise<any> {
    return await this.api.post(`files/${fileKey}/frames`, component);
  }

  // Update a component's styles in Figma via API
  private async updateComponentStyles(component: Component, fileKey: string): Promise<any> {
    if (!component.id) throw new Error('Component ID required for update.');
    return await this.api.patch(`files/${fileKey}/components/${component.id}/styles`, { styles: component.styleOverrides });
  }

  // Fetches all components in a file
  private async fetchLibraryComponents(fileKey: string): Promise<Component[]> {
    const resp = await this.api.get<{ components: Component[] }>(`files/${fileKey}/components`);
    return resp.data.components;
  }
}
