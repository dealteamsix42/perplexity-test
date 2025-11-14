import React from 'react';
import { Section, Container, Heading, Text, GridLayout, CardDark, CardDarkProps } from '../ui';

export interface CaseStudiesGridProps {
  /**
   * Section ID for navigation
   */
  id?: string;
  /**
   * Section heading
   */
  heading?: string;
  /**
   * Section subheading
   */
  subheading?: string;
  /**
   * Array of case studies
   */
  caseStudies: CardDarkProps[];
  /**
   * Background variant
   * @default 'white'
   */
  background?: 'white' | 'muted' | 'transparent';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * CaseStudiesGrid Component
 * 
 * 2-column grid of premium dark case study cards.
 * Responsive layout with gradient backgrounds.
 * 
 * @example
 * ```tsx
 * <CaseStudiesGrid
 *   heading="Customer Success Stories"
 *   subheading="See how industry leaders achieve results"
 *   caseStudies={[
 *     {
 *       logo: "/logos/company.svg",
 *       title: "Streaming at Scale",
 *       description: "How we helped...",
 *       metrics: [
 *         { label: "Uptime", value: "99.9%", accent: "teal" },
 *         { label: "Support", value: "24/7" }
 *       ],
 *       ctaText: "Read Story",
 *       ctaLink: "/case-studies/company"
 *     }
 *   ]}
 * />
 * ```
 */
export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  id = 'case-studies',
  heading,
  subheading,
  caseStudies,
  background = 'white',
  className = '',
}) => {
  return (
    <Section id={id} background={background} className={className}>
      <Container>
        {(heading || subheading) && (
          <div className="section__header">
            {heading && (
              <Heading level="h2" align="center">
                {heading}
              </Heading>
            )}
            {subheading && (
              <Text size="lg" color="muted" align="center" className="mt-4">
                {subheading}
              </Text>
            )}
          </div>
        )}

        <GridLayout columns={2} gap="lg" premium>
          {caseStudies.map((caseStudy, index) => (
            <CardDark 
              key={index} 
              {...caseStudy}
              gradient={index % 2 === 0 ? 'purple-blue' : 'teal-navy'}
            />
          ))}
        </GridLayout>
      </Container>
    </Section>
  );
};

CaseStudiesGrid.displayName = 'CaseStudiesGrid';
