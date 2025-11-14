import React from 'react';
import { Section, Container, Heading, Text, Button } from '../ui';

export interface HeroSectionProps {
  /**
   * Hero heading text
   */
  heading: string;
  /**
   * Hero subheading/tagline
   */
  subheading?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary CTA button props
   */
  primaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  /**
   * Secondary CTA button props
   */
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
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
 * HeroSection Component
 * 
 * Premium hero section with heading, subheading, description, and CTAs.
 * Centered layout with responsive typography.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   heading="Build Better Products Faster"
 *   subheading="Enterprise-grade platform"
 *   description="Join thousands of companies using our platform"
 *   primaryCta={{ text: "Get Started", href: "/signup" }}
 *   secondaryCta={{ text: "Learn More", href: "/about" }}
 * />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  background = 'white',
  className = '',
}) => {
  return (
    <Section background={background} spacing="lg" className={className}>
      <Container maxWidth="narrow">
        <div className="section__header">
          <Heading level="h1" align="center" balance>
            {heading}
          </Heading>
          
          {subheading && (
            <Text size="lg" color="muted" align="center" className="mt-4">
              {subheading}
            </Text>
          )}
          
          {description && (
            <Text size="base" color="muted" align="center" className="mt-4 max-w-2xl mx-auto">
              {description}
            </Text>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="btn-group btn-group--center mt-8">
              {primaryCta && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryCta.onClick}
                  as={primaryCta.href ? 'a' : undefined}
                  href={primaryCta.href}
                >
                  {primaryCta.text}
                </Button>
              )}
              
              {secondaryCta && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={secondaryCta.onClick}
                  as={secondaryCta.href ? 'a' : undefined}
                  href={secondaryCta.href}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

HeroSection.displayName = 'HeroSection';
