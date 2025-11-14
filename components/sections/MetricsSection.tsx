import React from 'react';
import { Section, Container, Heading, Text, GridLayout } from '../ui';

export interface Metric {
  /**
   * Metric value (e.g., "99.9%", "24/7", "10k+")
   */
  value: string;
  /**
   * Metric label
   */
  label: string;
  /**
   * Metric description (optional)
   */
  description?: string;
  /**
   * Icon component or SVG (optional)
   */
  icon?: React.ReactNode;
}

export interface MetricsSectionProps {
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
   * Array of metrics to display
   */
  metrics: Metric[];
  /**
   * Number of columns
   * @default 3
   */
  columns?: 2 | 3 | 4;
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
 * MetricsSection Component
 * 
 * Grid of metrics/statistics with icons, values, and labels.
 * Perfect for showcasing key performance indicators.
 * 
 * @example
 * ```tsx
 * <MetricsSection
 *   heading="Trusted by thousands"
 *   metrics={[
 *     {
 *       value: "99.9%",
 *       label: "Uptime Guarantee",
 *       description: "Industry-leading reliability"
 *     },
 *     {
 *       value: "24/7",
 *       label: "Customer Support",
 *       description: "Always here to help"
 *     }
 *   ]}
 * />
 * ```
 */
export const MetricsSection: React.FC<MetricsSectionProps> = ({
  id = 'metrics',
  heading,
  subheading,
  metrics,
  columns = 3,
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

        <GridLayout columns={columns} gap="lg">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card text--center p-6"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {metric.icon && (
                <div style={{ width: '3rem', height: '3rem', color: 'var(--color-primary)' }}>
                  {metric.icon}
                </div>
              )}
              
              <div>
                <div
                  className="text--5xl text--bold"
                  style={{ color: 'var(--color-accent-teal)', lineHeight: 1 }}
                >
                  {metric.value}
                </div>
                <Text size="sm" color="default" weight="semibold" className="mt-2 text--uppercase">
                  {metric.label}
                </Text>
                {metric.description && (
                  <Text size="sm" color="muted" className="mt-2">
                    {metric.description}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </GridLayout>
      </Container>
    </Section>
  );
};

MetricsSection.displayName = 'MetricsSection';
