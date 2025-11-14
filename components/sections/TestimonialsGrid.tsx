import React from 'react';
import { Section, Container, Heading, Text, GridLayout, CardLight, CardLightProps } from '../ui';

export interface TestimonialsGridProps {
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
   * Array of testimonials
   */
  testimonials: CardLightProps[];
  /**
   * Number of columns
   * @default 2
   */
  columns?: 2 | 3;
  /**
   * Background variant
   * @default 'muted'
   */
  background?: 'white' | 'muted' | 'transparent';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TestimonialsGrid Component
 * 
 * Grid of testimonial cards with optional section header.
 * Responsive layout with alternating card positioning.
 * 
 * @example
 * ```tsx
 * <TestimonialsGrid
 *   heading="What Our Customers Say"
 *   subheading="Trusted by industry leaders"
 *   testimonials={[
 *     {
 *       quote: "Amazing platform!",
 *       author: "John Doe",
 *       company: "TechCorp",
 *       logo: "/logos/techcorp.svg"
 *     }
 *   ]}
 * />
 * ```
 */
export const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({
  id = 'testimonials',
  heading,
  subheading,
  testimonials,
  columns = 2,
  background = 'muted',
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

        <GridLayout columns={columns} gap="lg" testimonials>
          {testimonials.map((testimonial, index) => (
            <CardLight key={index} {...testimonial} />
          ))}
        </GridLayout>
      </Container>
    </Section>
  );
};

TestimonialsGrid.displayName = 'TestimonialsGrid';
