/**
 * Tailark Pro Design System - Component Library
 * 
 * Complete React component library based on design.json
 * 
 * @example
 * ```tsx
 * import { HeroSection, TestimonialsGrid, CardDark } from './components';
 * 
 * export default function HomePage() {
 *   return (
 *     <>
 *       <HeroSection
 *         heading="Build Better Products"
 *         primaryCta={{ text: "Get Started", href: "/signup" }}
 *       />
 *       <TestimonialsGrid testimonials={data} />
 *     </>
 *   );
 * }
 * ```
 */

// Base UI Components
export * from './ui';

// Composite Section Components
export * from './sections';
